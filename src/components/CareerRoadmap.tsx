import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, BookOpen, Code, Database, Shield, Briefcase, CheckCircle2, Clock, ArrowLeft, BarChart3 } from 'lucide-react';

type RoadmapStep = {
  phase: string;
  duration: string;
  skills: string[];
  tools: string[];
  projects: string[];
};

type Career = {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  roadmap: RoadmapStep[];
};

export default function CareerRoadmap() {
  const navigate = useNavigate();
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  const careers: Career[] = [
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      icon: Database,
      description: 'Analyze data to help businesses make informed decisions',
      roadmap: [
        {
          phase: 'Foundation (Months 1-2)',
          duration: '2 months',
          skills: ['Excel Basics', 'Statistics Fundamentals', 'SQL Basics', 'Data Visualization Concepts'],
          tools: ['Microsoft Excel', 'Google Sheets', 'SQL'],
          projects: ['Sales Data Analysis', 'Customer Segmentation']
        },
        {
          phase: 'Intermediate (Months 3-5)',
          duration: '3 months',
          skills: ['Advanced SQL', 'Python for Data Analysis', 'Tableau/Power BI', 'Statistical Analysis'],
          tools: ['Python', 'Pandas', 'NumPy', 'Tableau', 'Power BI'],
          projects: ['Market Trend Analysis', 'Business Dashboard Creation', 'A/B Testing Analysis']
        },
        {
          phase: 'Advanced (Months 6-8)',
          duration: '3 months',
          skills: ['Advanced Analytics', 'Machine Learning Basics', 'Data Storytelling', 'Business Intelligence'],
          tools: ['Advanced Python', 'R', 'Machine Learning Libraries'],
          projects: ['Predictive Analytics Project', 'End-to-End BI Solution', 'Real-world Case Study']
        }
      ]
    },
    {
      id: 'software-developer',
      title: 'Software Developer',
      icon: Code,
      description: 'Build applications and software solutions',
      roadmap: [
        {
          phase: 'Foundation (Months 1-3)',
          duration: '3 months',
          skills: ['Programming Fundamentals', 'HTML/CSS', 'JavaScript Basics', 'Git Basics'],
          tools: ['VS Code', 'Git', 'GitHub', 'Chrome DevTools'],
          projects: ['Personal Portfolio Website', 'Todo App', 'Calculator App']
        },
        {
          phase: 'Intermediate (Months 4-7)',
          duration: '4 months',
          skills: ['React.js', 'Node.js', 'Databases', 'RESTful APIs', 'Data Structures'],
          tools: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
          projects: ['Full Stack Blog', 'E-commerce Website', 'Social Media Clone']
        },
        {
          phase: 'Advanced (Months 8-12)',
          duration: '5 months',
          skills: ['System Design', 'Cloud Services', 'CI/CD', 'Testing', 'Performance Optimization'],
          tools: ['AWS/Azure', 'Docker', 'Jest', 'TypeScript', 'Next.js'],
          projects: ['Scalable Web Application', 'Microservices Project', 'Open Source Contribution']
        }
      ]
    },
    {
      id: 'ai-engineer',
      title: 'AI/ML Engineer',
      icon: Briefcase,
      description: 'Build intelligent systems using artificial intelligence',
      roadmap: [
        {
          phase: 'Foundation (Months 1-3)',
          duration: '3 months',
          skills: ['Python Programming', 'Mathematics for ML', 'Statistics', 'Linear Algebra'],
          tools: ['Python', 'Jupyter Notebook', 'NumPy', 'Pandas'],
          projects: ['Data Preprocessing Project', 'Statistical Analysis', 'Python Automation']
        },
        {
          phase: 'Intermediate (Months 4-7)',
          duration: '4 months',
          skills: ['Machine Learning Algorithms', 'Deep Learning Basics', 'Neural Networks', 'Computer Vision'],
          tools: ['Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch'],
          projects: ['Image Classification', 'Recommendation System', 'Sentiment Analysis']
        },
        {
          phase: 'Advanced (Months 8-12)',
          duration: '5 months',
          skills: ['Advanced Deep Learning', 'NLP', 'Model Deployment', 'MLOps'],
          tools: ['Advanced PyTorch/TensorFlow', 'Docker', 'Kubernetes', 'Cloud ML Services'],
          projects: ['Chatbot Development', 'Object Detection System', 'End-to-End ML Pipeline']
        }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Specialist',
      icon: Shield,
      description: 'Protect systems and networks from cyber threats',
      roadmap: [
        {
          phase: 'Foundation (Months 1-3)',
          duration: '3 months',
          skills: ['Networking Basics', 'Linux Fundamentals', 'Security Concepts', 'Python Basics'],
          tools: ['Linux', 'Wireshark', 'Python', 'VirtualBox'],
          projects: ['Home Lab Setup', 'Network Analysis', 'Security Audit']
        },
        {
          phase: 'Intermediate (Months 4-7)',
          duration: '4 months',
          skills: ['Ethical Hacking', 'Penetration Testing', 'Web Security', 'Cryptography'],
          tools: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Nmap'],
          projects: ['Vulnerability Assessment', 'Web App Penetration Test', 'Security Tool Development']
        },
        {
          phase: 'Advanced (Months 8-12)',
          duration: '5 months',
          skills: ['Advanced Penetration Testing', 'Incident Response', 'Malware Analysis', 'Cloud Security'],
          tools: ['Advanced Kali Tools', 'SIEM Tools', 'IDA Pro', 'AWS Security'],
          projects: ['Complete Security Assessment', 'Incident Response Plan', 'Bug Bounty Hunting']
        }
      ]
    },
    {
      id: 'business-analyst',
      title: 'Business Analyst',
      icon: Briefcase,
      description: 'Bridge the gap between business needs and technology solutions',
      roadmap: [
        {
          phase: 'Foundation (Months 1-2)',
          duration: '2 months',
          skills: ['Business Fundamentals', 'Requirements Gathering', 'Excel Basics', 'Communication'],
          tools: ['Excel', 'PowerPoint', 'Word', 'Google Suite'],
          projects: ['Business Case Study', 'Requirements Document', 'Process Flow Diagram']
        },
        {
          phase: 'Intermediate (Months 3-5)',
          duration: '3 months',
          skills: ['Data Analysis', 'SQL', 'Agile Methodology', 'Stakeholder Management'],
          tools: ['SQL', 'Tableau', 'JIRA', 'Confluence'],
          projects: ['Business Process Analysis', 'Data-Driven Recommendations', 'Agile Project']
        },
        {
          phase: 'Advanced (Months 6-8)',
          duration: '3 months',
          skills: ['Strategic Planning', 'Advanced Analytics', 'Project Management', 'Change Management'],
          tools: ['Advanced Analytics Tools', 'Project Management Software', 'BI Tools'],
          projects: ['Strategic Business Plan', 'Digital Transformation Project', 'ROI Analysis']
        }
      ]
    },
    {
      id: 'cloud-engineer',
      title: 'Cloud Engineer',
      icon: Database,
      description: 'Design and manage scalable cloud infrastructure',
      roadmap: [
        {
          phase: 'Foundation (Months 1-2)',
          duration: '2 months',
          skills: ['Linux Fundamentals', 'Networking Basics', 'Cloud Concepts', 'Command Line'],
          tools: ['Linux', 'Terminal', 'Virtual Machines', 'VirtualBox'],
          projects: ['Linux Home Lab', 'Basic Network Simulation', 'Cloud Setup']
        },
        {
          phase: 'Intermediate (Months 3-5)',
          duration: '3 months',
          skills: ['AWS Core Services', 'Container Basics (Docker)', 'Infrastructure as Code', 'CI/CD Pipelines'],
          tools: ['AWS', 'Docker', 'Terraform', 'Jenkins'],
          projects: ['Deploy Web App on AWS', 'Docker Container App', 'Infrastructure Automation']
        },
        {
          phase: 'Advanced (Months 6-10)',
          duration: '5 months',
          skills: ['Kubernetes Orchestration', 'Microservices Architecture', 'Cloud Security', 'Advanced DevOps'],
          tools: ['Kubernetes', 'Helm', 'Prometheus', 'Advanced AWS'],
          projects: ['Kubernetes Cluster Management', 'Microservices Deployment', 'Production Setup']
        }
      ]
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      icon: Briefcase,
      description: 'Lead product strategy and drive business impact',
      roadmap: [
        {
          phase: 'Foundation (Months 1-2)',
          duration: '2 months',
          skills: ['Product Thinking', 'User Research', 'Market Analysis', 'Communication'],
          tools: ['Figma', 'Miro', 'Google Analytics', 'Excel'],
          projects: ['Competitive Analysis', 'User Research Study', 'Product Brief']
        },
        {
          phase: 'Intermediate (Months 3-5)',
          duration: '3 months',
          skills: ['Roadmap Planning', 'Metrics & Analytics', 'Stakeholder Management', 'Agile/Scrum'],
          tools: ['JIRA', 'Looker', 'Amplitude', 'Confluence'],
          projects: ['Product Roadmap Creation', 'Dashboard Development', 'Feature Prioritization']
        },
        {
          phase: 'Advanced (Months 6-9)',
          duration: '4 months',
          skills: ['Data-Driven Decision Making', 'Growth Strategy', 'Business Model Innovation', 'Executive Presence'],
          tools: ['Advanced Analytics', 'SQL', 'Business Intelligence', 'Presentation Skills'],
          projects: ['Growth Initiative Launch', 'Market Expansion Plan', 'Product Innovation']
        }
      ]
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      icon: Code,
      description: 'Optimize development operations and infrastructure',
      roadmap: [
        {
          phase: 'Foundation (Months 1-3)',
          duration: '3 months',
          skills: ['Linux Administration', 'Shell Scripting', 'Networking', 'Version Control (Git)'],
          tools: ['Linux', 'Bash', 'Git', 'SSH'],
          projects: ['Linux Server Setup', 'Bash Scripts', 'Git Workflow']
        },
        {
          phase: 'Intermediate (Months 4-7)',
          duration: '4 months',
          skills: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code (Terraform)'],
          tools: ['Docker', 'Kubernetes', 'Jenkins/GitLab CI', 'Terraform'],
          projects: ['Containerized Applications', 'K8s Deployment', 'CI/CD Pipeline Setup']
        },
        {
          phase: 'Advanced (Months 8-12)',
          duration: '5 months',
          skills: ['Monitoring & Logging', 'Cloud Platforms (AWS/Azure)', 'Security Hardening', 'Disaster Recovery'],
          tools: ['Prometheus', 'ELK Stack', 'AWS', 'Vault'],
          projects: ['Enterprise Monitoring', 'Multi-Region Deployment', 'Security Implementation']
        }
      ]
    }
  ];

  const selectedCareerData = careers.find(c => c.id === selectedCareer);

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Roadmaps</h1>
          <p className="text-gray-600">Step-by-step guidance to achieve your career goals</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedCareer && (
            <button
              onClick={() => setSelectedCareer(null)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Selection</span>
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            title="Go back to previous page"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {careers.map((career) => {
          const Icon = career.icon;
          return (
            <button
              key={career.id}
              onClick={() => setSelectedCareer(career.id)}
              className={`p-6 rounded-xl text-left transition ${
                selectedCareer === career.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              <Icon className={`w-10 h-10 mb-4 ${selectedCareer === career.id ? 'text-white' : 'text-blue-600'}`} />
              <h3 className="text-xl font-bold mb-2">{career.title}</h3>
              <p className={`text-sm ${selectedCareer === career.id ? 'text-blue-100' : 'text-gray-600'}`}>
                {career.description}
              </p>
            </button>
          );
        })}
      </div>

      {!selectedCareerData && (
        <div className="bg-white p-12 rounded-xl shadow-md text-center">
          <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Career Path</h3>
          <p className="text-gray-600">Choose a career from above to view its detailed roadmap</p>
        </div>
      )}

      {selectedCareerData && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <selectedCareerData.icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{selectedCareerData.title}</h2>
                <p className="text-blue-100">{selectedCareerData.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Clock className="w-5 h-5" />
              <span>Total Duration: {selectedCareerData.roadmap.reduce((acc, step) => {
                const months = parseInt(step.duration);
                return acc + months;
              }, 0)} months</span>
            </div>
          </div>

          {selectedCareerData.roadmap.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.phase}</h3>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {step.duration}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Skills to Learn</h4>
                  </div>
                  <ul className="space-y-2">
                    {step.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Tools to Learn</h4>
                  </div>
                  <ul className="space-y-2">
                    {step.tools.map((tool, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    <h4 className="font-semibold text-gray-900">Practice Projects</h4>
                  </div>
                  <ul className="space-y-2">
                    {step.projects.map((project, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Steps After Completion</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Build a strong portfolio showcasing your projects
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Apply for internships and entry-level positions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Continue learning and stay updated with industry trends
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Network with professionals in your field
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setSelectedCareer(null)}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </button>
            <button
              onClick={() => navigate('/home')}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
