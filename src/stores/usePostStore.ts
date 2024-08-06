import { IPost } from 'types/post';
import { create } from 'zustand';

interface PostStore {
  trendingPosts: IPost[];
  newestPosts: IPost[];
  setTrendingPosts: (posts: IPost[]) => void;
  setNewestPosts: (posts: IPost[]) => void;
  upvotePost: (id: string) => void;
  downvotePost: (id: string) => void;
  reset: () => void;
}

const usePostStore = create<PostStore>(set => ({
  trendingPosts: [],
  newestPosts: [],
  setTrendingPosts: posts => set({ trendingPosts: posts }),
  setNewestPosts: posts => set({ newestPosts: posts }),
  upvotePost: (id: string) => {
    set(state => ({
      newestPosts: state.newestPosts.map(post =>
        post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post,
      ),
      trendingPosts: state.trendingPosts.map(post =>
        post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post,
      ),
    }));
  },
  downvotePost: id => {
    set(state => ({
      trendingPosts: state.trendingPosts.map(post =>
        post.id === id ? { ...post, downvotes: post.downvotes + 1 } : post,
      ),
      newestPosts: state.newestPosts.map(post =>
        post.id === id ? { ...post, downvotes: post.downvotes + 1 } : post,
      ),
    }));
  },
  reset: () => set({ trendingPosts: [], newestPosts: [] }),
}));

export default usePostStore;
