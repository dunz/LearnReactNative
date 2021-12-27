import React from 'react';
import {createContext, useState} from 'react';

export const SearchContext = createContext();

export const SearchContextProvider = ({children}) => {
  const [keyword, onChangeKeyword] = useState('');
  return (
    <SearchContext.Provider value={{keyword, onChangeKeyword}}>
      {children}
    </SearchContext.Provider>
  );
};
