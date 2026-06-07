import { useNavigate } from 'react-router-dom';
import { Target, Briefcase, Map, TrendingUp, Award, BookOpen, Users, ArrowRight, Linkedin } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Career Assessment',
      description: 'Discover your perfect career path through our smart assessment',
      path: '/assessment',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Briefcase,
      title: 'Internships',
      description: 'Find internship opportunities from top companies',
      path: '/internships',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Map,
      title: 'Career Roadmaps',
      description: 'Step-by-step guidance for your chosen career',
      path: '/roadmap',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Future Jobs',
      description: 'Explore trending careers with high growth potential',
      path: '/future-jobs',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Award,
      title: 'In-Demand Skills',
      description: 'Learn the most valuable skills in the job market',
      path: '/demand-skills',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: BookOpen,
      title: 'Learning Platform',
      description: 'Free courses from top platforms to boost your skills',
      path: '/learning',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: Users,
      title: 'Mentor & Guide',
      description: 'Get expert advice from industry professionals',
      path: '/mentor',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn Optimizer',
      description: 'AI-powered LinkedIn profile analysis and smart networking assistant',
      path: '/linkedin-optimizer',
      color: 'from-blue-500 to-blue-700'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to Personalized AI Career & Skills Advisor</h1>
        <p className="text-xl text-gray-600">Your journey to a successful career starts here</p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-lg mb-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-3">Start Your Career Journey</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Take our smart career assessment to discover your interests, get personalized recommendations, and build a roadmap to achieve your career goals.
          </p>
          <button
            onClick={() => navigate('/assessment')}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
          >
            Take Career Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Our Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.path}
                onClick={() => navigate(feature.path)}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-left group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-3">{feature.description}</p>
                <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Personalized Guidance</h3>
          <p className="text-gray-600">Get recommendations tailored to your interests and goals</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Free Learning Resources</h3>
          <p className="text-gray-600">Access courses from top platforms at no cost</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">💼</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Real Opportunities</h3>
          <p className="text-gray-600">Find internships and jobs from leading companies</p>
        </div>
      </div>
    </div>
  );
}
