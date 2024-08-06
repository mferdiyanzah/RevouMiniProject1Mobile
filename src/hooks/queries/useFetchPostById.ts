import { useQuery } from '@tanstack/react-query';
import { BASE_API_URL } from '@utils/config';
import axios from 'axios';
import { IPost } from 'types/post';

interface IFetchPostByIDParams {
  postId: string;
}

const fetchPostById = async (params: IFetchPostByIDParams) => {
  try {
    const { data } = await axios.get(
      `${BASE_API_URL}/social/v1/public/post/${params.postId}`,
    );

    return data.data;
  } catch (error) {
    throw error;
  }
};

const useFetchPostById = (params: IFetchPostByIDParams) =>
  useQuery<IPost, Error>({
    queryKey: ['post', params],
    queryFn: () => fetchPostById(params),
    retry: false,
  });

export default useFetchPostById;
