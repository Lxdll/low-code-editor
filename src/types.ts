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
  events?: ComponentEvent[];
  methods?: ComponentMethod[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dev: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prod: any;
}

export type Mode = 'edit' | 'preview';

export interface ComponentEvent {
  name: string;
  label: string;
}

export interface ComponentMethod {
  name: string;
  label: string;
}

export type ActionConfig =
  | GoToLinkConfig
  | ShowMessageConfig
  | CustomJSConfig
  | ComponentMethodConfig;

export interface GoToLinkConfig {
  type: 'goToLink';
  url: string;
}

export interface ShowMessageConfig {
  type: 'showMessage';
  config: {
    type: 'success' | 'error';
    text: string;
  };
}

export interface CustomJSConfig {
  type: 'customJS';
  code: string;
}

export interface ComponentMethodConfig {
  type: 'componentMethod';
  config: {
    componentId: number;
    method: string;
  };
}
