import { useMutation } from '@tanstack/react-query';
import axiosWithAuth from './helper';

const onUpvotePost = async (postId: string) => {
  try {
    const { data } = await axiosWithAuth.post(
      `/social/v2/post/${postId}/up-vote`,
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useUpvote = () => {
  return useMutation({
    mutationFn: onUpvotePost,
  });
};
export default useUpvote;
