/*
  # LinkedIn Profile Optimizer Schema

  1. New Tables
    - `linkedin_analyses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, FK to profiles)
      - `profile_url` (text, optional LinkedIn URL)
      - `profile_data` (jsonb, pasted profile sections)
      - `completeness_score` (integer, 0-100)
      - `recruiter_visibility_score` (integer, 0-100)
      - `networking_score` (integer, 0-100)
      - `industry_readiness_score` (integer, 0-100)
      - `overall_score` (integer, 0-100)
      - `missing_keywords` (text array)
      - `missing_certifications` (text array)
      - `profile_improvements` (text array)
      - `networking_opportunities` (text array)
      - `industry_tips` (text array)
      - `target_role` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `linkedin_connection_messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, FK to profiles)
      - `recipient_type` (text: recruiter, peer, mentor, alumni, etc.)
      - `recipient_role` (text)
      - `message` (text)
      - `context` (text)
      - `created_at` (timestamptz)

  2. Security
    - RLS enabled on both tables
    - Users can only access their own records
*/

-- linkedin_analyses table
CREATE TABLE IF NOT EXISTS linkedin_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  profile_url text DEFAULT '',
  profile_data jsonb DEFAULT '{}'::jsonb,
  completeness_score integer DEFAULT 0,
  recruiter_visibility_score integer DEFAULT 0,
  networking_score integer DEFAULT 0,
  industry_readiness_score integer DEFAULT 0,
  overall_score integer DEFAULT 0,
  missing_keywords text[] DEFAULT ARRAY[]::text[],
  missing_certifications text[] DEFAULT ARRAY[]::text[],
  profile_improvements text[] DEFAULT ARRAY[]::text[],
  networking_opportunities text[] DEFAULT ARRAY[]::text[],
  industry_tips text[] DEFAULT ARRAY[]::text[],
  target_role text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE linkedin_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own linkedin analyses"
  ON linkedin_analyses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own linkedin analyses"
  ON linkedin_analyses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own linkedin analyses"
  ON linkedin_analyses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own linkedin analyses"
  ON linkedin_analyses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- linkedin_connection_messages table
CREATE TABLE IF NOT EXISTS linkedin_connection_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_type text NOT NULL DEFAULT 'peer',
  recipient_role text DEFAULT '',
  message text NOT NULL DEFAULT '',
  context text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE linkedin_connection_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own connection messages"
  ON linkedin_connection_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own connection messages"
  ON linkedin_connection_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own connection messages"
  ON linkedin_connection_messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_linkedin_analyses_user_id ON linkedin_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_linkedin_connection_messages_user_id ON linkedin_connection_messages(user_id);
