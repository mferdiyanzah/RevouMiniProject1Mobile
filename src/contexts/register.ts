import { createContext, useContext } from 'react';

interface RegisterContextType {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  username: string;
  topic: string[];
  currentStep: number;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setTopic: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined,
);

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (context === undefined) {
    throw new Error('useRegister must be used within an RegisterProvider');
  }
  return context;
};
