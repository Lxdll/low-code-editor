import { ComponentConfig } from '@/types';
import ButtonDev from '@/materials/Button/dev';
import ButtonProd from '@/materials/Button/prod';
import { CopyOutlined } from '@ant-design/icons';

const ButtonConfig: ComponentConfig = {
  name: 'Button',
  icon: <CopyOutlined className="text-[rgb(92,95,102)]" />,
  defaultProps: {
    type: 'primary',
    text: '按钮',
  },
  hoverTips: '用来展示一个按钮，你可以配置不同的展示样式，配置不同的点击行为',
  dev: ButtonDev,
  prod: ButtonProd,
  desc: '按钮',
  setter: [
    {
      name: 'type',
      label: '按钮类型',
      type: 'single-select',
      options: [
        { label: '主按钮', value: 'primary' },
        { label: '默认按钮', value: 'default' },
      ],
    },
    {
      name: 'text',
      label: '文本',
      type: 'input',
    },
  ],
  stylesSetter: [
    {
      name: 'width',
      label: '宽度',
      type: 'input-number',
    },
    {
      name: 'height',
      label: '高度',
      type: 'input-number',
    },
  ],
  events: [
    {
      name: 'onClick',
      label: '点击事件',
    },
    {
      name: 'onDoubleClick',
      label: '双击事件',
    },
  ],
};

export default ButtonConfig;
