import React, { createContext, useContext, useState } from 'react';

type SearchData = {
  tripType: string;
  passengers: number;
};

type ContextType = {
  searchData: SearchData;
  setSearchData: React.Dispatch<React.SetStateAction<SearchData>>;
};

interface ContextProps {
  children: JSX.Element | JSX.Element[];
}

const Context = createContext<ContextType>({} as ContextType);

const SearchDataProvider: React.FC<ContextProps> = ({ children }) => {
  const [searchData, setSearchData] = useState<SearchData>({
    tripType: 'Hola',
    passengers: 1,
  });
  return (
    <Context.Provider value={{ searchData, setSearchData }}>
      {children}
    </Context.Provider>
  );
};

export default SearchDataProvider;

export const useSearchData = () => useContext(Context);
