import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Target, Plus, Minus, TrendingUp } from 'lucide-react';

type SkillGap = {
  career: string;
  currentSkills: string[];
  missingSkills: string[];
  prioritySkills: string[];
};

export default function SkillGapAnalyzer() {
  const { profile } = useAuth();
  const [skillGap, setSkillGap] = useState<SkillGap | null>(null);
  const [selectedCareer, setSelectedCareer] = useState('');
  const [loading, setLoading] = useState(false);

  const careerSkillMap: { [key: string]: { required: string[]; priority: string[] } } = {
    'Data Analyst': {
      required: ['Excel', 'SQL', 'Python', 'Data Visualization', 'Statistics', 'Power BI', 'Tableau', 'Business Acumen'],
      priority: ['SQL', 'Python', 'Data Visualization']
    },
    'Software Developer': {
      required: ['JavaScript', 'React', 'Node.js', 'Git', 'REST APIs', 'Databases', 'HTML/CSS', 'Problem Solving'],
      priority: ['JavaScript', 'React', 'Node.js']
    },
    'Data Scientist': {
      required: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization', 'TensorFlow', 'Deep Learning', 'Mathematics'],
      priority: ['Python', 'Machine Learning', 'Statistics']
    },
    'AI Engineer': {
      required: ['Python', 'Deep Learning', 'Machine Learning', 'Neural Networks', 'TensorFlow', 'PyTorch', 'Mathematics', 'Computer Vision'],
      priority: ['Deep Learning', 'Machine Learning', 'Python']
    },
    'Cloud Engineer': {
      required: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform'],
      priority: ['AWS', 'Docker', 'Kubernetes']
    },
    'Cybersecurity Analyst': {
      required: ['Network Security', 'Linux', 'Ethical Hacking', 'Python', 'Risk Assessment', 'SIEM Tools', 'Firewall Configuration', 'Penetration Testing'],
      priority: ['Network Security', 'Linux', 'Ethical Hacking']
    }
  };

  useEffect(() => {
    loadSkillGap();
  }, []);

  const loadSkillGap = async () => {
    if (!profile) return;

    const { data } = await supabase
      .from('skill_gaps')
      .select('*')
      .eq('user_id', profile.id)
      .maybeSingle();

    if (data) {
      setSkillGap({
        career: data.target_career,
        currentSkills: data.current_skills,
        missingSkills: data.missing_skills,
        prioritySkills: data.priority_skills
      });
      setSelectedCareer(data.target_career);
    }
  };

  const analyzSkills = async (career: string, currentSkillsList: string[]) => {
    if (!profile || !career) return;

    setLoading(true);
    const careerData = careerSkillMap[career];

    if (!careerData) {
      setLoading(false);
      return;
    }

    const missingSkills = careerData.required.filter(skill => !currentSkillsList.includes(skill));
    const prioritySkills = careerData.priority.filter(skill => missingSkills.includes(skill));

    const newSkillGap: SkillGap = {
      career,
      currentSkills: currentSkillsList,
      missingSkills,
      prioritySkills
    };

    await supabase.from('skill_gaps').upsert({
      user_id: profile.id,
      target_career: career,
      current_skills: currentSkillsList,
      missing_skills: missingSkills,
      priority_skills: prioritySkills
    }, {
      onConflict: 'user_id'
    });

    setSkillGap(newSkillGap);
    setLoading(false);
  };

  const [currentSkillInput, setCurrentSkillInput] = useState('');
  const [currentSkillsList, setCurrentSkillsList] = useState<string[]>(skillGap?.currentSkills || []);

  const addSkill = () => {
    if (currentSkillInput.trim() && !currentSkillsList.includes(currentSkillInput.trim())) {
      setCurrentSkillsList([...currentSkillsList, currentSkillInput.trim()]);
      setCurrentSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setCurrentSkillsList(currentSkillsList.filter(s => s !== skill));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Gap Analysis</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Target Career
            </label>
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            >
              <option value="">Choose a career path...</option>
              {Object.keys(careerSkillMap).map(career => (
                <option key={career} value={career}>{career}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Current Skills
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentSkillInput}
                onChange={(e) => setCurrentSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Type a skill and press Enter..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
              <button
                onClick={addSkill}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {currentSkillsList.map(skill => (
                <div
                  key={skill}
                  className="px-3 py-2 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"
                >
                  <span className="text-sm font-medium">{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-green-700 hover:text-green-900"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => analyzSkills(selectedCareer, currentSkillsList)}
              disabled={!selectedCareer || loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Skill Gap'}
            </button>
          </div>
        </div>
      </div>

      {skillGap && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Current Skills ({skillGap.currentSkills.length})
              </h3>
              <div className="space-y-2">
                {skillGap.currentSkills.length > 0 ? (
                  skillGap.currentSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 p-2 bg-white rounded">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-800">{skill}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No skills added yet</p>
                )}
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Missing Skills ({skillGap.missingSkills.length})
              </h3>
              <div className="space-y-2">
                {skillGap.missingSkills.length > 0 ? (
                  skillGap.missingSkills.map(skill => (
                    <div
                      key={skill}
                      className={`flex items-center gap-2 p-2 rounded ${
                        skillGap.prioritySkills.includes(skill)
                          ? 'bg-red-100 border-l-2 border-red-600'
                          : 'bg-white'
                      }`}
                    >
                      <span className="text-orange-600">!</span>
                      <span className="text-gray-800">{skill}</span>
                      {skillGap.prioritySkills.includes(skill) && (
                        <span className="ml-auto text-xs font-bold text-red-600 bg-red-200 px-2 py-1 rounded">
                          Priority
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Great! You have all the required skills</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Priority Learning Path</h3>
            <p className="text-gray-800 mb-4">Focus on these skills first for maximum career impact:</p>
            <div className="space-y-2">
              {skillGap.prioritySkills.length > 0 ? (
                skillGap.prioritySkills.map((skill, index) => (
                  <div key={skill} className="flex items-center gap-3 p-3 bg-white rounded">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-800 font-medium">{skill}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Complete your current skills first!</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
