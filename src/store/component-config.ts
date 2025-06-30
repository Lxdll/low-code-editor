import { create } from 'zustand';
import ContainerDev from '../materials/Container/dev';
import ContainerProd from '../materials//Container/prod';
import ButtonDev from '../materials/Button/dev';
import ButtonProd from '../materials/Button/prod';
import PageDev from '@/materials/Page/dev';
import PageProd from '@/materials/Page/prod';
import { ComponentConfig } from '@/types';

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: 'Container',
      defaultProps: {},
      dev: ContainerDev,
      prod: ContainerProd,
      desc: '容器',
    },
    Button: {
      name: 'Button',
      defaultProps: {
        type: 'primary',
        text: '按钮',
      },
      dev: ButtonDev,
      prod: ButtonProd,
      desc: '按钮',
      setter: [
        {
          name: 'type',
          label: '按钮类型',
          type: 'select',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '次按钮', value: 'default' },
          ],
        },
        {
          name: 'text',
          label: '文本',
          type: 'input',
        },
      ],
      stylesSetter: [
        {
          name: 'width',
          label: '宽度',
          type: 'inputNumber',
        },
        {
          name: 'height',
          label: '高度',
          type: 'inputNumber',
        },
      ],
    },
    Page: {
      name: 'Page',
      defaultProps: {},
      dev: PageDev,
      prod: PageProd,
      desc: '页面',
    },
  },
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
