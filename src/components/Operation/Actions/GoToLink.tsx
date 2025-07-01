import { useComponentStore } from '@/store';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';

export interface GoToLinkConfig {
  type: 'goToLink';
  url: string;
}

interface Props {
  value?: string;
  defaultValue?: string;
  onChange?: (config: GoToLinkConfig) => void;
}

export default function GoToLink(props: Props) {
  const { value: val, defaultValue, onChange } = props;

  const [value, setValue] = useState(defaultValue);

  const { currentComponentId } = useComponentStore();

  useEffect(() => {
    setValue(val);
  }, [val]);

  function urlChange(newVal: string) {
    if (!currentComponentId) return;

    setValue(newVal);
    onChange?.({
      type: 'goToLink',
      url: newVal,
    });
  }

  return (
    <div className="mt-[40px]">
      <div className="flex items-center gap-[10px]">
        <div>跳转链接</div>
        <div>
          <TextArea
            style={{ height: 200, width: 500, border: '1px solid #000' }}
            onChange={(e) => {
              urlChange(e.target.value);
            }}
            value={value || ''}
          />
        </div>
      </div>
    </div>
  );
}
