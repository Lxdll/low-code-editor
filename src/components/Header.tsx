/**
 * @author: luxudongg@gmail.com
 * 低代码编辑器 Header
 */

import { useComponentStore } from '@/store';
import { GithubOutlined } from '@ant-design/icons';
import { Button, Space, Tag } from 'antd';

export default function Header() {
  const { mode, setMode, setCurrentComponentId } = useComponentStore();
  return (
    <div className="flex h-16 items-center justify-between border-b-[0.5px] border-[#ccc] px-8">
      <div>
        低代码编辑器
        <Tag
          icon={<GithubOutlined />}
          className="ml-1 cursor-pointer border-none"
        >
          <span
            className="hover:text-[#ccc]"
            onClick={() => window.open('https://github.com/Lxdll')}
          >
            @Lxdll
          </span>
        </Tag>
      </div>

      <Space>
        {mode === 'edit' && (
          <Button
            onClick={() => {
              setMode('preview');
              setCurrentComponentId(undefined);
            }}
            type="primary"
            className="text-xs"
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
            className="text-xs"
          >
            退出预览
          </Button>
        )}
      </Space>
    </div>
  );
}
