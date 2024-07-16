import { createContext, useContext } from 'react';
import { IData } from 'types/data';

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  feedData: IData[];
  setFeedData: React.Dispatch<React.SetStateAction<IData[]>>;
  selectedPost: IData | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<IData | null>>;
  addFeedData: (data: IData) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
