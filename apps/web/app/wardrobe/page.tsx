'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { WardrobeSidebar } from '@/components/wardrobe-sidebar';
import { ClothingGrid } from '@/components/clothing-grid';
import { ProfileView } from '@/components/profile-view';

export default function Wardrobe() {
    const [user, setUser] = useState<any>(null);
    const [activeCategory, setActiveCategory] = useState('All Items');
    const [items, setItems] = useState<any[]>([]); // Placeholder for clothes
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
            } else {
                setUser(user);
                // Fetch clothes logic would go here
            }
        };
        getUser();
    }, [router, activeCategory]); // Re-fetch on category change

    const handleLogout = async () => {
        await fetch('/auth/signout', { method: 'POST' });
        router.refresh();
        router.push('/');
    };

    const handleAdd = () => {
        console.log("Add item clicked");
        // Open modal logic
    };

    if (!user) return <div className="flex min-h-screen items-center justify-center font-sans">Loading your wardrobe...</div>;

    return (
        <div className="flex min-h-screen bg-[#FDFCFB] font-sans">
            <WardrobeSidebar
                onAdd={handleAdd}
                onLogout={handleLogout}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            <main className="flex-1 p-8 md:ml-64">
                {activeCategory === 'Profile' ? (
                    <ProfileView user={user} />
                ) : (
                    <>
                        <header className="mb-8 flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-serif font-display">{activeCategory}</h1>
                                <p className="text-slate-500 text-sm mt-1">Welcome back, {user.email}</p>
                            </div>
                            {/* Mobile menu trigger could go here */}
                        </header>

                        <ClothingGrid items={items} />
                    </>
                )}
            </main>
        </div>
    );
}
