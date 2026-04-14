import { Platform } from 'react-native';

export const API_BASE_URL = `https://tems.toamultitech.tech/api`; 
export const IMAGE_BASE_URL = `https://tems.toamultitech.tech/`;

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
