import { getComponentById, useComponentStore } from '@/store';
import ComponentConfigMap from '@/component-config';
import { DropItemType } from '@/types';
import { useDrop } from 'react-dnd';

export function useMaterialsDrop(accept: string[], id: number) {
  const { addComponent, list, deleteComponent } = useComponentStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item: DropItemType, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;

      const {
        defaultProps: originDefaultProps,
        desc = '',
        getDefaultProps,
      } = ComponentConfigMap.get(item.type) || {};
      const { id: itemId, dragType } = item;

      // 移动
      if (dragType === 'move') {
        const component = getComponentById(itemId, list);

        if (component) {
          deleteComponent(itemId);
          addComponent(component, id);
        }
      }

      // 新增
      if (dragType === 'add') {
        const defaultProps = {
          ...(originDefaultProps || {}),
          ...(getDefaultProps?.() || {}),
        };

        addComponent(
          {
            id: new Date().getTime(),
            name: item.type,
            props: defaultProps,
            desc,
          },
          id
        );
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, drop };
}
