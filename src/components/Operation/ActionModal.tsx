import { Modal, Segmented } from 'antd';
import { useEffect, useState } from 'react';
import GoToLink from './Actions/GoToLink';
import { ShowMessage } from './Actions/ShowMessage';
import CustomJs from './Actions/CustomJs';
import { ComponentMethod } from './ComponentMethod';
import { ActionConfig } from '@/types';

interface ActionModalProps {
  visible: boolean;
  actionConfig?: ActionConfig;
  handleOk: (config?: ActionConfig) => void;
  handleCancel: () => void;
}

const map = {
  goToLink: '访问链接',
  showMessage: '消息提示',
  componentMethod: '组件方法',
  customJS: '自定义 JS',
};

export function ActionModal(props: ActionModalProps) {
  const { visible, actionConfig, handleOk, handleCancel } = props;

  const [key, setKey] = useState<string>('访问链接');
  const [curConfig, setCurConfig] = useState<ActionConfig>();

  useEffect(() => {
    if (actionConfig?.type) {
      setKey(map[actionConfig.type]);
    }
  }, [actionConfig]);

  return (
    <Modal
      title="事件动作配置"
      width={800}
      open={visible}
      okText="确认"
      cancelText="取消"
      onOk={() => handleOk(curConfig)}
      onCancel={handleCancel}
    >
      <div className="h-[500px]">
        <Segmented
          value={key}
          onChange={setKey}
          block
          options={['访问链接', '消息提示', '组件方法', '自定义 JS']}
        />
        {key === '访问链接' && (
          <GoToLink
            value={actionConfig?.type === 'goToLink' ? actionConfig.url : ''}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === '消息提示' && (
          <ShowMessage
            value={
              actionConfig?.type === 'showMessage'
                ? actionConfig.config
                : undefined
            }
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === '组件方法' && (
          <ComponentMethod
            value={
              actionConfig?.type === 'componentMethod'
                ? actionConfig.config
                : undefined
            }
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
        {key === '自定义 JS' && (
          <CustomJs
            value={actionConfig?.type === 'customJS' ? actionConfig.code : ''}
            onChange={(config) => {
              setCurConfig(config);
            }}
          />
        )}
      </div>
    </Modal>
  );
}
