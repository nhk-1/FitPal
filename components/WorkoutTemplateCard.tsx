
import React from 'react';
import { WorkoutTemplate } from '../types';
import { Icons, EXERCISES } from '../constants';

interface Props {
  template: WorkoutTemplate;
  onClick: () => void;
}

const WorkoutTemplateCard: React.FC<Props> = ({ template, onClick }) => {
  const getExerciseName = (id: string) => EXERCISES.find(e => e.id === id)?.name || 'Inconnu';

  return (
    <button 
      onClick={onClick}
      className="w-full bg-[#1c1c1e] border border-white/5 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#0a84ff] transition-colors">
            {template.name}
          </h3>
          <p className="text-xs text-[#8e8e93] font-bold uppercase tracking-widest mt-1">
            {template.exercises.length} exercices
          </p>
        </div>
        <div className="bg-white/5 p-2 rounded-xl text-[#8e8e93]">
          <Icons.ChevronRight className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {template.exercises.slice(0, 3).map((ex, idx) => (
          <span 
            key={idx}
            className="bg-white/5 text-[#8e8e93] text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest"
          >
            {getExerciseName(ex.exerciseId)}
          </span>
        ))}
        {template.exercises.length > 3 && (
          <span className="text-[#8e8e93] text-[9px] font-bold py-1.5">+{template.exercises.length - 3}</span>
        )}
      </div>
    </button>
  );
};

export default WorkoutTemplateCard;
