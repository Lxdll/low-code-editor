/**
 * @author: luxudongg@gmail.com
 * Page
 */

import { CommonComponentProps } from '@/types';
import { useMaterialsDrop } from '@/hooks/useMaterialsDrop';

export default function Page({ id, styles, children }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialsDrop(['Button', 'Container'], id);

  return (
    <div
      ref={drop}
      data-component-id={id}
      style={{ border: canDrop ? '2px solid blue' : 'none', ...(styles || {}) }}
      className="box-border h-[100%] p-[20px]"
    >
      {children}
    </div>
  );
}
