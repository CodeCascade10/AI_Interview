import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

const Landing = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
        <div className="absolute top-[60%] left-[20%] w-[30%] h-[30%] rounded-full bg-purple-600/5 blur-[120px]"></div>
      </div>

      <nav className="relative z-10 border-b border-white/5 bg-[#0A0F1C]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            AI Interviewer
          </div>
          <div className="flex items-center gap-6">
            {user ? (
              <Link to="/dashboard" className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-200 text-sm font-semibold rounded-full transition-all shadow-xl active:scale-95">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-200 text-sm font-semibold rounded-full transition-all shadow-xl active:scale-95">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-grow flex items-center justify-center px-4 pt-32 pb-24 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Powered by Gemini 3.0 Flash
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 tracking-tighter leading-[1.1]">
            Nail your next interview with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">AI precision.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Upload your resume, paste the job description, and instantly receive tailored technical questions, behavioral insights, and a personalized day-by-day preparation plan.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link to="/dashboard" className="px-8 py-4 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-base font-semibold rounded-full transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] flex justify-center items-center gap-2">
                Go to Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ) : (
              <Link to="/register" className="px-8 py-4 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-base font-semibold rounded-full transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] flex justify-center items-center gap-2">
                Start Practicing Free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            )}
            
            <a href="#how-it-works" className="px-8 py-4 w-full sm:w-auto bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white text-base font-medium rounded-full transition-all active:scale-[0.98] backdrop-blur-sm">
              How it works
            </a>
          </div>
        </div>
      </main>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative z-10 py-24 border-t border-white/5 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Three steps to your dream job</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">Stop guessing what they'll ask. Generate a customized roadmap based on actual data.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-[#0A0F1C] rounded-full border-4 border-slate-800 flex items-center justify-center mb-6 text-2xl font-bold text-slate-300">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Upload Profile</h3>
              <p className="text-slate-400 font-light">Upload your PDF resume and optionally add a quick bio about your target roles.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-[#0A0F1C] rounded-full border-4 border-slate-800 flex items-center justify-center mb-6 text-2xl font-bold text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Target Role</h3>
              <p className="text-slate-400 font-light">Paste the exact job description of the company you are interviewing for.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-[#0A0F1C] rounded-full border-4 border-slate-800 flex items-center justify-center mb-6 text-2xl font-bold text-slate-300">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Insights</h3>
              <p className="text-slate-400 font-light">Our AI engine identifies gaps, creates a study plan, and predicts their questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 border-t border-white/5 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Everything you need to succeed</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">Our advanced AI model analyzes the intersection between your experience and the job requirements to generate hyper-relevant preparation materials.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-[2rem] hover:bg-slate-800/60 hover:border-slate-600 transition-all group">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ATS Match Score</h3>
              <p className="text-slate-400 font-light leading-relaxed">Instantly see how well your resume aligns with the job description. Identify missing keywords before you hit submit.</p>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-[2rem] hover:bg-slate-800/60 hover:border-slate-600 transition-all group">
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Targeted Questions</h3>
              <p className="text-slate-400 font-light leading-relaxed">Practice with technical and behavioral questions generated specifically for your unique profile and the target role.</p>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-[2rem] hover:bg-slate-800/60 hover:border-slate-600 transition-all group">
              <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Study Roadmap</h3>
              <p className="text-slate-400 font-light leading-relaxed">Turn your skill gaps into strengths with a multi-day, actionable preparation plan tailored just for you.</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-[2rem] hover:bg-slate-800/60 hover:border-slate-600 transition-all group">
              <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Skill Gap Analysis</h3>
              <p className="text-slate-400 font-light leading-relaxed">Instantly spot what you are missing. The AI clearly outlines required skills you lack and categorizes them by severity.</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-[2rem] hover:bg-slate-800/60 hover:border-slate-600 transition-all group">
              <div className="w-14 h-14 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Interview Intentions</h3>
              <p className="text-slate-400 font-light leading-relaxed">Understand *why* a recruiter asks a question. Every question generated includes the psychological and technical intention.</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-8 rounded-[2rem] hover:bg-slate-800/60 hover:border-slate-600 transition-all group">
              <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure & Private</h3>
              <p className="text-slate-400 font-light leading-relaxed">Your resume and personal details are processed securely through our AI backend and stored safely on your dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-10 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-slate-500 font-light text-sm">
            © {new Date().getFullYear()} AI Interviewer. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="#" className="text-slate-500 hover:text-white transition-colors text-sm">Privacy</Link>
            <Link to="#" className="text-slate-500 hover:text-white transition-colors text-sm">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
