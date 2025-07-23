/**
 * 容器 config
 */

import { ComponentConfig } from '@/types';
import ContainerDev from '@/materials/Container/dev';
import ContainerProd from '@/materials/Container/prod';
import { BorderOutlined } from '@ant-design/icons';

const ContainerConfig: ComponentConfig = {
  name: 'Container',
  defaultProps: {},
  dev: ContainerDev,
  prod: ContainerProd,
  desc: '容器',
  hoverTips: '一个简单的容器，可以将多个渲染器放置在一起',
  icon: <BorderOutlined className="text-[#5c5f66]" />,
};

export default ContainerConfig;
