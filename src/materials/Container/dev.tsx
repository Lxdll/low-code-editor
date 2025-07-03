import { useMaterialsDrop } from '@/hooks/useMaterialsDrop';
import { CommonComponentProps } from '@/types';
import { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';

const Container = ({ id, name, styles, children }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterialsDrop(
    ['Button', 'Container', 'Table', 'Form'],
    id
  );

  const divRef = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'move',
      id: id,
    },
  });

  useEffect(() => {
    drop(divRef);
    drag(divRef);
  }, []);

  return (
    <div
      ref={divRef}
      data-component-id={id}
      style={styles}
      className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
    >
      {children}
    </div>
  );
};

export default Container;
