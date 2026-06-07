/*
  # 2026 AI Career Platform - Advanced Features Schema

  1. New Tables
    - `user_preferences`: Store personalization settings and UI theme preferences
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `theme_color` (text): Primary color based on career path
      - `ui_layout` (text): 'tech', 'creative', 'business' etc.
      - `notification_preferences` (jsonb): Notification settings
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_progress`: Track learning progress and streaks
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `current_level` (integer): Experience level (1-10)
      - `total_xp` (integer): Total experience points
      - `current_streak` (integer): Days of consistent learning
      - `longest_streak` (integer): Best streak achieved
      - `last_activity_date` (date): Last time user engaged
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `achievements_badges`: Define available badges and credentials
      - `id` (uuid, primary key)
      - `name` (text): Badge name
      - `description` (text): Badge description
      - `icon_url` (text): Badge image URL
      - `category` (text): 'skill', 'milestone', 'streak', 'completion'
      - `xp_reward` (integer): XP points for earning this badge
      - `created_at` (timestamp)
    
    - `user_badges`: Track badges earned by users
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `badge_id` (uuid, references achievements_badges)
      - `earned_at` (timestamp)
      - `verified` (boolean): Proof of work verified
    
    - `skill_gap_analysis`: Store comprehensive skill gap data
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `career_path` (text): Selected career
      - `current_skills` (jsonb): Current skills with proficiency
      - `required_skills` (jsonb): Skills needed for target role
      - `market_demand` (jsonb): Real-time market demand for skills
      - `priority_order` (jsonb): Skills ordered by market value
      - `last_updated` (timestamp)
    
    - `portfolio_projects`: Store user's projects for portfolio
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text): Project title
      - `description` (text): Detailed description
      - `technologies` (text[]): Technologies used
      - `demo_url` (text): Live demo link
      - `source_code_url` (text): GitHub/repo link
      - `images` (text[]): Project screenshots
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `portfolio_ats_scores`: AI-generated ATS compatibility scores
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `portfolio_json` (jsonb): Portfolio data snapshot
      - `ats_score` (integer): 0-100 score
      - `keyword_matches` (integer): Number of matched keywords
      - `improvement_suggestions` (jsonb): List of suggestions
      - `created_at` (timestamp)
    
    - `learning_sessions`: Track hands-on lab sessions
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `lab_title` (text): Lab name
      - `skill_category` (text): 'cloud', 'coding', 'data'
      - `status` (text): 'active', 'completed', 'abandoned'
      - `started_at` (timestamp)
      - `completed_at` (timestamp)
      - `time_spent_minutes` (integer)
      - `completion_percentage` (integer): 0-100
    
    - `peer_matches`: AI-matched study partners
      - `id` (uuid, primary key)
      - `user_id_1` (uuid): First user
      - `user_id_2` (uuid): Second user
      - `shared_roadmap` (text): Common career path
      - `location` (text): Shared location (Delhi, Mumbai, etc.)
      - `matched_at` (timestamp)
      - `status` (text): 'pending', 'accepted', 'active'
      - `connection_expires` (timestamp)
    
    - `mentor_bookings`: Book 1-on-1 sessions with experts
      - `id` (uuid, primary key)
      - `student_id` (uuid, references auth.users)
      - `mentor_id` (uuid, references auth.users)
      - `topic` (text): Session topic
      - `scheduled_at` (timestamp)
      - `duration_minutes` (integer): 30, 60, 90
      - `status` (text): 'pending', 'confirmed', 'completed', 'cancelled'
      - `notes` (text): Session notes
      - `created_at` (timestamp)
    
    - `ai_chat_history`: Store contextualized AI chat conversations
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `conversation_id` (uuid): Group related messages
      - `user_message` (text): User's question/input
      - `ai_response` (text): AI's response
      - `context_data` (jsonb): Relevant context (user progress, skills, goals)
      - `created_at` (timestamp)
    
    - `interview_sessions`: AI mock interview records
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `job_role` (text): Interview target role
      - `question_number` (integer): Current question
      - `total_questions` (integer): Total in session
      - `user_response_video` (text): Video URL if available
      - `feedback` (jsonb): AI feedback on performance
      - `confidence_score` (integer): 0-100
      - `technical_score` (integer): 0-100
      - `communication_score` (integer): 0-100
      - `completed_at` (timestamp)
    
    - `marketplace_mentors`: Available mentors for booking
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `expertise_areas` (text[]): Expert in these fields
      - `hourly_rate` (integer): Cost in rupees per hour
      - `bio` (text): Professional bio
      - `rating` (decimal): Average rating 0-5
      - `total_sessions` (integer): Sessions completed
      - `availability` (jsonb): Weekly availability schedule
      - `verified` (boolean): Identity verified
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all new tables
    - Users can only view their own data
    - Mentors can only view bookings for them
    - Public read access for mentor profiles and badges

  3. Indexes
    - user_id indexes for fast lookups
    - career_path indexes for filtering
    - created_at indexes for sorting

  4. Key Changes
    - Complete 360-degree user personalization system
    - Market-responsive skill tracking
    - Gamification infrastructure
    - Community building framework
    - Portfolio management system
    - Expert mentorship marketplace
*/

