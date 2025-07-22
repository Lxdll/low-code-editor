/**
 * @author: luxudongg@gmail.com
 * 大纲
 */

import { useComponentStore } from '@/store';
import { Tree } from 'antd';

export default function Outline() {
  const { list, setCurrentComponentId } = useComponentStore();

  return (
    <Tree
      className="h-full w-full"
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
