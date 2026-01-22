
import React from 'react';
import { WorkoutSession, WorkoutTemplate } from '../types.ts';
import { Icons } from '../constants.tsx';
import WorkoutTemplateCard from './WorkoutTemplateCard.tsx';

interface Props {
  history: WorkoutSession[];
  templates: WorkoutTemplate[];
  onStartTemplate: (template: WorkoutTemplate) => void;
}

const Dashboard: React.FC<Props> = ({ history, templates, onStartTemplate }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const sessionsThisMonth = history.filter(s => {
    const d = new Date(s.startTime);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const lastWeekSessions = history.filter(s => {
    const d = new Date(s.startTime);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  });

  const totalVolume = history.reduce((acc, session) => {
    let sessionVol = 0;
    session.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.isCompleted) sessionVol += (s.reps * s.weight);
      });
    });
    return acc + sessionVol;
  }, 0);

  const averageVolume = history.length > 0 ? Math.round(totalVolume / history.length) : 0;

  return (
    <div className="px-5 pt-16 pb-10 space-y-10 max-w-2xl mx-auto">
      <header>
        <h1 className="text-4xl font-black tracking-tight text-white mb-1">IronTrack</h1>
        <p className="text-[#8e8e93] font-bold text-sm">Votre progression en {new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date())}</p>
      </header>

      {/* Primary Stats Grid */}
      <section className="grid grid-cols-2 gap-5">
        <div className="bg-[#1c1c1e] p-6 rounded-[2.5rem] border border-white/5 shadow-sm">
          <div className="bg-[#0a84ff]/10 p-2.5 rounded-xl w-fit mb-4">
            <Icons.Workout className="w-5 h-5 text-[#0a84ff]" />
          </div>
          <span className="text-3xl font-black block tracking-tight">{sessionsThisMonth.length}</span>
          <span className="text-[#8e8e93] text-[10px] font-black uppercase tracking-widest mt-1 block">Séances ce mois</span>
        </div>

        <div className="bg-[#1c1c1e] p-6 rounded-[2.5rem] border border-white/5 shadow-sm">
          <div className="bg-[#30d158]/10 p-2.5 rounded-xl w-fit mb-4">
            <Icons.TrendingUp className="w-5 h-5 text-[#30d158]" />
          </div>
          <span className="text-3xl font-black block tracking-tight">{averageVolume} kg</span>
          <span className="text-[#8e8e93] text-[10px] font-black uppercase tracking-widest mt-1 block">Volume moyen</span>
        </div>
      </section>

      {/* Week Progress View */}
      <section className="bg-[#1c1c1e] p-8 rounded-[3rem] border border-white/5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-black tracking-tight">Activité Hebdomadaire</h2>
          <span className="text-[#0a84ff] text-xs font-black bg-[#0a84ff]/10 px-3 py-1.5 rounded-full">{lastWeekSessions.length} sessions</span>
        </div>
        
        <div className="flex justify-between items-end h-28 px-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => {
            const dayNum = (idx + 1) % 7;
            const hasWorkout = lastWeekSessions.some(s => new Date(s.startTime).getDay() === dayNum);
            
            return (
              <div key={idx} className="flex flex-col items-center space-y-3">
                <div className={`w-8 rounded-full transition-all duration-700 ease-out ${hasWorkout ? 'bg-gradient-to-t from-[#0a84ff] to-[#5e5ce6] h-20 shadow-lg shadow-[#0a84ff]/20' : 'bg-white/5 h-4'}`}></div>
                <span className="text-[10px] font-black text-[#8e8e93]">{day}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Suggested Session */}
      <section className="space-y-6">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-black tracking-tight">Reprendre l'entraînement</h2>
        </div>
        
        {templates.length > 0 ? (
          <WorkoutTemplateCard 
            template={templates[0]} 
            onClick={() => onStartTemplate(templates[0])} 
          />
        ) : (
          <div className="bg-[#1c1c1e] p-10 rounded-[2.5rem] border border-dashed border-white/10 text-center">
            <p className="text-[#8e8e93] text-sm font-medium">Créez votre première séance pour commencer.</p>
          </div>
        )}
      </section>

      {/* Motivation Card */}
      <section className="bg-gradient-to-br from-[#1c1c1e] to-black p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#0a84ff] mb-3">Statut Prochain</h3>
          <p className="text-xl font-black leading-tight tracking-tight">La discipline bat la motivation.<br/>Faites votre séance aujourd'hui !</p>
        </div>
        <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Icons.TrendingUp className="w-32 h-32 text-white" />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
