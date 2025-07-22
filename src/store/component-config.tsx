import { create } from 'zustand';
import ContainerDev from '../materials/Container/dev';
import ContainerProd from '../materials/Container/prod';
import ButtonDev from '../materials/Button/dev';
import ButtonProd from '../materials/Button/prod';
import PageDev from '@/materials/Page/dev';
import PageProd from '@/materials/Page/prod';
import ModalDev from '@/materials/Modal/dev';
import ModalProd from '@/materials/Modal/prod';
import TableDev from '@/materials/Table/dev';
import TableProd from '@/materials/Table/prod';
import TableColumnDev from '@/materials/TableColumn/dev';
import TableColumnProd from '@/materials/TableColumn/prod';
import FormDev from '@/materials/Form/dev';
import FormProd from '@/materials/Form/prod';
import FormItemDev from '@/materials/FormItem/dev';
import FormItemProd from '@/materials/FormItem/prod';
import { ComponentConfig } from '@/types';
import {
  BorderlessTableOutlined,
  BorderOutlined,
  CopyOutlined,
  DatabaseOutlined,
  FileOutlined,
  PicCenterOutlined,
  ProfileOutlined,
  TableOutlined,
} from '@ant-design/icons';

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: 'Container',
      defaultProps: {},
      dev: ContainerDev,
      prod: ContainerProd,
      desc: '容器',
      hoverTips: '一个简单的容器，可以将多个渲染器放置在一起',
      icon: <BorderOutlined />,
    },
    Button: {
      name: 'Button',
      icon: <CopyOutlined />,
      defaultProps: {
        type: 'primary',
        text: '按钮',
      },
      hoverTips:
        '用来展示一个按钮，你可以配置不同的展示样式，配置不同的点击行为',
      dev: ButtonDev,
      prod: ButtonProd,
      desc: '按钮',
      setter: [
        {
          name: 'type',
          label: '按钮类型',
          type: 'select',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '次按钮', value: 'default' },
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
          type: 'inputNumber',
        },
        {
          name: 'height',
          label: '高度',
          type: 'inputNumber',
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
    },
    Page: {
      name: 'Page',
      icon: <DatabaseOutlined />,
      defaultProps: {},
      dev: PageDev,
      prod: PageProd,
      desc: '页面',
    },
    Modal: {
      name: 'Modal',
      icon: <FileOutlined />,
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
    },
    Table: {
      name: 'Table',
      icon: <TableOutlined />,
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
    },
    TableColumn: {
      name: 'TableColumn',
      icon: <BorderlessTableOutlined />,
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
    },
    Form: {
      name: 'Form',
      icon: <ProfileOutlined />,
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
    },
    FormItem: {
      name: 'FormItem',
      icon: <PicCenterOutlined />,
      desc: '表单项',
      getDefaultProps: () => {
        return {
          name: Math.random(),
        };
      },
      defaultProps: {
        // name: Math.random(),
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
    },
  },
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
