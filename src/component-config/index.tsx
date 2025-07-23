import { ComponentConfig } from '@/types';
import ButtonConfig from './Button';
import ContainerConfig from './Container';
import FormConfig from './Form';
import FormItemConfig from './FormItem';
import ModalConfig from './Modal';
import PageConfig from './Page';
import TableConfig from './Table';
import TableColumnConfig from './TableColumn';

const config = {
  ButtonConfig,
  ContainerConfig,
  FormConfig,
  FormItemConfig,
  ModalConfig,
  PageConfig,
  TableConfig,
  TableColumnConfig,
};

const ComponentConfigMap = new Map<string, ComponentConfig>(
  Object.entries(config).map(([, config]) => [config.name, config])
);
export default ComponentConfigMap;
