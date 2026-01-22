
import React, { useState } from 'react';
import { ExerciseDefinition, MuscleGroup } from '../types';
import { EXERCISES, MUSCLE_GROUPS, Icons } from '../constants';

interface Props {
  onSelect: (exercise: ExerciseDefinition) => void;
  onClose: () => void;
}

const ExerciseSelector: React.FC<Props> = ({ onSelect, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<MuscleGroup | 'Tous'>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExercises = EXERCISES.filter(ex => {
    const matchesCategory = activeCategory === 'Tous' || ex.category === activeCategory;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-end">
      <div className="bg-[#1c1c1e] w-full rounded-t-[3rem] h-[85vh] overflow-hidden flex flex-col animate-slide-up shadow-2xl border-t border-white/10">
        <div className="px-6 py-5 flex justify-between items-center border-b border-white/5">
          <h2 className="text-xl font-extrabold">Exercices</h2>
          <button onClick={onClose} className="bg-white/5 p-2.5 rounded-full text-[#8e8e93]">
            <Icons.Close className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto no-scrollbar pb-24">
          {/* Search */}
          <div className="relative mb-6">
            <input 
              type="text"
              placeholder="Rechercher..."
              className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 px-6 focus:outline-none focus:ring-1 focus:ring-[#0a84ff] text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories Pill Scroller */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-5 mb-4 px-1">
            <button 
              onClick={() => setActiveCategory('Tous')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === 'Tous' ? 'bg-[#0a84ff] text-white' : 'bg-white/5 text-[#8e8e93]'}`}
            >
              Tous
            </button>
            {MUSCLE_GROUPS.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as MuscleGroup)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-[#0a84ff] text-white' : 'bg-white/5 text-[#8e8e93]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Exercise List */}
          <div className="grid gap-3">
            {filteredExercises.map(ex => (
              <button 
                key={ex.id}
                onClick={() => onSelect(ex)}
                className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white/5 border border-white/5 hover:bg-white/10 active:scale-[0.98] transition-all text-left group"
              >
                <div>
                  <h4 className="font-bold text-white group-hover:text-[#0a84ff] transition-colors">{ex.name}</h4>
                  <p className="text-[10px] text-[#8e8e93] uppercase font-bold tracking-widest mt-0.5">{ex.category}</p>
                </div>
                <div className="text-white/20">
                    <Icons.ChevronRight className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseSelector;
