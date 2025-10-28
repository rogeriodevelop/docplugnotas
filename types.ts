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
}

export interface ResponseItem {
  code: string;
  description: string;
  schema?: string;
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
}

export interface CodeExample {
  language: string;
  code: (body: any) => string;
}