import { getComponentById, useComponentStore } from '@/store';
import ComponentConfigMap from '@/component-config';
import { Collapse, CollapseProps, Button } from 'antd';
import { useState } from 'react';
import { ActionConfig, ComponentEvent } from '@/types';
import { ActionModal } from './ActionModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function EventOperation() {
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<ComponentEvent>();
  const [currentActionConfig, setCurrentActionConfig] =
    useState<ActionConfig>();
  const [currentActionConfigIndex, setCurrentActionConfigIndex] =
    useState<number>();

  const { currentComponent, updateComponentProps, list } = useComponentStore();
  const componentConfig = ComponentConfigMap.get(currentComponent?.name || '');

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

  const handleModalOk = (config?: ActionConfig) => {
    if (!config || !currentEvent || !currentComponent) {
      return;
    }

    if (currentActionConfig) {
      updateComponentProps(currentComponent.id, {
        [currentEvent.name]: {
          actions: currentComponent.props[currentEvent.name]?.action.map(
            (item: ActionConfig, index: number) => {
              return index === currentActionConfigIndex ? config : item;
            }
          ),
        },
      });
    } else {
      updateComponentProps(currentComponent.id, {
        [currentEvent.name]: {
          actions: [
            ...(currentComponent.props[currentEvent.name]?.actions || []),
            config,
          ],
        },
      });
    }

    setCurrentActionConfig(undefined);

    setActionModalOpen(false);
  };

  function editAction(actionConfig: ActionConfig, index: number) {
    if (!currentComponent) {
      return;
    }

    setCurrentActionConfigIndex(index);
    setCurrentActionConfig(actionConfig);

    setActionModalOpen(true);
  }

  const items: CollapseProps['items'] = (componentConfig?.events || []).map(
    (event) => {
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
              (item: ActionConfig, index: number) => {
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
                            right: 30,
                            cursor: 'pointer',
                          }}
                          onClick={() => editAction(item, index)}
                        >
                          <EditOutlined />
                        </div>

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
                            right: 30,
                            cursor: 'pointer',
                          }}
                          onClick={() => editAction(item, index)}
                        >
                          <EditOutlined />
                        </div>

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
                    {item.type === 'componentMethod' ? (
                      <div
                        key="componentMethod"
                        className="relative m-[10px] border border-[#aaa] p-[10px]"
                      >
                        <div className="text-[blue]">组件方法</div>
                        <div>
                          {
                            getComponentById(item.config.componentId, list)
                              ?.desc
                          }
                        </div>
                        <div>{item.config.componentId}</div>
                        <div>{item.config.method}</div>
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 30,
                            cursor: 'pointer',
                          }}
                          onClick={() => editAction(item, index)}
                        >
                          <EditOutlined />
                        </div>
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

                    {item.type === 'customJS' ? (
                      <div className="relative m-[10px] border border-[#aaa] p-[10px]">
                        <div className="text-[blue]">自定义JS</div>
                        <div
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 30,
                            cursor: 'pointer',
                          }}
                          onClick={() => editAction(item, index)}
                        >
                          <EditOutlined />
                        </div>

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
    }
  );

  return (
    <div className="px-[10px]">
      <Collapse
        className="mb-[10px]"
        items={items}
        defaultActiveKey={componentConfig?.events?.map((item) => item.name)}
      />

      <ActionModal
        visible={actionModalOpen}
        actionConfig={currentActionConfig}
        handleOk={handleModalOk}
        handleCancel={() => {
          setActionModalOpen(false);
        }}
      />
    </div>
  );
}
