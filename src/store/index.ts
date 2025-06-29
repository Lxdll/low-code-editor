import { create } from 'zustand';

export interface Component {
  id: number;
  name: string;
  children?: Component[];
  parentId?: number;
  props: unknown;
  desc: string;
}

type State = {
  list: Component[];
  currentComponentId: number | undefined;
  currentComponent: Component | null;
};
type Action = {
  addComponent: (component: Component, parentId: number) => void;
  deleteComponent: (id: number) => void;
  updateComponentProps: (id: number, props: unknown) => void;
  setCurrentComponentId: (componentId: number | undefined) => void;
};
export const useComponentStore = create<State & Action>((set, get) => ({
  list: [
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
                text: '无敌',
              },
              parentId: 2,
              desc: '按钮',
            },
          ],
        },
      ],
    },
  ],
  currentComponentId: undefined,
  currentComponent: null,
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
      const comp = getComponentById(id, get().list);

      if (comp) {
        comp.props = {
          ...(comp.props || {}),
          ...(props || {}),
        };
      }

      return { list: [...state.list] };
    });
  },
  setCurrentComponentId: (componentId: number | undefined) => {
    set((state) => ({
      currentComponentId: componentId,
      currentComponent: getComponentById(componentId, state.list),
    }));
  },
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
