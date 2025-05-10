import React, { useContext } from 'react';
import CodePanel from '../CodePanel';
import styles from './styles.module.css';
import { AppContext } from '../../context/AppContext';

const EditorTabs: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${state.activeTab === 'python' ? styles.active : ''}`}
          onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'python' })}
        >
          Python
        </button>
        <button
          className={`${styles.tab} ${state.activeTab === 'javascript' ? styles.active : ''}`}
          onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'javascript' })}
        >
          JavaScript
        </button>
      </div>
      <CodePanel language={state.activeTab} />
    </div>
  );
};

export default EditorTabs;