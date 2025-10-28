import React, { useState, useEffect } from 'react';
import type { ApiEndpointDetails, Parameter, ResponseItem } from '../types';
import { LinkIcon, CheckIcon, RefreshIcon, PlusIcon, TrashIcon, DuplicateIcon } from './icons/Icons';
import { generateInitialBody, ICMS_CST_MAP, PIS_COFINS_CST_MAP } from '../constants';

const DYNAMIC_MAPS: { [key: string]: any } = {
  ICMS_CST_MAP,
  PIS_COFINS_CST_MAP,
};

interface MainContentProps {
  content: ApiEndpointDetails;
  requestBody: any;
  onBodyChange: (newBody: any) => void;
}

const MethodBadge: React.FC<{ method: string }> = ({ method }) => {
  const styles = {
    POST: 'bg-green-800/50 text-green-300 border border-green-500/50',
    GET: 'bg-blue-800/50 text-blue-300 border border-blue-500/50',
    PUT: 'bg-yellow-800/50 text-yellow-300 border border-yellow-500/50',
    DELETE: 'bg-red-800/50 text-red-300 border border-red-500/50',
  };
  const color = styles[method as keyof typeof styles] || 'bg-gray-800/50 text-gray-300';
  
  return (
    <span className={`px-3 py-1 text-sm font-bold rounded ${color}`}>
      {method}
    </span>
  );
};

const InputField: React.FC<{ param: Parameter, value: any, onChange: (e: React.ChangeEvent<any>) => void }> = ({ param, value, onChange }) => {
  const commonClasses = "w-full bg-dark-surface border border-dark-border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-accent";
  
  if(param.options) {
    return (
        <select value={value || ''} onChange={onChange} className={`${commonClasses} pr-8`}>
            {param.options.map(option => (
                <option key={option.value} value={option.value}>{option.label || option.value}</option>
            ))}
        </select>
    );
  }

  switch (param.type) {
    case 'integer':
    case 'number':
      return <input type="number" value={value === null || value === undefined ? '' : value} onChange={onChange} className={commonClasses} />;
    case 'boolean':
      return (
        <div className="flex items-center h-full">
          <input type="checkbox" checked={!!value} onChange={onChange} className="w-4 h-4 bg-dark-surface border-dark-border rounded text-dark-accent focus:ring-dark-accent" />
        </div>
      );
    case 'array[string]':
        return <textarea value={Array.isArray(value) ? value.join('\n') : ''} onChange={onChange} className={`${commonClasses} min-h-[60px]`} placeholder="Um valor por linha..."/>
    default:
      if (typeof value === 'object' && value !== null) {
        return <textarea value={JSON.stringify(value, null, 2) || ''} onChange={onChange} className={`${commonClasses} min-h-[80px] font-mono`} />;
      }
      if (typeof value === 'string' && value.length > 80) {
        return <textarea value={value || ''} onChange={onChange} className={`${commonClasses} min-h-[80px]`} />;
      }
      return <input type="text" value={value || ''} onChange={onChange} className={commonClasses} />;
  }
}

