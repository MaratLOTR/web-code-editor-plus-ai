import React, { useContext, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import styles from './styles.module.css';
import { AppContext } from '../../context/AppContext';
import type * as monaco from 'monaco-editor';

interface CodePanelProps {
  language: 'python' | 'javascript';
}

declare global {
  interface Window {
    Sk: {
      configure: (config: {
        output: (text: string) => void;
        read?: (name: string) => string;
        __future__?: any;
      }) => void;
      importMainWithBody: (
        name: string,
        isAsync: boolean,
        body: string,
        canSuspend: boolean
      ) => Promise<void>;
      misceval: {
        asyncToPromise: <T>(fn: () => T) => Promise<T>;
      };
      builtinFiles: {
        files: Record<string, string>;
      };
      python3: boolean;
    };
  }
}

const CodePanel: React.FC<CodePanelProps> = ({ language }) => {
  const { state, dispatch } = useContext(AppContext);
  const code = state.codes[language];

  const handleEditorChange = (value: string | undefined) => {
    dispatch({ type: 'UPDATE_CODE', language, code: value || '' });
  };

  const executePython = useCallback(async (code: string) => {
    if (!window.Sk) {
      throw new Error('Skulpt not loaded. Check CDN scripts in index.html');
    }

    const { Sk } = window;
    const outputBuffer: string[] = [];

    // Конфигурация Skulpt согласно документации
    Sk.configure({
      output: (text: string) => outputBuffer.push(text),
      read: (name: string) => {
        if (Sk.builtinFiles?.files[name]) {
          return Sk.builtinFiles.files[name];
        }
        throw Error(`File not found: '${name}'`);
      },
      __future__: Sk.python3
    });

    dispatch({ type: 'SET_OUTPUT', payload: [] });
    dispatch({ type: 'SET_ERRORS', payload: [] });

    try {
      await Sk.misceval.asyncToPromise(() =>
        Sk.importMainWithBody("<stdin>", false, code, true)
      );
      dispatch({ type: 'SET_OUTPUT', payload: outputBuffer });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      dispatch({ type: 'SET_ERRORS', payload: [message] });
    }
  }, [dispatch]);

  const executeJavaScript = useCallback((code: string) => {
    const output: string[] = [];
    const originalConsoleLog = console.log;
    
    try {
      console.log = (...args) => output.push(args.join(' '));
      new Function(code)();
      dispatch({ type: 'SET_OUTPUT', payload: output });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      dispatch({ type: 'SET_ERRORS', payload: [message] });
    } finally {
      console.log = originalConsoleLog;
    }
  }, [dispatch]);

  const handleRun = useCallback(async () => {
    try {
      if (language === 'javascript') {
        executeJavaScript(code);
      } else {
        await executePython(code);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      dispatch({ type: 'SET_ERRORS', payload: [message] });
    }
  }, [code, dispatch, executeJavaScript, executePython, language]);

  const handleEditorMount = useCallback((
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) => {
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter,
      () => handleRun()
    );
  }, [handleRun]);

  return (
    <div className={styles.panel}>
      <Editor
        height="400px"
        defaultLanguage={language}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        onMount={handleEditorMount}
      />
      <button onClick={handleRun} className={styles.runButton}>
        Выполнить (Ctrl+Enter)
      </button>
    </div>
  );
};

export default CodePanel;