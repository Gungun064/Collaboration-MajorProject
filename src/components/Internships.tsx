import { useState } from 'react';
import { Briefcase, MapPin, Clock, ExternalLink, Search, Filter } from 'lucide-react';

type Internship = {
  id: string;
  company: string;
  role: string;
  skills: string[];
  location: string;
  duration: string;
  type: string;
  field: string;
  applyUrl: string;
};

export default function Internships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const internships: Internship[] = [
    {
      id: '1',
      company: 'Google',
      role: 'Software Engineering Intern',
      skills: ['Python', 'Java', 'Data Structures', 'Algorithms'],
      location: 'Remote',
      duration: '12 weeks',
      type: 'Summer 2026',
      field: 'Technology',
      applyUrl: 'https://careers.google.com'
    },
    {
      id: '2',
      company: 'Google',
      role: 'Data Analytics Intern',
      skills: ['SQL', 'Python', 'Data Visualization', 'Statistics'],
      location: 'Bangalore, India',
      duration: '10 weeks',
      type: 'Summer 2026',
      field: 'Data',
      applyUrl: 'https://careers.google.com'
    },
    {
      id: '3',
      company: 'Microsoft',
      role: 'Cloud Engineering Intern',
      skills: ['Azure', 'Python', 'Docker', 'Kubernetes'],
      location: 'Hyderabad, India',
      duration: '12 weeks',
      type: 'Summer 2026',
      field: 'Technology',
      applyUrl: 'https://careers.microsoft.com'
    },
    {
      id: '4',
      company: 'Microsoft',
      role: 'AI/ML Research Intern',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'Research'],
      location: 'Remote',
      duration: '16 weeks',
      type: 'Summer 2026',
      field: 'AI',
      applyUrl: 'https://careers.microsoft.com'
    },
    {
      id: '5',
      company: 'Amazon',
      role: 'Software Development Intern',
      skills: ['Java', 'Python', 'AWS', 'Problem Solving'],
      location: 'Pune, India',
      duration: '12 weeks',
      type: 'Summer 2026',
      field: 'Technology',
      applyUrl: 'https://amazon.jobs'
    },
    {
      id: '6',
      company: 'Amazon',
      role: 'Business Analyst Intern',
      skills: ['Excel', 'SQL', 'Data Analysis', 'Communication'],
      location: 'Mumbai, India',
      duration: '10 weeks',
      type: 'Summer 2026',
      field: 'Business',
      applyUrl: 'https://amazon.jobs'
    },
    {
      id: '7',
      company: 'Infosys',
      role: 'Full Stack Developer Intern',
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      location: 'Bangalore, India',
      duration: '8 weeks',
      type: 'Summer 2026',
      field: 'Technology',
      applyUrl: 'https://careers.infosys.com'
    },
    {
      id: '8',
      company: 'Infosys',
      role: 'Cybersecurity Intern',
      skills: ['Network Security', 'Ethical Hacking', 'Linux', 'Python'],
      location: 'Pune, India',
      duration: '10 weeks',
      type: 'Summer 2026',
      field: 'Security',
      applyUrl: 'https://careers.infosys.com'
    },
    {
      id: '9',
      company: 'Tata Consultancy Services',
      role: 'Data Science Intern',
      skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
      location: 'Chennai, India',
      duration: '12 weeks',
      type: 'Summer 2026',
      field: 'Data',
      applyUrl: 'https://careers.tcs.com'
    },
    {
      id: '10',
      company: 'Tata Consultancy Services',
      role: 'UI/UX Design Intern',
      skills: ['Figma', 'User Research', 'Prototyping', 'Visual Design'],
      location: 'Mumbai, India',
      duration: '10 weeks',
      type: 'Summer 2026',
      field: 'Design',
      applyUrl: 'https://careers.tcs.com'
    },
    {
      id: '11',
      company: 'Wipro',
      role: 'DevOps Intern',
      skills: ['Docker', 'Jenkins', 'CI/CD', 'Linux'],
      location: 'Bangalore, India',
      duration: '12 weeks',
      type: 'Summer 2026',
      field: 'Technology',
      applyUrl: 'https://careers.wipro.com'
    },
    {
      id: '12',
      company: 'Meta',
      role: 'Product Design Intern',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      location: 'Remote',
      duration: '12 weeks',
      type: 'Summer 2026',
      field: 'Design',
      applyUrl: 'https://metacareers.com'
    }
  ];

  const fields = ['all', 'Technology', 'Data', 'AI', 'Business', 'Security', 'Design'];
  const locations = ['all', 'Remote', 'Bangalore', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai'];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch =
      internship.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesField = selectedField === 'all' || internship.field === selectedField;
    const matchesLocation = selectedLocation === 'all' || internship.location.includes(selectedLocation);

    return matchesSearch && matchesField && matchesLocation;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Internship Opportunities</h1>
        <p className="text-gray-600">Explore internships from top companies and kickstart your career</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by role, company, or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none appearance-none bg-white"
              >
                {fields.map(field => (
                  <option key={field} value={field}>
                    {field === 'all' ? 'All Fields' : field}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none appearance-none bg-white"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 text-gray-600">
        Showing {filteredInternships.length} internship{filteredInternships.length !== 1 ? 's' : ''}
      </div>

      <div className="grid gap-6">
        {filteredInternships.map((internship) => (
          <div
            key={internship.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{internship.role}</h3>
                    <p className="text-lg text-blue-600 font-semibold">{internship.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                    {internship.type}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <a
                  href={internship.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}

        {filteredInternships.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
