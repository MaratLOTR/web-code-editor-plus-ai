import React, { useContext } from 'react';
import styles from './styles.module.css';
import { AppContext } from '../../context/AppContext';

const OutputDisplay: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <div className={styles.outputContainer}>
      <div className={styles.header}>
        <h3>Результат выполнения:</h3>
        <button 
          onClick={() => window.location.reload()}
          className={styles.resetButton}
        >
          Сбросить
        </button>
      </div>
      <pre className={styles.output}>
        {state.errors.length > 0 ? (
          <div className={styles.error}>
            {state.errors.join('\n')}
          </div>
        ) : (
          state.output.join('\n')
        )}
      </pre>
    </div>
  );
};

export default OutputDisplay;