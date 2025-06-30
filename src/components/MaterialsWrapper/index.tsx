/**
 * @author: luxudongg@gmail.com
 * 侧边栏
 */

import { Segmented } from 'antd';
import { useState } from 'react';
import Material from './Materials';
import Outline from './Outline';
import { SideTabEnum } from '@/enum';
import Source from './Source';

export function MaterialWrapper() {
  const [sideTabKey, setSideTabKey] = useState<SideTabEnum>(
    SideTabEnum.MATERIALS
  );

  return (
    <div className="h-full">
      <Segmented
        value={sideTabKey}
        onChange={setSideTabKey}
        block
        options={[
          SideTabEnum.MATERIALS,
          SideTabEnum.OUTLINE,
          SideTabEnum.SOURCE,
        ]}
      />
      <div className="h-full pt-[20px]">
        {sideTabKey === SideTabEnum.MATERIALS && <Material />}
        {sideTabKey === SideTabEnum.OUTLINE && <Outline />}
        {sideTabKey === SideTabEnum.SOURCE && <Source />}
      </div>
    </div>
  );
}
