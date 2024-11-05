import React, { createContext, useReducer } from 'react';
import fileReducer from '../reducers/fileReducer';
import explorer from '../data/folderData';

export const FileContext = createContext();

const FileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, explorer);

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;
