import { CSSProperties, PropsWithChildren } from 'react';

export interface CommonComponentProps extends PropsWithChildren {
  id: number;
  name: string;
  styles?: CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // component: any;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dev: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prod: any;
}

export type Mode = 'edit' | 'preview';
