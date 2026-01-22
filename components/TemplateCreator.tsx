
import React, { useState } from 'react';
import { WorkoutTemplate, TemplateExercise, ExerciseDefinition } from '../types.ts';
import { Icons, EXERCISES } from '../constants.tsx';
import { generateId } from '../utils.ts';
import ExerciseSelector from './ExerciseSelector.tsx';

interface Props {
  onSave: (template: WorkoutTemplate) => void;
  onCancel: () => void;
}

const TemplateCreator: React.FC<Props> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState<TemplateExercise[]>([]);
  const [isAddingExercise, setIsAddingExercise] = useState(false);

  const handleAddExercise = (exercise: ExerciseDefinition) => {
    const newEx: TemplateExercise = {
      id: generateId(),
      exerciseId: exercise.id,
      sets: 3,
      reps: 10,
      weight: 0,
      restTime: 90
    };
    setExercises([...exercises, newEx]);
    setIsAddingExercise(false);
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(e => e.id !== id));
  };

  const updateExercise = (id: string, field: keyof TemplateExercise, value: string) => {
    const numValue = parseFloat(value) || 0;
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, [field]: numValue } : ex));
  };

  const handleSave = () => {
    if (!name.trim()) return alert('Donnez un nom à votre séance');
    if (exercises.length === 0) return alert('Ajoutez au moins un exercice');
    
    onSave({
      id: generateId(),
      name,
      exercises,
      createdAt: Date.now()
    });
  };

  return (
    <div className="px-5 pt-12 pb-24 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onCancel} className="text-[#0a84ff] font-bold px-2 active:opacity-50 transition-opacity">Annuler</button>
        <h1 className="text-lg font-black tracking-tight">Nouveau Modèle</h1>
        <button onClick={handleSave} className="bg-[#0a84ff] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-[#0a84ff]/20 active:scale-95 transition-all">Sauver</button>
      </div>

      <div className="space-y-10">
        <div className="space-y-4 px-1">
          <label className="text-[11px] font-black text-[#8e8e93] uppercase tracking-widest ml-1">Paramètres généraux</label>
          <input 
            type="text" 
            placeholder="Nom de la séance (ex: Push Day)"
            className="w-full bg-[#1c1c1e] rounded-[1.5rem] p-5 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0a84ff]/50 transition-all border border-white/5 placeholder:text-white/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[11px] font-black text-[#8e8e93] uppercase tracking-widest">Liste des exercices</h2>
            <button 
              onClick={() => setIsAddingExercise(true)}
              className="text-[#0a84ff] text-xs font-black flex items-center bg-[#0a84ff]/10 py-2 px-4 rounded-full active:scale-95 transition-all"
            >
              <Icons.Add className="w-4 h-4 mr-1" /> Ajouter
            </button>
          </div>

          <div className="space-y-5">
            {exercises.length === 0 && (
              <div className="bg-[#1c1c1e]/50 border-2 border-dashed border-white/5 rounded-[2rem] p-10 text-center">
                <p className="text-[#8e8e93] text-sm font-medium">Commencez par ajouter un exercice.</p>
              </div>
            )}
            
            {exercises.map((ex, index) => {
              const def = EXERCISES.find(e => e.id === ex.exerciseId);
              return (
                <div key={ex.id} className="bg-[#1c1c1e] border border-white/5 rounded-[2rem] p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                      <span className="text-[10px] font-black bg-[#0a84ff]/20 text-[#0a84ff] h-7 w-7 flex items-center justify-center rounded-full mr-3 shrink-0">{index + 1}</span>
                      <div>
                        <h3 className="font-bold text-white text-lg leading-tight">{def?.name}</h3>
                        <p className="text-[10px] text-[#8e8e93] uppercase font-black tracking-widest mt-1">{def?.category}</p>
                      </div>
                    </div>
                    <button onClick={() => removeExercise(ex.id)} className="text-[#8e8e93] hover:text-[#ff453a] p-2 bg-white/5 rounded-full active:scale-90 transition-all">
                      <Icons.Close className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-[#8e8e93] block text-center uppercase tracking-widest">Séries</span>
                      <input 
                        type="number" 
                        value={ex.sets || ''} 
                        placeholder="0"
                        onChange={(e) => updateExercise(ex.id, 'sets', e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-2xl p-3 text-center text-sm font-black focus:border-[#0a84ff] focus:outline-none focus:ring-1 focus:ring-[#0a84ff]"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-[#8e8e93] block text-center uppercase tracking-widest">Reps</span>
                      <input 
                        type="number" 
                        value={ex.reps || ''} 
                        placeholder="0"
                        onChange={(e) => updateExercise(ex.id, 'reps', e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-2xl p-3 text-center text-sm font-black focus:border-[#0a84ff] focus:outline-none focus:ring-1 focus:ring-[#0a84ff]"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-[#8e8e93] block text-center uppercase tracking-widest">Poids</span>
                      <input 
                        type="number" 
                        value={ex.weight || ''} 
                        placeholder="0"
                        onChange={(e) => updateExercise(ex.id, 'weight', e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-2xl p-3 text-center text-sm font-black focus:border-[#0a84ff] focus:outline-none focus:ring-1 focus:ring-[#0a84ff]"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] font-black text-[#8e8e93] block text-center uppercase tracking-widest">Repos</span>
                      <input 
                        type="number" 
                        value={ex.restTime || ''} 
                        placeholder="0"
                        onChange={(e) => updateExercise(ex.id, 'restTime', e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-2xl p-3 text-center text-sm font-black focus:border-[#0a84ff] focus:outline-none focus:ring-1 focus:ring-[#0a84ff]"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isAddingExercise && (
        <ExerciseSelector 
          onSelect={handleAddExercise} 
          onClose={() => setIsAddingExercise(false)} 
        />
      )}
    </div>
  );
};

export default TemplateCreator;
