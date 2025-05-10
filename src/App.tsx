import React from 'react';
import { AppProvider } from './context/AppContext';
import EditorTabs from './components/EditorTabs';
import OutputDisplay from './components/OutputDisplay';
import './styles.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="app-container">
        <EditorTabs />
        <OutputDisplay />
      </div>
    </AppProvider>
  );
};

export default App;