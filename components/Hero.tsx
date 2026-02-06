
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onRegister: (email: string) => Promise<void>;
  loading: boolean;
  success: boolean;
  error: string | null;
}

const Hero: React.FC<HeroProps> = ({ onRegister, loading, success, error }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (success) {
      setEmail('');
    }
  }, [success]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onRegister(email);
  };

  const trendingTags = ['Machine Learning', 'Climate Policy', 'Bio-Informatics'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="pt-40 pb-20 px-4 bg-white overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight"
        >
          Find the world's <br />
          <motion.span
            initial={{ color: "#0f172a" }}
            animate={{ color: "#FACC15" }}
            transition={{ delay: 1, duration: 1 }}
            className="text-yellow-400"
          >
            researchers.
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-light"
        >
          Connect with scientists, faculties, and experts in one minimal interface.
        </motion.p>

        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="relative max-w-3xl mx-auto mb-8"
        >
          <div className="flex items-center bg-white border border-slate-200 rounded-full p-2 pl-6 shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all duration-300">
            <svg className="w-5 h-5 text-slate-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email to join the network..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 py-3 text-lg bg-transparent focus:outline-none text-slate-700 font-light"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-12 h-12 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all disabled:bg-slate-200 shadow-lg"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </motion.button>
          </div>
        </motion.form>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-4 text-sm"
        >
          <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">Trending:</span>
          {trendingTags.map((tag) => (
            <motion.button
              whileHover={{ y: -2, backgroundColor: "#f1f5f9" }}
              key={tag}
              className="px-5 py-2 border border-slate-100 bg-slate-50 text-slate-600 rounded-full font-medium hover:bg-slate-100 transition-colors shadow-sm"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
