import { useComponentStore } from '@/store';
import { useComponentConfigStore } from '@/store/component-config';
import { ComponentSetter } from '@/types';
import { Form, Input, InputNumber, Select } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import CssEditor from './CssEditor';
import { debounce } from 'lodash-es';
import styleToObject from 'style-to-object';

export default function StyleOperation() {
  const [css, setCss] = useState<string>(`.comp{\n\n}`);

  const [form] = Form.useForm();

  const { currentComponentId, currentComponent, updateComponentStyles } =
    useComponentStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    form.resetFields();

    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...currentComponent?.styles });

    setCss(toCSSStr(currentComponent?.styles || {}));
  }, [currentComponent]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function toCSSStr(css: Record<string, any>) {
    let str = `.comp {\n`;
    for (const key in css) {
      let value = css[key];
      if (!value) {
        continue;
      }
      if (
        ['width', 'height'].includes(key) &&
        !value.toString().endsWith('px')
      ) {
        value += 'px';
      }

      str += `\t${key}: ${value};\n`;
    }
    str += `}`;
    return str;
  }

  if (!currentComponentId || !currentComponent) return null;

  function renderFormElement(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === 'select') {
      return <Select options={options} />;
    } else if (type === 'input') {
      return <Input />;
    } else if (type === 'inputNumber') {
      return <InputNumber />;
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (currentComponentId) {
      updateComponentStyles(currentComponentId, changeValues);
    }
  }

  const handleEditorChange = debounce((value) => {
    setCss(value);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const css: Record<string, any> = {};

    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, '') // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
        .replace('}', ''); // 去掉 }

      styleToObject(cssStr, (name, value) => {
        css[
          name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))
        ] = value;
      });

      console.log(css);
      updateComponentStyles(currentComponentId, css, true);
    } catch (e) {
      console.error(e);
    }
  }, 500);

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      {componentConfig[currentComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElement(setter)}
        </Form.Item>
      ))}

      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor value={css} onChange={handleEditorChange} />
      </div>
    </Form>
  );
}
