/**
 * @author: luxudongg@gmail.com
 * 属性设置
 */
import { useComponentStore } from '@/store';
import { useComponentConfigStore } from '@/store/component-config';
import { ComponentConfig, ComponentSetter } from '@/types';
import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';

export default function AttrOperation() {
  const [form] = Form.useForm();

  const { currentComponentId, currentComponent, updateComponentProps } =
    useComponentStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...(currentComponent?.props || {}) });
  }, [currentComponent]);

  if (!currentComponentId || !currentComponent) return null;

  function renderFormElement(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === 'select') {
      return <Select options={options} />;
    } else if (type === 'input') {
      return <Input />;
    }
  }

  function valueChange(changeValues: ComponentConfig) {
    if (currentComponentId) {
      updateComponentProps(currentComponentId, changeValues);
    }
  }

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item label="组件id">
        <Input value={currentComponent.id} disabled />
      </Form.Item>
      <Form.Item label="组件名称">
        <Input value={currentComponent.name} disabled />
      </Form.Item>
      <Form.Item label="组件描述">
        <Input value={currentComponent.desc} disabled />
      </Form.Item>
      {componentConfig[currentComponent.name]?.setter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElement(setter)}
        </Form.Item>
      ))}
    </Form>
  );
}
