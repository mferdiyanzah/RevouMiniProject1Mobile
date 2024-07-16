import { createContext, useContext } from 'react';

interface HomeContextType {
  navigation: any;
  route: any;
}

export const HomeContext = createContext<HomeContextType | undefined>(
  undefined,
);

export const useHome = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHome must be used within an HomeProvider');
  }
  return context;
};
