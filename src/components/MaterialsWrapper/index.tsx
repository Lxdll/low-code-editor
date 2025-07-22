/**
 * @author: luxudongg@gmail.com
 * 侧边栏
 */

import { Tabs, TabsProps } from 'antd';
import Material from './Materials';
import Outline from './Outline';
import { SideTabEnum } from '@/enum';
import Source from './Source';

export function MaterialWrapper() {
  const items: TabsProps['items'] = [
    {
      key: SideTabEnum.MATERIALS,
      label: SideTabEnum.MATERIALS,
      style: { padding: '1rem 0.5rem' },

      children: <Material />,
    },
    {
      key: SideTabEnum.OUTLINE,
      label: SideTabEnum.OUTLINE,
      style: { padding: '1rem 0.5rem' },

      children: <Outline />,
    },
    {
      key: SideTabEnum.SOURCE,
      label: SideTabEnum.SOURCE,
      style: {
        padding: '1rem 0.5rem',
      },
      children: <Source />,
    },
  ];

  return (
    <Tabs
      tabPosition="left"
      tabBarStyle={{ paddingTop: 20 }}
      items={items}
      className="h-full overflow-hidden"
    />
  );
}
