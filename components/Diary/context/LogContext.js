import React from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

export const LogContext = createContext();

export const LogContextProvider = ({children}) => {
  const [logs, setLogs] = useState(
    Array.from({length: 2}).map((_, index) => ({
      id: uuidv4(),
      title: `Log ${index}`,
      body: `Log ${index}`,
      date: new Date().toISOString(),
    })),
  );

  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };

  return (
    <LogContext.Provider value={{logs, onCreate}}>
      {children}
    </LogContext.Provider>
  );
};
