export interface IPost {
  id: string;
  header: string;
  content: string;
  attachments: string[] | null;
  attachment_properties: string[] | null;
  repost_post_id: string | null;
  created_at: string;
  is_upvoted: boolean;
  is_downvoted: boolean;
  is_reposted: boolean;
  is_question_post: boolean;
  is_owned: boolean;
  total_comments: number;
  upvotes: number;
  downvotes: number;
  reposts: number;
  post_type: string;
  time: string;
  topic: ITopic;
  analysis: null;
  parent_post: null;
  user: IUser;
  poll_question: null;
}

export interface ITopic {
  id: string;
  label: string;
}

interface IUser {
  user_id: string;
  name: string;
  username: string;
  profile_path: string;
  profile_image_properties: null;
  bio: null;
  is_pro: boolean;
  is_premium: boolean;
  is_verified: boolean;
  created_at: string;
  total_followers: number;
  total_following: number;
  is_followed: boolean;
  pro_profile: null;
  calendly_url: null;
  favorite_topics: null;
  referral_code: null;
  headline: null;
  favorite_instruments: null;
}
