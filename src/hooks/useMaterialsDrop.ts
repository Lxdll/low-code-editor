import { useComponentStore } from '@/store';
import { useComponentConfigStore } from '@/store/component-config';
import { useDrop } from 'react-dnd';

export function useMaterialsDrop(accept: string[], id: number) {
  const { addComponent } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop(() => ({
    accept,
    drop: (item: { type: string }, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;

      const defaultProps = componentConfig[item.type].defaultProps;

      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props: defaultProps,
        },
        id
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, drop };
}
