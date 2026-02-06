
import React, { useState, useEffect } from 'react';
import { getResearcherSpotlight } from '../services/geminiService';
import { ResearcherInfo } from '../types';

const AiResearcherSpotlight: React.FC = () => {
  const [researcher, setResearcher] = useState<ResearcherInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const topics = ['Quantum Computing', 'Marine Biology', 'Sociology', 'Linguistics'];
  const [activeTopic, setActiveTopic] = useState(topics[0]);

  const fetchSpotlight = async (topic: string) => {
    setLoading(true);
    const data = await getResearcherSpotlight(topic);
    setResearcher(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSpotlight(activeTopic);
  }, []);

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl serif-font mb-6 leading-tight">
              Preview Verified <br className="hidden md:block" /> Researcher Profiles
            </h2>
            <p className="text-slate-400 mb-8 font-light text-lg">
              Our network profiles highlight expertise, affiliations, and current collaborative goals.
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {topics.map(t => (
                <button
                  key={t}
                  onClick={() => { setActiveTopic(t); fetchSpotlight(t); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTopic === t ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <div className="bg-white text-slate-900 p-8 rounded-[2rem] shadow-2xl relative">
              <div className="absolute top-6 right-6 flex space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
              </div>
              
              {loading ? (
                <div className="animate-pulse space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-50">
                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-100 rounded w-4/6"></div>
                  </div>
                </div>
              ) : researcher ? (
                <div className="space-y-6 transition-all duration-500">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                      {researcher.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 flex items-center">
                        {researcher.name}
                        <svg className="w-4 h-4 ml-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.25.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      </h4>
                      <p className="text-slate-500 text-sm font-medium">{researcher.institution}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Focus Area</span>
                    <p className="text-slate-700 font-semibold mb-4">{researcher.currentFocus}</p>
                    
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Short Bio</span>
                    <p className="text-slate-500 font-light text-sm leading-relaxed italic">
                      "{researcher.bio}"
                    </p>
                  </div>
                  
                  <button className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors border border-slate-200">
                    View Network
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiResearcherSpotlight;
