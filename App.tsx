import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import CodeSnippets from './components/CodeSnippets';
import Header from './components/Header';
import { API_CONTENT_DATA, CODE_SNIPPETS_DATA, SIDEBAR_DATA, generateInitialBody } from './constants';
import type { ApiEndpointDetails, CodeExample, NavItem } from './types';

const App: React.FC = () => {
  const [activeEndpointId, setActiveEndpointId] = useState<string>('addNFe');
  const [searchTerm, setSearchTerm] = useState('');
  const [requestBody, setRequestBody] = useState<any>({});

  const activeContent: ApiEndpointDetails = API_CONTENT_DATA[activeEndpointId] || API_CONTENT_DATA['addNFe'];
  const activeSnippets: CodeExample[] = CODE_SNIPPETS_DATA[activeEndpointId] || CODE_SNIPPETS_DATA['addNFe'];

  useEffect(() => {
    const bodyParams = activeContent.parameters.find(p => p.name === 'Body');
    if (bodyParams && bodyParams.children) {
      setRequestBody(generateInitialBody(bodyParams.children));
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
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          sidebarData={filteredSidebarData}
          activeEndpointId={activeEndpointId} 
          setActiveEndpointId={setActiveEndpointId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="flex flex-1 overflow-hidden">
          <MainContent 
            key={activeEndpointId} // Add key to force re-mount and reset state on endpoint change
            content={activeContent} 
            requestBody={requestBody}
            onBodyChange={setRequestBody}
          />
          <CodeSnippets 
            snippets={activeSnippets}
            requestBody={requestBody}
          />
        </div>
      </div>
    </div>
  );
};

export default App;