import { useEffect, useState } from 'react';
import { Select, TreeSelect } from 'antd';
import { Component, getComponentById, useComponentStore } from '@/store';
import { useComponentConfigStore } from '@/store/component-config';
import { ComponentMethodConfig } from '@/types';

export interface ComponentMethodProps {
  value?: ComponentMethodConfig['config'];
  onChange?: (config: ComponentMethodConfig) => void;
}

export function ComponentMethod(props: ComponentMethodProps) {
  const { value, onChange } = props;
  const { list, currentComponentId } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();
  const [selectedComponent, setSelectedComponent] =
    useState<Component | null>();

  const [curId, setCurId] = useState<number>();
  const [curMethod, setCurMethod] = useState<string>();

  useEffect(() => {
    if (value) {
      setCurId(value.componentId);
      setCurMethod(value.method);

      setSelectedComponent(getComponentById(value.componentId, list));
    }
  }, [value]);

  function componentChange(value: number) {
    if (!currentComponentId) return;

    setCurId(value);
    setSelectedComponent(getComponentById(value, list));
  }

  function componentMethodChange(value: string) {
    if (!currentComponentId || !selectedComponent) return;

    setCurMethod(value);

    onChange?.({
      type: 'componentMethod',
      config: {
        componentId: selectedComponent?.id,
        method: value,
      },
    });
  }

  return (
    <div className="mt-[40px]">
      <div className="flex items-center gap-[10px]">
        <div>组件：</div>
        <div>
          <TreeSelect
            style={{ width: 500, height: 50 }}
            treeData={list}
            fieldNames={{
              label: 'name',
              value: 'id',
            }}
            value={curId}
            onChange={(value) => {
              componentChange(value);
            }}
          />
        </div>
      </div>
      {componentConfig[selectedComponent?.name || ''] && (
        <div className="mt-[20px] flex items-center gap-[10px]">
          <div>方法：</div>
          <div>
            <Select
              style={{ width: 500, height: 50 }}
              options={componentConfig[
                selectedComponent?.name || ''
              ].methods?.map((method) => ({
                label: method.label,
                value: method.name,
              }))}
              value={curMethod}
              onChange={(value) => {
                componentMethodChange(value);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
