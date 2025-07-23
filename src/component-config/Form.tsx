/**
 * Form config
 */

import { ComponentConfig } from '@/types';
import FormDev from '@/materials/Form/dev';
import FormProd from '@/materials/Form/prod';
import { ProfileOutlined } from '@ant-design/icons';

const FormConfig: ComponentConfig = {
  name: 'Form',
  icon: <ProfileOutlined className="text-[#5c5f66]" />,
  defaultProps: {},
  desc: '表单',
  hoverTips: '用来收集用户输入的数据，可以配置表单项。',
  setter: [
    {
      name: 'title',
      label: '标题',
      type: 'input',
    },
  ],
  events: [
    {
      name: 'onFinish',
      label: '提交事件',
    },
  ],
  methods: [
    {
      name: 'submit',
      label: '提交',
    },
  ],
  dev: FormDev,
  prod: FormProd,
};

export default FormConfig;
