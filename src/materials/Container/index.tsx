import { useMaterialsDrop } from '@/hooks/useMaterialsDrop';
import { CommonComponentProps } from '@/types';

const Container = ({ id, styles, children }: CommonComponentProps) => {
  const { canDrop, drop } = useMaterialsDrop(['Button', 'Container'], id);

  return (
    <div
      ref={drop}
      data-component-id={id}
      style={styles}
      className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
    >
      {children}
    </div>
  );
};

export default Container;
