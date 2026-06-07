import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

type Question = {
  id: string;
  question: string;
  options: string[];
  category?: string;
};

type Response = {
  questionId: string;
  question: string;
  answer: string;
};

export default function Assessment() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'initial' | 'questions' | 'completed'>('initial');
  const [knowsInterest, setKnowsInterest] = useState<boolean | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const knownInterestQuestions: Question[] = [
    {
      id: 'interest_field',
      question: 'Which field are you interested in?',
      options: ['Technology', 'Business', 'Data & Analytics', 'Design & Creative', 'Healthcare', 'Engineering'],
      category: 'interest'
    },
    {
      id: 'tech_area',
      question: 'Which area of technology interests you most?',
      options: ['Software Development', 'Data Science', 'Cybersecurity', 'Cloud Computing', 'AI/Machine Learning', 'Mobile Development'],
      category: 'technology'
    },
    {
      id: 'work_style',
      question: 'What work style do you prefer?',
      options: ['Working with code', 'Analyzing data', 'Creating visual designs', 'Managing teams', 'Problem solving', 'Research & innovation'],
      category: 'style'
    },
    {
      id: 'skill_level',
      question: 'What is your current skill level?',
      options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      category: 'level'
    },
    {
      id: 'learning_goal',
      question: 'What is your main learning goal?',
      options: ['Get a job', 'Switch careers', 'Start a business', 'Freelancing', 'Skill improvement', 'Academic advancement'],
      category: 'goal'
    }
  ];

  const unknownInterestQuestions: Question[] = [
    {
      id: 'strength',
      question: 'What are you naturally good at?',
      options: ['Logical thinking', 'Creative thinking', 'Communication', 'Mathematics', 'Problem solving', 'Leadership'],
      category: 'aptitude'
    },
    {
      id: 'enjoy_doing',
      question: 'What do you enjoy doing in your free time?',
      options: ['Building things', 'Analyzing patterns', 'Creating art', 'Helping people', 'Learning new tech', 'Strategic planning'],
      category: 'interest'
    },
    {
      id: 'subjects',
      question: 'Which subjects did you enjoy most in school?',
      options: ['Mathematics', 'Science', 'Arts', 'Languages', 'Computer Science', 'Business Studies'],
      category: 'academic'
    },
    {
      id: 'work_environment',
      question: 'What kind of work environment appeals to you?',
      options: ['Tech startup', 'Corporate office', 'Remote work', 'Creative studio', 'Research lab', 'Healthcare facility'],
      category: 'environment'
    },
    {
      id: 'personality',
      question: 'How would you describe yourself?',
      options: ['Analytical', 'Creative', 'Detail-oriented', 'People-person', 'Innovator', 'Problem-solver'],
      category: 'personality'
    },
    {
      id: 'impact',
      question: 'What kind of impact do you want to make?',
      options: ['Build innovative products', 'Analyze and optimize', 'Create beautiful designs', 'Help businesses grow', 'Improve healthcare', 'Advance technology'],
      category: 'aspiration'
    }
  ];

  const handleInitialChoice = (choice: boolean) => {
    setKnowsInterest(choice);
    setQuestions(choice ? knownInterestQuestions : unknownInterestQuestions);
    setStep('questions');
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newResponse: Response = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      answer
    };

    setResponses([...responses, newResponse]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeAssessment([...responses, newResponse]);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setResponses(responses.slice(0, -1));
    }
  };

  const completeAssessment = async (allResponses: Response[]) => {
    setLoading(true);
    const recommendations = generateRecommendations(allResponses);

    if (profile) {
      await supabase.from('assessment_results').insert({
        user_id: profile.id,
        knows_interest: knowsInterest,
        responses: allResponses,
        recommended_careers: recommendations.careers,
        recommended_skills: recommendations.skills
      });
    }

    setStep('completed');
    setLoading(false);
  };

  const generateRecommendations = (allResponses: Response[]) => {
    const answerMap = allResponses.reduce((acc, r) => {
      acc[r.questionId] = r.answer;
      return acc;
    }, {} as Record<string, string>);

    let careers: string[] = [];
    let skills: string[] = [];

    if (knowsInterest) {
      const field = answerMap['interest_field'];
      const techArea = answerMap['tech_area'];

      if (field === 'Technology' || techArea) {
        if (techArea?.includes('Software')) {
          careers = ['Software Developer', 'Full Stack Developer', 'Backend Developer', 'Frontend Developer'];
          skills = ['JavaScript', 'Python', 'React', 'Node.js', 'Git', 'Problem Solving'];
        } else if (techArea?.includes('Data')) {
          careers = ['Data Scientist', 'Data Analyst', 'Machine Learning Engineer', 'Business Intelligence Analyst'];
          skills = ['Python', 'SQL', 'Statistics', 'Data Visualization', 'Machine Learning', 'Excel'];
        } else if (techArea?.includes('Cybersecurity')) {
          careers = ['Cybersecurity Analyst', 'Security Engineer', 'Penetration Tester', 'Security Consultant'];
          skills = ['Network Security', 'Ethical Hacking', 'Linux', 'Python', 'Risk Assessment', 'Cloud Security'];
        } else if (techArea?.includes('Cloud')) {
          careers = ['Cloud Engineer', 'DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer'];
          skills = ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Python'];
        } else if (techArea?.includes('AI')) {
          careers = ['AI Engineer', 'Machine Learning Engineer', 'Research Scientist', 'NLP Engineer'];
          skills = ['Python', 'TensorFlow', 'PyTorch', 'Mathematics', 'Deep Learning', 'Neural Networks'];
        }
      } else if (field === 'Business') {
        careers = ['Business Analyst', 'Product Manager', 'Marketing Manager', 'Management Consultant'];
        skills = ['Communication', 'Data Analysis', 'Strategic Planning', 'Excel', 'Project Management', 'Leadership'];
      } else if (field === 'Design & Creative') {
        careers = ['UX Designer', 'UI Designer', 'Graphic Designer', 'Product Designer'];
        skills = ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Visual Design', 'Creativity'];
      }
    } else {
      const strength = answerMap['strength'];
      const enjoys = answerMap['enjoy_doing'];

      if (strength?.includes('Logical') || strength?.includes('Mathematics')) {
        if (enjoys?.includes('Building') || enjoys?.includes('tech')) {
          careers = ['Software Developer', 'Data Engineer', 'Systems Analyst', 'DevOps Engineer'];
          skills = ['Programming', 'Python', 'JavaScript', 'SQL', 'Problem Solving', 'Git'];
        } else if (enjoys?.includes('Analyzing')) {
          careers = ['Data Analyst', 'Business Analyst', 'Data Scientist', 'Financial Analyst'];
          skills = ['SQL', 'Python', 'Excel', 'Data Visualization', 'Statistics', 'Critical Thinking'];
        }
      } else if (strength?.includes('Creative')) {
        careers = ['UX/UI Designer', 'Graphic Designer', 'Content Creator', 'Digital Marketing Specialist'];
        skills = ['Design Tools', 'Creativity', 'Visual Communication', 'User Research', 'Branding', 'Adobe Suite'];
      } else if (strength?.includes('Communication')) {
        careers = ['Product Manager', 'Marketing Manager', 'Business Consultant', 'HR Manager'];
        skills = ['Communication', 'Leadership', 'Project Management', 'Strategic Thinking', 'Collaboration', 'Negotiation'];
      }
    }

    if (careers.length === 0) {
      careers = ['Software Developer', 'Data Analyst', 'Business Analyst', 'UX Designer', 'Product Manager'];
      skills = ['Python', 'SQL', 'Communication', 'Problem Solving', 'Data Analysis', 'Critical Thinking'];
    }

    return { careers, skills };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your responses...</p>
        </div>
      </div>
    );
  }

  if (step === 'initial') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Career Interest Assessment
            </h1>
            <p className="text-lg text-gray-600">
              Let's find the perfect career path for you
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Do you know your career interest?
            </h2>
            <p className="text-gray-700 mb-6">
              This will help us tailor the questions to better understand your career goals and interests.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => handleInitialChoice(true)}
                className="p-6 bg-white border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition font-semibold text-lg"
              >
                Yes, I know
              </button>
              <button
                onClick={() => handleInitialChoice(false)}
                className="p-6 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition font-semibold text-lg"
              >
                No, help me discover
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>This assessment takes approximately 3-5 minutes</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {currentQuestion.question}
            </h2>

            <div className="grid gap-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 group-hover:text-blue-600">
                      {option}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </div>
                </button>
              ))}
            </div>

            {currentQuestionIndex > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Question
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Assessment Completed!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Great job! We've analyzed your responses and generated personalized career recommendations for you.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold text-lg"
            >
              View My Recommendations
            </button>
            <button
              onClick={() => navigate('/roadmap')}
              className="w-full py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition font-semibold text-lg"
            >
              Explore Career Roadmaps
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
