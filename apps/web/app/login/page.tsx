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

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-slate-500">Or continue with</span>
                    </div>
                </div>

                <button
                    onClick={async () => {
                        setLoading(true);
                        const { error } = await supabase.auth.signInWithOAuth({
                            provider: 'google',
                            options: {
                                redirectTo: `${window.location.origin}/auth/callback`,
                            },
                        });
                        if (error) {
                            console.log("Error:", error.message);
                            if (error.message.includes('provider is not enabled')) {
                                setMessage('Google login is not enabled. Please enable it in your Supabase Dashboard.');
                            } else {
                                setMessage(error.message);
                            }
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                    className="w-full bg-white text-slate-900 border border-slate-200 p-4 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Sign in with Google
                </button>
                {message && (
                    <p className="mt-4 text-center text-sm text-slate-600">{message}</p>
                )}
            </div>
        </div>
    );
}
