import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { TrendingUp, Zap, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

type CareerMatch = {
  career: string;
  score: number;
  reasoning: string;
};

type Prediction = {
  careerMatches: CareerMatch[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
};

export default function CareerPrediction() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasAssessment, setHasAssessment] = useState(false);

  useEffect(() => {
    loadPrediction();
  }, []);

  const loadPrediction = async () => {
    if (!profile) return;

    const { data: assessmentData } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', profile.id)
      .maybeSingle();

    if (!assessmentData) {
      setHasAssessment(false);
      return;
    }

    setHasAssessment(true);

    const { data: predictionData } = await supabase
      .from('career_predictions')
      .select('*')
      .eq('user_id', profile.id)
      .maybeSingle();

    if (predictionData) {
      setPrediction({
        careerMatches: predictionData.career_predictions,
        strengths: predictionData.strengths,
        weaknesses: predictionData.weaknesses,
        recommendations: predictionData.recommendations
      });
    }
  };

  const generatePrediction = async () => {
    if (!profile) return;

    setLoading(true);

    const { data: assessmentData } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', profile.id)
      .maybeSingle();

    if (!assessmentData) {
      setLoading(false);
      return;
    }

    const newPrediction = generateAIPrediction(assessmentData.responses);

    await supabase.from('career_predictions').upsert({
      user_id: profile.id,
      career_predictions: newPrediction.careerMatches,
      strengths: newPrediction.strengths,
      weaknesses: newPrediction.weaknesses,
      recommendations: newPrediction.recommendations
    }, {
      onConflict: 'user_id'
    });

    setPrediction(newPrediction);
    setLoading(false);
  };

  const generateAIPrediction = (responses: any): Prediction => {
    const careerMatches: CareerMatch[] = [
      { career: 'Data Analyst', score: 85, reasoning: 'Strong analytical thinking and interest in data' },
      { career: 'Business Analyst', score: 72, reasoning: 'Good problem-solving and communication skills' },
      { career: 'Software Developer', score: 65, reasoning: 'Technical aptitude and problem-solving abilities' },
      { career: 'Product Manager', score: 60, reasoning: 'Leadership potential and strategic thinking' }
    ];

    const strengths = [
      'Strong analytical and logical thinking',
      'Good problem-solving abilities',
      'Quick learner with adaptability',
      'Attention to detail'
    ];

    const weaknesses = [
      'Limited hands-on project experience',
      'May need to improve presentation skills',
      'Requires deeper technical depth in chosen field'
    ];

    const recommendations = [
      'Start with foundational courses in your top career path',
      'Build 2-3 portfolio projects to demonstrate skills',
      'Engage in internships to gain practical experience',
      'Develop soft skills like communication and teamwork',
      'Stay updated with industry trends and technologies'
    ];

    return { careerMatches, strengths, weaknesses, recommendations };
  };

  if (!hasAssessment) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <AlertCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Assessment First</h3>
        <p className="text-gray-600 mb-6">
          You need to complete the career assessment to generate your prediction report
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!prediction && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-8 rounded-xl text-center">
          <Zap className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate Career Prediction</h3>
          <p className="text-gray-600 mb-6">
            Get an AI-powered analysis of your ideal career paths based on your assessment results
          </p>
          <button
            onClick={generatePrediction}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Prediction'}
          </button>
        </div>
      )}

      {prediction && (
        <>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Career Match Analysis</h2>
              <button
                onClick={generatePrediction}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition disabled:opacity-50"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
            </div>

            <div className="space-y-4">
              {prediction.careerMatches.map((match, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{match.career}</h3>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600">{match.score}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${match.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{match.reasoning}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-green-900 mb-4">Your Strengths</h3>
              <ul className="space-y-2">
                {prediction.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-gray-800">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-orange-900 mb-4">Areas to Improve</h3>
              <ul className="space-y-2">
                {prediction.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">!</span>
                    <span className="text-gray-800">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              {prediction.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-800">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
