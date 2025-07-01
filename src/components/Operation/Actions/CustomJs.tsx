import { useEffect, useState } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { useComponentStore } from '@/store';
import { CustomJSConfig } from '@/types';

export interface CustomJSProps {
  defaultValue?: string;
  value?: string;
  onChange?: (config: CustomJSConfig) => void;
}

export default function CustomJs(props: CustomJSProps) {
  const { value: val, defaultValue, onChange } = props;

  const { currentComponentId } = useComponentStore();
  const [value, setValue] = useState(defaultValue);

  function codeChange(value?: string) {
    if (!currentComponentId) return;

    setValue(value);

    onChange?.({
      type: 'customJS',
      code: value!,
    });
  }

  useEffect(() => {
    setValue(val);
  }, [val]);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });
  };

  return (
    <div className="mt-[40px]">
      <div className="flex items-start gap-[20px]">
        <div>自定义 JS</div>
        <div>
          <MonacoEditor
            width={'600px'}
            height={'400px'}
            path="action.js"
            language="javascript"
            onMount={handleEditorMount}
            onChange={codeChange}
            value={value}
            options={{
              fontSize: 14,
              scrollBeyondLastLine: false,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
