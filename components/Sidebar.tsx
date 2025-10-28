import React, { useState, useEffect } from 'react';
import type { NavItem } from '../types';
import { SIDEBAR_DATA } from '../constants';
import { SearchIcon, ChevronDownIcon, FileTextIcon, ServerIcon, BuildingIcon, LockIcon, WebhookIcon } from './icons/Icons';

interface SidebarProps {
  sidebarData: NavItem[];
  activeEndpointId: string;
  setActiveEndpointId: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const sectionIcons: { [key: string]: React.ReactNode } = {
  nfe: <FileTextIcon className="w-4 h-4 mr-3 text-dark-text-secondary" />,
  nfce: <FileTextIcon className="w-4 h-4 mr-3 text-dark-text-secondary" />,
  mdfe: <ServerIcon className="w-4 h-4 mr-3 text-dark-text-secondary" />,
  empresas: <BuildingIcon className="w-4 h-4 mr-3 text-dark-text-secondary" />,
  certificados: <LockIcon className="w-4 h-4 mr-3 text-dark-text-secondary" />,
  nfse: <FileTextIcon className="w-4 h-4 mr-3 text-dark-text-secondary" />,
  webhooks: <WebhookIcon className="w-4 h-4 mr-3 text-dark-text-secondary" />,
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarData, activeEndpointId, setActiveEndpointId, searchTerm, setSearchTerm }) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['nfe']));

  useEffect(() => {
    const findParent = (items: NavItem[], childId: string): string | null => {
      for (const item of items) {
        if (item.children?.some(child => child.id === childId)) {
          return item.id;
        }
      }
      return null;
    };

    const parentId = findParent(SIDEBAR_DATA, activeEndpointId);
    if (parentId && !openSections.has(parentId)) {
      setOpenSections(prev => {
        const next = new Set(prev);
        next.add(parentId);
        return next;
      });
    }
  }, [activeEndpointId]);

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = item.id === activeEndpointId;
    const isSectionOpen = openSections.has(item.id) || searchTerm.length > 0;

    if (item.children) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleSection(item.id)}
            className="w-full text-left flex justify-between items-center py-2 px-2 text-sm font-semibold text-dark-text-secondary hover:text-dark-text"
          >
            <span className="flex items-center">
              {sectionIcons[item.id]}
              {item.label}
            </span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isSectionOpen ? 'rotate-0' : '-rotate-90'}`} />
          </button>
          {isSectionOpen && (
            <div className="pl-4 border-l border-dark-border ml-2">
              {item.children.map(renderNavItem)}
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={item.id}
        href="#"
        onClick={(e) => { e.preventDefault(); setActiveEndpointId(item.id); }}
        className={`block py-1.5 px-2 text-sm transition-colors rounded-r-md ${
          isActive 
            ? 'text-dark-accent border-l-2 border-dark-accent bg-dark-accent/10' 
            : 'text-dark-text-secondary hover:text-dark-text hover:bg-dark-surface border-l-2 border-transparent'
        }`}
      >
        {item.label}
      </a>
    );
  };

  return (
    <aside className="w-72 min-w-[288px] bg-dark-surface border-r border-dark-border p-4 flex flex-col">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-dark-bg border border-dark-border rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-dark-accent"
        />
        <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text-secondary" />
      </div>
      <nav className="flex-1 overflow-y-auto">
        {sidebarData.map(renderNavItem)}
      </nav>
    </aside>
  );
};

export default Sidebar;
