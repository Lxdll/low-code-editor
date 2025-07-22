/**
 * @author: luxudongg@gmail.com
 * MaterialsItem
 */

import { ComponentConfig } from '@/types';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Popover, Typography } from 'antd';

interface MaterialsItemProps {
  item: ComponentConfig;
}

export default function MaterialsItem({ item }: MaterialsItemProps) {
  const { name, desc, icon = <></>, hoverTips = '' } = item;

  const [isHover, setIsHover] = useState<boolean>(false);

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
      className="box-border flex flex-shrink-0 flex-grow-0 basis-[calc(50%-0.5rem)] cursor-pointer items-center justify-between overflow-hidden rounded-sm border-[1px] border-[#e8e9eb] bg-white px-2 py-1.5 text-sm text-[#151b26] hover:border-[#3867e9]"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex w-full flex-1 items-center justify-between">
        <div className="flex flex-1 items-center overflow-hidden">
          {icon}
          <Typography.Text className="ml-1" ellipsis>
            {desc}
          </Typography.Text>
        </div>

        {isHover && hoverTips && (
          <Popover
            title={desc}
            placement="right"
            color="#fff"
            content={hoverTips}
          >
            <QuestionCircleOutlined className="hover:text-[#3867e9]" />
          </Popover>
        )}
      </div>
    </div>
  );
}
