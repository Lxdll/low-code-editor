import { Form as AntdForm, DatePicker, Input } from 'antd';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
} from 'react';
import dayjs from 'dayjs';
import { CommonComponentProps } from '@/types';

export interface FormRef {
  submit: () => void;
}

const Form: ForwardRefRenderFunction<FormRef, CommonComponentProps> = (
  { children, onFinish },
  ref
) => {
  const [form] = AntdForm.useForm();

  useImperativeHandle(ref, () => {
    return {
      submit: () => {
        form.submit();
      },
    };
  }, [form]);

  const formItems = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.Children.map(children, (item: any) => {
      console.log(
        '%c [ children ]',
        'font-size:13px; background:pink; color:#bf2c9f;',
        children
      );
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id,
        rules: item.props?.rules,
      };
    });
  }, [children]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function save(values: any) {
    Object.keys(values).forEach((key) => {
      if (dayjs.isDayjs(values[key])) {
        values[key] = values[key].format('YYYY-MM-DD');
      }
    });

    onFinish(values);
  }

  return (
    <AntdForm
      name="form"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 18 }}
      form={form}
      onFinish={save}
    >
      {formItems.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any, index: number) => {
          return (
            <AntdForm.Item
              key={index}
              name={item.name}
              label={item.label}
              rules={
                item.rules === 'required'
                  ? [
                      {
                        required: true,
                        message: '不能为空',
                      },
                    ]
                  : []
              }
            >
              {item.type === 'input' && <Input />}
              {item.type === 'date' && <DatePicker />}
            </AntdForm.Item>
          );
        }
      )}
    </AntdForm>
  );
};

export default forwardRef(Form);
