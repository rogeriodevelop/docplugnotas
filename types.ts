export interface NavItem {
  id: string;
  label: string;
  children?: NavItem[];
}

export interface Parameter {
  name: string;
  type: string;
  required?: boolean;
  description: string;
  children?: Parameter[];
  defaultValue?: any;
  // New fields for dynamic rendering
  options?: { value: string; label: string }[];
  isDynamicTrigger?: boolean;
  dynamicChildrenKey?: string; // e.g., 'ICMS_CST_MAP'
  isManipulableArray?: boolean;
}

export interface ResponseItem {
  code: string;
  description: string;
  schema?: string;
}

export interface Preset {
  label: string;
  body: any;
}

export interface ApiEndpointDetails {
  id: string;
  tag: string;
  title: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  headers?: Parameter[];
  parameters: Parameter[];
  responses: ResponseItem[];
  presets?: Preset[];
}

export interface CodeExample {
  language: string;
  code: (body: any) => string;
}