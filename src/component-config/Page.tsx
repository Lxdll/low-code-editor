/**
 * Page config
 */

import PageDev from '@/materials/Page/dev';
import PageProd from '@/materials/Page/prod';
import { ComponentConfig } from '@/types';
import { DatabaseOutlined } from '@ant-design/icons';

const PageConfig: ComponentConfig = {
  name: 'Page',
  icon: <DatabaseOutlined className="text-[#5c5f66]" />,
  defaultProps: {},
  dev: PageDev,
  prod: PageProd,
  desc: '页面',
};
export default PageConfig;
