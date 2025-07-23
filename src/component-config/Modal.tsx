/**
 * Modal config
 */

import { ComponentConfig } from '@/types';
import ModalDev from '@/materials/Modal/dev';
import ModalProd from '@/materials/Modal/prod';
import { FileOutlined } from '@ant-design/icons';

const ModalConfig: ComponentConfig = {
  name: 'Modal',
  icon: <FileOutlined className="text-[#5c5f66]" />,
  defaultProps: {
    title: '弹窗',
  },
  hoverTips: '用来展示一个弹窗，你可以配置标题和内容。',
  setter: [
    {
      name: 'title',
      label: '标题',
      type: 'input',
    },
  ],
  stylesSetter: [],
  events: [
    {
      name: 'onOk',
      label: '确认事件',
    },
    {
      name: 'onCancel',
      label: '取消事件',
    },
  ],
  methods: [
    {
      name: 'open',
      label: '打开弹窗',
    },
    {
      name: 'close',
      label: '关闭弹窗',
    },
  ],
  desc: '弹窗',
  dev: ModalDev,
  prod: ModalProd,
};

export default ModalConfig;
