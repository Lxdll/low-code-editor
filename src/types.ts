import { PropsWithChildren } from 'react';

export interface CommonComponentProps extends PropsWithChildren {
  id: number;
  name: string;
  [key: string]: unknown;
}

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: unknown;
}
