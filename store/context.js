import {createContext, useContext, useState, useEffect} from 'react';

export const CreateContext = createContext({});

export const AppContext = ({children}) => {
  const [welcome, setWelcome] = useState('welcome');
  console.log(welcome);
  
  const providerValue = {welcome};
  return (
    <CreateContext.Provider value={providerValue}>
      {children}
    </CreateContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error('useAppContext inside AppContext only');
  }
  return context;
};
