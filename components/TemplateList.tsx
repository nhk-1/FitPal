
import React from 'react';
import { WorkoutTemplate } from '../types.ts';
import { Icons } from '../constants.tsx';
import WorkoutTemplateCard from './WorkoutTemplateCard.tsx';

interface Props {
  templates: WorkoutTemplate[];
  onStartTemplate: (template: WorkoutTemplate) => void;
  onCreateNew: () => void;
}

const TemplateList: React.FC<Props> = ({ templates, onStartTemplate, onCreateNew }) => {
  return (
    <div className="px-5 pt-12 pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Mes Séances</h1>
          <p className="text-[#8e8e93] font-medium">Modèles personnalisés</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="bg-[#0a84ff] text-white p-3 rounded-full shadow-lg shadow-[#0a84ff]/20 active:scale-95 transition-transform"
        >
          <Icons.Add className="w-6 h-6" />
        </button>
      </div>

      <section className="space-y-6">
        {templates.length === 0 ? (
          <div className="bg-[#1c1c1e] border-2 border-dashed border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center text-center">
            <div className="bg-white/5 p-4 rounded-full mb-4">
              <Icons.Workout className="w-8 h-8 text-[#8e8e93]" />
            </div>
            <p className="text-[#8e8e93] font-medium">Aucun modèle créé.</p>
            <button 
              onClick={onCreateNew}
              className="mt-4 text-[#0a84ff] font-bold"
            >
              Créer maintenant
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {templates.map(template => (
              <WorkoutTemplateCard 
                key={template.id} 
                template={template} 
                onClick={() => onStartTemplate(template)} 
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TemplateList;
