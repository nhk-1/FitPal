
import React from 'react';
import { WorkoutTemplate } from '../types.ts';
import { Icons } from '../constants.tsx';
import WorkoutTemplateCard from './WorkoutTemplateCard.tsx';

interface Props {
  templates: WorkoutTemplate[];
  onStartTemplate: (template: WorkoutTemplate) => void;
  onDeleteTemplate: (id: string) => void;
  onCreateNew: () => void;
}

const TemplateList: React.FC<Props> = ({ templates, onStartTemplate, onDeleteTemplate, onCreateNew }) => {
  return (
    <div className="px-5 pt-16 pb-10 max-w-2xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Mes Séances</h1>
          <p className="text-[#8e8e93] font-bold text-sm mt-1">Vos bibliothèques d'exercices</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="bg-[#0a84ff] text-white p-4 rounded-full shadow-xl shadow-[#0a84ff]/30 active:scale-90 transition-all"
        >
          <Icons.Add className="w-6 h-6" />
        </button>
      </div>

      <section className="space-y-6">
        {templates.length === 0 ? (
          <div className="bg-[#1c1c1e] border-2 border-dashed border-white/5 rounded-[3rem] p-16 flex flex-col items-center text-center">
            <div className="bg-white/5 p-6 rounded-full mb-6">
              <Icons.Workout className="w-12 h-12 text-[#8e8e93]" />
            </div>
            <p className="text-[#8e8e93] font-black text-xl">Aucun modèle</p>
            <p className="text-[#48484a] text-sm mt-2 max-w-[220px]">Créez un template pour enregistrer vos performances plus vite.</p>
            <button 
              onClick={onCreateNew}
              className="mt-8 bg-[#0a84ff] px-10 py-3.5 rounded-full text-white font-black text-sm active:scale-95 transition-all shadow-lg shadow-[#0a84ff]/20"
            >
              Créer un modèle
            </button>
          </div>
        ) : (
          <div className="grid gap-5">
            {templates.map(template => (
              <div key={template.id} className="relative group">
                <WorkoutTemplateCard 
                  template={template} 
                  onClick={() => onStartTemplate(template)} 
                />
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteTemplate(template.id); }}
                  className="absolute -top-3 -right-3 bg-[#ff453a] text-white p-2.5 rounded-full shadow-xl border-4 border-black active:scale-75 transition-all z-10"
                  aria-label="Supprimer le modèle"
                >
                  <Icons.Trash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TemplateList;
