import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  Linkedin,
  Star,
  TrendingUp,
  Users,
  MessageSquare,
  Map,
  Zap,
  CheckCircle2,
  AlertCircle,
  Copy,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Award,
  Briefcase,
  Search
} from 'lucide-react';

type ScoreCard = {
  completeness: number;
  recruiterVisibility: number;
  networking: number;
  industryReadiness: number;
  overall: number;
};

type ProfileData = {
  headline: string;
  about: string;
  skills: string;
  experience: string;
  projects: string;
  certifications: string;
  education: string;
};

type ConnectionMessage = {
  recipientType: string;
  recipientRole: string;
  message: string;
};

type AnalysisResult = {
  scores: ScoreCard;
  missingKeywords: string[];
  missingCertifications: string[];
  profileImprovements: string[];
  networkingOpportunities: string[];
  industryTips: string[];
};

const CAREER_NETWORKING_GUIDE: Record<string, {
  professionals: string[];
  hashtags: string[];
  contentTypes: string[];
  certifications: string[];
  keywords: string[];
}> = {
  'Data Analyst': {
    professionals: ['Analytics Managers', 'Business Intelligence Leads', 'Data Engineers', 'Product Managers', 'SQL DBAs', 'BI Developers', 'Tableau/Power BI Specialists'],
    hashtags: ['#DataAnalytics', '#SQL', '#PowerBI', '#Tableau', '#BusinessIntelligence', '#DataVisualization'],
    contentTypes: ['Dashboard screenshots', 'SQL tips', 'Data storytelling posts', 'Industry analysis articles'],
    certifications: ['Google Data Analytics Certificate', 'Microsoft Power BI Certification', 'Tableau Desktop Specialist', 'AWS Data Analytics'],
    keywords: ['Data Analysis', 'SQL', 'Power BI', 'Tableau', 'Python', 'Excel', 'Statistical Analysis', 'A/B Testing', 'KPI Dashboards']
  },
  'Data Scientist': {
    professionals: ['ML Engineers', 'Research Scientists', 'AI Product Managers', 'Data Engineering Leads', 'Quantitative Analysts'],
    hashtags: ['#DataScience', '#MachineLearning', '#Python', '#AI', '#DeepLearning', '#NLP'],
    contentTypes: ['Model performance case studies', 'Research paper summaries', 'Kaggle competition results', 'Tutorial posts'],
    certifications: ['Google Professional Data Engineer', 'AWS Machine Learning Specialty', 'IBM Data Science Certificate', 'Coursera ML Specialization'],
    keywords: ['Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'Statistical Modeling', 'Feature Engineering', 'Model Deployment', 'Scikit-learn']
  },
  'Software Developer': {
    professionals: ['Engineering Managers', 'Senior Software Engineers', 'DevOps Engineers', 'Tech Leads', 'Open Source Maintainers', 'CTOs at startups'],
    hashtags: ['#SoftwareDevelopment', '#JavaScript', '#React', '#NodeJS', '#WebDevelopment', '#OpenSource'],
    contentTypes: ['Code snippets', 'GitHub project showcases', 'Tech tutorial posts', 'Problem-solving walkthroughs'],
    certifications: ['AWS Developer Associate', 'Google Associate Cloud Engineer', 'Meta Front-End Developer Certificate', 'MongoDB Developer Certificate'],
    keywords: ['JavaScript', 'React', 'Node.js', 'REST APIs', 'Git', 'CI/CD', 'Agile', 'TypeScript', 'Microservices']
  },
  'AI Engineer': {
    professionals: ['AI Research Scientists', 'ML Platform Engineers', 'Applied AI Leads', 'Robotics Engineers', 'NLP Specialists', 'Computer Vision Engineers'],
    hashtags: ['#ArtificialIntelligence', '#MachineLearning', '#LLM', '#GenAI', '#DeepLearning', '#MLOps'],
    contentTypes: ['Model benchmark results', 'AI research insights', 'LLM experiment threads', 'Tutorial notebooks'],
    certifications: ['Google Professional ML Engineer', 'AWS AI Practitioner', 'NVIDIA Deep Learning Certificate', 'Hugging Face Certifications'],
    keywords: ['Deep Learning', 'LLM', 'PyTorch', 'TensorFlow', 'MLOps', 'Generative AI', 'Transformers', 'Computer Vision', 'NLP']
  },
  'Cloud Engineer': {
    professionals: ['Cloud Architects', 'Site Reliability Engineers', 'Platform Engineers', 'DevOps Leads', 'Solutions Architects', 'FinOps Specialists'],
    hashtags: ['#CloudComputing', '#AWS', '#Azure', '#GCP', '#DevOps', '#Kubernetes', '#Terraform'],
    contentTypes: ['Architecture diagrams', 'Cost optimization tips', 'Cloud migration stories', 'Infra-as-code examples'],
    certifications: ['AWS Solutions Architect', 'Google Cloud Professional', 'Azure Administrator', 'HashiCorp Terraform Associate'],
    keywords: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Infrastructure as Code', 'Serverless']
  },
  'Cybersecurity Analyst': {
    professionals: ['CISOs', 'Penetration Testers', 'SOC Analysts', 'Threat Intelligence Analysts', 'Security Architects', 'Bug Bounty Hunters'],
    hashtags: ['#Cybersecurity', '#EthicalHacking', '#InfoSec', '#SOC', '#PenTest', '#ThreatIntelligence'],
    contentTypes: ['CTF writeups', 'Vulnerability research posts', 'Security tool reviews', 'Threat landscape analysis'],
    certifications: ['CompTIA Security+', 'CEH (Certified Ethical Hacker)', 'OSCP', 'CISSP', 'CompTIA CySA+'],
    keywords: ['Network Security', 'Penetration Testing', 'SIEM', 'Incident Response', 'Vulnerability Assessment', 'Ethical Hacking', 'Linux', 'Python']
  },
  'DevOps Engineer': {
    professionals: ['Platform Engineers', 'SREs', 'Infrastructure Architects', 'Release Managers', 'Cloud DevOps Leads'],
    hashtags: ['#DevOps', '#CI/CD', '#Kubernetes', '#Docker', '#SRE', '#GitOps', '#Automation'],
    contentTypes: ['Pipeline optimization tips', 'Deployment war stories', 'Monitoring setup guides', 'Automation script shares'],
    certifications: ['AWS DevOps Engineer Professional', 'CKA (Certified Kubernetes Administrator)', 'Docker Certified Associate', 'GitHub Actions Certification'],
    keywords: ['CI/CD', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Ansible', 'Linux', 'Monitoring', 'SRE']
  },
  'Product Manager': {
    professionals: ['Senior Product Managers', 'Product Directors', 'UX Researchers', 'Engineering Managers', 'Startup Founders', 'Growth Hackers'],
    hashtags: ['#ProductManagement', '#ProductStrategy', '#Agile', '#UserResearch', '#GrowthHacking', '#ProductLed'],
    contentTypes: ['Product teardowns', 'Feature launch case studies', 'Roadmap strategy posts', 'Framework explanations'],
    certifications: ['PMI-ACP (Agile Certified)', 'Product School Certification', 'CSPO (Certified Scrum Product Owner)', 'Google UX Design Certificate'],
    keywords: ['Product Strategy', 'Roadmapping', 'Agile', 'User Stories', 'OKRs', 'Stakeholder Management', 'Market Research', 'A/B Testing']
  }
};

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="7" />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-900">{score}</span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-600 text-center leading-tight">{label}</span>
    </div>
  );
}

