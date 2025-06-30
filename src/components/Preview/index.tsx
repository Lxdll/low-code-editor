import { Component, useComponentStore } from '@/store';
import { useComponentConfigStore } from '@/store/component-config';
import React from 'react';
import { message } from 'antd';
import { GoToLinkConfig } from '../Operation/Actions/GoToLink';
import { ShowMessageConfig } from '../Operation/Actions/ShowMessage';

export function Preview() {
  const { list } = useComponentStore();
  const { componentConfig } = useComponentConfigStore();

  function handleEvent(component: Component) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: Record<string, any> = {};

    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];

      if (eventConfig) {
        props[event.name] = () => {
          eventConfig?.actions?.forEach(
            (action: GoToLinkConfig | ShowMessageConfig) => {
              if (action.type === 'goToLink') {
                window.location.href = action.url;
              } else if (action.type === 'showMessage') {
                if (action.config.type === 'success') {
                  message.success(action.config.text);
                } else if (action.config.type === 'error') {
                  message.error(action.config.text);
                }
              }
            }
          );
        };
      }
    });
    return props;
  }

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

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
