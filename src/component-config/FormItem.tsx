/**
 * FormItem config
 */

import FormItemDev from '@/materials/FormItem/dev';
import FormItemProd from '@/materials/FormItem/prod';
import { ComponentConfig } from '@/types';
import { PicCenterOutlined } from '@ant-design/icons';

const FormItemConfig: ComponentConfig = {
  name: 'FormItem',
  icon: <PicCenterOutlined className="text-[#5c5f66]" />,
  desc: '表单项',
  getDefaultProps: () => {
    return {
      name: Math.random(),
    };
  },
  defaultProps: {
    label: '姓名',
  },
  dev: FormItemDev,
  prod: FormItemProd,
  setter: [
    {
      name: 'type',
      label: '类型',
      type: 'select',
      options: [
        {
          label: '文本',
          value: 'input',
        },
        {
          label: '日期',
          value: 'date',
        },
      ],
    },
    {
      name: 'label',
      label: '标题',
      type: 'input',
    },
    {
      name: 'name',
      label: '字段',
      type: 'input',
    },
    {
      name: 'rules',
      label: '校验',
      type: 'select',
      options: [
        {
          label: '必填',
          value: 'required',
        },
      ],
    },
  ],
};

export default FormItemConfig;
