/**
 * @author: luxudongg@gmail.com
 * 组件属性操作区
 */

import { useComponentStore } from '@/store';
import { Tabs, TabsProps } from 'antd';
import AttrOperation from './AttrOperation';
import StyleOperation from './StyleOperation';
import EventOperation from './EventOperation';

enum ActiveKeyEnum {
  ATTR = '属性',
  STYLE = '样式',
  EVENT = '事件',
}

export default function Operation() {
  const { currentComponentId } = useComponentStore();

  if (!currentComponentId) return null;

  const items: TabsProps['items'] = [
    {
      key: ActiveKeyEnum.ATTR,
      label: ActiveKeyEnum.ATTR,
      style: { padding: '0rem 1.5rem' },
      children: <AttrOperation />,
    },
    {
      key: ActiveKeyEnum.STYLE,
      label: ActiveKeyEnum.STYLE,
      style: { padding: '0rem 1.5rem' },
      children: <StyleOperation />,
    },
    {
      key: ActiveKeyEnum.EVENT,
      label: ActiveKeyEnum.EVENT,
      style: { padding: '0rem 1.5rem' },
      children: <EventOperation />,
    },
  ];

  return (
    <div className="h-full overflow-y-scroll">
      <Tabs items={items} />
    </div>
  );
}
