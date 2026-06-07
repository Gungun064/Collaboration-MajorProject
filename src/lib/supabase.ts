import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type AssessmentResult = {
  id: string;
  user_id: string;
  knows_interest: boolean;
  responses: Record<string, any>;
  recommended_careers: string[];
  recommended_skills: string[];
  completed_at: string;
};

export type LearningProgress = {
  id: string;
  user_id: string;
  course_name: string;
  course_url: string;
  platform: string;
  skill: string;
  completed: boolean;
  started_at: string;
  completed_at: string | null;
};

export type MentorQuestion = {
  id: string;
  user_id: string;
  question: string;
  category: string;
  status: string;
  answer: string | null;
  created_at: string;
  answered_at: string | null;
};
