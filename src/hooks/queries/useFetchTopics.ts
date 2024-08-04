import { useQuery } from '@tanstack/react-query';
import { BASE_API_URL } from '@utils/config';
import axios from 'axios';

export interface ITopic {
  id: string;
  file: IFile;
  label: string;
}

interface IFile {
  name_display: string;
  full_path: string;
  size: number;
  mime_type: string;
}

const fetchTopics = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_API_URL}/social/v1/public/masterdata/topic`,
    );
    return data.data;
  } catch (error) {
    return error;
  }
};

const useFetchTopics = () =>
  useQuery({
    queryKey: ['topics'],
    queryFn: fetchTopics,
  });

export default useFetchTopics;
