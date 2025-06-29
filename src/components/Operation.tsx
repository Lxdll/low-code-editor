/**
 * @author: luxudongg@gmail.com
 * 组件属性操作区
 */

import { useComponentStore } from '@/store';

export default function Operation() {
  const { list } = useComponentStore();
  return (
    <div className="h-full overflow-y-scroll">
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
}
