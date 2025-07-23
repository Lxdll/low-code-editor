import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Dropdown, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getComponentById, useComponentStore } from '@/store';

interface SelectedMaskProps {
  portalWrapperClassName: string;
  containerClassName: string;
  componentId: number;
}

function SelectedMask({
  containerClassName,
  portalWrapperClassName,
  componentId,
}: SelectedMaskProps) {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  const {
    list,
    currentComponentId,
    currentComponent,
    deleteComponent,
    setCurrentComponentId,
  } = useComponentStore();

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  useEffect(() => {
    setTimeout(() => {
      updatePosition();
    }, 200);
  }, [list]);

  // resize
  useEffect(() => {
    function resizeHandler() {
      updatePosition();
    }

    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  function updatePosition() {
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
  }

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`)!;
  }, []);

  const curSelectedComponent = useMemo(() => {
    return getComponentById(componentId, list);
  }, [componentId]);

  function handleDelete() {
    deleteComponent(currentComponentId!);
    setCurrentComponentId(undefined);
  }

  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = currentComponent;

    while (component?.parentId) {
      component = getComponentById(component.parentId, list)!;
      parentComponents.push(component);
    }

    return parentComponents;
  }, [currentComponent]);

  const popupRender = () => {
    return (
      <div className="flex flex-col">
        {parentComponents.map((c) => {
          return (
            <span
              key={c.id}
              className="inline-flex cursor-pointer items-center justify-center bg-[#325cd1] py-1 text-xs text-white hover:text-[#ccc]"
              onClick={() => setCurrentComponentId(c.id)}
            >
              {c.desc}
            </span>
          );
        })}
      </div>
    );
  };

  return createPortal(
    <>
      <div
        style={{
          position: 'absolute',
          left: position.left,
          top: position.top,
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          border: '1px dashed #325cd1',
          pointerEvents: 'none',
          width: position.width,
          height: position.height,
          zIndex: 12,
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
        <Space size={0}>
          <Dropdown
            popupRender={popupRender}
            disabled={parentComponents.length === 0}
          >
            <div
              style={{
                padding: '0 8px',
                backgroundColor: '#325cd1',
                borderRight: '1px solid #ccc',
                color: '#fff',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {curSelectedComponent?.desc}
            </div>
          </Dropdown>

          {currentComponentId !== 1 && (
            <div style={{ padding: '0 8px', backgroundColor: '#325cd1' }}>
              <Popconfirm
                title="确认删除？"
                okText={'确认'}
                cancelText={'取消'}
                onConfirm={handleDelete}
              >
                <DeleteOutlined style={{ color: '#fff' }} />
              </Popconfirm>
            </div>
          )}
        </Space>
      </div>
    </>,
    el
  );
}

export default SelectedMask;