export default function LinkedInOptimizer() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'analyze' | 'network' | 'messages' | 'roadmap'>('analyze');
  const [profileUrl, setProfileUrl] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [profileData, setProfileData] = useState<ProfileData>({
    headline: '',
    about: '',
    skills: '',
    experience: '',
    projects: '',
    certifications: '',
    education: ''
  });
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [messages, setMessages] = useState<ConnectionMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('headline');
  const [savedMessages, setSavedMessages] = useState<any[]>([]);
  const [generatingMessages, setGeneratingMessages] = useState(false);

  useEffect(() => {
    loadExistingAnalysis();
  }, []);

  const loadExistingAnalysis = async () => {
    if (!profile) return;
    setLoading(true);

    const { data: analysisData } = await supabase
      .from('linkedin_analyses')
      .select('*')
      .eq('user_id', profile.id)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (analysisData) {
      setProfileUrl(analysisData.profile_url || '');
      setTargetRole(analysisData.target_role || '');
      if (analysisData.profile_data) {
        setProfileData(analysisData.profile_data as ProfileData);
      }
      setAnalysis({
        scores: {
          completeness: analysisData.completeness_score,
          recruiterVisibility: analysisData.recruiter_visibility_score,
          networking: analysisData.networking_score,
          industryReadiness: analysisData.industry_readiness_score,
          overall: analysisData.overall_score
        },
        missingKeywords: analysisData.missing_keywords || [],
        missingCertifications: analysisData.missing_certifications || [],
        profileImprovements: analysisData.profile_improvements || [],
        networkingOpportunities: analysisData.networking_opportunities || [],
        industryTips: analysisData.industry_tips || []
      });
    }

    const { data: msgData } = await supabase
      .from('linkedin_connection_messages')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(10);

    setSavedMessages(msgData || []);
    setLoading(false);
  };

  const runAnalysis = async () => {
    if (!profile) return;
    setAnalyzing(true);

    const result = generateAnalysis(profileData, targetRole);

    await supabase.from('linkedin_analyses').upsert({
      user_id: profile.id,
      profile_url: profileUrl,
      profile_data: profileData,
      target_role: targetRole,
      completeness_score: result.scores.completeness,
      recruiter_visibility_score: result.scores.recruiterVisibility,
      networking_score: result.scores.networking,
      industry_readiness_score: result.scores.industryReadiness,
      overall_score: result.scores.overall,
      missing_keywords: result.missingKeywords,
      missing_certifications: result.missingCertifications,
      profile_improvements: result.profileImprovements,
      networking_opportunities: result.networkingOpportunities,
      industry_tips: result.industryTips,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });

    setAnalysis(result);
    setAnalyzing(false);
    setActiveTab('analyze');
  };

  const generateAnalysis = (data: ProfileData, role: string): AnalysisResult => {
    const roleGuide = CAREER_NETWORKING_GUIDE[role] || CAREER_NETWORKING_GUIDE['Software Developer'];

    let completeness = 30;
    if (data.headline.trim().length > 10) completeness += 15;
    if (data.about.trim().length > 50) completeness += 15;
    if (data.skills.trim().length > 20) completeness += 10;
    if (data.experience.trim().length > 30) completeness += 10;
    if (data.education.trim().length > 10) completeness += 5;
    if (data.projects.trim().length > 20) completeness += 10;
    if (data.certifications.trim().length > 5) completeness += 5;
    completeness = Math.min(100, completeness);

    const allText = Object.values(data).join(' ').toLowerCase();
    const keywordsFound = roleGuide.keywords.filter(k => allText.includes(k.toLowerCase())).length;
    const recruiterVisibility = Math.min(100, 30 + Math.round((keywordsFound / roleGuide.keywords.length) * 55) + (profileUrl ? 15 : 0));

    const certsFound = roleGuide.certifications.filter(c => allText.includes(c.toLowerCase().split(' ')[0])).length;
    const industryReadiness = Math.min(100, 25 + Math.round((certsFound / roleGuide.certifications.length) * 40) + Math.round((keywordsFound / roleGuide.keywords.length) * 35));

    const networking = Math.min(100, Math.round((completeness * 0.4) + (recruiterVisibility * 0.3) + (industryReadiness * 0.3)));
    const overall = Math.round((completeness + recruiterVisibility + networking + industryReadiness) / 4);

    const missingKeywords = roleGuide.keywords.filter(k => !allText.includes(k.toLowerCase())).slice(0, 6);
    const missingCertifications = roleGuide.certifications.filter(c => !allText.includes(c.toLowerCase().split(' ')[0])).slice(0, 4);

    const profileImprovements: string[] = [];
    if (data.headline.length < 20) profileImprovements.push('Write a compelling headline with your role, top skills, and a value proposition (e.g., "Data Analyst | Python & SQL | Turning Data into Decisions")');
    if (data.about.length < 100) profileImprovements.push('Expand your About section to at least 150 words — tell your story, highlight achievements, and include a CTA');
    if (data.skills.split(',').length < 8) profileImprovements.push('Add at least 10-15 relevant skills to improve Search Appearance and endorsements');
    if (data.projects.length < 30) profileImprovements.push('Add 2-3 featured projects with measurable results, GitHub links, and tech stack details');
    if (!data.certifications.trim()) profileImprovements.push('Add relevant certifications — they significantly boost recruiter visibility and credibility');
    if (!profileUrl) profileImprovements.push('Customize your LinkedIn URL (linkedin.com/in/yourname) to improve personal branding');
    profileImprovements.push('Enable "Open to Work" privately so recruiters can find you without alerting your employer');
    profileImprovements.push('Add a professional headshot — profiles with photos get 21x more views');

    const networkingOpportunities = [
      `Connect with ${roleGuide.professionals[0]} and ${roleGuide.professionals[1]} in your target industry`,
      `Follow companies like ${role === 'AI Engineer' ? 'OpenAI, DeepMind, NVIDIA' : role === 'Data Analyst' ? 'Tableau, Looker, Databricks' : 'Google, Microsoft, Amazon'} for job postings`,
      'Join LinkedIn Groups related to your target role to network with like-minded professionals',
      `Use hashtags like ${roleGuide.hashtags.slice(0, 3).join(', ')} to increase post visibility`,
      'Engage with posts from target companies — comment thoughtfully before sending connection requests',
      'Reach out to alumni from your college who work in your target role — acceptance rate is 3x higher'
    ];

    const industryTips = [
      `Post content using ${roleGuide.hashtags[0]} and ${roleGuide.hashtags[1]} to attract recruiter attention`,
      `Share ${roleGuide.contentTypes[0]} to demonstrate practical expertise`,
      `Earn the "${roleGuide.certifications[0]}" certification to rank higher in recruiter searches`,
      'Request skill endorsements from professors, classmates, or colleagues to validate your top skills',
      `Follow thought leaders in ${role} to stay updated and engage with trending content`,
      'Turn on "Creator Mode" to showcase your posts and gain more followers'
    ];

    return {
      scores: { completeness, recruiterVisibility, networking, industryReadiness, overall },
      missingKeywords,
      missingCertifications,
      profileImprovements,
      networkingOpportunities,
      industryTips
    };
  };

  const generateConnectionMessages = async () => {
    if (!profile || !targetRole) return;
    setGeneratingMessages(true);

    const roleGuide = CAREER_NETWORKING_GUIDE[targetRole] || CAREER_NETWORKING_GUIDE['Software Developer'];
    const userName = profile.full_name?.split(' ')[0] || 'there';

    const generated: ConnectionMessage[] = [
      {
        recipientType: 'Recruiter',
        recipientRole: `${targetRole} Recruiter`,
        message: `Hi [Name], I'm ${userName}, a ${targetRole} candidate passionate about ${roleGuide.keywords[0]} and ${roleGuide.keywords[1]}. I noticed you specialize in placing ${targetRole}s and would love to connect. I'm actively building my skills and exploring opportunities — happy to share my portfolio if helpful. Looking forward to connecting!`
      },
      {
        recipientType: 'Industry Expert',
        recipientRole: `Senior ${targetRole}`,
        message: `Hi [Name], I've been following your work in ${roleGuide.keywords[0]} and find your insights incredibly valuable. I'm currently learning ${roleGuide.keywords[1]} and ${roleGuide.keywords[2]} as I grow toward a ${targetRole} role. Would love to connect and learn from your journey — any advice would mean a lot. Thank you!`
      },
      {
        recipientType: 'Peer / Fellow Learner',
        recipientRole: `${targetRole} Aspirant`,
        message: `Hi [Name], I noticed we're both on a similar journey toward ${targetRole} roles and share interest in ${roleGuide.keywords[0]}. I'd love to connect, exchange learnings, and support each other's growth. Always better to grow with a community than alone. Would you be open to connecting?`
      },
      {
        recipientType: 'Hiring Manager',
        recipientRole: 'Engineering / Analytics Manager',
        message: `Hi [Name], I'm reaching out because I admire [Company]'s work in ${roleGuide.keywords[0]}. As an aspiring ${targetRole} with hands-on experience in ${roleGuide.keywords[1]} and ${roleGuide.keywords[2]}, I believe I could add real value to your team. I'd love to connect and learn more about opportunities at [Company]. Thank you for your time!`
      },
      {
        recipientType: 'Alumni',
        recipientRole: `${targetRole} at [Company]`,
        message: `Hi [Name], I saw that you're a ${targetRole} at [Company] and also an alumnus of [University]. I'm currently working toward the same career path and would greatly appreciate 15 minutes of your time for advice on breaking into the field. Would you be open to a quick virtual coffee chat? Thank you!`
      },
      {
        recipientType: 'HR Professional',
        recipientRole: 'HR / Talent Acquisition',
        message: `Hi [Name], I'm ${userName}, actively seeking ${targetRole} opportunities. With skills in ${roleGuide.keywords.slice(0, 3).join(', ')}, I'm eager to contribute to a forward-thinking team. I'd love to stay on your radar for relevant openings and connect professionally. Thank you for considering!`
      }
    ];

    for (const msg of generated) {
      await supabase.from('linkedin_connection_messages').insert({
        user_id: profile.id,
        recipient_type: msg.recipientType,
        recipient_role: msg.recipientRole,
        message: msg.message,
        context: targetRole
      });
    }

    setMessages(generated);
    const { data } = await supabase
      .from('linkedin_connection_messages')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(12);
    setSavedMessages(data || []);
    setGeneratingMessages(false);
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const displayMessages = messages.length > 0 ? messages : savedMessages.map(m => ({
    recipientType: m.recipient_type,
    recipientRole: m.recipient_role,
    message: m.message
  }));

  const roleGuide = targetRole ? CAREER_NETWORKING_GUIDE[targetRole] : null;
  const allRoles = Object.keys(CAREER_NETWORKING_GUIDE);

  const profileSections = [
    { key: 'headline', label: 'Headline', placeholder: 'e.g. Data Analyst | Python & SQL | Turning complex data into business insights' },
    { key: 'about', label: 'About / Summary', placeholder: 'Paste your About section (aim for 150-300 words with keywords, achievements, and a call to action)' },
    { key: 'skills', label: 'Skills', placeholder: 'e.g. Python, SQL, Power BI, Tableau, Excel, Statistics, Machine Learning...' },
    { key: 'experience', label: 'Experience', placeholder: 'List your job titles, companies, and key bullet points with measurable results...' },
    { key: 'projects', label: 'Projects', placeholder: 'Describe your projects: title, tech used, outcomes achieved...' },
    { key: 'certifications', label: 'Certifications', placeholder: 'e.g. Google Data Analytics Certificate, AWS Cloud Practitioner...' },
    { key: 'education', label: 'Education', placeholder: 'Degree, institution, graduation year, relevant coursework...' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            LinkedIn Profile Optimizer
          </h1>
          <p className="text-gray-600 ml-13">AI-powered profile analysis, networking guidance, and connection message generator</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'analyze', icon: Search, label: 'Profile Analysis' },
            { id: 'network', icon: Users, label: 'Networking Guide' },
            { id: 'messages', icon: MessageSquare, label: 'Connection Messages' },
            { id: 'roadmap', icon: Map, label: 'Growth Roadmap' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── ANALYZE TAB ── */}
        {activeTab === 'analyze' && (
          <div className="p-6 space-y-6">
            {/* Input Form */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile URL (Optional)</label>
                    <input
                      type="text"
                      value={profileUrl}
                      onChange={e => setProfileUrl(e.target.value)}
                      placeholder="linkedin.com/in/yourname"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Role <span className="text-red-500">*</span></label>
                    <select
                      value={targetRole}
                      onChange={e => setTargetRole(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm bg-white"
                    >
                      <option value="">Select your target career...</option>
                      {allRoles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  {profileSections.map(section => (
                    <div key={section.key} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedSection(expandedSection === section.key ? null : section.key)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition text-left"
                      >
                        <span className="font-medium text-gray-900 text-sm">{section.label}</span>
                        <div className="flex items-center gap-2">
                          {profileData[section.key as keyof ProfileData]?.trim() && (
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          )}
                          {expandedSection === section.key ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                      </button>
                      {expandedSection === section.key && (
                        <div className="p-4">
                          <textarea
                            value={profileData[section.key as keyof ProfileData]}
                            onChange={e => setProfileData(prev => ({ ...prev, [section.key]: e.target.value }))}
                            placeholder={section.placeholder}
                            rows={section.key === 'about' || section.key === 'experience' ? 5 : 3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none text-sm"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={runAnalysis}
                  disabled={analyzing || !targetRole}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {analyzing ? (
                    <><RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Profile...</>
                  ) : (
                    <><Zap className="w-4 h-4" /> Analyze & Generate Insights</>
                  )}
                </button>
              </div>

              {/* Score Card */}
              <div className="space-y-4">
                {analysis ? (
                  <>
                    <h2 className="text-xl font-bold text-gray-900">Profile Scorecard</h2>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-lg text-center">
                      <p className="text-blue-100 text-sm mb-2">Overall LinkedIn Score</p>
                      <div className="text-6xl font-bold mb-1">{analysis.scores.overall}</div>
                      <div className="text-blue-100 text-sm">out of 100</div>
                      <div className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        analysis.scores.overall >= 80 ? 'bg-green-500' :
                        analysis.scores.overall >= 60 ? 'bg-yellow-500 text-gray-900' :
                        analysis.scores.overall >= 40 ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {analysis.scores.overall >= 80 ? 'Excellent' :
                         analysis.scores.overall >= 60 ? 'Good' :
                         analysis.scores.overall >= 40 ? 'Fair' : 'Needs Work'}
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                      <div className="grid grid-cols-2 gap-6">
                        <ScoreRing score={analysis.scores.completeness} label="Profile Completeness" color="#2563eb" />
                        <ScoreRing score={analysis.scores.recruiterVisibility} label="Recruiter Visibility" color="#16a34a" />
                        <ScoreRing score={analysis.scores.networking} label="Networking Score" color="#ea580c" />
                        <ScoreRing score={analysis.scores.industryReadiness} label="Industry Readiness" color="#0891b2" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl p-8 text-center">
                    <Star className="w-12 h-12 text-blue-300 mx-auto mb-3" />
                    <p className="text-blue-900 font-semibold mb-2">Your scorecard will appear here</p>
                    <p className="text-blue-600 text-sm">Fill in your profile info and select a target role, then click Analyze</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Insights */}
            {analysis && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-xl">
                  <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> Missing Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">+ {kw}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-xl">
                  <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5" /> Missing Certifications
                  </h3>
                  <ul className="space-y-1">
                    {analysis.missingCertifications.map((cert, i) => (
                      <li key={i} className="text-sm text-gray-800 flex items-start gap-2">
                        <span className="text-orange-600 font-bold mt-0.5">!</span> {cert}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-xl">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> Profile Improvements
                  </h3>
                  <ul className="space-y-2">
                    {analysis.profileImprovements.slice(0, 5).map((tip, i) => (
                      <li key={i} className="text-sm text-gray-800 flex items-start gap-2">
                        <span className="text-blue-600 font-bold mt-0.5">{i + 1}.</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-xl">
                  <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> Industry-Specific Tips
                  </h3>
                  <ul className="space-y-2">
                    {analysis.industryTips.map((tip, i) => (
                      <li key={i} className="text-sm text-gray-800 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── NETWORK TAB ── */}
        {activeTab === 'network' && (
          <div className="p-6 space-y-6">
            {!targetRole ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-4">Select a target role in the Profile Analysis tab to see personalized networking recommendations</p>
                <button onClick={() => setActiveTab('analyze')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                  Go to Profile Analysis
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Smart Networking for {targetRole}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">{targetRole}</span>
                </div>

                {roleGuide && (
                  <>
                    {/* Professionals to connect with */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" /> Professionals to Connect With
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {roleGuide.professionals.map((p, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                              {i + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{p}</p>
                              <p className="text-xs text-gray-500">Key connection for {targetRole}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Networking opportunities */}
                    {analysis && (
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-600" /> Networking Opportunities
                        </h3>
                        <ul className="space-y-3">
                          {analysis.networkingOpportunities.map((opp, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                              <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                                {i + 1}
                              </div>
                              <p className="text-sm text-gray-800">{opp}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Hashtags */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" /> Power Hashtags for Visibility
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {roleGuide.hashtags.map((tag, i) => (
                          <span key={i} className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Content Strategy */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-orange-600" /> Content Posting Strategy
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {roleGuide.contentTypes.map((ct, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0" />
                            <p className="text-sm text-gray-800">{ct}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {activeTab === 'messages' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-900">AI Connection Messages</h2>
                <p className="text-gray-600 text-sm mt-1">Personalized outreach messages for different recipient types</p>
              </div>
              <button
                onClick={generateConnectionMessages}
                disabled={generatingMessages || !targetRole}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50"
              >
                {generatingMessages ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</>
                ) : (
                  <><Zap className="w-4 h-4" /> Generate Messages</>
                )}
              </button>
            </div>

            {!targetRole && (
              <div className="text-center py-8 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200">
                <MessageSquare className="w-12 h-12 text-blue-300 mx-auto mb-3" />
                <p className="text-blue-900 font-medium">Select a target role first</p>
                <p className="text-blue-600 text-sm mt-1">Messages are personalized for your target career path</p>
              </div>
            )}

            {displayMessages.length > 0 && (
              <div className="space-y-4">
                {displayMessages.map((msg, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-1">
                          {msg.recipientType}
                        </span>
                        <p className="text-sm text-gray-500">{msg.recipientRole}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(msg.message, idx)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                          copiedIdx === idx ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {copiedIdx === idx ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-800 leading-relaxed">{msg.message}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Replace [Name] and [Company] with actual details before sending</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ROADMAP TAB ── */}
        {activeTab === 'roadmap' && (
          <div className="p-6 space-y-6">
            {!targetRole ? (
              <div className="text-center py-12">
                <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-4">Select a target role to view your personalized LinkedIn Growth Roadmap</p>
                <button onClick={() => setActiveTab('analyze')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                  Set Target Role
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">LinkedIn Growth Roadmap</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">{targetRole}</span>
                </div>

                {roleGuide && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Skills to highlight */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Skills to Highlight</h3>
                          <p className="text-xs text-gray-500">Top keywords for recruiter searches</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {roleGuide.keywords.map((kw, i) => (
                          <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200">{kw}</span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications to add */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Certifications to Earn</h3>
                          <p className="text-xs text-gray-500">Boost credibility and search ranking</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {roleGuide.certifications.map((cert, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-800">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Professionals to follow */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Types of Professionals to Connect</h3>
                          <p className="text-xs text-gray-500">Build a strategic network</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {roleGuide.professionals.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-800">
                            <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-orange-700 text-xs font-bold">{i + 1}</span>
                            </div>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Content strategy */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Content Strategy</h3>
                          <p className="text-xs text-gray-500">Post types that attract your target audience</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {roleGuide.contentTypes.map((ct, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-800">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                            {ct}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Phase-based networking plan */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-5 text-lg">90-Day Networking Improvement Plan</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      {
                        phase: 'Days 1-30',
                        title: 'Foundation',
                        color: 'blue',
                        steps: [
                          'Optimize headline with target job title + top 2 skills',
                          'Rewrite About section with keywords and CTA',
                          'Add all missing skills from the list',
                          'Get profile photo — professional or clean background',
                          'Connect with 10 classmates/professors'
                        ]
                      },
                      {
                        phase: 'Days 31-60',
                        title: 'Build Credibility',
                        color: 'green',
                        steps: [
                          'Enroll in a top certification for your target role',
                          'Add 2 projects with measurable outcomes to your profile',
                          'Post 3 times per week using target hashtags',
                          'Send 5 personalized connection requests weekly',
                          'Request endorsements from peers for top skills'
                        ]
                      },
                      {
                        phase: 'Days 61-90',
                        title: 'Active Networking',
                        color: 'orange',
                        steps: [
                          'Enable "Open to Work" for recruiters',
                          'Reach out to 2 alumni working in your target role',
                          'Comment thoughtfully on posts from hiring managers',
                          'Share a project walkthrough or learnings post',
                          'Apply to internships/jobs using optimized profile'
                        ]
                      }
                    ].map((phase, i) => (
                      <div key={i} className={`bg-${phase.color}-50 border border-${phase.color}-200 rounded-xl p-5`}>
                        <div className={`inline-block px-3 py-1 bg-${phase.color}-600 text-white text-xs font-bold rounded-full mb-3`}>
                          {phase.phase}
                        </div>
                        <h4 className="font-bold text-gray-900 mb-3">{phase.title}</h4>
                        <ul className="space-y-2">
                          {phase.steps.map((step, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-gray-800">
                              <div className={`w-5 h-5 bg-${phase.color}-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold`} style={{ fontSize: '9px' }}>
                                {j + 1}
                              </div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
