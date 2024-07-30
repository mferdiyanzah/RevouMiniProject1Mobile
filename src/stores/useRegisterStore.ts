import { create } from 'zustand';

interface RegisterState {
  email: string;
  password: string;
  confirmPassword: string;
  currentStep: number;
  favoriteTopics: string[];
  username: string;
  name: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setCurrentStep: (step: number) => void;
  setFavoriteTopics: (topics: string[]) => void;
  setUsername: (username: string) => void;
  setName: (name: string) => void;
  reset: () => void;
}

const useRegisterStore = create<RegisterState>(set => ({
  email: '',
  password: '',
  confirmPassword: '',
  currentStep: 1,
  favoriteTopics: [],
  username: '',
  name: '',
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setConfirmPassword: confirmPassword => set({ confirmPassword }),
  setCurrentStep: step => set({ currentStep: step }),
  setFavoriteTopics: topics => set({ favoriteTopics: topics }),
  setUsername: username => set({ username }),
  setName: name => set({ name }),
  reset: () =>
    set({
      email: '',
      password: '',
      confirmPassword: '',
      currentStep: 1,
      favoriteTopics: [],
      username: '',
      name: '',
    }),
}));

export default useRegisterStore;
