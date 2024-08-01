import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  messages: string;
  data: LoginDataResponse;
}

interface LoginDataResponse {
  access_token: string;
  refresh_token: string;
  is_verified: boolean;
  expired_at: string;
}

const login = async (payload: LoginPayload) => {
  try {
    const response = await axios.post<LoginResponse>(
      'https://develop.investly.id/api/auth/v2/login',
      payload,
      {
        validateStatus: () => true,
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export default useLogin;
