/**
 * TableColumn config
 */

import { ComponentConfig } from '@/types';
import TableColumnDev from '@/materials/TableColumn/dev';
import TableColumnProd from '@/materials/TableColumn/prod';
import { BorderlessTableOutlined } from '@ant-design/icons';

const TableColumnConfig: ComponentConfig = {
  name: 'TableColumn',
  icon: <BorderlessTableOutlined className="text-[#5c5f66]" />,
  desc: '表格列',
  defaultProps: {
    dataIndex: `col_${new Date().getTime()}`,
    title: '列名',
  },
  setter: [
    {
      name: 'type',
      label: '类型',
      type: 'select',
      options: [
        {
          label: '文本',
          value: 'text',
        },
        {
          label: '日期',
          value: 'date',
        },
      ],
    },
    {
      name: 'title',
      label: '标题',
      type: 'input',
    },
    {
      name: 'dataIndex',
      label: '字段',
      type: 'input',
    },
  ],
  dev: TableColumnDev,
  prod: TableColumnProd,
};

export default TableColumnConfig;
