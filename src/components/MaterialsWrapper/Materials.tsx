/**
 * @author: luxudongg@gmail.com
 * 组件材料区
 */

import ComponentConfigMap from '@/component-config';
import { useMemo } from 'react';
import MaterialsItem from './MaterialsItem';

export default function Materials() {
  const components = useMemo(
    () =>
      Array.from(ComponentConfigMap.values()).filter((i) => i.name !== 'Page'),
    [ComponentConfigMap]
  );

  return (
    <div className="flex flex-wrap gap-4 px-2">
      {components.map((item, index) => (
        <MaterialsItem key={index} item={item} />
      ))}
    </div>
  );
}
