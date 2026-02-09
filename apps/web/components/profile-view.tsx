import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export const ProfileView = ({ user }: { user: User }) => {
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');
    const supabase = createClient();

    useEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true);
                const { data, error, status } = await supabase
                    .from('profiles')
                    .select(`full_name, gender, username`)
                    .eq('id', user.id)
                    .single();

                if (error && status !== 406) {
                    throw error;
                }

                if (data) {
                    setFullName(data.full_name);
                    setGender(data.gender);
                    setUsername(data.username);
                }
            } catch (error) {
                console.log('Error loading user data!');
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, [user, supabase]);

    const updateProfile = async () => {
        try {
            setLoading(true);

            const updates = {
                id: user.id,
                full_name: fullName,
                gender,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Error updating profile!');
            console.log(error);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="max-w-xl mx-auto font-sans">
            <h2 className="text-3xl font-serif font-display mb-8">Your Profile</h2>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                        type="text"
                        value={user.email}
                        disabled
                        className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-400 mt-1">Email cannot be changed.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                    <input
                        type="text"
                        value={username || ''}
                        disabled
                        className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-400 mt-1">Username is auto-generated.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        value={fullName || ''}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-black outline-none transition-all"
                        placeholder="Jane Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                    <select
                        value={gender || ''}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-black outline-none transition-all appearance-none bg-white"
                    >
                        <option value="" disabled>Select your gender</option>
                        <option value="Women">Women</option>
                        <option value="Men">Men</option>
                        <option value="Unisex">Unisex</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button
                    onClick={updateProfile}
                    disabled={loading}
                    className="w-full bg-black text-white p-4 rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>

                {message && (
                    <div className={`p-4 rounded-xl text-center text-sm ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};
