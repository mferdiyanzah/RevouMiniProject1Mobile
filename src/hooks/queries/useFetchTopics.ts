import { useQuery } from '@tanstack/react-query';
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
  const { data } = await axios.get(
    'https://develop.investly.id/api/social/v1/public/masterdata/topic',
  );
  return data.data as ITopic[];
};

const useFetchTopics = () =>
  useQuery({
    queryKey: ['topics'],
    queryFn: fetchTopics,
  });

export default useFetchTopics;
