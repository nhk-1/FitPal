
import React from 'react';
import { WorkoutSession } from '../types';
import { EXERCISES, Icons } from '../constants';

interface Props {
  history: WorkoutSession[];
}

const WorkoutHistory: React.FC<Props> = ({ history }) => {
  const formatDate = (ts: number) => {
    return new Intl.DateTimeFormat('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
    }).format(ts);
  };

  const getDuration = (start: number, end: number) => {
    const mins = Math.floor((end - start) / 60000);
    return `${mins}m`;
  };

  const getTotalVolume = (session: WorkoutSession) => {
    let vol = 0;
    session.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.isCompleted) vol += (s.reps * s.weight);
      });
    });
    return vol;
  };

  return (
    <div className="px-5 pt-12 pb-24">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Activités</h1>

      {history.length === 0 ? (
        <div className="bg-[#1c1c1e] border border-dashed border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center text-center">
          <div className="bg-white/5 p-4 rounded-full mb-4 text-[#8e8e93]">
            <Icons.History className="w-8 h-8" />
          </div>
          <p className="text-[#8e8e93] font-medium">Historique vide.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {history.map(session => (
            <div key={session.id} className="bg-[#1c1c1e] border border-white/5 rounded-[2rem] p-6 shadow-sm">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-lg font-bold text-white">{session.templateName}</h3>
                  <p className="text-[10px] text-[#8e8e93] font-black uppercase tracking-widest mt-1">
                    {formatDate(session.startTime)} • {getDuration(session.startTime, session.endTime)}
                  </p>
                </div>
                <div className="bg-[#0a84ff]/10 text-[#0a84ff] text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                  {getTotalVolume(session)} kg
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5 border-y border-white/5 py-4">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-[#8e8e93] uppercase tracking-widest">Exercices</span>
                    <span className="text-sm font-black text-white">{session.exercises.length}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-[#8e8e93] uppercase tracking-widest">Sets complétés</span>
                    <span className="text-sm font-black text-white">{session.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.isCompleted).length, 0)}</span>
                 </div>
              </div>

              <div className="space-y-3">
                {session.exercises.slice(0, 3).map((ex, i) => {
                  const def = EXERCISES.find(e => e.id === ex.exerciseId);
                  const completedSets = ex.sets.filter(s => s.isCompleted).length;
                  const maxWeight = Math.max(...ex.sets.map(s => s.weight));
                  return (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <div className="flex flex-col">
                        <span className="text-white font-bold">{def?.name}</span>
                        <span className="text-[10px] text-[#8e8e93]">{completedSets} séries</span>
                      </div>
                      <span className="text-[#8e8e93] font-mono text-[10px]">{maxWeight}kg max</span>
                    </div>
                  );
                })}
                {session.exercises.length > 3 && (
                  <p className="text-[10px] text-[#0a84ff] font-black uppercase tracking-widest pt-1">+{session.exercises.length - 3} de plus</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;
