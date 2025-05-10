import React, { createContext, useReducer, Dispatch } from 'react';

type State = {
  activeTab: 'python' | 'javascript';
  codes: {
    python: string;
    javascript: string;
  };
  output: string[];
  errors: string[];
};

type Action =
  | { type: 'SET_ACTIVE_TAB'; payload: 'python' | 'javascript' }
  | { type: 'UPDATE_CODE'; language: 'python' | 'javascript'; code: string }
  | { type: 'SET_OUTPUT'; payload: string[] }
  | { type: 'APPEND_OUTPUT'; payload: string[] } // Добавлено новое действие
  | { type: 'SET_ERRORS'; payload: string[] }
  | { type: 'RESET' };

const initialState: State = {
  activeTab: 'python',
  codes: {
    python: '# Python starter code\nprint("Hello Python")',
    javascript: '// JavaScript starter code\nconsole.log("Hello JS")',
  },
  output: [],
  errors: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'UPDATE_CODE':
      return { ...state, codes: { ...state.codes, [action.language]: action.code } };
    case 'SET_OUTPUT':
      return { ...state, output: action.payload, errors: [] };
    case 'APPEND_OUTPUT': // Обработчик для добавления вывода
      return { 
        ...state, 
        output: [...state.output, ...action.payload],
        errors: []
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload, output: [] };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};