const ParameterRow: React.FC<{ 
    param: Parameter; 
    level: number; 
    path: (string | number)[];
    value: any; 
    onValueChange: (path: (string | number)[], value: any, triggerInfo?: any) => void;
    parentParam?: Parameter | null;
}> = ({ param, level, path, value, onValueChange, parentParam = null }) => {
  const isObjectOrArray = param.children && param.children.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let val: any;
    if (e.target.type === 'checkbox') {
        val = (e.target as HTMLInputElement).checked;
    } else if(e.target.type === 'number') {
        val = e.target.value === '' ? null : parseFloat(e.target.value);
    } else if(param.type === 'array[string]') {
        val = e.target.value.split('\n').filter(s => s);
    } else if (param.type === 'object') {
        try {
            val = JSON.parse(e.target.value);
        } catch (error) {
            val = e.target.value; // Keep as string if JSON is invalid
        }
    }
    else {
        val = e.target.value;
    }
    
    let triggerInfo = null;
    if (param.isDynamicTrigger && parentParam?.dynamicChildrenKey) {
        triggerInfo = {
            parentPath: path.slice(0, -1),
            dynamicMap: DYNAMIC_MAPS[parentParam.dynamicChildrenKey],
            triggerKey: param.name,
            parentChildren: parentParam.children
        };
    }

    onValueChange(path, val, triggerInfo);
  };

  const addItem = () => {
    if (!param.children) return;
    const newItem = generateInitialBody(param.children);
    const newArray = Array.isArray(value) ? [...value, newItem] : [newItem];
    onValueChange(path, newArray);
  };

  const removeItem = (index: number) => {
    if (!Array.isArray(value)) return;
    const newArray = value.filter((_, i) => i !== index);
    onValueChange(path, newArray);
  };

  const duplicateItem = (index: number) => {
    if (!Array.isArray(value)) return;
    const itemToDuplicate = JSON.parse(JSON.stringify(value[index]));
    const newArray = [
      ...value.slice(0, index + 1),
      itemToDuplicate,
      ...value.slice(index + 1),
    ];
    onValueChange(path, newArray);
  };

  const renderChildren = () => {
    let childrenToRender = param.children || [];
    
    if (param.dynamicChildrenKey && value) {
        const triggerChild = param.children?.find(c => c.isDynamicTrigger);
        if (triggerChild) {
            const triggerValue = value[triggerChild.name];
            const fieldMap = DYNAMIC_MAPS[param.dynamicChildrenKey];
            if (fieldMap && triggerValue) {
                const visibleFieldNames = fieldMap[triggerValue] || [];
                childrenToRender = param.children?.filter(
                    child => child.isDynamicTrigger || visibleFieldNames.includes(child.name)
                ) || [];
            }
        }
    }

    if (param.type === 'object') {
      return (
        <div className="border-l border-dark-border/30 ml-4">
          {childrenToRender.map((child) => (
            <ParameterRow 
              key={child.name} 
              param={child} 
              level={level + 1}
              path={[...path, child.name]}
              value={value ? value[child.name] : undefined}
              onValueChange={onValueChange}
              parentParam={param}
            />
          ))}
        </div>
      );
    }
    
    if (param.type === 'array' && Array.isArray(value)) {
      const arrayControls = param.isManipulableArray ? (
         <div className="flex justify-end items-center mb-2 -mt-2">
            <button onClick={addItem} className="flex items-center text-xs text-dark-accent font-semibold hover:text-blue-400 transition-colors">
                <PlusIcon className="w-4 h-4 mr-1" />
                Adicionar
            </button>
        </div>
      ) : null;

      return (
        <div className="border-l border-dark-border/30 ml-4 pl-4 pt-2">
            {arrayControls}
          {value.map((item, index) => (
            <div key={index} className="mb-4 p-3 border border-dark-border/50 rounded-lg bg-dark-surface/30 relative">
              <div className="flex justify-between items-center mb-2">
                 <p className="text-xs font-semibold text-dark-text-secondary">Item {index + 1}</p>
                 {param.isManipulableArray && (
                    <div className="flex items-center space-x-2">
                        <button onClick={() => duplicateItem(index)} title="Duplicar Item" className="text-dark-text-secondary hover:text-white transition-colors">
                            <DuplicateIcon className="w-4 h-4"/>
                        </button>
                        <button onClick={() => removeItem(index)} title="Remover Item" className="text-dark-text-secondary hover:text-red-400 transition-colors">
                            <TrashIcon className="w-4 h-4"/>
                        </button>
                    </div>
                 )}
              </div>
              {childrenToRender.map(childParam => (
                <ParameterRow 
                  key={childParam.name}
                  param={childParam}
                  level={level + 1}
                  path={[...path, index, childParam.name]}
                  value={item ? item[childParam.name] : undefined}
                  onValueChange={onValueChange}
                  parentParam={param}
                />
              ))}
            </div>
          ))}
        </div>
      );
    }
    return null;
  }
  
  return (
    <>
      <div style={{ paddingLeft: `${level * 20}px` }} className={`py-3 ${level > 0 ? '' : ''} border-b border-dark-border/50`}>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-shrink-0 w-1/3 pr-2">
            <span className="font-mono text-sm break-words">{param.name}</span>
            {param.required && <span className="text-red-400 text-xs ml-2">required</span>}
            <div className="font-mono text-xs text-sky-400 mt-1">{param.type}</div>
          </div>
          <div className="flex-grow w-2/3">
            <p className="text-sm text-dark-text-secondary mb-2" dangerouslySetInnerHTML={{ __html: param.description }} />
            {!isObjectOrArray && <InputField param={param} value={value} onChange={handleChange} />}
          </div>
        </div>
      </div>
      {isObjectOrArray && renderChildren()}
    </>
  );
};


