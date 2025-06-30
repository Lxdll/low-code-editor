import { useComponentStore } from '@/store';
import { ComponentEvent } from '@/types';
import { Input } from 'antd';

export default function GoToLink(props: { event: ComponentEvent }) {
  const { event } = props;

  const { currentComponentId, currentComponent, updateComponentProps } =
    useComponentStore();

  function urlChange(eventName: string, value: string) {
    if (!currentComponentId) return;

    updateComponentProps(currentComponentId, {
      [eventName]: {
        ...currentComponent?.props?.[eventName],
        url: value,
      },
    });
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center gap-[10px]">
        <div>链接</div>
        <div>
          <Input
            onChange={(e) => {
              urlChange(event.name, e.target.value);
            }}
            value={currentComponent?.props?.[event.name]?.url}
          />
        </div>
      </div>
    </div>
  );
}
