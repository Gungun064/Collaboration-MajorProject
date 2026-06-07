import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { TrendingUp, Award, BookOpen, Briefcase, Zap, Target } from 'lucide-react';

type ReadinessScore = {
  overall: number;
  skills: number;
  experience: number;
  knowledge: number;
};

export default function CareerProgressDashboard() {
  const { profile } = useAuth();
  const [readiness, setReadiness] = useState<ReadinessScore>({
    overall: 0,
    skills: 0,
    experience: 0,
    knowledge: 0
  });
  const [learningProgress, setLearningProgress] = useState<any[]>([]);
  const [assessment, setAssessment] = useState<any>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    if (!profile) return;

    const { data: readinessData } = await supabase
      .from('career_readiness')
      .select('*')
      .eq('user_id', profile.id)
      .maybeSingle();

    if (readinessData) {
      setReadiness({
        overall: readinessData.overall_score,
        skills: readinessData.skills_score,
        experience: readinessData.experience_score,
        knowledge: readinessData.knowledge_score
      });
    }

    const { data: learningData } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', profile.id);

    setLearningProgress(learningData || []);

    const { data: assessmentData } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', profile.id)
      .maybeSingle();

    setAssessment(assessmentData);

    if (!readinessData) {
      calculateReadiness(learningData || [], assessmentData);
    }
  };

  const calculateReadiness = async (learning: any[], assessmentResult: any) => {
    const completedCourses = learning.filter(l => l.completed).length;
    const totalCourses = learning.length;
    const skillsScore = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
    const experienceScore = assessmentResult ? 40 : 20;
    const knowledgeScore = 35;
    const overallScore = Math.round((skillsScore * 0.5 + experienceScore * 0.3 + knowledgeScore * 0.2));

    if (profile) {
      await supabase.from('career_readiness').upsert({
        user_id: profile.id,
        overall_score: overallScore,
        skills_score: Math.round(skillsScore),
        experience_score: experienceScore,
        knowledge_score: knowledgeScore
      }, {
        onConflict: 'user_id'
      });

      setReadiness({
        overall: overallScore,
        skills: Math.round(skillsScore),
        experience: experienceScore,
        knowledge: knowledgeScore
      });
    }
  };

  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    if (score >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getReadinessLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Beginner';
  };

  const completedCourses = learningProgress.filter(l => l.completed).length;
  const inProgressCourses = learningProgress.filter(l => !l.completed).length;

  const milestones = [
    { label: 'Assessment Completed', completed: !!assessment, icon: '📋' },
    { label: 'First Course Started', completed: learningProgress.length > 0, icon: '📚' },
    { label: 'First Course Completed', completed: completedCourses > 0, icon: '✅' },
    { label: 'Career Prediction Generated', completed: false, icon: '🔮' },
    { label: '5 Courses Completed', completed: completedCourses >= 5, icon: '🏆' },
    { label: 'Ready for Internship', completed: readiness.overall >= 70, icon: '💼' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-lg">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{readiness.overall}%</div>
            <p className="text-blue-100">Overall Readiness</p>
            <p className="text-sm text-blue-200 mt-1">{getReadinessLabel(readiness.overall)}</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{readiness.skills}%</div>
            <p className="text-blue-100">Skills Score</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{readiness.experience}%</div>
            <p className="text-blue-100">Experience</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{readiness.knowledge}%</div>
            <p className="text-blue-100">Knowledge</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Readiness Score</h3>
        <div className={`bg-gradient-to-r ${getReadinessColor(readiness.overall)} text-white p-8 rounded-xl mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl opacity-90">Your Current Level</p>
              <p className="text-5xl font-bold mt-2">{getReadinessLabel(readiness.overall)}</p>
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center">
              <div className="text-4xl font-bold">{readiness.overall}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Skills Developed', value: readiness.skills, icon: Award },
            { label: 'Experience Gained', value: readiness.experience, icon: Briefcase },
            { label: 'Knowledge Acquired', value: readiness.knowledge, icon: BookOpen }
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-4">
                <Icon className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-900">{item.label}</span>
                    <span className="text-gray-600">{item.value}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h4 className="text-lg font-bold text-green-900">Courses Completed</h4>
          </div>
          <p className="text-3xl font-bold text-green-700">{completedCourses}</p>
          <p className="text-sm text-green-600 mt-2">Keep learning!</p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h4 className="text-lg font-bold text-blue-900">In Progress</h4>
          </div>
          <p className="text-3xl font-bold text-blue-700">{inProgressCourses}</p>
          <p className="text-sm text-blue-600 mt-2">Active learning</p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-purple-600" />
            <h4 className="text-lg font-bold text-purple-900">Total Learning</h4>
          </div>
          <p className="text-3xl font-bold text-purple-700">{learningProgress.length}</p>
          <p className="text-sm text-purple-600 mt-2">courses tracked</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg transition ${
                milestone.completed
                  ? 'bg-green-50 border-l-4 border-green-600'
                  : 'bg-gray-50 border-l-4 border-gray-300'
              }`}
            >
              <span className="text-3xl">{milestone.icon}</span>
              <div className="flex-1">
                <p className={`font-medium ${milestone.completed ? 'text-green-900' : 'text-gray-700'}`}>
                  {milestone.label}
                </p>
              </div>
              {milestone.completed && (
                <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                  Completed
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-600 p-8 rounded-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h3>
        <ul className="space-y-3">
          {readiness.overall < 70 && (
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">Complete more courses to reach 70% readiness for internships</span>
            </li>
          )}
          {readiness.overall >= 70 && inProgressCourses > 0 && (
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">You're ready! Start applying for internships</span>
            </li>
          )}
          {completedCourses < 5 && (
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800">Build 2-3 projects to strengthen your portfolio</span>
            </li>
          )}
          <li className="flex items-start gap-3">
            <Target className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-800">Generate your career prediction for detailed insights</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
