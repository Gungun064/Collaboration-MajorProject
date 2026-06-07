import { useNavigate } from 'react-router-dom';
import { CheckCircle2, TrendingUp, Users, BookOpen, Target } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Personalized AI Career & Skills Advisor</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/signin')}
              className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Discover Your Future Career with Smart Guidance
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Find the right skills, explore future job opportunities, and build your personalized career roadmap.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-lg"
                >
                  Start Career Assessment
                </button>
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-lg"
                >
                  Explore Careers
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/ChatGPT_Image_Mar_12,_2026,_08_01_04_PM.png"
                alt="Career Guidance Platform"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What is Personal AI Career Advisor?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Personal AI Career Advisor is a smart platform designed to help students understand themselves and choose the right career path.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                The platform asks a few simple questions to understand the student's interests, goals, and strengths. Based on this information, it recommends suitable careers, skills to learn, and a <span className="font-semibold text-blue-600">personalized learning roadmap</span>.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Smart assessment tailored to your interests</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Personalized career recommendations</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Step-by-step learning roadmap</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-2xl">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <TrendingUp className="w-10 h-10 text-blue-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Growth</h3>
                  <p className="text-gray-600">Track your progress and see your career path unfold</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Users className="w-10 h-10 text-blue-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Mentors</h3>
                  <p className="text-gray-600">Connect with industry professionals for guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Personalized Career Roadmap
            </h2>
            <p className="text-xl text-gray-600">
              Get a step-by-step roadmap to learn the skills needed for your desired career.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: 1, title: 'Discover Interests', desc: 'Take the career assessment to understand your interests and strengths' },
              { step: 2, title: 'Choose Career Path', desc: 'Get recommended career options based on your answers' },
              { step: 3, title: 'Learn Required Skills', desc: 'Follow the roadmap and learn important skills for your career' },
              { step: 4, title: 'Build Projects', desc: 'Work on internship projects to gain practical experience' },
              { step: 5, title: 'Get Internships', desc: 'Apply for internships and grab job opportunities' },
            ].map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition relative">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI Career Helper
            </h2>
            <p className="text-xl text-gray-600">
              Chat with our AI assistant anytime and get answers to your career questions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Instant Answers</h3>
              <ul className="space-y-3">
                {[
                  'Career confusion',
                  'Skill recommendations',
                  'Learning roadmap guidance',
                  'Future job trends',
                  'Internship preparation'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl text-white">
              <Target className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Smart Recommendations</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Our AI analyzes your interests, skills, and career goals to provide personalized recommendations that align with market demand and your aspirations.
              </p>
              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Use Personal AI Career Advisor?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              'Helps students who are confused about their future',
              'Shows future career opportunities',
              'Suggests important skills to learn',
              'Provides learning roadmaps and resources',
              'Guides students step by step toward their goals',
              'Connects you with real industry mentors'
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <CheckCircle2 className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have discovered their perfect career path with our AI-powered platform.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-10 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Personalized AI Career & Skills Advisor</h3>
          <p className="text-gray-400 mb-6">Your future starts here</p>
          <p className="text-gray-500 text-sm">2026 Personalized AI Career & Skills Advisor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
