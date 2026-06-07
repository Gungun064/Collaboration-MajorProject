/*
  # Add AI Features Schema

  1. New Tables
    - `career_predictions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `career_predictions` (jsonb) - array of career matches with scores
      - `strengths` (text array)
      - `weaknesses` (text array)
      - `recommendations` (text array)
      - `generated_at` (timestamptz)
    
    - `skill_gaps`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `target_career` (text)
      - `current_skills` (text array)
      - `missing_skills` (text array)
      - `priority_skills` (text array)
      - `analyzed_at` (timestamptz)
    
    - `ai_conversations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `messages` (jsonb) - array of {role, content, timestamp}
      - `topic` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `career_readiness`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `overall_score` (integer 0-100)
      - `skills_score` (integer)
      - `experience_score` (integer)
      - `knowledge_score` (integer)
      - `last_updated` (timestamptz)
    
    - `resume_analyses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `resume_url` (text)
      - `quality_score` (integer 0-100)
      - `strengths` (text array)
      - `improvements` (text array)
      - `missing_skills` (text array)
      - `tips` (text array)
      - `analyzed_at` (timestamptz)
    
    - `mentor_recommendations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `target_career` (text)
      - `mentors` (jsonb) - array of mentor profiles
      - `generated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Career predictions table
CREATE TABLE IF NOT EXISTS career_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  career_predictions jsonb DEFAULT '[]',
  strengths text[] DEFAULT '{}',
  weaknesses text[] DEFAULT '{}',
  recommendations text[] DEFAULT '{}',
  generated_at timestamptz DEFAULT now()
);

ALTER TABLE career_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own career predictions"
  ON career_predictions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own career predictions"
  ON career_predictions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own career predictions"
  ON career_predictions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Skill gaps table
CREATE TABLE IF NOT EXISTS skill_gaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_career text NOT NULL,
  current_skills text[] DEFAULT '{}',
  missing_skills text[] DEFAULT '{}',
  priority_skills text[] DEFAULT '{}',
  analyzed_at timestamptz DEFAULT now()
);

ALTER TABLE skill_gaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own skill gaps"
  ON skill_gaps FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skill gaps"
  ON skill_gaps FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skill gaps"
  ON skill_gaps FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- AI conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  messages jsonb DEFAULT '[]',
  topic text DEFAULT 'general',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON ai_conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
  ON ai_conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
  ON ai_conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Career readiness table
CREATE TABLE IF NOT EXISTS career_readiness (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  overall_score integer DEFAULT 0,
  skills_score integer DEFAULT 0,
  experience_score integer DEFAULT 0,
  knowledge_score integer DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

ALTER TABLE career_readiness ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own readiness score"
  ON career_readiness FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own readiness score"
  ON career_readiness FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own readiness score"
  ON career_readiness FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Resume analyses table
CREATE TABLE IF NOT EXISTS resume_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  resume_url text NOT NULL,
  quality_score integer DEFAULT 0,
  strengths text[] DEFAULT '{}',
  improvements text[] DEFAULT '{}',
  missing_skills text[] DEFAULT '{}',
  tips text[] DEFAULT '{}',
  analyzed_at timestamptz DEFAULT now()
);

ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own resume analyses"
  ON resume_analyses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resume analyses"
  ON resume_analyses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resume analyses"
  ON resume_analyses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own resume analyses"
  ON resume_analyses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Mentor recommendations table
CREATE TABLE IF NOT EXISTS mentor_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_career text NOT NULL,
  mentors jsonb DEFAULT '[]',
  generated_at timestamptz DEFAULT now()
);

ALTER TABLE mentor_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mentor recommendations"
  ON mentor_recommendations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mentor recommendations"
  ON mentor_recommendations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mentor recommendations"
  ON mentor_recommendations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_career_predictions_user_id ON career_predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_gaps_user_id ON skill_gaps(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_career_readiness_user_id ON career_readiness(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_analyses_user_id ON resume_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_recommendations_user_id ON mentor_recommendations(user_id);
