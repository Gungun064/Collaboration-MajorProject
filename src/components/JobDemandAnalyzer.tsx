import { useState } from 'react';
import { TrendingUp, Building2, Briefcase, DollarSign } from 'lucide-react';

type JobDemandData = {
  job: string;
  demand: string;
  growth: string;
  salary: string;
  skills: string[];
  companies: string[];
  trends: string[];
};

export default function JobDemandAnalyzer() {
  const [selectedJob, setSelectedJob] = useState('');

  const jobDemandData: { [key: string]: JobDemandData } = {
    'Data Scientist': {
      job: 'Data Scientist',
      demand: 'Very High',
      growth: '+35% by 2030',
      salary: '$95,000 - $150,000',
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
      companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Netflix', 'Tesla'],
      trends: [
        'Increasing demand for AI/ML specialists',
        'Growing emphasis on ethical AI',
        'More remote opportunities',
        'Higher salaries in tech hubs',
        'Need for industry-specific expertise'
      ]
    },
    'AI Engineer': {
      job: 'AI Engineer',
      demand: 'Extreme',
      growth: '+40% by 2030',
      salary: '$100,000 - $175,000',
      skills: ['Python', 'Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch'],
      companies: ['Google', 'OpenAI', 'Microsoft', 'NVIDIA', 'Meta', 'Apple'],
      trends: [
        'Fastest growing tech role',
        'Highest salary growth in tech',
        'Competition for talent is intense',
        'Entry-level positions require strong fundamentals',
        'Emerging AI startups hiring aggressively'
      ]
    },
    'Cloud Engineer': {
      job: 'Cloud Engineer',
      demand: 'Very High',
      growth: '+28% by 2030',
      salary: '$85,000 - $140,000',
      skills: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'CI/CD'],
      companies: ['Amazon', 'Microsoft', 'Google', 'IBM', 'Oracle', 'Salesforce'],
      trends: [
        'Cloud migration accelerating globally',
        'Multi-cloud expertise in demand',
        'Certifications valued highly',
        'Competitive salary packages',
        'Strong job security'
      ]
    },
    'Cybersecurity Analyst': {
      job: 'Cybersecurity Analyst',
      demand: 'Very High',
      growth: '+33% by 2030',
      salary: '$75,000 - $130,000',
      skills: ['Network Security', 'Penetration Testing', 'Linux', 'Python', 'SIEM'],
      companies: ['Microsoft', 'Google', 'Amazon', 'IBM', 'Cisco', 'CrowdStrike'],
      trends: [
        'Increased cyber threats driving demand',
        'Regulatory compliance pushing hiring',
        'Remote work opportunities abundant',
        'Specialized roles command premium',
        'Government sector actively hiring'
      ]
    },
    'Full Stack Developer': {
      job: 'Full Stack Developer',
      demand: 'High',
      growth: '+27% by 2030',
      salary: '$80,000 - $135,000',
      skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
      companies: ['Google', 'Amazon', 'Microsoft', 'Airbnb', 'Uber', 'Stripe'],
      trends: [
        'Continuous demand for web development',
        'Startup ecosystem fueling growth',
        'Freelance opportunities abundant',
        'Strong geographic flexibility',
        'Diverse technology stack choices'
      ]
    },
    'DevOps Engineer': {
      job: 'DevOps Engineer',
      demand: 'Very High',
      growth: '+30% by 2030',
      salary: '$85,000 - $145,000',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform'],
      companies: ['Amazon', 'Google', 'Microsoft', 'Netflix', 'LinkedIn', 'Uber'],
      trends: [
        'Critical for digital transformation',
        'Container technology driving demand',
        'Infrastructure as code essential',
        'Enterprise cloud adoption',
        'Automation skills premium'
      ]
    },
    'Product Manager': {
      job: 'Product Manager',
      demand: 'High',
      growth: '+22% by 2030',
      salary: '$90,000 - $160,000',
      skills: ['Product Strategy', 'Data Analysis', 'Communication', 'SQL', 'User Research'],
      companies: ['Google', 'Amazon', 'Meta', 'Apple', 'Slack', 'Stripe'],
      trends: [
        'Leadership role highly valued',
        'Data-driven decision making crucial',
        'Cross-functional collaboration essential',
        'Technical background increasingly preferred',
        'Startup opportunities abundant'
      ]
    },
    'UX Designer': {
      job: 'UX Designer',
      demand: 'High',
      growth: '+24% by 2030',
      salary: '$75,000 - $125,000',
      skills: ['Figma', 'User Research', 'Prototyping', 'Web Design', 'Design Systems'],
      companies: ['Google', 'Apple', 'Microsoft', 'Airbnb', 'Figma', 'Adobe'],
      trends: [
        'User-centered design in focus',
        'Remote work widely available',
        'Design system expertise valued',
        'Cross-platform design skills needed',
        'Accessibility requirements increasing'
      ]
    }
  };

  const selectedData = selectedJob ? jobDemandData[selectedJob] : null;

  const getDemandColor = (demand: string) => {
    if (demand === 'Extreme') return 'from-red-500 to-red-600';
    if (demand === 'Very High') return 'from-orange-500 to-orange-600';
    return 'from-yellow-500 to-yellow-600';
  };

  const getDemandBadgeColor = (demand: string) => {
    if (demand === 'Extreme') return 'bg-red-100 text-red-700';
    if (demand === 'Very High') return 'bg-orange-100 text-orange-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Demand Analyzer</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select a Job Role
          </label>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.keys(jobDemandData).map(job => (
              <button
                key={job}
                onClick={() => setSelectedJob(job)}
                className={`p-4 rounded-lg font-medium transition ${
                  selectedJob === job
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {job}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedData && (
        <>
          <div className={`bg-gradient-to-r ${getDemandColor(selectedData.demand)} text-white p-8 rounded-xl shadow-lg`}>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-white/80 text-sm mb-2">Market Demand</p>
                <p className={`text-3xl font-bold px-3 py-2 rounded-lg ${getDemandBadgeColor(selectedData.demand)}`}>
                  {selectedData.demand}
                </p>
              </div>

              <div>
                <p className="text-white/80 text-sm mb-2">Job Growth</p>
                <p className="text-3xl font-bold">{selectedData.growth}</p>
              </div>

              <div>
                <p className="text-white/80 text-sm mb-2">Salary Range</p>
                <p className="text-xl font-bold">{selectedData.salary}</p>
              </div>

              <div className="flex items-center">
                <TrendingUp className="w-16 h-16 opacity-20" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Required Skills</h3>
              </div>
              <ul className="space-y-2">
                {selectedData.skills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-gray-800">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Hiring Companies</h3>
              </div>
              <ul className="space-y-2">
                {selectedData.companies.map((company, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span className="text-gray-800">{company}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Market Trends</h3>
              </div>
              <ul className="space-y-2 text-sm">
                {selectedData.trends.slice(0, 3).map((trend, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-0.5">→</span>
                    <span className="text-gray-800">{trend}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Career Outlook</h3>
            <div className="space-y-3">
              {selectedData.trends.map((trend, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-800">{trend}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-green-900 mb-3">Next Steps</h3>
            <ul className="space-y-2 text-gray-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Focus on learning the required skills listed above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Build projects that demonstrate your expertise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Network with professionals working at these companies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Stay updated with industry trends and technologies</span>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
