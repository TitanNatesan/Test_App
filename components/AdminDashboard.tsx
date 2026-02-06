
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Preregistration {
    id: string;
    email: string;
    createdAt: string;
}

const AdminDashboard: React.FC = () => {
    const [registrations, setRegistrations] = useState<Preregistration[]>([]);
    const [error, setError] = useState('');
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
                    setError('Failed to fetch registrations. Please login again.');
                    localStorage.removeItem('adminToken');
                    navigate('/admin');
                }
            } catch (err) {
                setError('Network error.');
            }
        };

        fetchRegistrations();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                {error && <div className="p-4 mb-4 text-white bg-red-500 rounded">{error}</div>}

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Registration Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg) => (
                                <tr key={reg.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{reg.email}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {new Date(reg.createdAt).toLocaleString()}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                            {registrations.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="px-5 py-5 text-center text-gray-500">No registrations found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
