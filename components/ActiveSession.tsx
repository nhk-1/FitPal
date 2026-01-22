
import React, { useState, useEffect, useRef } from 'react';
import { WorkoutSession, LoggedExercise, SetLog } from '../types';
import { Icons, EXERCISES } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface Props {
  session: WorkoutSession;
  onFinish: (session: WorkoutSession) => void;
  onCancel: () => void;
}

const ActiveSession: React.FC<Props> = ({ session, onFinish, onCancel }) => {
  const [localSession, setLocalSession] = useState<WorkoutSession>(session);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [restTimer, setRestTimer] = useState<number | null>(null);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [aiTip, setAiTip] = useState<string | null>(null);

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
    const updated = { ...localSession };
    const currentSet = updated.exercises[exerciseIndex].sets[setIndex];
    currentSet.isCompleted = !currentSet.isCompleted;
    
    if (currentSet.isCompleted) {
      setRestTimer(90); 
    }
    
    setLocalSession(updated);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof SetLog, value: number) => {
    const updated = { ...localSession };
    updated.exercises[exerciseIndex].sets[setIndex] = {
      ...updated.exercises[exerciseIndex].sets[setIndex],
      [field]: value
    };
    setLocalSession(updated);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const askAICoach = async () => {
    setIsAIThinking(true);
    setAiTip(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Je fais actuellement une séance de musculation : ${localSession.templateName}. 
      J'ai déjà complété plusieurs séries. Donne-moi un conseil court, pro et motivant (en français) pour la suite de ma séance ou pour optimiser ma récupération.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAiTip(response.text);
    } catch (err) {
      setAiTip("Focus sur l'intensité et la connexion muscle-esprit !");
    } finally {
      setIsAIThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-[#1c1c1e]/80 ios-blur z-20 px-5 pt-12 pb-5 border-b border-white/5">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-xl font-black text-white">{localSession.templateName}</h1>
            <div className="flex items-center text-[#0a84ff] font-mono text-sm font-bold mt-1">
              <Icons.Timer className="w-4 h-4 mr-1.5" />
              {formatTime(elapsedTime)}
            </div>
          </div>
          <button 
            onClick={() => onFinish(localSession)}
            className="bg-[#30d158] text-white px-7 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-[#30d158]/10 active:scale-95 transition-all"
          >
            Terminer
          </button>
        </div>

        {restTimer !== null && (
          <div className="bg-[#0a84ff] text-white py-3 px-5 rounded-[1.2rem] flex items-center justify-between shadow-xl animate-pulse">
            <div className="flex items-center">
               <Icons.Timer className="w-4 h-4 mr-2" />
               <span className="text-[10px] font-black uppercase tracking-widest">Temps de repos</span>
            </div>
            <span className="text-xl font-mono font-black">{restTimer}s</span>
          </div>
        )}
      </header>

      <div className="flex-1 px-5 py-8 space-y-10">
        {/* AI Coaching Section */}
        <div className="bg-gradient-to-br from-[#0a84ff] to-[#0040dd] rounded-[2rem] p-6 shadow-2xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center mb-3">
              <div className="bg-white/20 p-1.5 rounded-lg mr-2.5">
                <Icons.Brain className="w-4 h-4" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white/80">Coach IA Interactif</h3>
            </div>
            {aiTip ? (
              <p className="text-sm font-bold leading-snug">{aiTip}</p>
            ) : (
              <p className="text-sm font-medium opacity-80">Recevez un conseil en temps réel basé sur votre séance.</p>
            )}
            <button 
              onClick={askAICoach}
              disabled={isAIThinking}
              className="mt-5 bg-white text-[#0a84ff] py-2 px-6 rounded-full text-xs font-black transition-all disabled:opacity-50 active:scale-95"
            >
              {isAIThinking ? 'Analyse...' : 'Obtenir un conseil'}
            </button>
          </div>
          <div className="absolute -right-4 -bottom-6 opacity-10">
            <Icons.Brain className="w-36 h-36" />
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-12">
          {localSession.exercises.map((ex, exIdx) => {
            const def = EXERCISES.find(e => e.id === ex.exerciseId);
            return (
              <div key={exIdx} className="space-y-4">
                <div className="flex justify-between items-end px-1">
                  <div>
                    <h2 className="text-lg font-black text-white">{def?.name}</h2>
                    <p className="text-[10px] text-[#8e8e93] font-bold uppercase tracking-widest mt-0.5">{def?.category}</p>
                  </div>
                </div>

                <div className="bg-[#1c1c1e] rounded-[2rem] border border-white/5 shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[10px] text-[#8e8e93] uppercase tracking-widest border-b border-white/5">
                        <th className="py-4 px-6 font-black text-left w-12">Set</th>
                        <th className="py-4 px-2 font-black text-center">KG</th>
                        <th className="py-4 px-2 font-black text-center">Reps</th>
                        <th className="py-4 px-6 font-black text-right w-16">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {ex.sets.map((set, setIdx) => (
                        <tr key={setIdx} className={`transition-colors ${set.isCompleted ? 'bg-[#30d158]/5' : ''}`}>
                          <td className="py-5 px-6">
                            <span className={`text-sm font-black ${set.isCompleted ? 'text-[#30d158]' : 'text-white/20'}`}>#{setIdx + 1}</span>
                          </td>
                          <td className="py-2 px-2 text-center">
                            <input 
                              type="number" 
                              value={set.weight}
                              onChange={(e) => updateSet(exIdx, setIdx, 'weight', parseFloat(e.target.value) || 0)}
                              className="w-16 bg-black/40 border border-white/5 rounded-xl py-2 text-center font-black text-white focus:outline-none focus:ring-1 focus:ring-[#0a84ff]"
                            />
                          </td>
                          <td className="py-2 px-2 text-center">
                            <input 
                              type="number" 
                              value={set.reps}
                              onChange={(e) => updateSet(exIdx, setIdx, 'reps', parseInt(e.target.value) || 0)}
                              className="w-16 bg-black/40 border border-white/5 rounded-xl py-2 text-center font-black text-white focus:outline-none focus:ring-1 focus:ring-[#0a84ff]"
                            />
                          </td>
                          <td className="py-2 px-6 text-right">
                            <button 
                              onClick={() => toggleSet(exIdx, setIdx)}
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${set.isCompleted ? 'bg-[#30d158] text-white' : 'bg-white/5 text-[#8e8e93]'}`}
                            >
                              <Icons.Check className="w-4 h-4" />
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
          className="w-full py-6 text-[#ff453a] font-black text-xs uppercase tracking-widest hover:bg-[#ff453a]/5 rounded-3xl transition-colors mt-8"
        >
          Annuler la séance
        </button>
      </div>
    </div>
  );
};

export default ActiveSession;
