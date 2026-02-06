
import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';
import FeatureSection from './components/FeatureSection';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePreregister = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/preregister';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess(true);
      toast.success(`You have successfully pre-registered for References with email: ${email}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (err: any) {
      const msg = err.message || 'Something went wrong. Please try again.';
      setError(msg);
      toast.error(msg, {
        position: "top-right",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Header />
      <main>
        <Hero
          onRegister={handlePreregister}
          loading={loading}
          success={success}
          error={error}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FeatureSection />
        </motion.div>
      </main>
      <Footer />
    </motion.div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
