
import React, { useState, useEffect } from 'react';
import { WorkoutSession, SetLog } from '../types.ts';
import { Icons, EXERCISES } from '../constants.tsx';

interface Props {
  session: WorkoutSession;
  onFinish: (session: WorkoutSession) => void;
  onCancel: () => void;
}

const ActiveSession: React.FC<Props> = ({ session, onFinish, onCancel }) => {
  const [localSession, setLocalSession] = useState<WorkoutSession>(session);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [restTimer, setRestTimer] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - localSession.startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [localSession.startTime]);

  useEffect(() => {
    let interval: number;
    if (restTimer !== null && restTimer > 0) {
      interval = window.setInterval(() => {
        setRestTimer(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (restTimer === 0) {
      setRestTimer(null);
    }
    return () => clearInterval(interval);
  }, [restTimer]);

  const toggleSet = (exerciseIndex: number, setIndex: number) => {
    const updated = JSON.parse(JSON.stringify(localSession));
    const currentSet = updated.exercises[exerciseIndex].sets[setIndex];
    currentSet.isCompleted = !currentSet.isCompleted;
    
    if (currentSet.isCompleted) {
      setRestTimer(90); 
    }
    
    setLocalSession(updated);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof SetLog, value: string) => {
    // Si l'entrée est vide ou non numérique, on garde 0 en data mais on laisse l'input vide visuellement
    const numValue = value === '' ? 0 : parseFloat(value);
    const updated = JSON.parse(JSON.stringify(localSession));
    updated.exercises[exerciseIndex].sets[setIndex][field] = numValue;
    setLocalSession(updated);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalSets = localSession.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSets = localSession.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.isCompleted).length, 0);
  const progress = (completedSets / totalSets) * 100;

  return (
    <div className="flex flex-col h-full bg-black">
      <header className="sticky top-0 bg-black/80 ios-blur z-20 pt-12 pb-5 px-5 border-b border-white/5">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white leading-tight tracking-tight">{localSession.templateName}</h1>
            <div className="flex items-center text-[#0a84ff] font-mono text-sm font-black mt-1.5">
              <Icons.Timer className="w-4 h-4 mr-2" />
              {formatTime(elapsedTime)}
            </div>
          </div>
          <button 
            onClick={() => onFinish(localSession)}
            className="bg-[#30d158] text-white px-8 py-3 rounded-full font-black text-sm shadow-xl shadow-[#30d158]/20 active:scale-95 transition-all"
          >
            Terminer
          </button>
        </div>

        {/* Barre de progression iOS Style */}
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-[#0a84ff] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {restTimer !== null && (
          <div className="bg-[#0a84ff] text-white py-4 px-6 rounded-[1.5rem] flex items-center justify-between shadow-2xl animate-slide-up">
            <div className="flex items-center">
               <Icons.Timer className="w-5 h-5 mr-3" />
               <span className="text-xs font-black uppercase tracking-widest">Temps de repos</span>
            </div>
            <span className="text-2xl font-mono font-black">{restTimer}s</span>
          </div>
        )}
      </header>

      <div className="flex-1 px-5 py-8 space-y-12">
        {localSession.exercises.map((ex, exIdx) => {
          const def = EXERCISES.find(e => e.id === ex.exerciseId);
          return (
            <div key={exIdx} className="space-y-4">
              <h2 className="text-xl font-black text-white tracking-tight ml-1">{def?.name}</h2>
              
              <div className="bg-[#1c1c1e] rounded-[2rem] border border-white/5 overflow-hidden">
                <div className="grid grid-cols-4 px-6 py-4 text-[10px] font-black text-[#8e8e93] uppercase tracking-widest border-b border-white/5">
                  <span>Série</span>
                  <span className="text-center">Poids</span>
                  <span className="text-center">Reps</span>
                  <span className="text-right">Log</span>
                </div>
                
                <div className="divide-y divide-white/5">
                  {ex.sets.map((set, setIdx) => (
                    <div 
                      key={setIdx} 
                      className={`grid grid-cols-4 items-center px-6 py-4 transition-colors ${set.isCompleted ? 'bg-[#30d158]/5' : ''}`}
                    >
                      <span className={`text-sm font-black ${set.isCompleted ? 'text-[#30d158]' : 'text-white/20'}`}>#{setIdx + 1}</span>
                      
                      <div className="flex justify-center">
                        <input 
                          type="number" 
                          value={set.weight === 0 ? '' : set.weight}
                          placeholder="0"
                          onChange={(e) => updateSet(exIdx, setIdx, 'weight', e.target.value)}
                          className="w-16 bg-black/40 border border-white/10 rounded-xl py-2 text-center font-bold focus:border-[#0a84ff] focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-center">
                        <input 
                          type="number" 
                          value={set.reps === 0 ? '' : set.reps}
                          placeholder="0"
                          onChange={(e) => updateSet(exIdx, setIdx, 'reps', e.target.value)}
                          className="w-16 bg-black/40 border border-white/10 rounded-xl py-2 text-center font-bold focus:border-[#0a84ff] focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button 
                          onClick={() => toggleSet(exIdx, setIdx)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${set.isCompleted ? 'bg-[#30d158] text-white shadow-lg shadow-[#30d158]/20' : 'bg-white/5 text-[#8e8e93] active:scale-90'}`}
                        >
                          <Icons.Check className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        <button 
          onClick={onCancel}
          className="w-full py-6 text-[#ff453a] font-black text-xs uppercase tracking-widest bg-[#ff453a]/5 rounded-[1.5rem] border border-[#ff453a]/20 active:scale-95 transition-all mt-10"
        >
          Abandonner la séance
        </button>
      </div>
    </div>
  );
};

export default ActiveSession;
