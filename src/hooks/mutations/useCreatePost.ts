import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosWithAuth from './helper';

export interface ICreatePostPayload {
  content: string;
  header: string;
  is_anonim: boolean;
  topic_id: string;
}

const createPost = async (payload: ICreatePostPayload) => {
  const payloadFormData = new FormData();

  payloadFormData.append('content', payload.content);
  payloadFormData.append('header', payload.header);
  payloadFormData.append('is_anonim', payload.is_anonim.toString());
  payloadFormData.append('topic_id', payload.topic_id);

  try {
    const { data } = await axiosWithAuth.post(
      '/social/v2/post',
      payloadFormData,
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw error;
  }
};

const useCreatePost = () =>
  useMutation({
    mutationFn: createPost,
  });

export default useCreatePost;
