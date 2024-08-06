import { useMutation } from '@tanstack/react-query';
import axiosWithAuth from './helper';
import useAuthStore from '@stores/useAuthStore';

const logout = async () => {
  try {
    const { data } = await axiosWithAuth.post('/auth/v2/logout');
    return data;
  } catch (error) {
    throw error;
  }
};

const useLogout = () =>
  useMutation({
    mutationFn: logout,
    onSuccess: () => {
      const resetCredentials = useAuthStore.getState().reset;
      resetCredentials();
    },
  });

export default useLogout;
