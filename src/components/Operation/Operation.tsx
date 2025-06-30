/**
 * @author: luxudongg@gmail.com
 * 组件属性操作区
 */

import { useComponentStore } from '@/store';
import { Segmented } from 'antd';
import { useState } from 'react';
import AttrOperation from './AttrOperation';
import StyleOperation from './StyleOperation';
import EventOperation from './EventOperation';

enum ActiveKeyEnum {
  ATTR = '属性',
  STYLE = '样式',
  EVENT = '事件',
}

export default function Operation() {
  const [activeKey, setActiveKey] = useState<ActiveKeyEnum>(ActiveKeyEnum.ATTR);
  const { currentComponentId } = useComponentStore();

  if (!currentComponentId) return null;

  const renderSetter = () => {
    let render = null;

    switch (activeKey) {
      case ActiveKeyEnum.ATTR:
        render = <AttrOperation />;
        break;
      case ActiveKeyEnum.STYLE:
        render = <StyleOperation />;
        break;
      case ActiveKeyEnum.EVENT:
        render = <EventOperation />;
        break;
    }

    return render;
  };

  return (
    <div className="h-full overflow-y-scroll">
      <Segmented
        value={activeKey}
        onChange={setActiveKey}
        block
        options={[ActiveKeyEnum.ATTR, ActiveKeyEnum.STYLE, ActiveKeyEnum.EVENT]}
      />

      <div className="pt-[20px]">{renderSetter()}</div>
    </div>
  );
}
