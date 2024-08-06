import { faker } from '@faker-js/faker';
import { useQuery } from '@tanstack/react-query';
import { BASE_API_URL } from '@utils/config';
import axios from 'axios';
import { IPost } from 'types/post';

interface IFetchPostsParams {
  sort_by: 'engagement' | 'created_at';
  page: number;
  perpage: number;
}

const fetchPosts = async (params: IFetchPostsParams): Promise<IPost[]> => {
  try {
    console.log(params, 'params');
    const { data } = await axios.get(`${BASE_API_URL}/social/v2/feed`, {
      params,
    });

    const postData = data.data as IPost[];

    const generatedPost = postData.map(post => ({
      ...post,
      downvotes: faker.number.int(100),
    }));

    return generatedPost;
  } catch (error) {
    throw error;
  }
};

const useFetchPosts = (params: IFetchPostsParams) =>
  useQuery<IPost[], Error>({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false,
    enabled: false,
  });

export default useFetchPosts;
