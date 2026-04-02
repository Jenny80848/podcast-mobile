import { Platform } from 'react-native';

// Config for the API
const domain = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
export const API_BASE_URL = `http://${domain}/podcast-site/api`; 
export const IMAGE_BASE_URL = `http://${domain}/podcast-site/`;

export interface Episode {
  id: number;
  podcast_id: number;
  category_id: number | null;
  title: string;
  slug: string;
  description: string;
  audio_url: string;
  video_url: string;
  thumbnail_url: string;
  duration: number;
  published_at: string;
  view_count: number;
  category_name?: string;
  podcast_title?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const fetchEpisodes = async (): Promise<ApiResponse<Episode[]>> => {
  const response = await fetch(`${API_BASE_URL}/get_episodes.php`);
  return response.json();
};

export const fetchEpisode = async (id: number): Promise<ApiResponse<Episode>> => {
  const response = await fetch(`${API_BASE_URL}/get_episode.php?id=${id}`);
  return response.json();
};

export const fetchCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await fetch(`${API_BASE_URL}/get_categories.php`);
  return response.json();
};

export const fetchSearchEpisodes = async (query: string): Promise<ApiResponse<Episode[]>> => {
  const response = await fetch(`${API_BASE_URL}/search_episodes.php?q=${encodeURIComponent(query)}`);
  return response.json();
};
