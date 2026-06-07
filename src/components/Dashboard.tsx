import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, AssessmentResult, LearningProgress } from '../lib/supabase';
import { TrendingUp, BookOpen, Briefcase, Target, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    if (!profile) return;

    const { data: assessmentData } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', profile.id)
      .order('completed_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: progressData } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', profile.id)
      .order('started_at', { ascending: false });

    setAssessment(assessmentData);
    setLearningProgress(progressData || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const completedCourses = learningProgress.filter(p => p.completed).length;
  const inProgressCourses = learningProgress.filter(p => !p.completed).length;

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.full_name}!</h1>
        <p className="text-gray-600 mt-2">Here's your career journey overview</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8" />
            <span className="text-2xl font-bold">{assessment ? '✓' : '0'}</span>
          </div>
          <p className="text-blue-100 text-sm">Assessment</p>
          <p className="font-semibold">{assessment ? 'Completed' : 'Not Started'}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8" />
            <span className="text-2xl font-bold">{inProgressCourses}</span>
          </div>
          <p className="text-green-100 text-sm">In Progress</p>
          <p className="font-semibold">Courses Learning</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8" />
            <span className="text-2xl font-bold">{completedCourses}</span>
          </div>
          <p className="text-purple-100 text-sm">Completed</p>
          <p className="font-semibold">Courses Finished</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Briefcase className="w-8 h-8" />
            <span className="text-2xl font-bold">{assessment?.recommended_careers?.length || 0}</span>
          </div>
          <p className="text-orange-100 text-sm">Recommended</p>
          <p className="font-semibold">Career Paths</p>
        </div>
      </div>

      {!assessment && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Start Your Career Assessment</h2>
              <p className="text-blue-100 mb-4">
                Take our smart assessment to discover your perfect career path and get personalized recommendations.
              </p>
              <button
                onClick={() => navigate('/assessment')}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                Take Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {assessment && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Recommended Careers</h2>
            </div>
            <div className="space-y-3">
              {assessment.recommended_careers.slice(0, 5).map((career, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 font-medium">{career}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/roadmap')}
              className="mt-4 w-full py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
            >
              View Career Roadmaps
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Skills to Learn</h2>
            </div>
            <div className="space-y-3">
              {assessment.recommended_skills.slice(0, 5).map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800 font-medium">{skill}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/learning')}
              className="mt-4 w-full py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-medium"
            >
              Start Learning
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/internships')}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left group"
          >
            <Briefcase className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Find Internships</h3>
            <p className="text-sm text-gray-600 mt-1">Explore opportunities from top companies</p>
          </button>

          <button
            onClick={() => navigate('/future-jobs')}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left group"
          >
            <TrendingUp className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Future Jobs</h3>
            <p className="text-sm text-gray-600 mt-1">Discover trending career opportunities</p>
          </button>

          <button
            onClick={() => navigate('/mentor')}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left group"
          >
            <Target className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Get Mentorship</h3>
            <p className="text-sm text-gray-600 mt-1">Connect with industry experts</p>
          </button>
        </div>
      </div>
    </div>
  );
}
