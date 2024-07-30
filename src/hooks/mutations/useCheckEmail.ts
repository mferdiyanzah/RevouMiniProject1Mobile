import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const checkEmail = async (email: string) => {
  try {
    const payload = { email };

    const { data } = await axios.post(
      'https://develop.investly.id/api/auth/v1/email/check',
      payload,
    );
    console.log(data);
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
