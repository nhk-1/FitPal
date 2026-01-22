
import React from 'react';
import { WorkoutSession, WorkoutTemplate } from '../types';
import { Icons } from '../constants';
import WorkoutTemplateCard from './WorkoutTemplateCard';

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
    <div className="px-5 pt-12 pb-10 space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Tableau de bord</h1>
        <p className="text-[#8e8e93] font-medium">Votre progression de {new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date())}</p>
      </header>

      {/* Primary Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-[#1c1c1e] p-5 rounded-[2rem] border border-white/5 shadow-sm">
          <div className="bg-[#0a84ff]/10 p-2 rounded-xl w-fit mb-3">
            <Icons.Workout className="w-5 h-5 text-[#0a84ff]" />
          </div>
          <span className="text-2xl font-black block">{sessionsThisMonth.length}</span>
          <span className="text-[#8e8e93] text-[10px] font-bold uppercase tracking-widest">Séances ce mois</span>
        </div>

        <div className="bg-[#1c1c1e] p-5 rounded-[2rem] border border-white/5 shadow-sm">
          <div className="bg-[#30d158]/10 p-2 rounded-xl w-fit mb-3">
            <Icons.TrendingUp className="w-5 h-5 text-[#30d158]" />
          </div>
          <span className="text-2xl font-black block">{averageVolume} kg</span>
          <span className="text-[#8e8e93] text-[10px] font-bold uppercase tracking-widest">Volume moyen</span>
        </div>
      </section>

      {/* Week Progress View */}
      <section className="bg-[#1c1c1e] p-6 rounded-[2.5rem] border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Cette semaine</h2>
          <span className="text-[#8e8e93] text-xs font-bold">{lastWeekSessions.length} sessions</span>
        </div>
        
        <div className="flex justify-between items-end h-24 px-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => {
            // Mapping for JS getDay() (Sunday=0, Monday=1...)
            // Our array is L=1, M=2... D=0
            const dayNum = (idx + 1) % 7;
            const hasWorkout = lastWeekSessions.some(s => new Date(s.startTime).getDay() === dayNum);
            
            return (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <div className={`w-8 rounded-full transition-all duration-500 ${hasWorkout ? 'bg-[#0a84ff] h-16' : 'bg-white/5 h-4'}`}></div>
                <span className="text-[10px] font-bold text-[#8e8e93]">{day}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Suggested Session */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-lg font-bold">Reprendre</h2>
        </div>
        
        {templates.length > 0 ? (
          <WorkoutTemplateCard 
            template={templates[0]} 
            onClick={() => onStartTemplate(templates[0])} 
          />
        ) : (
          <div className="bg-[#1c1c1e] p-8 rounded-[2rem] border border-dashed border-white/10 text-center">
            <p className="text-[#8e8e93] text-sm">Créez un modèle pour commencer votre suivi.</p>
          </div>
        )}
      </section>

      {/* Motivation Card */}
      <section className="bg-gradient-to-br from-[#1c1c1e] to-black p-6 rounded-[2rem] border border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#0a84ff] mb-2">Objectif</h3>
          <p className="text-lg font-bold leading-tight">Consistance est la clé. <br/>Visez 3 séances cette semaine !</p>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Icons.TrendingUp className="w-24 h-24 text-white" />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
