import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsername = async (username: string) => {
  const { data } = await axios.get(
    `https://develop.investly.id/api/social/v1/public/username/${username}`,
  );
  return data.data as boolean;
};

const useFetchUsername = (username: string) =>
  useQuery({
    queryKey: ['username'],
    queryFn: () => fetchUsername(username),
  });

export default useFetchUsername;
