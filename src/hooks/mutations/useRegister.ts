import { useMutation } from '@tanstack/react-query';
import { BASE_API_URL } from '@utils/config';
import axios from 'axios';
import { getProfile } from './useLogin';
export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  name: string;
  favorite_topic_ids: string[];
}

export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  is_verified: boolean;
  expired_at: string;
}

const register = async (payload: RegisterPayload) => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${BASE_API_URL}/auth/v4/register`,
      payload,
      {
        validateStatus: () => true,
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

const useRegister = () =>
  useMutation({
    mutationFn: register,

    onSuccess: async (response: any) => {
      const data = response.data as RegisterResponse;

      console.log(data.access_token);

      await getProfile(data.access_token);
    },
  });

export default useRegister;
