import { faker } from '@faker-js/faker';
import { useQuery } from '@tanstack/react-query';
import { BASE_API_URL } from '@utils/config';
import axios from 'axios';
import { IPost } from 'types/post';
import { useState, useEffect } from 'react';

interface IFetchPostsParams {
  sort_by: 'engagement' | 'created_at';
  page: number;
  perpage: number;
  key: number;
}

const fetchPosts = async (params: IFetchPostsParams): Promise<IPost[]> => {
  const { data } = await axios.get(`${BASE_API_URL}/social/v2/feed`, {
    params,
  });

  const postData = data.data as IPost[];

  return postData.map(post => ({
    ...post,
    downvotes: faker.number.int(100),
  }));
};

const useFetchPosts = (params: IFetchPostsParams) => {
  const [isLoadingForFirstTime, setIsLoadingForFirstTime] = useState(true);

  const query = useQuery<IPost[], Error>({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
  });

  useEffect(() => {
    if (!query.isPending && isLoadingForFirstTime) {
      setIsLoadingForFirstTime(false);
    }
  }, [isLoadingForFirstTime, query.isPending]);

  return {
    ...query,
    isLoadingForFirstTime,
  };
};

export default useFetchPosts;
