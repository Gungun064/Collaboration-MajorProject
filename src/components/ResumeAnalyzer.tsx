import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Upload, CheckCircle2, AlertCircle, Lightbulb, FileText } from 'lucide-react';

type ResumeAnalysis = {
  qualityScore: number;
  strengths: string[];
  improvements: string[];
  missingSkills: string[];
  tips: string[];
};

export default function ResumeAnalyzer() {
  const { profile } = useAuth();
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeText, setResumeText] = useState('');

  const analyzeResume = async () => {
    if (!profile || !resumeText.trim()) return;

    setLoading(true);

    const newAnalysis = generateResumeAnalysis(resumeText);

    await supabase.from('resume_analyses').insert({
      user_id: profile.id,
      resume_url: resumeUrl || 'uploaded',
      quality_score: newAnalysis.qualityScore,
      strengths: newAnalysis.strengths,
      improvements: newAnalysis.improvements,
      missing_skills: newAnalysis.missingSkills,
      tips: newAnalysis.tips
    });

    setAnalysis(newAnalysis);
    setLoading(false);
  };

  const generateResumeAnalysis = (text: string): ResumeAnalysis => {
    let score = 60;
    const strengths: string[] = [];
    const improvements: string[] = [];
    const missingSkills: string[] = [];
    const tips: string[] = [];

    if (text.includes('Project') || text.includes('project')) {
      score += 10;
      strengths.push('Includes project experience');
    } else {
      improvements.push('Add specific project details and outcomes');
      missingSkills.push('Project descriptions');
    }

    if (text.includes('Achievement') || text.includes('achievement') || text.includes('accomplished')) {
      score += 5;
      strengths.push('Includes achievements and measurable results');
    } else {
      improvements.push('Add quantifiable achievements (e.g., "increased efficiency by 30%")');
    }

    if (text.includes('Skill') || text.includes('skill') || text.includes('Python') || text.includes('Java')) {
      score += 10;
      strengths.push('Technical skills are listed');
    } else {
      improvements.push('Include a dedicated skills section with technical abilities');
    }

    if (text.includes('Experience') || text.includes('Internship')) {
      score += 10;
      strengths.push('Work experience is highlighted');
    } else {
      improvements.push('Add more details about your work experience and responsibilities');
    }

    if (text.includes('Education') || text.includes('Degree') || text.includes('Bachelor')) {
      score += 5;
      strengths.push('Educational background is included');
    } else {
      improvements.push('Include your educational qualifications');
    }

    if (text.length < 300) {
      score -= 10;
      improvements.push('Expand your resume with more details - aim for at least 300 words');
    } else if (text.length > 1500) {
      score -= 5;
      improvements.push('Consider condensing your resume - keep it concise and relevant');
    } else {
      score += 5;
      strengths.push('Resume length is appropriate');
    }

    score = Math.min(100, Math.max(0, score));

    if (improvements.length === 0) {
      improvements.push('Your resume looks great! Keep it updated with new experiences');
    }

    tips.push('Use action verbs like "developed", "implemented", "led", "managed"');
    tips.push('Quantify your achievements with numbers and percentages');
    tips.push('Tailor your resume for each job application');
    tips.push('Keep formatting consistent and professional');
    tips.push('Use bullet points for readability');

    return {
      qualityScore: score,
      strengths,
      improvements,
      missingSkills,
      tips
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume Analyzer</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume URL (Optional)
            </label>
            <input
              type="text"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="Paste your resume link..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume Content
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here for analysis..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
            />
          </div>

          <button
            onClick={analyzeResume}
            disabled={loading || !resumeText.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>
      </div>

      {analysis && (
        <>
          <div className={`bg-gradient-to-r ${getScoreBgColor(analysis.qualityScore)} text-white p-8 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-lg mb-2">Resume Quality Score</p>
                <p className={`text-5xl font-bold ${getScoreColor(analysis.qualityScore)}`}>
                  {analysis.qualityScore}%
                </p>
              </div>
              <FileText className="w-20 h-20 opacity-20" />
            </div>
            <div className="mt-4 text-sm text-white/90">
              {analysis.qualityScore >= 80
                ? 'Excellent! Your resume is well-structured and professional.'
                : analysis.qualityScore >= 60
                ? 'Good! There are some improvements you can make.'
                : 'Needs work. Follow the recommendations below to improve.'}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                    <span className="text-gray-800">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {analysis.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold">!</span>
                    <span className="text-gray-800">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Pro Tips to Strengthen Your Resume
            </h3>
            <div className="space-y-3">
              {analysis.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded">
                  <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                  <span className="text-gray-800">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {analysis.missingSkills.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-red-900 mb-4">Consider Adding</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                  >
                    + {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
