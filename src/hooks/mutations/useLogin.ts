import useAuthStore from '@stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { BASE_API_URL } from '@utils/config';
import axios from 'axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  messages: string;
  data: LoginDataResponse;
}

interface LoginDataResponse {
  access_token: string;
  expired_at: string;
  is_verified: boolean;
  refresh_token: string;
}
export interface UserProfile {
  user_id: string;
  name: string;
  username: string;
  profile_path: string;
  profile_image_properties: {
    name_display: string;
    full_path: string;
    size: number;
    mime_type: string;
  };
  email: string;
  bio: string | null;
  is_pro: boolean;
  is_premium: boolean;
  is_verified: boolean;
  is_blocked: boolean;
  created_at: string;
  total_followers: number;
  total_following: number;
  is_followed: boolean;
  config: {
    user_id: string;
    is_private: boolean;
    is_share_portfolio: boolean;
    is_pin_exist: boolean;
    is_phone_verified: boolean;
    is_email_verified: boolean;
    is_generated_password: boolean;
    is_generated_profile: boolean;
  };
  pro_profile: string | null;
  calendly_url: string | null;
  favorite_topics: string[];
  referral_code: string;
  headline: string | null;
  favorite_instruments: string | null;
}

const login = async (payload: LoginPayload) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BASE_API_URL}/auth/v2/login`,
      payload,
      {
        validateStatus: () => true,
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

export const getProfile = async (accessToken: string) => {
  const setProfile = useAuthStore.getState().setProfile;

  try {
    const { data } = await axios.get(`${BASE_API_URL}/social/v2/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userProfile = data.data as UserProfile;
    setProfile(userProfile);
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

const useLogin = () =>
  useMutation({
    mutationFn: login,
    onSuccess: async response => {
      const data = (response as LoginResponse).data;

      await getProfile(data.access_token);
    },
  });

export default useLogin;
