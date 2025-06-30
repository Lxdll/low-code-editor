import { useComponentStore } from '@/store';
import { useComponentConfigStore } from '@/store/component-config';
import { Collapse, CollapseProps, Button } from 'antd';
import { useState } from 'react';
import { ComponentEvent } from '@/types';
import { ActionModal } from './ActionModal';
import { GoToLinkConfig } from './Actions/GoToLink';
import { ShowMessageConfig } from './Actions/ShowMessage';
import { DeleteOutlined } from '@ant-design/icons';

export default function EventOperation() {
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<ComponentEvent>();

  const { currentComponent, updateComponentProps } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();

  if (!currentComponent) return null;

  function deleteAction(event: ComponentEvent, index: number) {
    if (!currentComponent) {
      return;
    }

    const actions = currentComponent.props[event.name]?.actions;

    actions.splice(index, 1);

    updateComponentProps(currentComponent.id, {
      [event.name]: {
        actions: actions,
      },
    });
  }

  const handleModalOk = (config?: GoToLinkConfig | ShowMessageConfig) => {
    if (!config || !currentEvent || !currentComponent) {
      return;
    }

    updateComponentProps(currentComponent.id, {
      [currentEvent.name]: {
        actions: [
          ...(currentComponent.props[currentEvent.name]?.actions || []),
          config,
        ],
      },
    });

    setActionModalOpen(false);
  };

  const items: CollapseProps['items'] = (
    componentConfig[currentComponent.name].events || []
  ).map((event) => {
    return {
      key: event.name,
      label: (
        <div className="flex justify-between leading-[30px]">
          {event.label}
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();

              setCurrentEvent(event);
              setActionModalOpen(true);
            }}
          >
            添加动作
          </Button>
        </div>
      ),
      children: (
        <div>
          {(currentComponent.props[event.name]?.actions || []).map(
            (item: GoToLinkConfig | ShowMessageConfig, index: number) => {
              return (
                <div key={index}>
                  {item.type === 'goToLink' ? (
                    <div className="relative m-[10px] border border-[#aaa] p-[10px]">
                      <div className="text-[blue]">跳转链接</div>
                      <div>{item.url}</div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          cursor: 'pointer',
                        }}
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  ) : null}
                  {item.type === 'showMessage' ? (
                    <div className="relative m-[10px] border border-[#aaa] p-[10px]">
                      <div className="text-[blue]">消息弹窗</div>
                      <div>{item.config.type}</div>
                      <div>{item.config.text}</div>
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          cursor: 'pointer',
                        }}
                        onClick={() => deleteAction(event, index)}
                      >
                        <DeleteOutlined />
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }
          )}
        </div>
      ),
    };
  });

  return (
    <div className="px-[10px]">
      <Collapse
        className="mb-[10px]"
        items={items}
        defaultActiveKey={componentConfig[currentComponent.name].events?.map(
          (item) => item.name
        )}
      />

      <ActionModal
        visible={actionModalOpen}
        handleOk={handleModalOk}
        handleCancel={() => {
          setActionModalOpen(false);
        }}
      />
    </div>
  );
}
