/**
 * @author: luxudongg@gmail.com
 * MaterialsItem
 */

import { ComponentConfig } from '@/types';
import { useDrag } from 'react-dnd';

interface MaterialsItemProps {
  item: ComponentConfig;
}

export default function MaterialsItem({ item }: MaterialsItemProps) {
  const { name, desc } = item;

  const [, dragSource] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'add',
    },
  });

  return (
    <div
      ref={dragSource}
      className="m-[10px] inline-block cursor-move border-[1px] border-dashed border-[#000] bg-white px-[10px] py-[8px] hover:bg-[#ccc]"
    >
      {desc}
    </div>
  );
}
