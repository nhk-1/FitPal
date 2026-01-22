
import React, { useState, useEffect } from 'react';
import { ViewState, WorkoutTemplate, WorkoutSession } from './types.ts';
import { Icons } from './constants.tsx';
import { generateId } from './utils.ts';
import TemplateList from './components/TemplateList.tsx';
import TemplateCreator from './components/TemplateCreator.tsx';
import ActiveSession from './components/ActiveSession.tsx';
import WorkoutHistory from './components/WorkoutHistory.tsx';
import Dashboard from './components/Dashboard.tsx';

const App: React.FC = () => {
  // Initialisation immédiate depuis le localStorage
  const [templates, setTemplates] = useState<WorkoutTemplate[]>(() => {
    const saved = localStorage.getItem('templates');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [history, setHistory] = useState<WorkoutSession[]>(() => {
    const saved = localStorage.getItem('history');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState<ViewState>('dashboard');
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);

  // Sauvegarde automatique lors des changements
  useEffect(() => {
    localStorage.setItem('templates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const handleCreateTemplate = (template: WorkoutTemplate) => {
    setTemplates(prev => [template, ...prev]);
    setView('templates');
  };

  const startWorkout = (template: WorkoutTemplate) => {
    const newSession: WorkoutSession = {
      id: generateId(),
      templateId: template.id,
      templateName: template.name,
      startTime: Date.now(),
      endTime: 0,
      exercises: template.exercises.map(te => ({
        exerciseId: te.exerciseId,
        sets: Array(te.sets).fill(null).map(() => ({
          reps: te.reps,
          weight: te.weight,
          isCompleted: false
        }))
      }))
    };
    setActiveSession(newSession);
    setView('active');
  };

  const finishWorkout = (session: WorkoutSession) => {
    const finishedSession = { ...session, endTime: Date.now() };
    setHistory(prev => [finishedSession, ...prev]);
    setActiveSession(null);
    setView('history');
  };

  const cancelWorkout = () => {
    if (confirm('Voulez-vous vraiment annuler la séance en cours ?')) {
      setActiveSession(null);
      setView('dashboard');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white selection:bg-[#0a84ff]/30">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {view === 'dashboard' && (
          <Dashboard 
            history={history} 
            templates={templates} 
            onStartTemplate={startWorkout}
          />
        )}
        {view === 'templates' && (
          <TemplateList 
            templates={templates} 
            onStartTemplate={startWorkout}
            onCreateNew={() => setView('create_template')} 
          />
        )}
        {view === 'create_template' && (
          <TemplateCreator 
            onSave={handleCreateTemplate} 
            onCancel={() => setView('templates')} 
          />
        )}
        {view === 'active' && activeSession && (
          <ActiveSession 
            session={activeSession} 
            onFinish={finishWorkout}
            onCancel={cancelWorkout}
          />
        )}
        {view === 'history' && (
          <WorkoutHistory history={history} />
        )}
      </main>

      {/* Bottom Navigation (iOS style) */}
      {view !== 'active' && (
        <nav className="fixed bottom-0 w-full bg-[#1c1c1e]/90 ios-blur border-t border-white/5 flex justify-around items-center px-4 pt-3 pb-8 z-50">
          <button 
            onClick={() => setView('dashboard')}
            className={`flex flex-col items-center space-y-1.5 transition-all active:scale-90 ${view === 'dashboard' ? 'text-[#0a84ff]' : 'text-[#8e8e93]'}`}
          >
            <Icons.Dashboard className={`w-6 h-6 ${view === 'dashboard' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold tracking-tight">Dashboard</span>
          </button>

          <button 
            onClick={() => setView('templates')}
            className={`flex flex-col items-center space-y-1.5 transition-all active:scale-90 ${view === 'templates' || view === 'create_template' ? 'text-[#0a84ff]' : 'text-[#8e8e93]'}`}
          >
            <Icons.Templates className={`w-6 h-6 ${view === 'templates' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold tracking-tight">Séances</span>
          </button>
          
          <button 
            onClick={() => setView('history')}
            className={`flex flex-col items-center space-y-1.5 transition-all active:scale-90 ${view === 'history' ? 'text-[#0a84ff]' : 'text-[#8e8e93]'}`}
          >
            <Icons.History className={`w-6 h-6 ${view === 'history' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold tracking-tight">Historique</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
