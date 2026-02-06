
import React from 'react';

const FeatureSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-bold uppercase tracking-[0.2em] text-xs block mb-4">Core Features</span>
          <h2 className="text-4xl font-bold text-slate-900">Designed for the modern researcher</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#f3f4f6]/40 p-10 rounded-3xl flex flex-col h-full border border-transparent hover:border-slate-100 transition-all">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm border border-slate-100">
              <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Researcher Profiles</h3>
            <p className="text-slate-500 font-light leading-relaxed mb-10 flex-grow">
              Verify your identity, showcase your research journey, and manage your academic presence across multiple institutions effortlessly.
            </p>
            <a href="#" className="text-yellow-500 font-bold text-sm flex items-center hover:translate-x-1 transition-transform">
              Learn about profiles <span className="ml-2">→</span>
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-[#f3f4f6]/40 p-10 rounded-3xl flex flex-col h-full relative border border-transparent hover:border-slate-100 transition-all">
            <div className="absolute top-8 right-8 bg-yellow-400 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">New</div>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm border border-slate-100">
              <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Direct Connections</h3>
            <p className="text-slate-500 font-light leading-relaxed mb-10 flex-grow">
              Securely message peers and faculty. Build your network without the friction of outdated university directories.
            </p>
            <a href="#" className="text-yellow-500 font-bold text-sm flex items-center hover:translate-x-1 transition-transform">
              Start networking <span className="ml-2">→</span>
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f3f4f6]/40 p-10 rounded-3xl flex flex-col h-full border border-transparent hover:border-slate-100 transition-all">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm border border-slate-100">
              <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Collaboration Alerts</h3>
            <p className="text-slate-500 font-light leading-relaxed mb-10 flex-grow">
              Stay updated when colleagues update their focus or labs post openings in your specific area of interest.
            </p>
            <a href="#" className="text-yellow-500 font-bold text-sm flex items-center hover:translate-x-1 transition-transform">
              Set up alerts <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
