import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, LearningProgress } from '../lib/supabase';
import { BookOpen, ExternalLink, CheckCircle2, Clock, Star, Filter } from 'lucide-react';

type Course = {
  id: string;
  name: string;
  platform: string;
  skill: string;
  level: string;
  duration: string;
  rating: number;
  url: string;
  description: string;
};

export default function LearningPlatform() {
  const { profile } = useAuth();
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    if (!profile) return;

    const { data } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', profile.id);

    setLearningProgress(data || []);
  };

  const toggleCourseCompletion = async (course: Course) => {
    if (!profile) return;

    const existing = learningProgress.find(
      p => p.course_url === course.url && p.user_id === profile.id
    );

    if (existing) {
      await supabase
        .from('learning_progress')
        .update({
          completed: !existing.completed,
          completed_at: !existing.completed ? new Date().toISOString() : null
        })
        .eq('id', existing.id);
    } else {
      await supabase.from('learning_progress').insert({
        user_id: profile.id,
        course_name: course.name,
        course_url: course.url,
        platform: course.platform,
        skill: course.skill,
        completed: false
      });
    }

    loadProgress();
  };

  const isCourseCompleted = (courseUrl: string) => {
    return learningProgress.some(p => p.course_url === courseUrl && p.completed);
  };

  const isCourseStarted = (courseUrl: string) => {
    return learningProgress.some(p => p.course_url === courseUrl);
  };

  const courses: Course[] = [
    {
      id: '1',
      name: 'Python for Everybody',
      platform: 'Coursera',
      skill: 'Python',
      level: 'Beginner',
      duration: '8 weeks',
      rating: 4.8,
      url: 'https://www.coursera.org/specializations/python',
      description: 'Learn Python programming from scratch'
    },
    {
      id: '2',
      name: 'Machine Learning Specialization',
      platform: 'Coursera',
      skill: 'Machine Learning',
      level: 'Intermediate',
      duration: '11 weeks',
      rating: 4.9,
      url: 'https://www.coursera.org/specializations/machine-learning-introduction',
      description: 'Master machine learning fundamentals'
    },
    {
      id: '3',
      name: 'SQL for Data Science',
      platform: 'Coursera',
      skill: 'SQL',
      level: 'Beginner',
      duration: '4 weeks',
      rating: 4.6,
      url: 'https://www.coursera.org/learn/sql-for-data-science',
      description: 'Learn SQL for data analysis'
    },
    {
      id: '4',
      name: 'CS50: Introduction to Computer Science',
      platform: 'edX',
      skill: 'Programming',
      level: 'Beginner',
      duration: '12 weeks',
      rating: 4.9,
      url: 'https://www.edx.org/course/cs50s-introduction-to-computer-science',
      description: 'Harvard\'s famous intro to CS course'
    },
    {
      id: '5',
      name: 'Data Science Professional Certificate',
      platform: 'edX',
      skill: 'Data Science',
      level: 'Intermediate',
      duration: '10 months',
      rating: 4.7,
      url: 'https://www.edx.org/professional-certificate/harvardx-data-science',
      description: 'Comprehensive data science program'
    },
    {
      id: '6',
      name: 'Python for Data Science',
      platform: 'Kaggle',
      skill: 'Python',
      level: 'Intermediate',
      duration: '4 hours',
      rating: 4.5,
      url: 'https://www.kaggle.com/learn/python',
      description: 'Practical Python for data science'
    },
    {
      id: '7',
      name: 'Intro to Machine Learning',
      platform: 'Kaggle',
      skill: 'Machine Learning',
      level: 'Beginner',
      duration: '3 hours',
      rating: 4.6,
      url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
      description: 'Get started with ML using Python'
    },
    {
      id: '8',
      name: 'Responsive Web Design',
      platform: 'freeCodeCamp',
      skill: 'Web Development',
      level: 'Beginner',
      duration: '300 hours',
      rating: 4.8,
      url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
      description: 'Learn HTML and CSS fundamentals'
    },
    {
      id: '9',
      name: 'JavaScript Algorithms',
      platform: 'freeCodeCamp',
      skill: 'JavaScript',
      level: 'Intermediate',
      duration: '300 hours',
      rating: 4.7,
      url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
      description: 'Master JavaScript and algorithms'
    },
    {
      id: '10',
      name: 'AWS Cloud Practitioner',
      platform: 'Coursera',
      skill: 'Cloud Computing',
      level: 'Beginner',
      duration: '4 weeks',
      rating: 4.6,
      url: 'https://www.coursera.org/learn/aws-cloud-practitioner-essentials',
      description: 'Learn AWS cloud fundamentals'
    },
    {
      id: '11',
      name: 'Cybersecurity Fundamentals',
      platform: 'edX',
      skill: 'Cybersecurity',
      level: 'Beginner',
      duration: '6 weeks',
      rating: 4.5,
      url: 'https://www.edx.org/course/cybersecurity-fundamentals',
      description: 'Introduction to cybersecurity'
    },
    {
      id: '12',
      name: 'Deep Learning Specialization',
      platform: 'Coursera',
      skill: 'Deep Learning',
      level: 'Advanced',
      duration: '5 months',
      rating: 4.9,
      url: 'https://www.coursera.org/specializations/deep-learning',
      description: 'Master deep learning and neural networks'
    }
  ];

  const skills = ['All', 'Python', 'Machine Learning', 'SQL', 'JavaScript', 'Web Development', 'Cloud Computing', 'Cybersecurity', 'Data Science', 'Deep Learning', 'Programming'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSkill = selectedSkill === 'All' || course.skill === selectedSkill;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSkill && matchesLevel;
  });

  const completedCount = learningProgress.filter(p => p.completed).length;
  const inProgressCount = learningProgress.filter(p => !p.completed).length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Platform</h1>
        <p className="text-gray-600">Free courses from top platforms to boost your skills</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <BookOpen className="w-8 h-8 mb-3" />
          <p className="text-blue-100 text-sm mb-1">Available Courses</p>
          <p className="text-3xl font-bold">{courses.length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <CheckCircle2 className="w-8 h-8 mb-3" />
          <p className="text-green-100 text-sm mb-1">Completed</p>
          <p className="text-3xl font-bold">{completedCount}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <Clock className="w-8 h-8 mb-3" />
          <p className="text-orange-100 text-sm mb-1">In Progress</p>
          <p className="text-3xl font-bold">{inProgressCount}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filter Courses</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">By Skill</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            >
              {skills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">By Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const completed = isCourseCompleted(course.url);
          const started = isCourseStarted(course.url);

          return (
            <div
              key={course.id}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden ${
                completed ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-2">
                      {course.platform}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{course.name}</h3>
                  </div>
                  {completed && (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4">{course.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Skill:</span>
                    <span className="font-medium text-gray-900">{course.skill}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Level:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      course.level === 'Beginner'
                        ? 'bg-green-100 text-green-700'
                        : course.level === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-gray-900">{course.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    Start Learning
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => toggleCourseCompletion(course)}
                    className={`px-4 py-2 rounded-lg transition font-medium text-sm ${
                      completed
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : started
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {completed ? 'Done' : started ? 'Learning' : 'Track'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>Set aside dedicated time each day for learning</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>Practice by building projects alongside courses</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>Join online communities to stay motivated</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>Track your progress and celebrate small wins</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
