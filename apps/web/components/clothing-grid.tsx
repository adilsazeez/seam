import { Shirt } from 'lucide-react';

interface ClothingItem {
    id: string;
    // Add other properties as they become available in the DB schema
}

interface ClothingGridProps {
    items: ClothingItem[];
}

export const ClothingGrid = ({ items = [] }: ClothingGridProps) => {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center font-sans">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Shirt className="text-slate-200 w-12 h-12" />
                </div>
                <h3 className="text-xl font-serif text-slate-900 font-display">Your rack is empty</h3>
                <p className="text-slate-500 max-w-xs mt-2">
                    Start by adding your favorite pieces to see the AI magic happen.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-sans">
            {/* Grid items would go here */}
            {items.map(item => <div key={item.id}>Item {item.id}</div>)}
        </div>
    );
};
