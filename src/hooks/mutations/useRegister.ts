import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  name: string;
  favorite_topic_ids: string[];
}

const register = async (payload: RegisterPayload) => {
  try {
    const { data } = await axios.post(
      'https://develop.investly.id/api/auth/v4/register',
      payload,
    );

    return data.data;
  } catch (error) {
    return error;
  }
};

const useRegister = () =>
  useMutation({
    mutationFn: register,
  });

export default useRegister;
