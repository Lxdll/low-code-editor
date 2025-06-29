/**
 * @author: luxudongg@gmail.com
 * description
 */
import React from 'react';
import { Component, useComponentStore } from '@/store';
import { useComponentConfigStore } from '@/store/component-config';

export default function Canvas() {
  const { list } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();

  function renderComponents(list: Component[]): React.ReactNode {
    return list.map((item) => {
      const config = componentConfig?.[item.name];
      if (!config?.component) return;

      const { component, defaultProps } = config;

      return React.createElement(
        component,
        {
          key: item.id,
          id: item.id,
          name: item.name,
          ...defaultProps,
          ...component.props,
        },
        renderComponents(item.children || [])
      );
    });
  }

  return <div className="h-[100%]">{renderComponents(list)}</div>;
}
