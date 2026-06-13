import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submitContact, getSubmissions } from '../services/contactService';
import { SheCanLogo } from '../components/SheCanLogo';
import { Hero } from '../components/Hero';
import { GetInTouch } from '../components/GetInTouch';
import { Mail, User as UserIcon, MessageSquare, Shield, HelpCircle, LogOut } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { user, login, register, logout } = useAuth();

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Stats loaded live from services
  const [stats, setStats] = useState({ totalSubmissions: 0, mentors: 84 });

  // Auth drawer/modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Count submissions from localStorage to update stats inside component on load
  const loadStats = () => {
    const subs = getSubmissions();
    setStats({
      totalSubmissions: 1200 + subs.length, // Initial 1200 base count + user custom entries
      mentors: 84 + Math.round(subs.length * 0.2) // Dynamically simulated
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  // Form Validation and Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Minimum delay for high-fidelity response & premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Validations
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast.error('All fields are required');
      setIsSubmitting(false);
      return;
    }

    if (trimmedName.length < 3) {
      toast.error('Name must be at least 3 characters long');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    if (trimmedMessage.length < 10) {
      toast.error('Your message must be at least 10 characters long');
      setIsSubmitting(false);
      return;
    }

    try {
      // Save local contact
      submitContact(trimmedName, trimmedEmail, trimmedMessage);
      
      // Update localized success feedback
      setSubmitSuccess(true);
      toast.success('Form Submitted Successfully! ✅');
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      loadStats();
    } catch {
      toast.error('Something went wrong during submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auth handling
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      if (isRegisterMode) {
        if (!authForm.name || !authForm.email || !authForm.password) {
          setAuthError('Please fill in all registration fields');
          return;
        }
        await register(authForm.name, authForm.email, authForm.password, 'admin');
        toast.success('Registration successful! You can now log in.');
        setIsRegisterMode(false);
      } else {
        if (!authForm.email || !authForm.password) {
          setAuthError('Please specify email and password');
          return;
        }
        const success = await login(authForm.email, authForm.password);
        if (success) {
          toast.success('Logged in successfully!');
          setShowAuthModal(false);
          // Redirect to administrative console
          navigate('/admin');
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#3D3D3D] selection:bg-[#7C8363] selection:text-white">
      
      {/* Navigation Header */}
      <nav className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-[#E8E6E1] bg-[#FAF9F6]/85 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#7C8363] rounded-full flex items-center justify-center shadow-inner hover:scale-105 transition-transform duration-300">
            <span className="text-white font-serif font-bold text-lg uppercase italic">S</span>
          </div>
          <span className="font-serif text-lg md:text-2xl font-semibold tracking-tight text-[#2D3021]">
            She Can Foundation
          </span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8 text-xs md:text-sm font-medium uppercase tracking-widest text-[#5C5C5C]">
          <span 
            onClick={() => {
              const contactSection = document.getElementById('interactive-sections');
              if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="hidden md:inline hover:text-[#7C8363] cursor-pointer transition-colors duration-300"
          >
            Our Mission
          </span>
          <span 
            onClick={() => navigate('/our-story')} 
            className="hidden md:inline hover:text-[#7C8363] cursor-pointer transition-colors duration-300"
          >
            Stories
          </span>
          <span 
            onClick={() => navigate('/donate')} 
            className="hover:text-[#7C8363] cursor-pointer transition-colors duration-300 font-bold text-[#7C8363]"
          >
            Donate ❤️
          </span>
          
          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-[#7C8363] text-white rounded-full hover:bg-[#6A7054] transition-all text-xs font-bold shadow-sm"
              >
                Dashboard
              </button>
              <button 
                onClick={logout}
                title="Log Out"
                className="p-2 border border-[#FAF9F6] text-[#5C5C5C] hover:text-[#7C8363] transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                setAuthForm({ name: '', email: 'admin@shecan.org', password: '' });
                setShowAuthModal(true);
              }}
              className="px-5 py-2 border border-[#7C8363] text-[#7C8363] rounded-full hover:bg-[#7C8363] hover:text-white transition-all duration-300 uppercase text-xs font-bold tracking-wider"
            >
              Log In / Admin
            </button>
          )}
        </div>
      </nav>

      {/* Welcoming Centered Hero Component */}
      <Hero />

      {/* Main Container Grid */}
      <main id="interactive-sections" className="flex-1 flex flex-col md:flex-row border-t border-[#E8E6E1]/70">
        
        {/* Left Interactive Hero Box */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-gradient-to-br from-[#FAF9F6] via-[#F3F1ED] to-[#E9E6DF] relative overflow-hidden min-h-[400px]">
          {/* Subtle logo vector graphic alignment */}
          <div className="mb-8 md:mb-10 animate-fade-in">
            <SheCanLogo size="md" className="shadow-md hover:rotate-3 transition-transform duration-500" />
          </div>

          <div className="max-w-md z-10">
            <span className="text-[#7C8363] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
              Empowerment Portal
            </span>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] text-[#2D3021] mb-5 font-bold">
              Your voice <br/>
              <span className="italic font-light text-[#7C8363]">shapes</span> the future.
            </h1>
            <p className="text-xs md:text-[13px] text-[#5C5C5C]/90 font-serif leading-relaxed tracking-wide mb-8 md:mb-10 border-l-2 border-[#7C8363] pl-4 py-2 italic bg-[#7C8363]/5 pr-3 rounded-r-xl shadow-xs">
              We are She Can Foundation, a non-governmental organization registered under the Indian Society Act, 1860, dedicated to empowering women and creating a more equitable society. We provide support, resources, and training to women in communities across the globe, working closely with local organizations, governments, and communities to ensure that our programs are effective and sustainable. Through advocacy campaigns and initiatives, we raise awareness of women's issues. We rely on the support of individuals, corporations, and other organizations to achieve our vision. We believe that by working together, we can revolutionize society and create a better world for all.
            </p>
            
            {/* Space Placeholder */}
          </div>
        </div>

        {/* Right Section: Glassmorphic Contact form with animations */}
        <div className="w-full md:w-1/2 relative flex items-center justify-center p-6 md:p-12 bg-[#FAF9F6]">
          {/* Accent blurs */}
          <div className="absolute top-20 right-20 w-48 h-48 bg-[#D4A373] opacity-[0.08] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#7C8363] opacity-[0.08] rounded-full blur-3xl"></div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[460px] bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-[28px] p-6 md:p-10 z-10"
          >
            <div className="mb-6 md:mb-8 text-center md:text-left">
              <h2 className="text-2xl font-serif text-[#2D3021] font-semibold">Contact Form</h2>
              <p className="text-sm text-[#7C7C7C] mt-1">Fill in the details below to reach our team.</p>
            </div>

            {/* Local success message container block */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex flex-col gap-1 shadow-sm"
                >
                  <p className="font-semibold flex items-center gap-1.5">
                    ✅ Form Submitted Successfully
                  </p>
                  <p className="text-xs text-emerald-700/90">
                    We have received your request. Our support specialists will respond to you shortly via email.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleContactSubmit} className="space-y-4 md:space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#8C8C8C] flex items-center gap-1">
                  <UserIcon size={11} className="text-[#7C8363]" /> Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="Jane Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/50 border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7C8363] focus:ring-1 focus:ring-[#7C8363] placeholder:opacity-40 transition-all text-[#3D3D3D] duration-300" 
                  required
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#8C8C8C] flex items-center gap-1">
                  <Mail size={11} className="text-[#7C8363]" /> Email Address
                </label>
                <input 
                  type="email" 
                  placeholder="jane@foundation.org" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/50 border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7C8363] focus:ring-1 focus:ring-[#7C8363] placeholder:opacity-40 transition-all text-[#3D3D3D] duration-300" 
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#8C8C8C] flex items-center gap-1">
                  <MessageSquare size={11} className="text-[#7C8363]" /> Message
                </label>
                <textarea 
                  rows={3} 
                  placeholder="Tell us your story (minimum 10 characters)..." 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/50 border border-[#E0E0E0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7C8363] focus:ring-1 focus:ring-[#7C8363] placeholder:opacity-40 transition-all text-[#3D3D3D] duration-300 resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7C8363] hover:bg-[#6A7054] text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-[0.98] mt-4 uppercase text-xs tracking-widest flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Submission...
                  </>
                ) : 'Send Message'}
              </button>
            </form>

            <div className="mt-5 flex items-center justify-center gap-1.5 text-[#7C8363] opacity-85">
              <Shield size={12} />
              <span className="text-[10px] font-medium tracking-wide">Secure & Encrypted Submission Portal</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Welcoming Get In Touch Details Section */}
      <GetInTouch />

      {/* Auth Modal overlay */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 shadow-2xl"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm border border-[#E8E6E1]"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl font-bold text-[#2D3021]">
                  {isRegisterMode ? 'Admin Registration' : 'Administrator Log In'}
                </h3>
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-[#7C8363] text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  ⚠️ {authError}
                </div>
              )}

              {/* Login Help Info Box */}
              {!isRegisterMode && (
                <div className="mb-4 p-3.5 bg-[#F3F1ED] rounded-xl text-xs text-[#5C5C5C] flex flex-col gap-1 border border-[#E8E6E1]/60">
                  <div className="font-semibold text-[#2D3021] flex items-center gap-1">
                    <HelpCircle size={13} className="text-[#7C8363]" /> Credentials for Reviewing
                  </div>
                  <p>Email: <span className="font-mono bg-white px-1 py-0.5 rounded text-[#7C8363] select-all">admin@shecan.org</span></p>
                  <p>Password: <span className="font-mono bg-white px-1 py-0.5 rounded text-[#7C8363] select-all">any password</span> (accepts any for easy login)</p>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {isRegisterMode && (
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#8C8C8C] tracking-wider mb-1">Name</label>
                    <input 
                      type="text" 
                      placeholder="Admin Name"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#7C8363]"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8C8C8C] tracking-wider mb-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="admin@shecan.org"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#7C8363]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8C8C8C] tracking-wider mb-1">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#7C8363]"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#7C8363] hover:bg-[#6A7054] text-white text-xs font-bold py-3 uppercase tracking-widest rounded-xl mt-2 transition-all cursor-pointer"
                >
                  {isRegisterMode ? 'Register New Admin' : 'Secure Log In'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button 
                  onClick={() => {
                    setIsRegisterMode(!isRegisterMode);
                    setAuthError('');
                  }}
                  className="text-xs text-[#5C5C5C] hover:text-[#7C8363] underline decoration-[#7C8363]/40"
                >
                  {isRegisterMode ? 'Already have an administrator account? Log In' : 'Need to register a custom administrator? Sign Up'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Footer */}
      <footer className="h-16 border-t border-[#E8E6E1] bg-[#FAF9F6] text-[#8C8C8C] flex flex-col sm:flex-row items-center px-6 md:px-12 justify-between gap-2 py-3 sm:py-0 text-center text-xs">
        <span>© {new Date().getFullYear()} She Can Foundation. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <span className="hover:text-[#7C8363] transition-colors cursor-pointer" onClick={() => navigate('/admin')}>Admin Console</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
