
import React, { useState } from 'react';
import { WorkoutTemplate, TemplateExercise, ExerciseDefinition } from '../types.ts';
import { Icons, EXERCISES, MUSCLE_GROUPS } from '../constants.tsx';
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
      id: crypto.randomUUID(),
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

  const updateExercise = (id: string, field: keyof TemplateExercise, value: number) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, [field]: value } : ex));
  };

  const handleSave = () => {
    if (!name.trim()) return alert('Donnez un nom à votre séance');
    if (exercises.length === 0) return alert('Ajoutez au moins un exercice');
    
    onSave({
      id: crypto.randomUUID(),
      name,
      exercises,
      createdAt: Date.now()
    });
  };

  return (
    <div className="px-5 pt-12 pb-24">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onCancel} className="text-[#0a84ff] font-bold px-2">Annuler</button>
        <h1 className="text-lg font-bold">Nouveau Modèle</h1>
        <button onClick={handleSave} className="bg-[#0a84ff] text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-[#0a84ff]/20">Sauver</button>
      </div>

      <div className="space-y-8">
        <div className="space-y-3 px-1">
          <label className="text-[10px] font-bold text-[#8e8e93] uppercase tracking-widest ml-1">Nom du modèle</label>
          <input 
            type="text" 
            placeholder="ex: Push Day, Leg Power..."
            className="w-full bg-[#1c1c1e] rounded-2xl p-4 text-lg font-bold focus:outline-none focus:ring-1 focus:ring-[#0a84ff] transition-all border border-white/5"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[10px] font-bold text-[#8e8e93] uppercase tracking-widest">Exercices</h2>
            <button 
              onClick={() => setIsAddingExercise(true)}
              className="text-[#0a84ff] text-xs font-bold flex items-center bg-[#0a84ff]/10 py-1.5 px-3 rounded-full"
            >
              <Icons.Add className="w-3.5 h-3.5 mr-1" /> Ajouter
            </button>
          </div>

          <div className="space-y-4">
            {exercises.map((ex, index) => {
              const def = EXERCISES.find(e => e.id === ex.exerciseId);
              return (
                <div key={ex.id} className="bg-[#1c1c1e] border border-white/5 rounded-[2rem] p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center">
                      <span className="text-[10px] font-black bg-[#0a84ff]/20 text-[#0a84ff] h-6 w-6 flex items-center justify-center rounded-full mr-3 shrink-0">{index + 1}</span>
                      <div>
                        <h3 className="font-bold text-white text-base leading-tight">{def?.name}</h3>
                        <p className="text-[10px] text-[#8e8e93] uppercase font-bold tracking-widest mt-0.5">{def?.category}</p>
                      </div>
                    </div>
                    <button onClick={() => removeExercise(ex.id)} className="text-[#8e8e93] hover:text-[#ff453a] p-1">
                      <Icons.Close className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-[#8e8e93] block text-center uppercase tracking-widest">Séries</span>
                      <input 
                        type="number" 
                        value={ex.sets} 
                        onChange={(e) => updateExercise(ex.id, 'sets', parseInt(e.target.value) || 0)}
                        className="w-full bg-black/40 border border-white/5 rounded-xl p-2.5 text-center text-sm font-black focus:border-[#0a84ff] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-[#8e8e93] block text-center uppercase tracking-widest">Reps</span>
                      <input 
                        type="number" 
                        value={ex.reps} 
                        onChange={(e) => updateExercise(ex.id, 'reps', parseInt(e.target.value) || 0)}
                        className="w-full bg-black/40 border border-white/5 rounded-xl p-2.5 text-center text-sm font-black focus:border-[#0a84ff] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-[#8e8e93] block text-center uppercase tracking-widest">Poids</span>
                      <input 
                        type="number" 
                        value={ex.weight} 
                        onChange={(e) => updateExercise(ex.id, 'weight', parseFloat(e.target.value) || 0)}
                        className="w-full bg-black/40 border border-white/5 rounded-xl p-2.5 text-center text-sm font-black focus:border-[#0a84ff] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-[#8e8e93] block text-center uppercase tracking-widest">Rep(s)</span>
                      <input 
                        type="number" 
                        value={ex.restTime} 
                        onChange={(e) => updateExercise(ex.id, 'restTime', parseInt(e.target.value) || 0)}
                        className="w-full bg-black/40 border border-white/5 rounded-xl p-2.5 text-center text-sm font-black focus:border-[#0a84ff] focus:outline-none"
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
