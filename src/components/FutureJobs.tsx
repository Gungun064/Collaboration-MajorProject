import { TrendingUp, DollarSign, Users, ArrowUpRight } from 'lucide-react';

type Job = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  avgSalary: string;
  demandLevel: 'High' | 'Very High' | 'Extreme';
  growth: string;
  industries: string[];
};

export default function FutureJobs() {
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Data Scientist',
      description: 'Analyze complex data to help organizations make better decisions using statistical methods and machine learning.',
      skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization', 'Big Data'],
      avgSalary: '$95,000 - $150,000',
      demandLevel: 'Extreme',
      growth: '+35% by 2030',
      industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce']
    },
    {
      id: '2',
      title: 'AI/ML Engineer',
      description: 'Design and develop artificial intelligence and machine learning systems that can learn and adapt.',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'Neural Networks', 'Computer Vision'],
      avgSalary: '$100,000 - $175,000',
      demandLevel: 'Extreme',
      growth: '+40% by 2030',
      industries: ['Technology', 'Automotive', 'Healthcare', 'Finance']
    },
    {
      id: '3',
      title: 'Cloud Engineer',
      description: 'Design, implement, and manage cloud-based infrastructure and services for organizations.',
      skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'DevOps'],
      avgSalary: '$85,000 - $140,000',
      demandLevel: 'Very High',
      growth: '+30% by 2030',
      industries: ['Technology', 'Finance', 'Healthcare', 'E-commerce']
    },
    {
      id: '4',
      title: 'Cybersecurity Analyst',
      description: 'Protect organizations from cyber threats by monitoring networks, identifying vulnerabilities, and implementing security measures.',
      skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'SIEM', 'Penetration Testing', 'Cloud Security'],
      avgSalary: '$75,000 - $130,000',
      demandLevel: 'Very High',
      growth: '+33% by 2030',
      industries: ['Technology', 'Finance', 'Government', 'Healthcare']
    },
    {
      id: '5',
      title: 'Blockchain Developer',
      description: 'Build decentralized applications and smart contracts using blockchain technology.',
      skills: ['Solidity', 'Ethereum', 'Web3', 'Smart Contracts', 'Cryptography', 'Distributed Systems'],
      avgSalary: '$90,000 - $160,000',
      demandLevel: 'High',
      growth: '+25% by 2030',
      industries: ['Finance', 'Technology', 'Gaming', 'Supply Chain']
    },
    {
      id: '6',
      title: 'Full Stack Developer',
      description: 'Develop both front-end and back-end components of web applications.',
      skills: ['JavaScript', 'React', 'Node.js', 'Databases', 'APIs', 'DevOps', 'Cloud'],
      avgSalary: '$80,000 - $135,000',
      demandLevel: 'Very High',
      growth: '+27% by 2030',
      industries: ['Technology', 'E-commerce', 'Finance', 'Media']
    },
    {
      id: '7',
      title: 'DevOps Engineer',
      description: 'Bridge the gap between development and operations, automating and streamlining software delivery.',
      skills: ['CI/CD', 'Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Linux', 'Scripting'],
      avgSalary: '$85,000 - $145,000',
      demandLevel: 'Very High',
      growth: '+28% by 2030',
      industries: ['Technology', 'Finance', 'E-commerce', 'Healthcare']
    },
    {
      id: '8',
      title: 'IoT Solutions Architect',
      description: 'Design and implement Internet of Things systems connecting physical devices to digital networks.',
      skills: ['IoT Protocols', 'Embedded Systems', 'Cloud', 'Security', 'Data Analytics', 'Python'],
      avgSalary: '$90,000 - $150,000',
      demandLevel: 'High',
      growth: '+24% by 2030',
      industries: ['Manufacturing', 'Healthcare', 'Smart Cities', 'Automotive']
    }
  ];

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'Extreme':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Very High':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'High':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Future Trending Jobs</h1>
        <p className="text-gray-600">Explore high-demand careers with strong growth potential</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <TrendingUp className="w-10 h-10 mb-3" />
          <p className="text-blue-100 text-sm mb-1">Average Growth</p>
          <p className="text-3xl font-bold">+30%</p>
          <p className="text-blue-100 text-sm mt-1">by 2030</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <DollarSign className="w-10 h-10 mb-3" />
          <p className="text-green-100 text-sm mb-1">Salary Range</p>
          <p className="text-3xl font-bold">$75K+</p>
          <p className="text-green-100 text-sm mt-1">starting salary</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <Users className="w-10 h-10 mb-3" />
          <p className="text-purple-100 text-sm mb-1">Job Openings</p>
          <p className="text-3xl font-bold">2M+</p>
          <p className="text-purple-100 text-sm mt-1">by 2030</p>
        </div>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">Key Industries:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.industries.map((industry, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-64 flex-shrink-0 space-y-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-green-700" />
                    <p className="text-xs font-semibold text-green-900">Average Salary</p>
                  </div>
                  <p className="text-lg font-bold text-green-900">{job.avgSalary}</p>
                </div>

                <div className={`p-4 rounded-lg border ${getDemandColor(job.demandLevel)}`}>
                  <p className="text-xs font-semibold mb-1">Future Demand</p>
                  <p className="text-lg font-bold">{job.demandLevel}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowUpRight className="w-4 h-4 text-blue-700" />
                    <p className="text-xs font-semibold text-blue-900">Job Growth</p>
                  </div>
                  <p className="text-lg font-bold text-blue-900">{job.growth}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Prepare for the Future</h3>
        <p className="text-blue-100 mb-6 leading-relaxed">
          These careers represent the future of work. Start building your skills today to position yourself for success in these high-demand fields. Take our career assessment to find the best path for you.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
            Take Assessment
          </button>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition font-medium">
            View Career Roadmaps
          </button>
        </div>
      </div>
    </div>
  );
}
