import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import CodeSnippets from './components/CodeSnippets';
import Header from './components/Header';
import { API_CONTENT_DATA, CODE_SNIPPETS_DATA, SIDEBAR_DATA, generateInitialBody, ICMS_CST_MAP, PIS_COFINS_CST_MAP } from './constants';
import type { ApiEndpointDetails, CodeExample, NavItem, Parameter } from './types';

const DYNAMIC_MAPS: { [key: string]: any } = {
  ICMS_CST_MAP,
  PIS_COFINS_CST_MAP,
};

const cleanupDynamicBody = (body: any, params: Parameter[], maps: { [key: string]: any }): any => {
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


const App: React.FC = () => {
  const [activeEndpointId, setActiveEndpointId] = useState<string>('addNFe');
  const [searchTerm, setSearchTerm] = useState('');
  const [requestBody, setRequestBody] = useState<any>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCodeSnippetsOpen, setIsCodeSnippetsOpen] = useState(false);

  const activeContent: ApiEndpointDetails = API_CONTENT_DATA[activeEndpointId] || API_CONTENT_DATA['addNFe'];
  const activeSnippets: CodeExample[] = CODE_SNIPPETS_DATA[activeEndpointId] || CODE_SNIPPETS_DATA['addNFe'];

  useEffect(() => {
    const bodyParams = activeContent.parameters.find(p => p.name === 'Body');
    if (bodyParams && bodyParams.children) {
      const initialBody = generateInitialBody(bodyParams.children);
      const cleanedBody = cleanupDynamicBody(initialBody, bodyParams.children, DYNAMIC_MAPS);
      setRequestBody(cleanedBody);
    } else {
      setRequestBody({});
    }
  }, [activeEndpointId, activeContent.parameters]);

  const filteredSidebarData = useMemo(() => {
    if (!searchTerm.trim()) {
      return SIDEBAR_DATA;
    }

    const lowercasedFilter = searchTerm.toLowerCase();

    const filterItems = (items: NavItem[]): NavItem[] => {
      return items.reduce((acc: NavItem[], item) => {
        if (item.label.toLowerCase().includes(lowercasedFilter)) {
          acc.push(item);
          return acc;
        }

        if (item.children) {
          const filteredChildren = filterItems(item.children);
          if (filteredChildren.length > 0) {
            acc.push({ ...item, children: filteredChildren });
          }
        }

        return acc;
      }, []);
    };

    return filterItems(SIDEBAR_DATA);
  }, [searchTerm]);


  return (
    <div className="flex flex-col h-screen w-full">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)}
        onCodeClick={() => setIsCodeSnippetsOpen(true)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          sidebarData={filteredSidebarData}
          activeEndpointId={activeEndpointId} 
          setActiveEndpointId={setActiveEndpointId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex flex-1 overflow-hidden">
          <MainContent 
            key={activeEndpointId} 
            content={activeContent} 
            requestBody={requestBody}
            onBodyChange={setRequestBody}
          />
          <CodeSnippets 
            snippets={activeSnippets}
            requestBody={requestBody}
            isOpen={isCodeSnippetsOpen}
            onClose={() => setIsCodeSnippetsOpen(false)}
          />
        </div>
      </div>
      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;