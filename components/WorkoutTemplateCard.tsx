
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
      className="w-full bg-[#1c1c1e] border border-white/5 rounded-[2.5rem] p-7 shadow-sm hover:shadow-xl transition-all active:scale-[0.97] text-left group relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-xl font-black text-white group-hover:text-[#0a84ff] transition-colors leading-tight">
            {template.name}
          </h3>
          <p className="text-[10px] text-[#8e8e93] font-black uppercase tracking-widest mt-1.5 flex items-center">
            <Icons.Workout className="w-3 h-3 mr-1.5 opacity-50" />
            {template.exercises.length} exercices prévus
          </p>
        </div>
        <div className="bg-[#0a84ff]/10 p-2.5 rounded-2xl text-[#0a84ff] group-active:translate-x-1 transition-transform">
          <Icons.ChevronRight className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2.5">
        {template.exercises.slice(0, 3).map((ex, idx) => (
          <span 
            key={idx}
            className="bg-white/5 text-[#8e8e93] text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border border-white/5"
          >
            {getExerciseName(ex.exerciseId)}
          </span>
        ))}
        {template.exercises.length > 3 && (
          <span className="text-[#48484a] text-[10px] font-black px-2 py-2">
            +{template.exercises.length - 3}
          </span>
        )}
      </div>
    </button>
  );
};

export default WorkoutTemplateCard;