const ResponseRow: React.FC<{ response: ResponseItem }> = ({ response }) => (
  <div className="py-4">
    <p className="text-sm text-dark-text-secondary mt-1">{response.description}</p>
    {response.schema && (
        <pre className="bg-dark-code-bg p-4 rounded-md mt-4 text-xs text-dark-text overflow-x-auto">
            <code>{response.schema}</code>
        </pre>
    )}
  </div>
)

const ParametersTable: React.FC<{title: string, params: Parameter[], requestBody: any, onBodyChange: any}> = ({title, params, requestBody, onBodyChange}) => {
    
    const bodyParams = params.find(p => p.name === 'Body');

    const handleBodyChange = (path: (string | number)[], value: any, triggerInfo: any = null) => {
      onBodyChange((prevBody: any) => {
        const newBody = JSON.parse(JSON.stringify(prevBody)); // Deep copy
        let current = newBody;
        for (let i = 0; i < path.length - 1; i++) {
          if (current[path[i]] === undefined) {
             if(typeof path[i+1] === 'number') current[path[i]] = [];
             else current[path[i]] = {};
          }
          current = current[path[i]];
        }
        current[path[path.length - 1]] = value;

        if (triggerInfo) {
            const { parentPath, dynamicMap, triggerKey, parentChildren } = triggerInfo;
            
            let parentObject = newBody;
            parentPath.forEach(p => { parentObject = parentObject[p] || {}; });
            
            const validKeys = dynamicMap[value] || [];
            const keysToKeep = new Set([...validKeys, triggerKey]);
            
            for (const key in parentObject) {
                if (!keysToKeep.has(key)) {
                    delete parentObject[key];
                }
            }
            
            parentChildren.forEach((child: Parameter) => {
              if(validKeys.includes(child.name) && parentObject[child.name] === undefined) {
                 parentObject[child.name] = child.defaultValue;
              }
            });
        }

        return newBody;
      });
    };
    
    if (!bodyParams || !bodyParams.children) return null;

    return (
        <section className="mt-10">
          <div className="flex justify-between items-center border-b border-dark-border pb-2 mb-4">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <button 
              onClick={() => {
                 const initialBody = generateInitialBody(bodyParams.children || []);
                 const cleanedBody = (window as any).cleanupDynamicBody(initialBody, bodyParams.children || [], DYNAMIC_MAPS)
                 onBodyChange(initialBody); // Re-run cleanup on reset
              }}
              className="flex items-center text-sm text-dark-text-secondary hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-dark-surface">
              <RefreshIcon className="w-4 h-4 mr-2"/>
              Resetar
            </button>
          </div>
          <div className="border-t border-dark-border/50">
            {bodyParams.children.map((param) => (
              <ParameterRow 
                key={param.name} 
                param={param} 
                level={0}
                path={[param.name]}
                value={requestBody ? requestBody[param.name] : undefined}
                onValueChange={handleBodyChange}
               />
            ))}
          </div>
        </section>
    );
}


