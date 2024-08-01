import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsername = async (username: string) => {
  try {
    const { data } = await axios.get(
      `https://develop.investly.id/api/social/v1/public/username/${username}`,
    );
    return data.status as boolean;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const useFetchUsername = (username: string) =>
  useQuery({
    queryKey: ['username', username],
    queryFn: () => fetchUsername(username),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false,
    enabled: false,
    retry: false,
  });

export default useFetchUsername;
