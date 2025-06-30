import { Input, Select } from 'antd';
import { useComponentStore } from '@/store';
import { useState } from 'react';

export interface ShowMessageConfig {
  type: 'showMessage';
  config: {
    type: 'success' | 'error';
    text: string;
  };
}

interface ShowMessageProps {
  value?: ShowMessageConfig['config'];
  onChange?: (config: ShowMessageConfig) => void;
}

export function ShowMessage(props: ShowMessageProps) {
  const { value, onChange } = props;

  const [type, setType] = useState<'success' | 'error'>(
    value?.type || 'success'
  );
  const [text, setText] = useState<string>(value?.text || '');

  const { currentComponentId } = useComponentStore();

  function messageTypeChange(newType: 'success' | 'error') {
    if (!currentComponentId) return;

    setType(newType);
    onChange?.({
      type: 'showMessage',
      config: {
        type: newType,
        text,
      },
    });
  }

  function messageTextChange(newVal: string) {
    if (!currentComponentId) return;

    setText(newVal);

    onChange?.({
      type: 'showMessage',
      config: {
        type,
        text: newVal,
      },
    });
  }

  return (
    <div className="mt-[30px]">
      <div className="flex items-center gap-[20px]">
        <div>类型：</div>
        <div>
          <Select
            style={{ width: 500, height: 50 }}
            options={[
              { label: '成功', value: 'success' },
              { label: '失败', value: 'error' },
            ]}
            onChange={(value) => {
              messageTypeChange(value);
            }}
            value={type}
          />
        </div>
      </div>
      <div className="mt-[50px] flex items-center gap-[20px]">
        <div>文本：</div>
        <div>
          <Input
            style={{ width: 500, height: 50 }}
            onChange={(e) => {
              messageTextChange(e.target.value);
            }}
            value={text}
          />
        </div>
      </div>
    </div>
  );
}
