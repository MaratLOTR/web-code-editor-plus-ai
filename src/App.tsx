import React from 'react';
import { AppProvider } from './context/AppContext';
import EditorTabs from './components/EditorTabs';
import OutputDisplay from './components/OutputDisplay';
import LanguageInfo from './components/LanguageInfo';
import './styles.css';
import CodePanel from './components/CodePanel';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="app-container">
        {/* Секция с информацией о Python */}
        <LanguageInfo language="python" />
        
        {/* Секция с информацией о JavaScript */}
        <LanguageInfo language="javascript" />

        {/* Блоки для выполнения кода */}
        <div className="code-section">
          <EditorTabs />
          <OutputDisplay />
        </div>
      </div>
    </AppProvider>
  );
};

export default App;