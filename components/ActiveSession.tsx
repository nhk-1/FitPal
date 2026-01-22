
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
      // Repos automatique
      setRestTimer(90); 
    }
    
    setLocalSession(updated);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof SetLog, value: string) => {
    const numValue = parseFloat(value) || 0;
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

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Sticky Header iOS Style */}
      <header className="sticky top-0 bg-black/80 ios-blur z-20 px-5 pt-12 pb-5 border-b border-white/5">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white leading-tight tracking-tight">{localSession.templateName}</h1>
            <div className="flex items-center text-[#0a84ff] font-mono text-sm font-black mt-1.5 bg-[#0a84ff]/10 w-fit px-3 py-1 rounded-full">
              <Icons.Timer className="w-3.5 h-3.5 mr-2" />
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

        {restTimer !== null && (
          <div className="bg-[#0a84ff] text-white py-4 px-6 rounded-[1.5rem] flex items-center justify-between shadow-2xl animate-pulse">
            <div className="flex items-center">
               <Icons.Timer className="w-5 h-5 mr-3" />
               <span className="text-xs font-black uppercase tracking-widest">Repos en cours</span>
            </div>
            <span className="text-2xl font-mono font-black">{restTimer}s</span>
          </div>
        )}
      </header>

      <div className="flex-1 px-5 py-8 space-y-12">
        {/* Exercises List */}
        <div className="space-y-12">
          {localSession.exercises.map((ex, exIdx) => {
            const def = EXERCISES.find(e => e.id === ex.exerciseId);
            return (
              <div key={exIdx} className="space-y-5">
                <div className="flex justify-between items-end px-1">
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight">{def?.name}</h2>
                    <p className="text-[11px] text-[#8e8e93] font-black uppercase tracking-widest mt-1.5">{def?.category}</p>
                  </div>
                </div>

                <div className="bg-[#1c1c1e] rounded-[2.5rem] border border-white/5 shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[10px] text-[#8e8e93] font-black uppercase tracking-widest border-b border-white/5">
                        <th className="py-5 px-6 text-left w-16">Série</th>
                        <th className="py-5 px-2 text-center">Poids KG</th>
                        <th className="py-5 px-2 text-center">Reps</th>
                        <th className="py-5 px-6 text-right w-20">Log</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {ex.sets.map((set, setIdx) => (
                        <tr key={setIdx} className={`transition-all duration-300 ${set.isCompleted ? 'bg-[#30d158]/10' : ''}`}>
                          <td className="py-6 px-6">
                            <span className={`text-base font-black ${set.isCompleted ? 'text-[#30d158]' : 'text-white/20'}`}>#{setIdx + 1}</span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <input 
                              type="number" 
                              value={set.weight || ''}
                              placeholder="0"
                              onChange={(e) => updateSet(exIdx, setIdx, 'weight', e.target.value)}
                              className="w-16 bg-black/50 border border-white/10 rounded-2xl py-3 text-center font-black text-white focus:outline-none focus:ring-1 focus:ring-[#0a84ff] placeholder:text-white/10"
                            />
                          </td>
                          <td className="py-3 px-2 text-center">
                            <input 
                              type="number" 
                              value={set.reps || ''}
                              placeholder="0"
                              onChange={(e) => updateSet(exIdx, setIdx, 'reps', e.target.value)}
                              className="w-16 bg-black/50 border border-white/10 rounded-2xl py-3 text-center font-black text-white focus:outline-none focus:ring-1 focus:ring-[#0a84ff] placeholder:text-white/10"
                            />
                          </td>
                          <td className="py-3 px-6 text-right">
                            <button 
                              onClick={() => toggleSet(exIdx, setIdx)}
                              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-lg ${set.isCompleted ? 'bg-[#30d158] text-white' : 'bg-white/5 text-[#8e8e93] active:scale-90'}`}
                            >
                              <Icons.Check className={`w-5 h-5 transition-transform ${set.isCompleted ? 'scale-110' : 'scale-100'}`} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={onCancel}
          className="w-full py-8 text-[#ff453a] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#ff453a]/5 rounded-[2rem] transition-all mt-10 border border-[#ff453a]/20 active:bg-[#ff453a]/20"
        >
          Annuler la séance
        </button>
      </div>
    </div>
  );
};

export default ActiveSession;
