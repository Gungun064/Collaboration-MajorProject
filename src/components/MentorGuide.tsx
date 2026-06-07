import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, MentorQuestion } from '../lib/supabase';
import { MessageSquare, Send, CheckCircle2, Clock, HelpCircle } from 'lucide-react';

export default function MentorGuide() {
  const { profile } = useAuth();
  const [questions, setQuestions] = useState<MentorQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('career');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    if (!profile) return;

    const { data } = await supabase
      .from('mentor_questions')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });

    setQuestions(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !newQuestion.trim()) return;

    setLoading(true);

    await supabase.from('mentor_questions').insert({
      user_id: profile.id,
      question: newQuestion,
      category: selectedCategory,
      status: 'pending'
    });

    setNewQuestion('');
    await loadQuestions();
    setLoading(false);
  };

  const categories = [
    { value: 'career', label: 'Career Guidance' },
    { value: 'skills', label: 'Skill Development' },
    { value: 'interview', label: 'Interview Prep' },
    { value: 'resume', label: 'Resume Review' },
    { value: 'internship', label: 'Internship Advice' },
    { value: 'general', label: 'General' }
  ];

  const sampleQuestions = [
    {
      question: 'How do I transition from web development to data science?',
      category: 'Career Guidance'
    },
    {
      question: 'What skills should I focus on for a cybersecurity role?',
      category: 'Skill Development'
    },
    {
      question: 'How can I prepare for technical interviews?',
      category: 'Interview Prep'
    },
    {
      question: 'What projects should I include in my portfolio?',
      category: 'Career Guidance'
    }
  ];

  const pendingQuestions = questions.filter(q => q.status === 'pending');
  const answeredQuestions = questions.filter(q => q.status === 'answered');

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentor & Career Guidance</h1>
        <p className="text-gray-600">Get expert advice on your career journey</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <MessageSquare className="w-8 h-8 mb-3" />
          <p className="text-blue-100 text-sm mb-1">Total Questions</p>
          <p className="text-3xl font-bold">{questions.length}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <Clock className="w-8 h-8 mb-3" />
          <p className="text-orange-100 text-sm mb-1">Pending</p>
          <p className="text-3xl font-bold">{pendingQuestions.length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <CheckCircle2 className="w-8 h-8 mb-3" />
          <p className="text-green-100 text-sm mb-1">Answered</p>
          <p className="text-3xl font-bold">{answeredQuestions.length}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ask a Question</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question
                </label>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Ask anything about your career, skills, or professional development..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !newQuestion.trim()}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Question'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Your Questions</h2>

            {questions.length === 0 ? (
              <div className="bg-white p-12 rounded-xl shadow-md text-center">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions yet</h3>
                <p className="text-gray-600">Ask your first question to get started</p>
              </div>
            ) : (
              <>
                {pendingQuestions.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-700">Pending Questions</h3>
                    {pendingQuestions.map((q) => (
                      <div key={q.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                        <div className="flex items-start justify-between mb-2">
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                            {categories.find(c => c.value === q.category)?.label || q.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(q.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-900 font-medium mb-2">{q.question}</p>
                        <div className="flex items-center gap-2 text-sm text-orange-600">
                          <Clock className="w-4 h-4" />
                          <span>Awaiting mentor response...</span>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {answeredQuestions.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-700 mt-6">Answered Questions</h3>
                    {answeredQuestions.map((q) => (
                      <div key={q.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                        <div className="flex items-start justify-between mb-2">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            {categories.find(c => c.value === q.category)?.label || q.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(q.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-900 font-medium mb-4">{q.question}</p>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-900">Mentor Response:</span>
                          </div>
                          <p className="text-gray-700">{q.answer}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">How It Works</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <p className="text-sm text-blue-100">Ask your career-related question</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <p className="text-sm text-blue-100">Our mentors review your question</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <p className="text-sm text-blue-100">Receive personalized guidance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Example Questions</h3>
            <div className="space-y-3">
              {sampleQuestions.map((q, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setNewQuestion(q.question)}
                >
                  <p className="text-sm font-medium text-gray-900 mb-1">{q.question}</p>
                  <span className="text-xs text-gray-600">{q.category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Mentorship Benefits</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Get guidance from industry experts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Personalized career advice</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Learn from real experiences</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Make informed career decisions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