-- User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  theme_color text DEFAULT 'blue-600',
  ui_layout text DEFAULT 'tech',
  notification_preferences jsonb DEFAULT '{"email": true, "sms": false, "push": true}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  current_level integer DEFAULT 1,
  total_xp integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_activity_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Achievements/Badges Table
CREATE TABLE IF NOT EXISTS achievements_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon_url text,
  category text DEFAULT 'skill',
  xp_reward integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE achievements_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view badges"
  ON achievements_badges FOR SELECT
  TO authenticated
  USING (true);

-- User Badges Table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES achievements_badges(id) ON DELETE CASCADE,
  earned_at timestamptz DEFAULT now(),
  verified boolean DEFAULT false,
  UNIQUE(user_id, badge_id)
);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their badges"
  ON user_badges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view others' badges"
  ON user_badges FOR SELECT
  TO authenticated
  USING (true);

-- Skill Gap Analysis Table
CREATE TABLE IF NOT EXISTS skill_gap_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  career_path text NOT NULL,
  current_skills jsonb DEFAULT '[]'::jsonb,
  required_skills jsonb DEFAULT '[]'::jsonb,
  market_demand jsonb DEFAULT '[]'::jsonb,
  priority_order jsonb DEFAULT '[]'::jsonb,
  last_updated timestamptz DEFAULT now(),
  UNIQUE(user_id, career_path)
);

ALTER TABLE skill_gap_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own skill gaps"
  ON skill_gap_analysis FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Portfolio Projects Table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  technologies text[] DEFAULT '{}',
  demo_url text,
  source_code_url text,
  images text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own portfolio"
  ON portfolio_projects FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own portfolio"
  ON portfolio_projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio"
  ON portfolio_projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Portfolio ATS Scores Table
CREATE TABLE IF NOT EXISTS portfolio_ats_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  portfolio_json jsonb,
  ats_score integer DEFAULT 0,
  keyword_matches integer DEFAULT 0,
  improvement_suggestions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_ats_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ATS scores"
  ON portfolio_ats_scores FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Learning Sessions Table
CREATE TABLE IF NOT EXISTS learning_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_title text NOT NULL,
  skill_category text DEFAULT 'coding',
  status text DEFAULT 'active',
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  time_spent_minutes integer DEFAULT 0,
  completion_percentage integer DEFAULT 0
);

ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning sessions"
  ON learning_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Peer Matches Table
CREATE TABLE IF NOT EXISTS peer_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_1 uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id_2 uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shared_roadmap text,
  location text,
  matched_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending',
  connection_expires timestamptz
);

ALTER TABLE peer_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their peer matches"
  ON peer_matches FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- Mentor Bookings Table
CREATE TABLE IF NOT EXISTS mentor_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic text NOT NULL,
  scheduled_at timestamptz,
  duration_minutes integer DEFAULT 60,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mentor_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own bookings"
  ON mentor_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Mentors can view their bookings"
  ON mentor_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = mentor_id);

-- AI Chat History Table
CREATE TABLE IF NOT EXISTS ai_chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id uuid DEFAULT gen_random_uuid(),
  user_message text,
  ai_response text,
  context_data jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat history"
  ON ai_chat_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Interview Sessions Table
CREATE TABLE IF NOT EXISTS interview_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_role text,
  question_number integer DEFAULT 1,
  total_questions integer DEFAULT 5,
  user_response_video text,
  feedback jsonb,
  confidence_score integer DEFAULT 0,
  technical_score integer DEFAULT 0,
  communication_score integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own interview sessions"
  ON interview_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Marketplace Mentors Table
CREATE TABLE IF NOT EXISTS marketplace_mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  expertise_areas text[] DEFAULT '{}',
  hourly_rate integer DEFAULT 500,
  bio text,
  rating decimal DEFAULT 0,
  total_sessions integer DEFAULT 0,
  availability jsonb DEFAULT '[]'::jsonb,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE marketplace_mentors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view verified mentors"
  ON marketplace_mentors FOR SELECT
  TO authenticated
  USING (verified = true);

CREATE POLICY "Mentors can view own profile"
  ON marketplace_mentors FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Mentors can update own profile"
  ON marketplace_mentors FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_gap_user_id ON skill_gap_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_user_id ON portfolio_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_ats_user_id ON portfolio_ats_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_user_id ON learning_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_user_id ON ai_chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_user_id ON interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_mentors_verified ON marketplace_mentors(verified);
