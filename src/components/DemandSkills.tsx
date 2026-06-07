import { useState } from 'react';
import { Award, TrendingUp, Code, Database, MessageSquare, Lightbulb } from 'lucide-react';

type Skill = {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  whyImportant: string;
  usedIn: string[];
  demandLevel: number;
  avgSalaryBoost: string;
};

export default function DemandSkills() {
  const skills: Skill[] = [
    {
      id: '1',
      name: 'Python',
      category: 'Programming',
      icon: Code,
      description: 'Versatile programming language used in web development, data science, AI, and automation.',
      whyImportant: 'Python is the most in-demand programming language, essential for data science, machine learning, and backend development.',
      usedIn: ['Data Science', 'Machine Learning', 'Web Development', 'Automation', 'AI'],
      demandLevel: 95,
      avgSalaryBoost: '+25%'
    },
    {
      id: '2',
      name: 'SQL',
      category: 'Data Management',
      icon: Database,
      description: 'Standard language for managing and querying relational databases.',
      whyImportant: 'Every organization uses databases. SQL is fundamental for data analysis, backend development, and business intelligence.',
      usedIn: ['Data Analysis', 'Backend Development', 'Business Intelligence', 'Database Management'],
      demandLevel: 90,
      avgSalaryBoost: '+20%'
    },
    {
      id: '3',
      name: 'Data Analysis',
      category: 'Analytics',
      icon: TrendingUp,
      description: 'Ability to extract insights from data to drive business decisions.',
      whyImportant: 'Organizations need data-driven decisions. Data analysis skills are crucial across all industries.',
      usedIn: ['Business Analysis', 'Marketing', 'Finance', 'Product Management', 'Operations'],
      demandLevel: 88,
      avgSalaryBoost: '+30%'
    },
    {
      id: '4',
      name: 'Machine Learning',
      category: 'AI/ML',
      icon: Lightbulb,
      description: 'Building systems that learn from data and improve automatically.',
      whyImportant: 'ML is transforming every industry. Companies need ML engineers to build intelligent systems and stay competitive.',
      usedIn: ['AI Development', 'Data Science', 'Predictive Analytics', 'Recommendation Systems'],
      demandLevel: 92,
      avgSalaryBoost: '+40%'
    },
    {
      id: '5',
      name: 'Cloud Computing',
      category: 'Infrastructure',
      icon: Database,
      description: 'Managing applications and data on cloud platforms like AWS, Azure, and GCP.',
      whyImportant: 'Most companies are moving to the cloud. Cloud skills are essential for modern infrastructure and scalable applications.',
      usedIn: ['DevOps', 'Backend Development', 'System Architecture', 'Infrastructure Management'],
      demandLevel: 87,
      avgSalaryBoost: '+28%'
    },
    {
      id: '6',
      name: 'Communication Skills',
      category: 'Soft Skills',
      icon: MessageSquare,
      description: 'Ability to effectively communicate ideas, collaborate with teams, and present information.',
      whyImportant: 'Technical skills alone are not enough. Strong communication is essential for career growth and leadership roles.',
      usedIn: ['All Careers', 'Team Collaboration', 'Client Relations', 'Presentations', 'Leadership'],
      demandLevel: 93,
      avgSalaryBoost: '+35%'
    },
    {
      id: '7',
      name: 'Problem Solving',
      category: 'Soft Skills',
      icon: Lightbulb,
      description: 'Analytical thinking and creative approach to solving complex challenges.',
      whyImportant: 'Every role requires problem-solving. It\'s the foundation of innovation and efficiency in any career.',
      usedIn: ['Software Development', 'Data Science', 'Business Analysis', 'Engineering', 'All Fields'],
      demandLevel: 94,
      avgSalaryBoost: '+30%'
    },
    {
      id: '8',
      name: 'JavaScript',
      category: 'Programming',
      icon: Code,
      description: 'Essential language for web development, used for both frontend and backend.',
      whyImportant: 'JavaScript powers the modern web. It\'s crucial for frontend development and increasingly popular for backend with Node.js.',
      usedIn: ['Web Development', 'Frontend Development', 'Backend Development', 'Mobile Apps'],
      demandLevel: 89,
      avgSalaryBoost: '+22%'
    },
    {
      id: '9',
      name: 'Cybersecurity',
      category: 'Security',
      icon: Award,
      description: 'Protecting systems, networks, and data from cyber threats.',
      whyImportant: 'With increasing cyber threats, organizations desperately need security professionals to protect their assets.',
      usedIn: ['Security Analysis', 'Penetration Testing', 'Risk Management', 'Network Security'],
      demandLevel: 91,
      avgSalaryBoost: '+35%'
    },
    {
      id: '10',
      name: 'Data Visualization',
      category: 'Analytics',
      icon: TrendingUp,
      description: 'Creating visual representations of data to communicate insights effectively.',
      whyImportant: 'Data without visualization is hard to understand. This skill helps translate complex data into actionable insights.',
      usedIn: ['Data Analysis', 'Business Intelligence', 'Reporting', 'Dashboard Creation'],
      demandLevel: 85,
      avgSalaryBoost: '+18%'
    },
    {
      id: '11',
      name: 'Critical Thinking',
      category: 'Soft Skills',
      icon: Lightbulb,
      description: 'Objective analysis and evaluation to form sound judgments.',
      whyImportant: 'Essential for making informed decisions, solving complex problems, and innovating in any field.',
      usedIn: ['All Careers', 'Strategic Planning', 'Research', 'Analysis', 'Decision Making'],
      demandLevel: 90,
      avgSalaryBoost: '+25%'
    },
    {
      id: '12',
      name: 'Project Management',
      category: 'Management',
      icon: Award,
      description: 'Planning, executing, and delivering projects on time and within budget.',
      whyImportant: 'Organizations need skilled project managers to ensure successful delivery of initiatives and maximize ROI.',
      usedIn: ['All Industries', 'Product Management', 'Software Development', 'Consulting'],
      demandLevel: 86,
      avgSalaryBoost: '+32%'
    }
  ];

  const categories = ['All', 'Programming', 'Analytics', 'AI/ML', 'Soft Skills', 'Infrastructure', 'Security', 'Management'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">In-Demand Skills</h1>
        <p className="text-gray-600">Master these skills to boost your career prospects</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <p className="text-sm font-semibold text-gray-600 mb-3">Filter by Category:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredSkills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div key={skill.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mt-1">
                        {skill.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">{skill.avgSalaryBoost}</div>
                      <div className="text-xs text-gray-500">salary boost</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{skill.description}</p>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600">Demand Level</span>
                  <span className="text-sm font-bold text-blue-600">{skill.demandLevel}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${skill.demandLevel}%` }}
                  />
                </div>
              </div>

              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm font-semibold text-blue-900 mb-2">Why It's Important:</p>
                <p className="text-sm text-blue-800">{skill.whyImportant}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Used In:</p>
                <div className="flex flex-wrap gap-2">
                  {skill.usedIn.map((use, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-lg"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Start Learning Today</h3>
        <p className="text-green-100 mb-6 leading-relaxed">
          These skills are highly valued in the job market. Choose skills aligned with your career goals and start learning through our curated resources.
        </p>
        <button className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition font-medium">
          Explore Learning Resources
        </button>
      </div>
    </div>
  );
}
