/**
 * @author: luxudongg@gmail.com
 * 低代码编辑器 Header
 */

import { useComponentStore } from '@/store';
import { Button, Space } from 'antd';

export default function Header() {
  const { mode, setMode, setCurrentComponentId } = useComponentStore();
  return (
    <div className="flex h-16 items-center justify-between border-b-[1px] border-[#ccc] bg-blue-50 px-8">
      低代码编辑器
      <Space>
        {mode === 'edit' && (
          <Button
            onClick={() => {
              setMode('preview');
              setCurrentComponentId(undefined);
            }}
            type="primary"
          >
            预览
          </Button>
        )}
        {mode === 'preview' && (
          <Button
            onClick={() => {
              setMode('edit');
            }}
            type="primary"
          >
            退出预览
          </Button>
        )}
      </Space>
    </div>
  );
}
