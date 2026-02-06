
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/preregister';
            const adminLoginUrl = apiUrl.replace('/api/preregister', '/api/admin/login');

            const response = await fetch(adminLoginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const token = btoa(`${username}:${password}`);
                localStorage.setItem('adminToken', token);
                toast.success('Admin access granted');
                navigate('/admin/dashboard');
            } else {
                toast.error(data.message || 'Invalid credentials');
            }
        } catch (err) {
            toast.error('Connection failed. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 bg-white rounded-3xl shadow-xl w-full max-w-md border border-slate-100"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-16 h-16 bg-yellow-400 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg"
                    >
                        <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </motion.div>
                    <h2 className="text-3xl font-bold text-slate-900">Admin Portal</h2>
                    <p className="text-slate-500 mt-2">Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                            placeholder="admin"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 font-bold text-slate-900 bg-yellow-400 rounded-xl hover:bg-yellow-500 transition-all shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </motion.button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                    >
                        ← Back to Homepage
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
