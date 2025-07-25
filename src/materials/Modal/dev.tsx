import { useMaterialsDrop } from '@/hooks/useMaterialsDrop';
import { CommonComponentProps } from '@/types';

function Modal({ id, children, title, styles }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialsDrop(
    ['Button', 'Container', 'Table', 'Form'],
    id
  );

  return (
    <div
      ref={drop}
      style={styles}
      data-component-id={id}
      className={`min-h-[100px] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
    >
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
