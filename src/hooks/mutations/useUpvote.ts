import usePostStore from '@stores/usePostStore';
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
  const { upvotePost } = usePostStore();

  return useMutation({
    mutationFn: onUpvotePost,
    onSuccess: (_, postId) => {
      console.log('upvoted');
      upvotePost(postId);
    },
  });
};
export default useUpvote;
