/**
 * @author: luxudongg@gmail.com
 * description
 */

import { getComponentById, useComponentStore } from '@/store';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

interface HoverMaskProps {
  componentId: number;
  containerClassName: string;
  portalWrapperClassName: string;
}

export default function HoverMask(props: HoverMaskProps) {
  const { containerClassName, componentId, portalWrapperClassName } = props;

  const { list } = useComponentStore();
  const curComponent = useMemo(() => {
    return getComponentById(componentId, list);
  }, [componentId, list]);

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  useEffect(() => {
    updatePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentId]);

  const updatePosition = () => {
    if (!componentId) return;

    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();

    let labelTop = top - containerTop + container.scrollTop;
    const labelLeft = left - containerLeft + width;

    if (labelTop <= 0) {
      labelTop -= -20;
    }

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      labelTop,
      labelLeft,
    });
  };

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`)!;
  }, [portalWrapperClassName]);

  return createPortal(
    <>
      <div
        style={{
          position: 'absolute',
          left: position.left,
          top: position.top,
          backgroundColor: 'rgba(0, 0, 255, 0.05)',
          border: '1px dashed blue',
          pointerEvents: 'none',
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: 'border-box',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: '14px',
          zIndex: 13,
          display: !position.width || position.width < 10 ? 'none' : 'inline',
          transform: 'translate(-100%, -100%)',
        }}
      >
        <div
          style={{
            padding: '0 8px',
            backgroundColor: 'blue',
            borderRadius: 4,
            color: '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {curComponent?.name}
        </div>
      </div>
    </>,
    el
  );
}
