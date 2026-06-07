import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Send, MessageSquare, Loader, ArrowLeft } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export default function AIChatbot() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    if (!profile) return;

    const { data } = await supabase
      .from('ai_conversations')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data?.messages) {
      setMessages(data.messages);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! I\'m your AI Career Advisor. I\'m here to help you navigate your career journey. I can assist with: career path recommendations, skill development planning, resume optimization, job market insights, internship guidance, and personalized learning roadmaps. What would you like to explore today?';
    }

    if (lowerMessage.includes('career') && lowerMessage.includes('path')) {
      return 'Great question! To recommend the best career paths for you, I\'d like to understand you better. Tell me: What are your main interests (Technology, Data, Business, Design, etc.)? What skills do you already have? And what type of work environment appeals to you (startup, corporate, remote, etc.)? This will help me suggest tailored career paths.';
    }

    if (lowerMessage.includes('data analyst') || lowerMessage.includes('data science')) {
      return 'Data Analytics and Data Science are excellent high-demand careers! Here\'s what I recommend:\n\n**For Data Analyst (6-8 months):**\n1. Excel mastery + SQL basics\n2. Python for data analysis (Pandas, NumPy)\n3. Data visualization (Tableau/Power BI)\n4. Build 2-3 portfolio projects\n\n**Top companies hiring:** Google, Amazon, Microsoft, Infosys, Accenture, Deloitte\n\n**Salary range:** $60K-$90K (entry level)\n\nWould you like specific course recommendations or project ideas?';
    }

    if (lowerMessage.includes('software developer') || lowerMessage.includes('web developer')) {
      return 'Software Development is one of the most lucrative careers! Here\'s my recommended path:\n\n**Full Stack Developer (10-12 months):**\n1. JavaScript fundamentals\n2. Frontend: React.js or Vue.js\n3. Backend: Node.js + Express\n4. Databases: PostgreSQL or MongoDB\n5. DevOps basics: Git, Docker\n\n**Project progression:**\nPortfolio → E-commerce site → Full stack app → Open source contribution\n\n**Top companies:** Google, Microsoft, Amazon, Netflix, Apple, Stripe\n**Salary range:** $80K-$150K+ (entry level)\n\nStart with JavaScript? Check our Learning Platform integration!';
    }

    if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning')) {
      return 'AI/Machine Learning is the fastest-growing field! Here\'s the roadmap:\n\n**AI Engineer (12-18 months):**\n1. Strong math foundation (Linear Algebra, Calculus)\n2. Python programming mastery\n3. Machine Learning algorithms\n4. Deep Learning (TensorFlow, PyTorch)\n5. Computer Vision or NLP specialization\n\n**Essential skills:** Python, TensorFlow, PyTorch, Mathematics, Statistics\n\n**Top companies:** OpenAI, Google DeepMind, Meta, Apple, Tesla\n**Salary range:** $120K-$200K+ (entry level with strong portfolio)\n\n**Quick tip:** Start with Python and Linear Algebra simultaneously. Build projects early!\n\nInterested in the complete roadmap? Check Career Roadmap!';
    }

    if (lowerMessage.includes('cybersecurity') || lowerMessage.includes('security')) {
      return 'Cybersecurity is critical and well-compensated! Here\'s my recommendation:\n\n**Cybersecurity Specialist (12 months):**\n1. Networking fundamentals\n2. Linux deep dive\n3. Ethical hacking (CEH preparation)\n4. Web application security\n5. SIEM tools experience\n\n**Essential certifications:** CompTIA Security+, CEH, OSCP\n**Programming skills:** Python for automation and scripting\n\n**Top companies:** Cisco, Palo Alto Networks, Crowdstrike, Microsoft, Goldman Sachs\n**Salary range:** $70K-$120K (entry level, increases with certifications)\n\n**Pro tip:** Certifications are crucial in this field. Start with Security+ while building practical skills!';
    }

    if (lowerMessage.includes('skill') && (lowerMessage.includes('learn') || lowerMessage.includes('recommend'))) {
      return 'Great! To recommend skills, I need to understand your goals. Are you interested in:\n\n1. **Programming:** Python, JavaScript, Java, Go?\n2. **Data:** SQL, Statistics, Machine Learning?\n3. **Cloud:** AWS, Azure, GCP?\n4. **Web:** React, Vue, Angular?\n5. **Soft skills:** Leadership, Communication, Project Management?\n\nAlso, do you already have any programming experience? This helps me suggest the right progression order!';
    }

    if (lowerMessage.includes('python')) {
      return 'Python is perfect! Here\'s your learning path:\n\n**Phase 1: Basics (2-3 weeks)**\n- Variables, data types, loops, functions\n- File handling, error handling\n\n**Phase 2: Intermediate (2-3 weeks)**\n- OOP concepts\n- Libraries: NumPy, Pandas\n- Working with APIs\n\n**Phase 3: Specialization (4+ weeks)**\n- Data Analysis → Pandas, Matplotlib\n- Web Dev → Django, Flask\n- AI/ML → TensorFlow, Scikit-learn\n\n**Best resources:**\n- Kaggle Learn (free)\n- Coursera Python for Everyone\n- freeCodeCamp YouTube\n\n**Build projects:** Weather app → Web scraper → Data analyzer\n\nWhich specialization interests you?';
    }

    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
      return 'Building projects is crucial for standing out! Here\'s my strategic approach:\n\n**Entry-level projects (Months 1-3):**\n- Todo app, Calculator, Weather app\n- These teach fundamentals\n\n**Intermediate projects (Months 4-6):**\n- E-commerce website, Blogging platform\n- Real-world problem-solving\n\n**Advanced projects (Months 7+):**\n- Full stack application with deployment\n- Open source contributions\n- Machine learning model deployment\n\n**Pro tips:**\n✓ Deploy on GitHub - it\'s your resume\n✓ Write clear documentation\n✓ Show the problem-solving process\n✓ Aim for 3-5 quality projects, not 20 weak ones\n\nWhat type of projects align with your target career?';
    }

    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return 'Your resume is your first impression! Here\'s how to make it stand out:\n\n**Structure:**\n1. Contact info + LinkedIn\n2. 2-3 line professional summary\n3. Skills (aligned with job posting)\n4. Projects (with results/impact)\n5. Experience/Education\n\n**Key tips:**\n✓ Use metrics: \"Improved X by 40%\" not \"worked on X\"\n✓ Tech skills at top\n✓ Projects = portfolio (GitHub links!)\n✓ Customize for each job\n✓ One page for entry-level\n\n**Common mistakes to avoid:**\n✗ Generic objectives\n✗ Irrelevant skills\n✗ No quantified results\n✗ Typos or formatting issues\n\nWe have a Resume Analyzer tool that can review your resume! Upload it for detailed feedback.';
    }

    if (lowerMessage.includes('internship') || lowerMessage.includes('job') && lowerMessage.includes('find')) {
      return 'Great question about landing opportunities! Here\'s my strategy:\n\n**Before applying:**\n1. Build 2-3 portfolio projects\n2. Get your resume reviewed\n3. Practice coding problems\n4. Understand the company\'s tech stack\n\n**Top internship platforms:**\n- LinkedIn Jobs, AngelList\n- Company career pages directly\n- Internshala, Handshake\n- GitHub Jobs, Stack Overflow\n\n**Companies actively hiring interns:**\n- Google, Microsoft, Amazon\n- Startups (often more flexible)\n- Tech unicorns: Stripe, Figma, etc.\n\n**Tip:** Reach out directly to engineers on LinkedIn. Internships are often filled through referrals!\n\nOur Internships section has curated opportunities. Check it out!';
    }

    if (lowerMessage.includes('how') && lowerMessage.includes('long')) {
      return 'Timeline depends on your starting point and intensity:\n\n**Junior Developer:** 6-12 months of focused learning\n**Data Analyst:** 6-8 months\n**AI Engineer:** 12-18 months\n**Full stack specialization:** 12+ months\n\n**Factors that accelerate learning:**\n✓ 4-6 hours daily learning\n✓ Building projects immediately\n✓ Networking and mentorship\n✓ Real-world problem focus\n\n**Reality check:**\n- Week 1-2: Overwhelming (normal!)\n- Month 1-2: Seeing progress\n- Month 3-4: Building confidence\n- Month 6+: Ready for opportunities\n\nConsistency beats intensity. 2 hours daily > 8 hours once weekly!\n\nWant a personalized roadmap? Try our Career Roadmap feature!';
    }

    if (lowerMessage.includes('motivation') || lowerMessage.includes('stuck') || lowerMessage.includes('overwhelmed')) {
      return 'I understand! Learning a new career is challenging but absolutely worth it. Here\'s my advice:\n\n**When overwhelmed:**\n✓ Break it into smaller daily goals\n✓ Focus on one thing at a time\n✓ Celebrate small wins\n✓ Connect with others learning\n\n**Motivation hacks:**\n✓ Set mini-milestones (finish one project per month)\n✓ Track progress visually\n✓ Join communities (Reddit, Discord, meetups)\n✓ Follow people succeeding in your target role\n\n**Remember:**\nEvery successful engineer, data scientist, and AI expert started exactly where you are. The difference? They kept going.\n\nOur Community (coming soon) will connect you with other learners for accountability!\n\nWhat specific part feels overwhelming? Let\'s break it down together.';
    }

    if (lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('earning')) {
      return 'Great career question! Here\'s realistic salary expectations (US, 2024):\n\n**Entry-level (0-1 year):**\n- Data Analyst: $60-$90K\n- Software Developer: $80-$130K\n- AI Engineer: $100-$150K\n- Business Analyst: $70-$100K\n\n**Mid-level (3-5 years):**\n- Senior Developer: $140-$200K+\n- Data Scientist: $120-$160K\n- AI Engineer: $150-$220K+\n\n**Factors affecting salary:**\n✓ Location (Silicon Valley > smaller cities)\n✓ Company size (FAANG > startups usually)\n✓ Specialization (AI/ML > general web dev)\n✓ Negotiation skills\n\n**Increasing earning potential:**\n- Build strong portfolio\n- Get certifications\n- Contribute to open source\n- Network strategically\n- Specialize in high-demand skills\n\nRemember: Passion + competence = sustainable income growth!';
    }

    if (lowerMessage.includes('assessment')) {
      return 'Our Career Assessment is a great starting point! It takes 5-10 minutes and analyzes:\n\n✓ Your interests and passion areas\n✓ Strengths and aptitudes\n✓ Career compatibility scores\n✓ Recommended career paths\n✓ Personalized learning suggestions\n\nAfter completing the assessment, you\'ll get:\n- Career Prediction with match percentages\n- Skill Gap Analysis\n- Custom Career Roadmap\n- Recommended learning resources\n\nIt\'s designed to give you clarity on the best path forward. No pressure - assessments help you save time by focusing on aligned opportunities!\n\nReady to take the assessment? Let\'s get started!';
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re welcome! I\'m here to support your career journey anytime. Remember:\n\n✓ Take action consistently\n✓ Build real projects\n✓ Stay curious and keep learning\n✓ Don\'t compare yourself to others\n\nFeel free to ask me anything - from technical guidance to motivation boosts. You\'ve got this! 🚀\n\nNext steps: Check out the Career Assessment or Career Roadmap to get started.';
    }

    return 'That\'s an interesting question! I\'m your AI Career Advisor and I can help you with:\n\n• Career path recommendations based on skills and interests\n• Specific role guidance (Data Analyst, Developer, AI Engineer, etc.)\n• Skill learning strategies and roadmaps\n• Project ideas and portfolio building\n• Resume and application tips\n• Internship and job search strategies\n• Salary and career growth expectations\n• Motivation and overcoming learning challenges\n\nWhich of these interests you most? Or ask me anything specific about a career path you\'re considering!';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !profile) return;

    setLoading(true);
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      setLoading(false);

      supabase
        .from('ai_conversations')
        .upsert({
          user_id: profile.id,
          messages: finalMessages,
          topic: 'career_guidance',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        })
        .then();
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-md">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6" />
          <div>
            <h2 className="text-xl font-bold">AI Career Advisor</h2>
            <p className="text-sm text-blue-100">Your personal career guidance assistant</p>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/20 rounded-lg transition"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Start Your Conversation</h3>
            <p className="text-gray-500 max-w-xs">
              Ask me anything about careers, skills, internships, or job preparation
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin text-gray-600" />
              <span className="text-sm text-gray-600">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your career..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