const MainContent: React.FC<MainContentProps> = ({ content, requestBody, onBodyChange }) => {
  const [pathCopied, setPathCopied] = useState(false);
  const [activeResponseCode, setActiveResponseCode] = useState<string>(content.responses[0]?.code || '');
  
  useEffect(() => {
    // Expose cleanup function globally for reset button, not ideal but works for this structure
    (window as any).cleanupDynamicBody = (body: any, params: Parameter[], maps: { [key: string]: any }): any => {
        if (!body) return body;
        const newBody = JSON.parse(JSON.stringify(body));
        const traverseAndClean = (currentBody: any, currentParams: Parameter[]) => {
            if (!currentBody || !currentParams) return;
            currentParams.forEach(param => {
                if (param.dynamicChildrenKey && param.children && currentBody[param.name]) {
                    const trigger = param.children.find(p => p.isDynamicTrigger);
                    if (trigger && currentBody[param.name][trigger.name]) {
                        const triggerValue = currentBody[param.name][trigger.name];
                        const map = maps[param.dynamicChildrenKey];
                        const validKeys = new Set([...(map[triggerValue] || []), trigger.name]);
                        const dynamicObject = currentBody[param.name];
                        for (const key in dynamicObject) {
                            if (!validKeys.has(key)) {
                                delete dynamicObject[key];
                            }
                        }
                    }
                } else if (param.children && currentBody[param.name]) {
                    if (Array.isArray(currentBody[param.name])) {
                        currentBody[param.name].forEach((item: any) => traverseAndClean(item, param.children!));
                    } else {
                        traverseAndClean(currentBody[param.name], param.children);
                    }
                }
            });
        };
        traverseAndClean(newBody, params);
        return newBody;
    };

    const bodyParams = content.parameters.find(p => p.name === 'Body');
    if (bodyParams?.children) {
      const initialBody = generateInitialBody(bodyParams.children);
      const cleanedBody = (window as any).cleanupDynamicBody(initialBody, bodyParams.children, DYNAMIC_MAPS);
      onBodyChange(cleanedBody);
    }

    return () => {
      delete (window as any).cleanupDynamicBody;
    }
  }, [content, onBodyChange]);


  useEffect(() => {
    if (content.responses && content.responses.length > 0) {
        setActiveResponseCode(content.responses[0].code);
    }
  }, [content]);


  const fullPath = `https://api.plugnotas.com.br${content.path}`;

  const handleCopyPath = () => {
    navigator.clipboard.writeText(fullPath);
    setPathCopied(true);
    setTimeout(() => setPathCopied(false), 2000);
  }

  return (
    <main className="flex-1 bg-dark-bg p-8 overflow-y-auto">
      <div className="max-w-4xl">
        <span className="text-sm font-semibold text-dark-text-secondary">{content.tag}</span>
        <h2 className="text-3xl font-bold text-white mt-1">{content.title}</h2>
        
        <div className="flex items-center space-x-3 my-6 bg-dark-surface p-3 rounded-lg border border-dark-border relative group">
          <MethodBadge method={content.method} />
          <span className="font-mono text-lg text-dark-text">{content.path}</span>
           <button onClick={handleCopyPath} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
            {pathCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <LinkIcon className="w-5 h-5" />}
          </button>
        </div>

        <p className="text-dark-text-secondary leading-relaxed" dangerouslySetInnerHTML={{__html: content.description}} />
        
        {content.parameters && content.parameters.length > 0 && content.parameters.some(p => p.name === 'Body') &&
            <ParametersTable 
                title="Parâmetros" 
                params={content.parameters} 
                requestBody={requestBody} 
                onBodyChange={onBodyChange} 
            />
        }


        <section className="mt-10">
          <h3 className="text-xl font-semibold text-white mb-4">Respostas</h3>
           <div className="border-b border-dark-border flex">
            {content.responses.map((response) => (
              <button
                key={response.code}
                onClick={() => setActiveResponseCode(response.code)}
                className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                  activeResponseCode === response.code
                    ? 'border-dark-accent text-dark-accent'
                    : 'border-transparent text-dark-text-secondary hover:text-dark-text'
                }`}
              >
                {response.code}
              </button>
            ))}
          </div>
          <div className="pt-2">
            {content.responses.find(r => r.code === activeResponseCode) &&
              <ResponseRow response={content.responses.find(r => r.code === activeResponseCode)!} />
            }
          </div>
        </section>
      </div>
    </main>
  );
};

export default MainContent;