import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface LoginPayload {
  email: string;
  password: string;
}

const login = async (payload: LoginPayload) => {
  try {
    const { data } = await axios.post(
      'https://develop.investly.id/api/auth/v2/login',
      payload,
    );

    return data.data;
  } catch (error) {
    return error;
  }
};

const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export default useLogin;
