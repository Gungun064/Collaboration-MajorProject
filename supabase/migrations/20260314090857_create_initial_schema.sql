/*
  # Initial Schema for Student Career Guidance Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `full_name` (text)
      - `email` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `assessment_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `knows_interest` (boolean)
      - `responses` (jsonb) - stores all Q&A
      - `recommended_careers` (text array)
      - `recommended_skills` (text array)
      - `completed_at` (timestamptz)
    
    - `learning_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `course_name` (text)
      - `course_url` (text)
      - `platform` (text)
      - `skill` (text)
      - `completed` (boolean)
      - `started_at` (timestamptz)
      - `completed_at` (timestamptz)
    
    - `mentor_questions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `question` (text)
      - `category` (text)
      - `status` (text) - pending, answered
      - `answer` (text)
      - `created_at` (timestamptz)
      - `answered_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Assessment results table
CREATE TABLE IF NOT EXISTS assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  knows_interest boolean DEFAULT false,
  responses jsonb DEFAULT '{}',
  recommended_careers text[] DEFAULT '{}',
  recommended_skills text[] DEFAULT '{}',
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assessment results"
  ON assessment_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessment results"
  ON assessment_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessment results"
  ON assessment_results FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Learning progress table
CREATE TABLE IF NOT EXISTS learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  course_name text NOT NULL,
  course_url text NOT NULL,
  platform text NOT NULL,
  skill text NOT NULL,
  completed boolean DEFAULT false,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning progress"
  ON learning_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning progress"
  ON learning_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning progress"
  ON learning_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own learning progress"
  ON learning_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Mentor questions table
CREATE TABLE IF NOT EXISTS mentor_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question text NOT NULL,
  category text DEFAULT 'general',
  status text DEFAULT 'pending',
  answer text,
  created_at timestamptz DEFAULT now(),
  answered_at timestamptz
);

ALTER TABLE mentor_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mentor questions"
  ON mentor_questions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mentor questions"
  ON mentor_questions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mentor questions"
  ON mentor_questions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_progress_user_id ON learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_questions_user_id ON mentor_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_mentor_questions_status ON mentor_questions(status);