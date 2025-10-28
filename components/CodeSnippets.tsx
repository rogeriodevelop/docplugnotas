import React, { useState, useEffect } from 'react';
import type { CodeExample } from '../types';
import { CopyIcon, CheckIcon, ChevronDownIcon } from './icons/Icons';

interface CodeSnippetsProps {
  snippets: CodeExample[];
  requestBody: any;
  isOpen: boolean;
  onClose: () => void;
}

const CodeSnippets: React.FC<CodeSnippetsProps> = ({ snippets, requestBody, isOpen, onClose }) => {
  const [activeLang, setActiveLang] = useState(snippets[0]?.language || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Reset to the first available language when snippets change
    if (snippets && snippets.length > 0 && !snippets.find(s => s.language === activeLang)) {
      setActiveLang(snippets[0].language);
    } else if (!activeLang && snippets && snippets.length > 0) {
      setActiveLang(snippets[0].language);
    }
  }, [snippets, activeLang]);

  const activeSnippet = snippets.find(s => s.language === activeLang);
  
  const codeToShow = activeSnippet ? activeSnippet.code(requestBody) : '';

  const handleCopy = () => {
    if (codeToShow) {
      navigator.clipboard.writeText(codeToShow);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!snippets || snippets.length === 0) {
    return (
       <aside className="w-96 min-w-[384px] bg-dark-code-bg hidden lg:flex flex-col items-center justify-center text-dark-text-secondary p-4">
          <p>Nenhum exemplo de código disponível.</p>
       </aside>
    );
  }

  return (
    <aside className={`w-96 min-w-[384px] bg-dark-code-bg flex flex-col overflow-hidden transition-transform transform fixed inset-y-0 right-0 z-20 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-10" onClick={onClose}></div>}
      <div className="flex items-center justify-between p-3 border-b border-dark-border">
        <div className="relative">
           <select
            value={activeLang}
            onChange={(e) => setActiveLang(e.target.value)}
            className="bg-dark-surface border border-dark-border rounded-md text-sm font-semibold py-1 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-dark-accent"
          >
            {snippets.map(snippet => (
              <option key={snippet.language} value={snippet.language}>
                {snippet.language}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-dark-text-secondary" />
        </div>
        <button
          onClick={handleCopy}
          className="text-dark-text-secondary hover:text-white transition-colors flex items-center text-sm px-2 py-1 rounded-md hover:bg-dark-surface"
        >
          {copied ? <CheckIcon className="w-4 h-4 mr-2 text-green-400" /> : <CopyIcon className="w-4 h-4 mr-2" />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto text-sm leading-6">
        <pre>
          <code>
            {codeToShow}
          </code>
        </pre>
      </div>
    </aside>
  );
};

export default CodeSnippets;