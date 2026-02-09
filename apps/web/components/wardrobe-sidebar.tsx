import { Plus, User, LogOut, Shirt, LayoutGrid } from 'lucide-react';

interface WardrobeSidebarProps {
    onAdd: () => void;
    onLogout: () => void;
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export const WardrobeSidebar = ({ onAdd, onLogout, activeCategory, onCategoryChange }: WardrobeSidebarProps) => (
    <div className="h-screen w-64 bg-white border-r border-slate-100 flex flex-col p-6 fixed left-0 top-0 hidden md:flex font-sans">
        <div className="mb-10">
            <h2 className="text-2xl font-serif font-display">Seam</h2>
        </div>

        <button
            onClick={onAdd}
            className="flex items-center justify-center gap-2 bg-black text-white w-full py-4 rounded-2xl mb-8 hover:scale-[1.02] transition-transform shadow-lg"
        >
            <Plus size={20} /> Add Item
        </button>

        <nav className="space-y-2 flex-grow">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-4">Collection</p>
            <CategoryItem
                icon={<LayoutGrid size={18} />}
                label="All Items"
                active={activeCategory === 'All Items'}
                onClick={() => onCategoryChange('All Items')}
            />
            <CategoryItem
                icon={<Shirt size={18} />}
                label="Tops"
                active={activeCategory === 'Tops'}
                onClick={() => onCategoryChange('Tops')}
            />
            {/* Add more categories here if needed */}
        </nav>

        <div className="border-t border-slate-100 pt-6 space-y-4">
            <button
                onClick={() => onCategoryChange('Profile')}
                className={`flex items-center gap-3 w-full transition-colors ${activeCategory === 'Profile' ? 'text-black font-medium' : 'text-slate-600 hover:text-black'}`}
            >
                <User size={20} /> Profile
            </button>
            <button onClick={onLogout} className="flex items-center gap-3 text-red-400 hover:text-red-600 w-full transition-colors">
                <LogOut size={20} /> Logout
            </button>
        </div>
    </div>
);

interface CategoryItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick: () => void;
}

const CategoryItem = ({ icon, label, active = false, onClick }: CategoryItemProps) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-slate-100 text-black' : 'text-slate-500 hover:bg-slate-50'}`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </div>
);
