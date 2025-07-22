/**
 * @author: luxudongg@gmail.com
 * 组件材料区
 */

import { useComponentConfigStore } from '@/store/component-config';
import { useMemo } from 'react';
import MaterialsItem from './MaterialsItem';

export default function Materials() {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig).filter((i) => i.name !== 'Page');
  }, [componentConfig]);

  return (
    <div className="flex flex-wrap gap-4 px-2">
      {components.map((item, index) => (
        <MaterialsItem key={index} item={item} />
      ))}
    </div>
  );
}
