/**
 * @author: luxudongg@gmail.com
 * description
 */

import { useComponentStore } from '@/store';
import { Tree } from 'antd';

export default function Outline() {
  const { list, setCurrentComponentId } = useComponentStore();

  return (
    <Tree
      fieldNames={{ title: 'desc', key: 'id' }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      treeData={list as any}
      showLine
      defaultExpandAll
      onSelect={([selectedKey]) => {
        setCurrentComponentId(selectedKey as number);
      }}
    />
  );
}
