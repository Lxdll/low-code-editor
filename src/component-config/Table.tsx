/**
 * Table config
 */

import { ComponentConfig } from '@/types';
import TableDev from '@/materials/Table/dev';
import TableProd from '@/materials/Table/prod';
import { TableOutlined } from '@ant-design/icons';

const TableConfig: ComponentConfig = {
  name: 'Table',
  icon: <TableOutlined className="text-[#5c5f66]" />,
  defaultProps: {},
  desc: '表格',
  hoverTips: '用来展示表格数据，可以配置列信息。',
  setter: [
    {
      name: 'url',
      label: 'url',
      type: 'input',
    },
  ],
  dev: TableDev,
  prod: TableProd,
};

export default TableConfig;
