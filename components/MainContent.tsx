import React, { useState, useEffect } from 'react';
import type { ApiEndpointDetails, Parameter, ResponseItem } from '../types';
import { LinkIcon, CheckIcon } from './icons/Icons';

interface MainContentProps {
  content: ApiEndpointDetails;
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

const ParameterRow: React.FC<{ param: Parameter; level: number }> = ({ param, level }) => {
  const isObject = param.children && param.children.length > 0;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,4fr] gap-2 py-3 border-b border-dark-border/50">
        <div style={{ paddingLeft: `${level * 20}px` }}>
          <span className="font-mono text-sm">{param.name}</span>
          {param.required && <span className="text-red-400 text-xs ml-2">required</span>}
        </div>
        <div className="font-mono text-sm text-sky-400">{param.type}</div>
        <div className="text-sm text-dark-text-secondary" dangerouslySetInnerHTML={{ __html: param.description }}/>
      </div>
      {isObject && (
        <div className="border-l border-dark-border ml-4">
          {param.children?.map((child, index) => (
            <ParameterRow key={index} param={child} level={level + 1} />
          ))}
        </div>
      )}
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

const ParametersTable: React.FC<{title: string, params: Parameter[]}> = ({title, params}) => (
    <section className="mt-10">
      <h3 className="text-xl font-semibold text-white border-b border-dark-border pb-2 mb-4">{title}</h3>
      <div className="text-sm text-dark-text-secondary grid grid-cols-1 md:grid-cols-[2fr,1fr,4fr] gap-2 px-2 pb-2">
        <span>Nome</span>
        <span>Tipo</span>
        <span>Descrição</span>
      </div>
      <div className="border-t border-dark-border">
        {params.map((param, index) => (
          <ParameterRow key={index} param={param} level={0} />
        ))}
      </div>
    </section>
);


const MainContent: React.FC<MainContentProps> = ({ content }) => {
  const [pathCopied, setPathCopied] = useState(false);
  const [activeResponseCode, setActiveResponseCode] = useState<string>(content.responses[0]?.code || '');
  
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
        
        {content.headers && content.headers.length > 0 && <ParametersTable title="Headers" params={content.headers} />}
        {content.parameters && content.parameters.length > 0 && <ParametersTable title="Parâmetros" params={content.parameters} />}


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
