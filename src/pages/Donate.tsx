import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { getDonations, submitDonation } from '../services/donationService';
import { SheCanLogo } from '../components/SheCanLogo';
import { toast } from 'react-toastify';
import { 
  ArrowLeft, CreditCard, Landmark, CheckCircle, 
  ArrowRight, ShieldCheck, Heart, HelpCircle 
} from 'lucide-react';

export const Donate: React.FC = () => {
  const navigate = useNavigate();

  // Primary Donation State
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [cause, setCause] = useState<'education' | 'hygiene' | 'mentorship' | 'general'>('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [memo, setMemo] = useState('');
  const [tab, setTab] = useState<'card' | 'upi' | 'bank'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRecord, setSuccessRecord] = useState<boolean>(false);

  // Suggested donation tiers (in Indian Rupees INR, representing standard support packages)
  const tiers = [
    { value: 500, label: '₹500', desc: 'Provides 1 local hygiene kit' },
    { value: 1000, label: '₹1000', desc: 'Supports 1 professional circle mentorship session' },
    { value: 2500, label: '₹2500', desc: 'Sponsors 1 month classroom tuition fees' },
    { value: 5000, label: '₹5000', desc: 'Contributes to direct vocational tech course access' }
  ];

  const getFinalAmount = (): number => {
    if (selectedAmount === 'custom') {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount;
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmt = getFinalAmount();

    if (finalAmt <= 0) {
      toast.error('Please input a valid donation amount.');
      return;
    }
    if (!email) {
      toast.error('Please provide a donor email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate safe API routing and payment authorization delay
    setTimeout(() => {
      submitDonation(
        name || 'Anonymous Supporter',
        email,
        finalAmt,
        cause,
        'card',
        memo
      );
      setIsSubmitting(false);
      setSuccessRecord(true);
      toast.success('Thank you! Your donation was authorized safely.');
    }, 1500);
  };

  const handleManualBankReport = () => {
    const finalAmt = getFinalAmount();
    if (finalAmt <= 0) {
      toast.error('Please select an approximate amount to track your pledge.');
      return;
    }
    if (!email) {
      toast.error('Please key in your email for pledge verification.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitDonation(
        name || 'Anonymous Supporter (Pledged)',
        email,
        finalAmt,
        cause,
        'bank_transfer',
        memo || 'Pledge logged via offline wire transfer coordinate path.'
      );
      setIsSubmitting(false);
      setSuccessRecord(true);
      toast.success('Pledge tracked successfully. We look forward to verifying your bank transfer.');
    }, 1200);
  };

  const handleUPIReport = () => {
    const finalAmt = getFinalAmount();
    if (finalAmt <= 0) {
      toast.error('Please input an approximate amount for direct UPI record.');
      return;
    }
    if (!email) {
      toast.error('Provide your email to track the UPI confirmation.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitDonation(
        name || 'Anonymous Donor (UPI)',
        email,
        finalAmt,
        cause,
        'upi',
        memo || 'Instant mobile QR scanning.'
      );
      setIsSubmitting(false);
      setSuccessRecord(true);
      toast.success('Instant UPI transaction logged for internal support desk verification.');
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#3D3D3D] selection:bg-[#7C8363] selection:text-white">
      
      {/* Navigation Header */}
      <nav className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-[#E8E6E1] bg-[#FAF9F6]/85 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#7C8363] rounded-full flex items-center justify-center shadow-inner hover:scale-105 transition-transform duration-300">
            <span className="text-white font-serif font-bold text-lg uppercase italic">S</span>
          </div>
          <span className="font-serif text-lg md:text-2xl font-semibold tracking-tight text-[#2D3021]">
            She Can Foundation
          </span>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5C5C5C] hover:text-[#7C8363] transition-colors"
        >
          <ArrowLeft size={14} />
          Go Back
        </button>
      </nav>

      {/* Hero Banner Section */}
      <div className="relative py-16 px-6 text-center bg-gradient-to-b from-[#FAF9F6] via-[#F3F1ED] to-[#FAF9F6] border-b border-[#E8E6E1]/90 overflow-hidden flex flex-col items-center">
        <div className="absolute top-5 left-1/4 w-72 h-72 bg-[#7C8363] opacity-[0.04] rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-5 right-1/4 w-80 h-80 bg-[#D4A373] opacity-[0.04] rounded-full blur-3xl -z-10"></div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl sm:text-4.5xl md:text-5xl text-[#2D3021] font-bold max-w-3xl leading-tight"
        >
          Make a lasting <span className="font-light italic text-[#7C8363]">contribution</span> today.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs sm:text-sm text-[#5C5C5C] max-w-2xl mt-3 leading-relaxed"
        >
          Your direct contribution finances educational materials, clean menstrual healthcare distribution kits, and career coaching workshops for thousands of ambitious girls.
        </motion.p>

        {/* Indian Tax Section info */}
        <div className="mt-4 text-[10px] uppercase font-bold tracking-widest text-[#8C8C8C] flex items-center gap-1.5 justify-center">
          <ShieldCheck size={12} className="text-[#7C8363]" />
          Indian Registered NGO • Tax Exempt under section 80G
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 w-full flex-1">
        <AnimatePresence mode="wait">
          {!successRecord ? (
            <motion.div 
              key="donation-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto w-full font-sans"
            >
              
              {/* Form Controls Container */}
              <div className="bg-white p-6 sm:p-10 border border-[#E8E6E1] rounded-[28px] shadow-sm space-y-8">
                
                {/* 1. Pick Donation Amount */}
                <div className="space-y-4">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C8C8C] block">
                    1. Choose Support Level / Amount
                  </span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {tiers.map((t) => (
                      <button
                        type="button"
                        key={t.value}
                        onClick={() => setSelectedAmount(t.value)}
                        className={`p-4 border text-left rounded-2xl transition-all flex flex-col justify-between gap-1 group cursor-pointer ${
                          selectedAmount === t.value 
                            ? 'bg-[#7C8363] text-white border-[#7C8363] shadow-md' 
                            : 'bg-[#FAF9F6] hover:bg-white text-[#2D3021] border-[#E8E6E1] hover:border-[#7C8363]/60'
                        }`}
                      >
                        <span className="font-serif font-bold text-lg md:text-xl">{t.label}</span>
                        <span className={`text-[10px] leading-snug line-clamp-2 ${
                          selectedAmount === t.value ? 'text-white/85' : 'text-[#8C8C8C] group-hover:text-gray-600'
                        }`}>
                          {t.desc}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedAmount('custom')}
                      className={`p-3 text-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all border cursor-pointer ${
                        selectedAmount === 'custom'
                          ? 'bg-[#7C8363] text-white border-[#7C8363]'
                          : 'bg-[#FAF9F6] hover:bg-white border-[#E8E6E1] text-[#2D3021]'
                      }`}
                    >
                      Or Choose Custom Amount
                    </button>

                    {selectedAmount === 'custom' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="relative mt-2"
                      >
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold font-serif text-[#2D3021]">₹</span>
                        <input
                          type="number"
                          placeholder="Enter amount (INR)"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-[#7C8363] focus:ring-1 focus:ring-[#7C8363]"
                          min="10"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* 2. Cause Categorization */}
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C8C8C] block">
                    2. Select Campaign Cause
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(['general', 'education', 'hygiene', 'mentorship'] as const).map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setCause(c)}
                        className={`py-2 px-3 text-xs font-bold uppercase tracking-wide rounded-xl border transition-all text-center whitespace-nowrap cursor-pointer ${
                          cause === c 
                            ? 'bg-[#2D3021] text-white border-[#2D3021] shadow-sm' 
                            : 'bg-[#FAF9F6] text-[#5C5C5C] border-[#E8E6E1] hover:border-[#8C8C8C]'
                        }`}
                      >
                        {c === 'general' ? 'General Pool' : c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Donor Personal Particulars */}
                <div className="space-y-4">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C8C8C] block">
                    3. Contact Credentials (Secure)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#5C5C5C]">Full Name (Optional)</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#7C8363] focus:ring-1 focus:ring-[#7C8363]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#5C5C5C]">Email Address *</label>
                      <input
                        type="email"
                        placeholder="e.g. partner@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#7C8363] focus:ring-1 focus:ring-[#7C8363]"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#5C5C5C]">Support Message / Dedication Note (Optional)</label>
                    <textarea
                      placeholder="Share your encouragement notes with She Can team..."
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      rows={2}
                      className="w-full bg-[#FAF9F6] border border-[#E8E6E1] rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#7C8363] focus:ring-1 focus:ring-[#7C8363] resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* 4. Payment Options Choice Display */}
                <div className="space-y-4">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C8C8C] block">
                    4. Choose Transaction Channel
                  </span>
                  
                  {/* Tab list */}
                  <div className="flex bg-[#FAF9F6] border border-[#E8E6E1] p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setTab('card')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        tab === 'card' ? 'bg-white text-[#2D3021] shadow-sm font-extrabold' : 'text-[#8C8C8C]'
                      }`}
                    >
                      <CreditCard size={14} />
                      Card Form
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab('upi')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        tab === 'upi' ? 'bg-white text-[#2D3021] shadow-sm font-extrabold' : 'text-[#8C8C8C]'
                      }`}
                    >
                      <Heart size={14} />
                      UPI Portal
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab('bank')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        tab === 'bank' ? 'bg-white text-[#2D3021] shadow-sm font-extrabold' : 'text-[#8C8C8C]'
                      }`}
                    >
                      <Landmark size={14} />
                      Direct Wire
                    </button>
                  </div>

                  {/* Tab details views */}
                  <div className="border border-[#E8E6E1]/80 rounded-2xl p-6 bg-[#FAF9F6]/50">
                    <AnimatePresence mode="wait">
                      {tab === 'card' && (
                        <motion.form 
                          key="tab-card"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleCardSubmit}
                          className="space-y-4"
                        >
                          <div className="text-xs text-[#5C5C5C] flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            Secure processing gateway connected (Client-Side Simulation and Saved Record)
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Card Number</label>
                              <input 
                                type="text" 
                                placeholder="4111 •••• •••• ••••" 
                                className="w-full bg-white border border-[#E8E6E1] rounded-xl px-4 py-2 text-xs focus:outline-none"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Expiry</label>
                                <input 
                                  type="text" 
                                  placeholder="MM/YY" 
                                  className="w-full bg-white border border-[#E8E6E1] rounded-xl px-4 py-2 text-xs focus:outline-none"
                                  required
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400">CVC</label>
                                <input 
                                  type="password" 
                                  placeholder="•••" 
                                  className="w-full bg-white border border-[#E8E6E1] rounded-xl px-4 py-2 text-xs focus:outline-none"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#7C8363] hover:bg-[#6A7054] text-white text-xs font-bold py-3.5 tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                          >
                            {isSubmitting ? 'Verifying Card State...' : `Authorize Contribution of ₹${getFinalAmount()}`}
                            <ArrowRight size={14} />
                          </button>
                        </motion.form>
                      )}

                      {tab === 'upi' && (
                        <motion.div 
                          key="tab-upi"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-5 text-center flex flex-col items-center"
                        >
                          <span className="text-[10px] uppercase tracking-widest bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded-full">
                            Instant UPI App QR
                          </span>
                          <p className="text-xs text-[#5C5C5C] max-w-sm">
                            Scan this dynamic non-profit identifier. You can donate using any authorized application (PhonePe, GPay, Paytm, BHIM).
                          </p>
                          
                          {/* QR Code SVG */}
                          <div className="bg-white p-4 border border-[#E8E6E1] rounded-2xl shadow-inner inline-block relative">
                            <svg className="w-40 h-40 text-[#2D3021]" viewBox="0 0 100 100" fill="currentColor">
                              {/* QR Box styling wrapper */}
                              <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5"/>
                              <rect x="10" y="10" width="15" height="15"/>
                              <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5"/>
                              <rect x="75" y="10" width="15" height="15"/>
                              <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="5"/>
                              <rect x="10" y="75" width="15" height="15"/>
                              {/* Small points */}
                              <rect x="40" y="15" width="10" height="10" />
                              <rect x="55" y="5" width="5" height="15" />
                              <rect x="45" y="45" width="15" height="15" />
                              <rect x="75" y="45" width="15" height="10" />
                              <rect x="40" y="70" width="15" height="15" />
                              <rect x="70" y="75" width="20" height="15" fill="#7C8363" />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF9F6] p-1 rounded-lg border border-[#E8E6E1]">
                              <SheCanLogo size="sm" />
                            </div>
                          </div>

                          <div className="space-y-1 font-mono">
                            <span className="text-xs font-bold text-[#2D3021] block">president@shecanfoundation.org</span>
                            <span className="text-[9px] text-[#8C8C8C] block">Verified UPI Gateway Address</span>
                          </div>

                          <button
                            type="button"
                            onClick={handleUPIReport}
                            disabled={isSubmitting}
                            className="w-full bg-[#7C8363] hover:bg-[#6A7054] text-white text-xs font-bold py-3 tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                          >
                            {isSubmitting ? 'Logging Transaction...' : 'Confirm UPI Transaction Details'}
                          </button>
                        </motion.div>
                      )}

                      {tab === 'bank' && (
                        <motion.div 
                          key="tab-bank"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-5"
                        >
                          <div className="space-y-3 font-serif border-b border-[#E8E6E1] pb-4 text-sm">
                            <h4 className="font-bold text-[#2D3021]">Global Banking Coordinates:</h4>
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-sans">
                              <span className="text-gray-400 uppercase tracking-wider text-[10px]">Account Title</span>
                              <span className="font-semibold text-[#2D3021] text-right">SHE CAN FOUNDATION</span>
                              
                              <span className="text-gray-400 uppercase tracking-wider text-[10px]">Bank Organiser</span>
                              <span className="font-semibold text-[#2D3021] text-right">State Bank of India</span>
                              
                              <span className="text-gray-400 uppercase tracking-wider text-[10px]">Account Number</span>
                              <span className="font-mono font-semibold text-[#2D3021] text-right">40918302193</span>
                              
                              <span className="text-gray-400 uppercase tracking-wider text-[10px]">Bank IFSC Code</span>
                              <span className="font-mono font-semibold text-[#2D3021] text-right">SBIN0001042</span>
                              
                              <span className="text-gray-400 uppercase tracking-wider text-[10px]">Society Registration</span>
                              <span className="font-semibold text-[#2D3021] text-right">CH/0423/2021/NGO</span>
                            </div>
                          </div>

                          <p className="text-[10px] text-[#5C5C5C] leading-normal italic text-center">
                            After your transfer, our registration desk will verify the inward remittance with your provided email support contact credentials.
                          </p>

                          <button
                            type="button"
                            onClick={handleManualBankReport}
                            disabled={isSubmitting}
                            className="w-full bg-[#7C8363] hover:bg-[#6A7054] text-white text-xs font-bold py-3 tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                          >
                            {isSubmitting ? 'Filing Support Ticket...' : 'Send Wire Remittance Notice'}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>

            </motion.div>
          ) : (
            <motion.div 
              key="donation-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto text-center py-12 px-8 bg-white border border-[#E8E6E1] rounded-[28px] shadow-lg space-y-8"
            >
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle size={32} />
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-3xl font-bold text-[#2D3021]">Thank You!</h2>
                <p className="text-xs uppercase tracking-widest text-[#7C8363] font-bold">Contribution Authorized</p>
                <div className="font-serif text-4xl text-[#7C8363] font-bold pt-4">₹{getFinalAmount()}</div>
              </div>

              <p className="text-xs text-[#5C5C5C] leading-relaxed max-w-sm mx-auto">
                Your secure donation has been submitted successfully to She Can Foundation. A digital donor acknowledgement has been issued to <span className="font-semibold text-[#2D3021]">{email}</span>. Thank you for making a lasting difference!
              </p>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full bg-[#7C8363] hover:bg-[#6A7054] text-white text-xs font-bold py-3.5 tracking-wider uppercase rounded-xl transition-all cursor-pointer"
              >
                Return to Landing Hub
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="h-16 border-t border-[#E8E6E1] bg-[#FAF9F6] text-[#8C8C8C] flex flex-col sm:flex-row items-center px-6 md:px-12 justify-between gap-2 py-3 sm:py-0 text-center text-xs mt-auto">
        <span>© {new Date().getFullYear()} She Can Foundation. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <span className="hover:text-[#7C8363] transition-colors cursor-pointer" onClick={() => navigate('/admin')}>Admin Console</span>
        </div>
      </footer>

    </div>
  );
};

export default Donate;
