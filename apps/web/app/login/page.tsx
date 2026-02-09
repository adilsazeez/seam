'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { ArrowRight } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            }
        });
        setLoading(false);
        if (error) {
            console.log("Error:", error.message);
            if (error.message.includes('rate limit')) {
                setMessage('Rate limit exceeded. Please wait a moment before trying again.');
            } else {
                setMessage(error.message);
            }
        } else {
            setMessage('Check your email for the magic link!');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#FDFCFB] font-sans">
            <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-3xl font-serif text-center mb-8 font-display">Welcome back to Seam</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 rounded-xl border border-slate-200 mb-4 focus:ring-2 focus:ring-black outline-none transition-all"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white p-4 rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Magic Link'} <ArrowRight className="w-4 h-4" />
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-center text-sm text-slate-600">{message}</p>
                )}
            </div>
        </div>
    );
}
