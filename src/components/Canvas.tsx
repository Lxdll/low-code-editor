/**
 * @author: luxudongg@gmail.com
 * description
 */
import React, { MouseEventHandler, useState } from 'react';
import { Component, useComponentStore } from '@/store';
import { useComponentConfigStore } from '@/store/component-config';
import HoverMask from './HoverMask';
import SelectedMask from './SelectedMask';

export default function Canvas() {
  const [hoverComponentId, setHoverComponentId] = useState<number>();

  const { list, currentComponentId, setCurrentComponentId } =
    useComponentStore();
  const { componentConfig } = useComponentConfigStore();

  const handleMouseHover: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i++) {
      const el = path[i] as HTMLElement;

      const componentId = el.dataset?.componentId;
      if (componentId) {
        setHoverComponentId(+componentId);
        return;
      }
    }
  };

  const handleClick: MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i++) {
      const el = path[i] as HTMLElement;

      const componentId = el.dataset?.componentId;
      if (componentId) {
        setCurrentComponentId(+componentId);
        return;
      }
    }
  };

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

  return (
    <div
      onMouseOver={handleMouseHover}
      onClick={handleClick}
      onMouseLeave={() => setHoverComponentId(undefined)}
      className="canvas-area h-[100%]"
    >
      {renderComponents(list)}
      {hoverComponentId && hoverComponentId !== currentComponentId && (
        <HoverMask
          componentId={hoverComponentId}
          containerClassName="canvas-area"
          portalWrapperClassName="portal-wrapper"
        />
      )}
      <div className="portal-wrapper"></div>
      {currentComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="canvas-area"
          componentId={currentComponentId}
        />
      )}
    </div>
  );
}
