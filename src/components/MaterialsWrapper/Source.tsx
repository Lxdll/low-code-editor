/**
 * @author: luxudongg@gmail.com
 * 代码编辑器
 */

import { useComponentStore } from '@/store';
import MonacoEditor, { OnMount } from '@monaco-editor/react';

export default function Source() {
  const { list } = useComponentStore();

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });
  };

  return (
    <MonacoEditor
      height="calc(100vh - 60px)"
      path="components.json"
      language="json"
      onMount={handleEditorMount}
      value={JSON.stringify(list, null, 2)}
      options={{
        fontSize: 10,
        scrollBeyondLastLine: false,
        lineNumbers: 'off',
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
      }}
    />
  );
}
