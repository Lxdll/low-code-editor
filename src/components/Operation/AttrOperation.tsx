/**
 * @author: luxudongg@gmail.com
 * 属性设置
 */
import { useComponentStore } from '@/store';
import ComponentConfigMap from '@/component-config';
import { ComponentConfig, ComponentSetter } from '@/types';
import { Col, Form, Input, Radio, Row, Select } from 'antd';
import { ReactNode, useEffect, useMemo } from 'react';

const LABEL_COL = 10;
const VALUE_COL = 14;

export default function AttrOperation() {
  const { currentComponentId, currentComponent, updateComponentProps } =
    useComponentStore();
  const componentConfig = ComponentConfigMap.get(currentComponent?.name || '');
  const [form] = Form.useForm();

  const { props: ComponentProps } = currentComponent || {};

  const initialValues = useMemo(
    () => currentComponent?.props,
    [currentComponent]
  );

  useEffect(() => {
    if (currentComponentId) {
      form.setFieldsValue(ComponentProps);
    }
  }, [currentComponentId]);

  if (!currentComponentId || !currentComponent) return null;

  function renderFormElement(setting: ComponentSetter) {
    const { type, options } = setting;
    let ele: ReactNode = null;

    switch (type) {
      case 'input':
        ele = <Input size="small" autoComplete="off" />;
        break;
      case 'select':
        ele = <Select options={options} />;
        break;
      case 'single-select':
        ele = (
          <Radio.Group buttonStyle="solid" size="small">
            {options?.map((o) => (
              <Radio.Button key={o.value} value={o.value}>
                {o.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        );
        break;
      case 'underline-input':
        ele = <Input size="small" variant="underlined" autoComplete="off" />;
        break;
    }

    return ele;
  }

  const valueChange = (changeValues: ComponentConfig) => {
    if (currentComponentId) {
      updateComponentProps(currentComponentId, changeValues);
    }
  };

  const renderLabel = (label: string) => {
    return <span className="text-xs text-[#5c5f66]">{label}</span>;
  };

  const renderStaticNode = (label: string, value: string | number) => {
    return (
      <Row className="pointer-events-none text-[#5c5f66]">
        <Col span={LABEL_COL}>{renderLabel(label)}:</Col>
        <Col span={VALUE_COL} className="flex justify-end text-xs">
          {value}
        </Col>
      </Row>
    );
  };

  return (
    <>
      {/* <button onClick={() => console.log(form.getFieldsValue())}>
        get formvalues
      </button> */}

      <div className="flex flex-col gap-y-4">
        {renderStaticNode('组件ID', currentComponent.id)}
        {renderStaticNode('组件名称', currentComponent.name)}
        {renderStaticNode('组件描述', currentComponent.desc)}
      </div>

      <Form
        key={currentComponentId}
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        initialValues={initialValues}
      >
        {componentConfig?.setter?.map((setter) => {
          const key = `${currentComponentId}-${setter.name}`;

          return (
            <Form.Item
              key={key}
              name={setter.name}
              className="my-3 p-0"
              label={renderLabel(setter.label)}
              labelCol={{ span: LABEL_COL }}
              labelAlign="left"
              style={{ textAlign: 'right' }}
            >
              {renderFormElement(setter)}
            </Form.Item>
          );
        })}
      </Form>
    </>
  );
}
