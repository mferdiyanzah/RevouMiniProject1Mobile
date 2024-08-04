import { create } from 'zustand';

interface IPost {
  id: number;
  avatar: string;
  name: string;
  position: string;
  time: Date;
  title: string;
  description: string;
  label: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  shares: number;
}

interface PostStore {
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
  getPostById: (id: number) => IPost | undefined;
  addPost: (post: IPost) => void;
  updatePost: (id: number, updatedPost: Partial<IPost>) => void;
  reset: () => void;
}

const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  setPosts: posts => set({ posts }),
  getPostById: id => get().posts.find(post => post.id === id),
  addPost: post => set(state => ({ posts: [...state.posts, post] })),
  updatePost: (id, updatedPost) =>
    set(state => ({
      posts: state.posts.map(post =>
        post.id === id ? { ...post, ...updatedPost } : post,
      ),
    })),
  reset: () => set({ posts: [] }),
}));

export default usePostStore;
