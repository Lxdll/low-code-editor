import { useMaterialsDrop } from '@/hooks/useMaterialsDrop';
import { CommonComponentProps } from '@/types';
import { Form as AntdForm, Input } from 'antd';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDrag } from 'react-dnd';
import dayjs from 'dayjs';

function Form({ id, name, children, onFinish }: CommonComponentProps) {
  const [form] = AntdForm.useForm();

  const { canDrop, drop } = useMaterialsDrop(['FormItem'], id);

  const divRef = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'move',
      id: id,
    },
  });

  useEffect(() => {
    drop(divRef);
    console.log(
      '%c [ divRef ]',
      'font-size:13px; background:pink; color:#bf2c9f;',
      divRef
    );
    drag(divRef);
  }, []);

  const formItems = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.Children.map(children, (item: any) => {
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id,
      };
    });
  }, [children]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function save(values: any) {
    console.log(
      '%c [ values ]',
      'font-size:13px; background:pink; color:#bf2c9f;',
      values
    );
    Object.keys(values).forEach((key) => {
      if (dayjs.isDayjs(values[key])) {
        values[key] = values[key].format('YYYY-MM-DD');
      }
    });

    onFinish(values);
  }

  return (
    <div
      className={`min-h-[100px] w-[100%] p-[20px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
      ref={divRef}
      data-component-id={id}
    >
      <AntdForm
        labelCol={{ span: 6 }}
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
                data-component-id={item.id}
                name={item.name}
                label={item.label}
              >
                <Input style={{ pointerEvents: 'none' }} />
              </AntdForm.Item>
            );
          }
        )}
      </AntdForm>
    </div>
  );
}

export default Form;
