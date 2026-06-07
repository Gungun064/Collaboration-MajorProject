import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Assessment from './components/Assessment';
import Internships from './components/Internships';
import CareerRoadmap from './components/CareerRoadmap';
import FutureJobs from './components/FutureJobs';
import DemandSkills from './components/DemandSkills';
import LearningPlatform from './components/LearningPlatform';
import MentorGuide from './components/MentorGuide';
import AIChatbot from './components/AIChatbot';
import CareerPrediction from './components/CareerPrediction';
import SkillGapAnalyzer from './components/SkillGapAnalyzer';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import JobDemandAnalyzer from './components/JobDemandAnalyzer';
import CareerProgressDashboard from './components/CareerProgressDashboard';
import LinkedInOptimizer from './components/LinkedInOptimizer';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <Layout>{children}</Layout>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } />
          <Route path="/signin" element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/assessment" element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          } />
          <Route path="/internships" element={
            <ProtectedRoute>
              <Internships />
            </ProtectedRoute>
          } />
          <Route path="/roadmap" element={
            <ProtectedRoute>
              <CareerRoadmap />
            </ProtectedRoute>
          } />
          <Route path="/future-jobs" element={
            <ProtectedRoute>
              <FutureJobs />
            </ProtectedRoute>
          } />
          <Route path="/demand-skills" element={
            <ProtectedRoute>
              <DemandSkills />
            </ProtectedRoute>
          } />
          <Route path="/learning" element={
            <ProtectedRoute>
              <LearningPlatform />
            </ProtectedRoute>
          } />
          <Route path="/mentor" element={
            <ProtectedRoute>
              <MentorGuide />
            </ProtectedRoute>
          } />
          <Route path="/ai-chat" element={
            <ProtectedRoute>
              <AIChatbot />
            </ProtectedRoute>
          } />
          <Route path="/career-prediction" element={
            <ProtectedRoute>
              <CareerPrediction />
            </ProtectedRoute>
          } />
          <Route path="/skill-gap" element={
            <ProtectedRoute>
              <SkillGapAnalyzer />
            </ProtectedRoute>
          } />
          <Route path="/resume-analyzer" element={
            <ProtectedRoute>
              <ResumeAnalyzer />
            </ProtectedRoute>
          } />
          <Route path="/job-demand" element={
            <ProtectedRoute>
              <JobDemandAnalyzer />
            </ProtectedRoute>
          } />
          <Route path="/career-progress" element={
            <ProtectedRoute>
              <CareerProgressDashboard />
            </ProtectedRoute>
          } />
          <Route path="/linkedin-optimizer" element={
            <ProtectedRoute>
              <LinkedInOptimizer />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
