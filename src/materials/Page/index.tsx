/**
 * @author: luxudongg@gmail.com
 * Page
 */

import { CommonComponentProps } from '@/types';
import { useMaterialsDrop } from '@/hooks/useMaterialsDrop';

export default function Page({ id, children }: CommonComponentProps) {
  const { canDrop, drop } = useMaterialsDrop(['Button', 'Container'], id);

  return (
    <div
      ref={drop}
      style={{ border: canDrop ? '2px solid blue' : 'none' }}
      className="box-border h-[100%] p-[20px]"
    >
      {children}
    </div>
  );
}
