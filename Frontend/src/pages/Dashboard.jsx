import React, { useState } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { generateInterviewReport } from '../services/interview.api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, handleLogout } = useAuth();
  
  const [resume, setResume] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setError("Please upload a resume (PDF)");
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    try {
      const data = await generateInterviewReport(formData);
      setReport(data.interviewReport);
      // scroll to report smoothly
      setTimeout(() => {
        document.getElementById('report-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err.message || "Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Background glow behind nav */}
      <div className="fixed top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none z-0"></div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl text-white flex items-center gap-3 tracking-tight hover:opacity-80 transition-opacity">
             <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            AI Interviewer
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-slate-400 hidden sm:block">Hello, <span className="text-slate-200">{user?.username}</span></span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-full transition-colors border border-white/5"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Form Section - Always Visible */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">New Interview Analysis</h1>
            <p className="text-slate-400 text-lg font-light">Upload your details below to generate a comprehensive AI interview guide tailored exactly to the job description.</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-[2rem] border border-slate-700/50 shadow-2xl p-8 md:p-10">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mb-8 text-sm flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Resume (PDF only)</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="application/pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="w-full text-slate-400 file:mr-5 file:py-3.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20 file:transition-colors file:cursor-pointer border border-slate-700/50 rounded-2xl bg-slate-900/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Self Description <span className="text-slate-500 font-normal">(Optional)</span></label>
                <textarea 
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  className="w-full h-28 p-5 bg-slate-900/50 border border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-slate-200 placeholder:text-slate-600 resize-none font-light"
                  placeholder="A brief summary about your background, what roles you're aiming for, and any specific areas you want the AI to focus on..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Job Description <span className="text-red-400">*</span></label>
                <textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                  className="w-full h-48 p-5 bg-slate-900/50 border border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-slate-200 placeholder:text-slate-600 resize-none font-light"
                  placeholder="Paste the full job description here. The AI will cross-reference this with your resume."
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:border disabled:border-slate-700 disabled:shadow-none disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] flex justify-center items-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Analyzing Profile...
                  </>
                ) : (
                  "Generate Interview Guide"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Report Section - Shown Below if exists */}
        {report && (
          <div id="report-section" className="space-y-10 animate-fade-in pb-20 pt-8 border-t border-slate-700/50">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-4">
               <div>
                 <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{report.title || "Interview Readiness Report"}</h1>
                 <p className="text-slate-400 mt-2 text-lg font-light">Custom generated successfully for your profile.</p>
               </div>
               <button 
                onClick={() => {
                  setReport(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 rounded-full font-medium transition-colors flex items-center gap-2"
               >
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                 Clear Output
               </button>
            </div>

            {/* Match Score & Summary */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-start gap-10 md:gap-16">
              <div className="flex flex-col items-center gap-6 shrink-0 lg:w-48">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 drop-shadow-xl" viewBox="0 0 36 36">
                    <path className="text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className={`${report.matchScore > 75 ? 'text-emerald-500' : report.matchScore > 50 ? 'text-yellow-500' : 'text-red-500'}`} strokeDasharray={`${report.matchScore}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-extrabold text-white tracking-tighter">{report.matchScore}%</span>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">Match</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">Resume Alignment</h2>
                  <p className="text-slate-400 text-lg font-light leading-relaxed">
                    Based on the provided job description, your profile has a {report.matchScore}% match. 
                    {report.matchScore > 75 
                      ? " Excellent! You are highly qualified. Focus on refining your behavioral answers." 
                      : report.matchScore > 50 
                      ? " Good potential, but there are notable skill gaps. Review the preparation plan closely."
                      : " Your resume might not pass an ATS screen for this role. Consider highlighting the missing skills."}
                  </p>
                </div>
                
                {/* NEW: Key Strengths and Resume Tips */}
                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  {(report.keyStrengths && report.keyStrengths.length > 0) && (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
                      <h4 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Key Strengths
                      </h4>
                      <ul className="space-y-2">
                        {report.keyStrengths.map((strength, i) => (
                          <li key={i} className="text-slate-300 text-sm font-light flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {(report.resumeTips && report.resumeTips.length > 0) && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5">
                      <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Resume Improvement Tips
                      </h4>
                      <ul className="space-y-2">
                        {report.resumeTips.map((tip, i) => (
                          <li key={i} className="text-slate-300 text-sm font-light flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Grid Layout for Q&A */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Technical Questions */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  Technical Questions
                </h3>
                <div className="space-y-8">
                  {report.technicalQuestions?.map((q, i) => (
                    <div key={i} className="group">
                      <h4 className="text-white font-semibold text-lg leading-snug mb-2 group-hover:text-blue-400 transition-colors">{i+1}. {q.question}</h4>
                      <p className="text-slate-500 text-sm italic mb-4 font-light">Goal: {q.intention}</p>
                      <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5 text-slate-300 text-sm font-light leading-relaxed">
                        <span className="font-semibold text-blue-400 uppercase tracking-wider text-xs block mb-2">Ideal Answer</span>
                        {q.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Behavioral Questions */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  Behavioral Questions
                </h3>
                <div className="space-y-8">
                  {report.behavioralQuestions?.map((q, i) => (
                    <div key={i} className="group">
                      <h4 className="text-white font-semibold text-lg leading-snug mb-2 group-hover:text-purple-400 transition-colors">{i+1}. {q.question}</h4>
                      <p className="text-slate-500 text-sm italic mb-4 font-light">Goal: {q.intention}</p>
                      <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-5 text-slate-300 text-sm font-light leading-relaxed">
                        <span className="font-semibold text-purple-400 uppercase tracking-wider text-xs block mb-2">Ideal Approach</span>
                        {q.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Skill Gaps */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  Missing Skills
                </h3>
                <ul className="space-y-4">
                  {report.skillGaps?.map((gap, i) => (
                    <li key={i} className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl">
                      <span className="text-slate-200 font-medium">{gap.skill}</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        gap.severity === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        gap.severity === 'medium' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                        'bg-slate-700/50 text-slate-300 border border-slate-600'
                      }`}>
                        {gap.severity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparation Plan */}
              <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/50 rounded-[2rem] p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </div>
                  Preparation Roadmap
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {report.preparationPlan?.map((plan, i) => (
                    <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors group">
                      <div className="text-emerald-400 font-bold text-sm tracking-wider uppercase mb-2">Day {plan.day}</div>
                      <h4 className="text-white font-semibold mb-4 text-lg group-hover:text-emerald-300 transition-colors">{plan.focus}</h4>
                      <ul className="space-y-2.5">
                        {plan.tasks?.map((task, j) => (
                          <li key={j} className="text-slate-400 text-sm font-light flex items-start gap-2.5">
                            <svg className="w-4 h-4 text-emerald-500/50 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}
