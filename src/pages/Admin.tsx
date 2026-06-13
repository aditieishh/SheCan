import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSubmissions, deleteSubmission, ContactSubmission } from '../services/contactService';
import { getDonations, deleteDonation, DonationRecord } from '../services/donationService';
import { toast } from 'react-toastify';
import { Inbox, Trash2, Search, UserCheck, ArrowLeft, LogOut, FileText, Settings, Key, ShieldCheck, Mail, Heart, DollarSign } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const { user, users, logout, deleteUser } = useAuth();
  
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState<'submissions' | 'users' | 'donations'>('submissions');
  const [selectedMsg, setSelectedMsg] = useState<ContactSubmission | null>(null);

  // Load submissions and synchronize
  useEffect(() => {
    setSubmissions(getSubmissions());
    setDonations(getDonations());
  }, []);

  // Protected route block for guest visitors
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#3D3D3D] flex flex-col items-center justify-center p-6 select-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 md:p-12 rounded-3xl border border-[#E8E6E1] shadow-xl max-w-sm w-full text-center"
        >
          <div className="w-16 h-16 bg-[#2D3021] text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Key size={26} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#2D3021] mb-2">Access Restricted</h2>
          <p className="text-sm text-[#5C5C5C] leading-relaxed mb-8">
            This module represents the admin console. Please log in first using administrative coordinates.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-[#7C8363] hover:bg-[#6A7054] text-white font-bold py-3 text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
            >
              Return Home & Log In
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Action: Delete submission item
  const handleDeleteSubmission = (id: string, name: string) => {
    const updated = deleteSubmission(id);
    setSubmissions(updated);
    toast.success(`Removed message from ${name}`);
    if (selectedMsg && selectedMsg.id === id) {
      setSelectedMsg(null);
    }
  };

  // Action: Delete registered profile
  const handleDeleteUserProfile = (userId: string, userName: string) => {
    if (userId === user.id) {
       toast.error("You cannot delete your own logged-in admin session.");
       return;
    }
    deleteUser(userId);
    toast.success(`Deleted user account: ${userName}`);
  };

  // Action: Delete donation profile transaction
  const handleDeleteDonation = (id: string, donorName: string) => {
    const updated = deleteDonation(id);
    setDonations(updated);
    toast.success(`Removed donation record from ${donorName}`);
  };

  // Filter messages using simple regex search match
  const filteredSubmissions = submissions.filter(sub => {
    const query = searchQuery.toLowerCase();
    return (
      sub.name.toLowerCase().includes(query) ||
      sub.email.toLowerCase().includes(query) ||
      sub.message.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#3D3D3D] flex flex-col font-sans">
      
      {/* Top Console Navigation Bar */}
      <header className="h-20 border-b border-[#E8E6E1] bg-white px-6 md:px-12 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="p-2 border border-[#E8E6E1] hover:bg-[#FAF9F6] text-[#5C5C5C] rounded-lg transition-all"
            title="Go to Landing Page"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#7C8363] rounded-full animate-ping"></div>
            <h1 className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#2D3021]">
              Administrator Console
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-[#2D3021]">{user.name}</span>
            <span className="text-[9px] uppercase tracking-widest text-[#8C8C8C]">{user.role}istrator</span>
          </div>
          <button 
            onClick={() => {
              logout();
              toast.info('Logged out security token successfully.');
              navigate('/');
            }}
            className="flex items-center gap-1.5 p-2 border border-[#E8E6E1] text-[#5C5C5C] hover:text-[#2D3021] hover:bg-neutral-50 rounded-xl transition-all cursor-pointer text-xs"
            title="Secure Logout"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline font-bold">Log Out</span>
          </button>
        </div>
      </header>

      {/* Primary Dashboard Content Area */}
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Statistics Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-[#E8E6E1] p-6 rounded-3xl shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#8C8C8C] font-bold">Total Contact Queries</span>
              <p className="text-3xl font-serif text-[#2D3021] font-bold">{submissions.length}</p>
              <p className="text-xs text-[#7C8363]">All submitted messages saved</p>
            </div>
            <div className="w-12 h-12 bg-[#FAF9F6] border border-[#E8E6E1] text-[#7C8363] rounded-2xl flex items-center justify-center">
              <Inbox size={22} />
            </div>
          </div>

          <div className="bg-white border border-[#E8E6E1] p-6 rounded-3xl shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#8C8C8C] font-bold">Total Platform Users</span>
              <p className="text-3xl font-serif text-[#2D3021] font-bold">{users.length}</p>
              <p className="text-xs text-[#7C8363]">{users.filter(u => u.role === 'admin').length} Authorized Admins</p>
            </div>
            <div className="w-12 h-12 bg-[#FAF9F6] border border-[#E8E6E1] text-[#7C8363] rounded-2xl flex items-center justify-center">
              <UserCheck size={22} />
            </div>
          </div>

          <div className="bg-[#2D3021] text-white border border-[#2D3021] p-6 rounded-3xl shadow-sm flex items-center justify-between">
            <div className="space-y-1 opacity-90">
              <span className="text-[10px] uppercase tracking-wider text-white/55 font-bold">Total Donations Raised</span>
              <p className="text-3xl font-serif font-bold text-[#FAF9F6]">
                ₹{donations.reduce((acc, d) => acc + d.amount, 0).toLocaleString()}
              </p>
              <p className="text-[10px] text-[#FAF9F6]/70">From {donations.length} global supporter pledges</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
              <Heart size={22} className="fill-white" />
            </div>
          </div>

        </div>

        {/* Console Controls and Switchers */}
        <div className="bg-white border border-[#E8E6E1] rounded-[28px] overflow-hidden shadow-sm">
          
          {/* Header Switch Selector */}
          <div className="border-b border-[#E8E6E1] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex bg-[#FAF9F6] p-1 rounded-xl border border-[#E8E6E1]/70 overflow-x-auto max-w-full">
              <button 
                onClick={() => { setTab('submissions'); setSelectedMsg(null); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  tab === 'submissions' 
                    ? 'bg-[#7C8363] text-white shadow-sm' 
                    : 'text-[#5C5C5C] hover:text-[#3D3D3D]'
                }`}
              >
                📥 Submissions ({submissions.length})
              </button>
              <button 
                onClick={() => { setTab('donations'); setSelectedMsg(null); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  tab === 'donations' 
                    ? 'bg-[#7C8363] text-white shadow-sm' 
                    : 'text-[#5C5C5C] hover:text-[#3D3D3D]'
                }`}
              >
                ❤️ Donations ({donations.length})
              </button>
              <button 
                onClick={() => { setTab('users'); setSelectedMsg(null); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  tab === 'users' 
                    ? 'bg-[#7C8363] text-white shadow-sm' 
                    : 'text-[#5C5C5C] hover:text-[#3D3D3D]'
                }`}
              >
                👥 Users Pool ({users.length})
              </button>
            </div>

            {/* Live Client Search bar */}
            {tab === 'submissions' && (
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search submissions..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#7C8363] focus:ring-1 focus:ring-[#7C8363]"
                />
              </div>
            )}
          </div>

          {/* Submissions Management Tab */}
          {tab === 'submissions' && (
            <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-[#E8E6E1]">
              
              {/* Submission List Table */}
              <div className="flex-1 overflow-auto max-h-[500px]">
                {filteredSubmissions.length === 0 ? (
                  <div className="p-12 text-center text-gray-400 italic text-sm">
                    No submissions found matching coordinates.
                  </div>
                ) : (
                  <div className="divide-y divide-[#E8E6E1]/65">
                    <AnimatePresence initial={false}>
                      {filteredSubmissions.map((sub, i) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.2 }}
                          key={sub.id}
                          onClick={() => setSelectedMsg(sub)}
                          className={`p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FAF9F6] transition-all relative ${
                            selectedMsg && selectedMsg.id === sub.id ? 'bg-[#FAF9F6] border-l-4 border-[#7C8363]' : ''
                          }`}
                        >
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-sm text-[#2D3021] block overflow-hidden text-ellipsis whitespace-nowrap">
                                {sub.name}
                              </span>
                              <span className="text-[9px] px-1.5 py-0.5 bg-[#E8E6E1] text-[#5C5C5C] rounded-full uppercase tracking-tighter">
                                {new Date(sub.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <span className="text-xs text-[#7C8363] block truncate font-medium">{sub.email}</span>
                            <p className="text-xs text-[#5C5C5C] line-clamp-1 mt-1 leading-relaxed">{sub.message}</p>
                          </div>

                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSubmission(sub.id, sub.name);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer self-center"
                            title="Delete Submission"
                          >
                            <Trash2 size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Message Details Previewer Sidebar */}
              <div className="w-full lg:w-[440px] p-6 bg-[#FAF9F6] flex flex-col justify-between min-h-[300px]">
                {selectedMsg ? (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C8C8C] block mb-2">Selected Submission</span>
                      <h4 className="font-serif text-2xl text-[#2D3021] font-bold">{selectedMsg.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-[#7C8363] mt-1 hover:underline">
                        <Mail size={12} />
                        <a href={`mailto:${selectedMsg.email}`}>{selectedMsg.email}</a>
                      </div>
                      <span className="text-[10px] text-gray-400 block mt-2">
                        Submitted on: {new Date(selectedMsg.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="bg-white p-5 border border-[#E8E6E1]/80 rounded-2xl relative shadow-sm">
                      <div className="absolute top-2.5 right-3 w-5 h-5 opacity-10 text-[#7C8363]">
                        <FileText size={20} />
                      </div>
                      <p className="text-sm text-[#5C5C5C] whitespace-pre-wrap leading-relaxed mt-1">
                        "{selectedMsg.message}"
                      </p>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <a 
                        href={`mailto:${selectedMsg.email}?subject=Regarding your message to She Can Foundation`}
                        className="flex-1 bg-[#7C8363] hover:bg-[#6A7054] text-white text-xs font-bold py-2 px-4 rounded-xl text-center transition-all uppercase tracking-wider"
                      >
                        Reply via Email
                      </a>
                      <button 
                        onClick={() => handleDeleteSubmission(selectedMsg.id, selectedMsg.name)}
                        className="bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold py-2 px-4 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400/95 space-y-3 py-10 select-none">
                    <FileText size={32} className="opacity-40" />
                    <p className="text-xs italic font-serif">Select a submission from the list preview list to analyze contents.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Donations Tab */}
          {tab === 'donations' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse divide-y divide-[#E8E6E1]">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-[#8C8C8C] font-bold">
                      <th className="pb-4">Donor</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Cause</th>
                      <th className="pb-4">Channel</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Message / Memo</th>
                      <th className="pb-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E6E1]/65">
                    {donations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-400 italic">
                          No donations registered yet.
                        </td>
                      </tr>
                    ) : (
                      donations.map((item) => (
                        <tr key={item.id} className="hover:bg-[#FAF9F6] transition-all">
                          <td className="py-4 font-serif">
                            <span className="font-bold text-sm text-[#2D3021] block">{item.name}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{item.email}</span>
                          </td>
                          <td className="py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#7C8363]/10 text-[#7C8363] border border-[#7C8363]/20">
                              ₹{item.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="px-2 py-0.5 rounded-lg uppercase text-[9px] font-bold tracking-wider bg-gray-100 text-gray-700">
                              {item.cause}
                            </span>
                          </td>
                          <td className="py-4 font-medium uppercase tracking-wider text-[9px] text-[#5C5C5C]">
                            {item.paymentMethod.replace('_', ' ')}
                          </td>
                          <td className="py-4 text-[#8C8C8C] whitespace-nowrap">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 text-xs text-[#5C5C5C] max-w-xs truncate" title={item.memo}>
                            {item.memo || <span className="text-gray-300 italic">No notes left</span>}
                          </td>
                          <td className="py-4 text-center">
                            <button 
                              onClick={() => handleDeleteDonation(item.id, item.name)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                              title="Delete Transaction"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Pool Tab */}
          {tab === 'users' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse divide-y divide-[#E8E6E1]">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-[#8C8C8C] font-bold">
                      <th className="pb-4">Name</th>
                      <th className="pb-4">Email</th>
                      <th className="pb-4">Role</th>
                      <th className="pb-4">Registration Date</th>
                      <th className="pb-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E6E1]/65">
                    {users.map((item) => (
                      <tr key={item.id} className="hover:bg-[#FAF9F6] transition-all">
                        <td className="py-4 font-serif font-bold text-sm text-[#2D3021]">{item.name}</td>
                        <td className="py-4 text-gray-600 font-mono">{item.email}</td>
                        <td className="py-4">
                          <span className={`px-2.5 py-0.5 rounded-full uppercase text-[9px] font-bold tracking-wider ${
                            item.role === 'admin' 
                              ? 'bg-[#2D3021] text-white' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {item.role}
                          </span>
                        </td>
                        <td className="py-4 text-[#8C8C8C]">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-center">
                          <button 
                            onClick={() => handleDeleteUserProfile(item.id, item.name)}
                            disabled={item.id === user.id}
                            className={`p-1.5 rounded-lg transition-all cursor-pointer inline-flex items-center ${
                              item.id === user.id 
                                ? 'text-gray-200 cursor-not-allowed' 
                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            }`}
                            title={item.id === user.id ? 'Protected Self Session' : 'Remove Profile'}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default Admin;
