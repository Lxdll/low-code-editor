import { Component, useComponentStore } from '@/store';
import ComponentConfigMap from '@/component-config';
import React, { useRef } from 'react';
import { message } from 'antd';
import { ActionConfig } from '@/types';

export function Preview() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentRefs = useRef<Record<string, any>>({});

  const { list } = useComponentStore();

  function handleEvent(component: Component) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: Record<string, any> = {};

    const componentConfig = ComponentConfigMap.get(component.name);
    componentConfig?.events?.forEach((event) => {
      const eventConfig = component.props[event.name];

      if (eventConfig) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        props[event.name] = (...args: any[]) => {
          eventConfig?.actions?.forEach((action: ActionConfig) => {
            if (action.type === 'goToLink') {
              window.location.href = action.url;
            } else if (action.type === 'showMessage') {
              if (action.config.type === 'success') {
                message.success(action.config.text);
              } else if (action.config.type === 'error') {
                message.error(action.config.text);
              }
            } else if (action.type === 'customJS') {
              const func = new Function('context', 'args', action.code);
              func(
                {
                  name: component.name,
                  props: component.props,
                  showMessage(content: string) {
                    message.success(content);
                  },
                },
                args
              );
            } else if (action.type === 'componentMethod') {
              const component =
                componentRefs.current[action.config.componentId];

              if (component) {
                component[action.config.method]?.(...args);
              }
            }
          });
        };
      }
    });
    return props;
  }

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = ComponentConfigMap.get(component.name);

      if (!config?.prod) {
        return null;
      }

      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ref: ['Modal', 'Form', 'FormItem'].includes(component.name)
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (ref: Record<string, any>) => {
                componentRefs.current[component.id] = ref;
              }
            : null,
          ...config.defaultProps,
          ...(component?.props || {}),
          ...handleEvent(component),
        },
        renderComponents(component.children || [])
      );
    });
  }

  return <div>{renderComponents(list)}</div>;
}
