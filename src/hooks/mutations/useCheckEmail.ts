import { useMutation } from '@tanstack/react-query';
import { BASE_API_URL } from '@utils/config';
import axios from 'axios';
const checkEmail = async (email: string) => {
  try {
    const payload = { email };

    const { data } = await axios.post(
      `${BASE_API_URL}/auth/v1/email/check`,
      payload,
    );
    return !data.status as Boolean;
  } catch (error) {
    return error;
  }
};

const useCheckEmail = () =>
  useMutation({
    mutationFn: checkEmail,
  });

export default useCheckEmail;
