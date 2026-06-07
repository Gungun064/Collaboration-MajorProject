import { ReactNode, useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Home,
  Target,
  Briefcase,
  Map,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  MessageSquare,
  BarChart3,
  FileText,
  Zap,
  Linkedin,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/assessment', icon: Target, label: 'Career Assessment' },
    { path: '/career-prediction', icon: BarChart3, label: 'Career Prediction' },
    { path: '/skill-gap', icon: Zap, label: 'Skill Gap' },
    { path: '/ai-chat', icon: MessageSquare, label: 'AI Chat' },
    { path: '/resume-analyzer', icon: FileText, label: 'Resume Analyzer' },
    { path: '/job-demand', icon: TrendingUp, label: 'Job Demand' },
    { path: '/career-progress', icon: Award, label: 'My Progress' },
    { path: '/linkedin-optimizer', icon: Linkedin, label: 'LinkedIn Optimizer' },
    { path: '/internships', icon: Briefcase, label: 'Internships' },
    { path: '/roadmap', icon: Map, label: 'Career Roadmap' },
    { path: '/future-jobs', icon: TrendingUp, label: 'Future Jobs' },
    { path: '/demand-skills', icon: Award, label: 'Demand Skills' },
    { path: '/learning', icon: BookOpen, label: 'Learning Platform' },
    { path: '/mentor', icon: Users, label: 'Mentor / Guide' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ];

  const primaryItems = navItems.slice(0, 10);
  const moreItems = navItems.slice(10);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      if (el) el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const scrollNav = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="flex items-center h-14 px-3 gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 flex-shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Title - compact, no wrap */}
          <h1 className="font-bold text-blue-600 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm md:text-base lg:text-base">
            Personalized AI Career & Skills Advisor
          </h1>

          {/* Desktop nav: scrollable row with primary items + More dropdown */}
          <div className="hidden xl:flex items-center flex-1 min-w-0 gap-[12px] ml-[12px] relative">
            {canScrollLeft && (
              <button onClick={() => scrollNav('left')} className="absolute left-0 z-10 bg-white shadow rounded-full p-1 hover:bg-gray-100">
                <ChevronLeft className="w-4 h-4 text-gray-500" />
              </button>
            )}
            <div
              ref={scrollRef}
              className="flex items-center gap-[12px] overflow-x-auto scrollbar-none flex-1 min-w-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {primaryItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md whitespace-nowrap transition text-xs font-medium flex-shrink-0 ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              ))}

              {/* More dropdown */}
              {moreItems.length > 0 && (
                <div ref={moreRef} className="relative flex-shrink-0">
                  <button
                    onClick={() => setMoreOpen(!moreOpen)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md whitespace-nowrap transition text-xs font-medium ${
                      moreItems.some(i => isActive(i.path))
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    More
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {moreOpen && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] z-50">
                      {moreItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => { navigate(item.path); setMoreOpen(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition ${
                            isActive(item.path)
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <item.icon className="w-3.5 h-3.5" />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {canScrollRight && (
              <button onClick={() => scrollNav('right')} className="absolute right-0 z-10 bg-white shadow rounded-full p-1 hover:bg-gray-100">
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Tablet nav: horizontally scrollable without More dropdown */}
          <div className="hidden md:flex xl:hidden items-center flex-1 min-w-0 ml-[12px]">
            <div
              className="flex items-center gap-[12px] overflow-x-auto flex-1 min-w-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md whitespace-nowrap transition text-xs font-medium flex-shrink-0 ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User info + Logout */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-medium text-gray-900 truncate max-w-[120px]">{profile?.full_name}</p>
              <p className="text-[10px] text-gray-500 truncate max-w-[120px]">{profile?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-xs font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-200 bg-white">
            <div className="px-3 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-sm ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-14 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </main>
    </div>
  );
}
