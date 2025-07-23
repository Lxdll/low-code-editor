import { Mode } from '@/types';
import { CSSProperties } from 'react';
import { create } from 'zustand';

export interface Component {
  id: number;
  name: string;
  children?: Component[];
  parentId?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
  desc: string;
  styles?: CSSProperties;
}

type State = {
  mode: Mode;
  list: Component[];
  currentComponentId: number | undefined;
  currentComponent: Component | null;
};
type Action = {
  setMode: (newMode: Mode) => void;
  addComponent: (component: Component, parentId: number) => void;
  deleteComponent: (id: number) => void;
  updateComponentProps: (id: number, props: unknown) => void;
  setCurrentComponentId: (componentId: number | undefined) => void;
  updateComponentStyles: (
    componentId: number,
    styles: CSSProperties,
    replace?: boolean
  ) => void;
};

const defaultComponentList: State['list'] = [
  {
    id: 1,
    name: 'Page',
    props: {},
    desc: '页面',
    children: [
      {
        id: 2,
        name: 'Container',
        props: {},
        parentId: 1,
        desc: '容器',
        children: [
          {
            id: 3,
            name: 'Button',
            props: {
              type: 'primary',
              text: 'Hello World',
            },
            parentId: 2,
            desc: '按钮',
          },
        ],
      },
    ],
  },
];

export const useComponentStore = create<State & Action>((set) => ({
  mode: 'edit',
  list: defaultComponentList,
  currentComponentId: undefined,
  currentComponent: null,
  setMode: (newMode: Mode) => {
    set(() => ({ mode: newMode }));
  },
  addComponent: (component: Component, parentId: number) =>
    set((state) => {
      if (parentId) {
        const parent = getComponentById(parentId, state.list);

        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(component);
        }

        component.parentId = parentId;

        return { list: [...state.list] };
      }

      return { list: [...state.list, component] };
    }),
  deleteComponent: (id: number) =>
    set((state) => {
      const component = getComponentById(id, state.list);
      const parentId = component?.parentId;

      if (parentId) {
        const parentComponent = getComponentById(parentId, state.list);

        if (
          parentComponent?.children &&
          parentComponent?.children?.length > 0
        ) {
          parentComponent.children = parentComponent.children.filter(
            (item) => item.id !== id
          );
        }
      }

      return { list: [...state.list] };
    }),
  updateComponentProps: (id: number, props: unknown) => {
    set((state) => {
      const newList = state.list;
      const comp = getComponentById(id, newList);

      if (comp) {
        comp.props = {
          ...(comp.props || {}),
          ...(props || {}),
        };
      }

      return { list: [...newList] };
    });
  },
  setCurrentComponentId: (componentId: number | undefined) => {
    set((state) => ({
      currentComponentId: componentId,
      currentComponent: getComponentById(componentId, state.list),
    }));
  },
  updateComponentStyles: (componentId, styles, replace) =>
    set((state) => {
      const component = getComponentById(componentId, state.list);
      if (component) {
        component.styles = replace
          ? { ...styles }
          : { ...component.styles, ...styles };

        return { list: [...state.list] };
      }

      return { list: [...state.list] };
    }),
}));

export const getComponentById = (
  id: number | undefined,
  list: Component[]
): Component | null => {
  if (!id) return null;

  for (const comp of list) {
    if (comp.id === id) return comp;

    if (comp.children && comp.children?.length > 0) {
      const child = getComponentById(id, comp.children);
      if (child) return child;
    }
  }

  return null;
};
