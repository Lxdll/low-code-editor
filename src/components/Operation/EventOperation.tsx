import { useComponentStore } from '@/store';
import { useComponentConfigStore } from '@/store/component-config';
import { Collapse, Select, CollapseProps } from 'antd';
import GoToLink from './Actions/GoToLink';
import { ShowMessage } from './Actions/ShowMessage';

export default function ComponentEvent() {
  const { currentComponentId, currentComponent, updateComponentProps } =
    useComponentStore();
  const { componentConfig } = useComponentConfigStore();

  if (!currentComponent) return null;

  function selectAction(eventName: string, value: string) {
    if (!currentComponentId) return;

    updateComponentProps(currentComponentId, { [eventName]: { type: value } });
  }

  const items: CollapseProps['items'] = (
    componentConfig[currentComponent.name].events || []
  ).map((event) => {
    return {
      key: event.name,
      label: event.label,
      children: (
        <div>
          <div className="flex items-center">
            <div>动作：</div>
            <Select
              className="w-[160px]"
              options={[
                { label: '显示提示', value: 'showMessage' },
                { label: '跳转链接', value: 'goToLink' },
              ]}
              value={currentComponent.props?.[event.name]?.type}
              onChange={(value) => {
                selectAction(event.name, value);
              }}
            />
          </div>

          {currentComponent?.props?.[event.name]?.type === 'goToLink' && (
            <GoToLink event={event} />
          )}

          {currentComponent?.props?.[event.name]?.type === 'showMessage' && (
            <ShowMessage event={event} />
          )}
        </div>
      ),
    };
  });

  return (
    <div className="px-[10px]">
      <Collapse className="mb-[10px]" items={items} />
    </div>
  );
}
