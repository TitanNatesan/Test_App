
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

interface Preregistration {
    id: string;
    email: string;
    createdAt: string;
}

const AdminDashboard: React.FC = () => {
    const [registrations, setRegistrations] = useState<Preregistration[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRegistrations = async () => {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin');
                return;
            }

            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/preregister';
                const adminUrl = apiUrl.replace('/api/preregister', '/api/admin/registrations');

                const response = await fetch(adminUrl, {
                    headers: {
                        'Authorization': `Basic ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setRegistrations(data);
                } else {
                    toast.error('Session expired');
                    localStorage.removeItem('adminToken');
                    navigate('/admin');
                }
            } catch (err) {
                toast.error('Network error fetching registrations');
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.info('Logged out successfully');
        navigate('/admin');
    };

    const downloadCSV = () => {
        if (registrations.length === 0) return;

        const headers = ["Email", "Registration Date"];
        const rows = registrations.map(reg => [
            reg.email,
            new Date(reg.createdAt).toLocaleString()
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(r => r.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "registrations.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Waitlist exported as CSV');
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Waitlist Members</h1>
                        <p className="text-slate-500 mt-2">Manage and view all pre-registered researchers</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={downloadCSV}
                            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all flex items-center shadow-sm"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export CSV
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-semibold hover:bg-red-100 transition-all shadow-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    {loading ? (
                        <div className="py-20 text-center">
                            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-slate-500">Loading registrations...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            Email Address
                                        </th>
                                        <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            Joined On
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <AnimatePresence>
                                        {registrations.map((reg, index) => (
                                            <motion.tr
                                                key={reg.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="hover:bg-slate-50/50 transition-colors group"
                                            >
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-xs font-bold mr-3 group-hover:bg-yellow-400 group-hover:text-slate-900 transition-colors">
                                                            {reg.email.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-slate-700 font-medium">{reg.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className="text-slate-400 text-sm">
                                                        {new Date(reg.createdAt).toLocaleDateString(undefined, {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                    {!loading && registrations.length === 0 && (
                                        <tr>
                                            <td colSpan={2} className="px-8 py-20 text-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                    </svg>
                                                </div>
                                                <p className="text-slate-400">No researchers have joined the waitlist yet.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <p className="text-center text-slate-400 text-xs mt-8">
                    &copy; {new Date().getFullYear()} References Researcher Network &bull; Secured Admin Environment
                </p>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
