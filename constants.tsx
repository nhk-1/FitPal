
import React from 'react';
import { ExerciseDefinition } from './types';

export const EXERCISES: ExerciseDefinition[] = [
  // Pectoraux
  { id: '1', name: 'Développé Couché (Barre)', category: 'Pectoraux' },
  { id: '2', name: 'Développé Incliné (Haltères)', category: 'Pectoraux' },
  { id: '3', name: 'Écartés Couché', category: 'Pectoraux' },
  { id: '18', name: 'Dips (Focus Pecs)', category: 'Pectoraux' },
  { id: '19', name: 'Pompes', category: 'Pectoraux' },
  { id: '20', name: 'Chest Press (Machine)', category: 'Pectoraux' },
  { id: '21', name: 'Pec Deck', category: 'Pectoraux' },
  { id: '47', name: 'Pull-over (Haltère)', category: 'Pectoraux' },
  { id: '48', name: 'Développé Décliné (Barre)', category: 'Pectoraux' },
  // Dos
  { id: '4', name: 'Tractions (Pronation)', category: 'Dos' },
  { id: '5', name: 'Rowing Barre', category: 'Dos' },
  { id: '6', name: 'Tirage Vertical', category: 'Dos' },
  { id: '22', name: 'Rowing Haltère (Unilatéral)', category: 'Dos' },
  { id: '23', name: 'Deadlift (Soulevé de terre)', category: 'Dos' },
  { id: '24', name: 'Tirage Horizontal (Poulie)', category: 'Dos' },
  { id: '25', name: 'Lombaires (Banc)', category: 'Dos' },
  { id: '49', name: 'Pull-up (Lesté)', category: 'Dos' },
  { id: '50', name: 'Shrugs (Haltères)', category: 'Dos' },
  { id: '51', name: 'Tirage Bûcheron', category: 'Dos' },
  // Épaules
  { id: '7', name: 'Développé Militaire', category: 'Épaules' },
  { id: '8', name: 'Élévations Latérales', category: 'Épaules' },
  { id: '26', name: 'Oiseau (Haltères)', category: 'Épaules' },
  { id: '27', name: 'Développé Arnold', category: 'Épaules' },
  { id: '28', name: 'Face Pull', category: 'Épaules' },
  { id: '29', name: 'Tirage Menton', category: 'Épaules' },
  { id: '52', name: 'Élévations Frontales', category: 'Épaules' },
  { id: '53', name: 'Oiseau à la poulie', category: 'Épaules' },
  // Biceps
  { id: '9', name: 'Curl Barre EZ', category: 'Biceps' },
  { id: '10', name: 'Curl Marteau', category: 'Biceps' },
  { id: '30', name: 'Curl Incliné (Haltères)', category: 'Biceps' },
  { id: '31', name: 'Curl Concentration', category: 'Biceps' },
  { id: '32', name: 'Curl Araignée', category: 'Biceps' },
  { id: '54', name: 'Curl à la poulie basse', category: 'Biceps' },
  // Triceps
  { id: '11', name: 'Dips (Focus Triceps)', category: 'Triceps' },
  { id: '12', name: 'Extension Triceps (Poulie)', category: 'Triceps' },
  { id: '33', name: 'Barre au front', category: 'Triceps' },
  { id: '34', name: 'Kickback Haltère', category: 'Triceps' },
  { id: '35', name: 'Développé Couché Prise Serrée', category: 'Triceps' },
  { id: '55', name: 'Extensions au-dessus de la tête', category: 'Triceps' },
  // Jambes
  { id: '13', name: 'Squat Arrière', category: 'Jambes' },
  { id: '14', name: 'Fentes Marchées', category: 'Jambes' },
  { id: '15', name: 'Leg Extension', category: 'Jambes' },
  { id: '36', name: 'Presse à Cuisses', category: 'Jambes' },
  { id: '37', name: 'Leg Curl (Ischios)', category: 'Jambes' },
  { id: '38', name: 'Hack Squat', category: 'Jambes' },
  { id: '39', name: 'Soulevé de terre Jambes Tendues', category: 'Jambes' },
  { id: '56', name: 'Split Squat Bulgare', category: 'Jambes' },
  { id: '57', name: 'Hip Thrust (Barre)', category: 'Jambes' },
  { id: '58', name: 'Adducteurs (Machine)', category: 'Jambes' },
  // Mollets & Avant-bras
  { id: '40', name: 'Extensions Mollets Debout', category: 'Mollets' },
  { id: '41', name: 'Extensions Mollets Assis', category: 'Mollets' },
  { id: '42', name: 'Wrist Curl', category: 'Avant-bras' },
  { id: '43', name: 'Marche du Fermier', category: 'Avant-bras' },
  // Abdominaux
  { id: '16', name: 'Crunch au sol', category: 'Abdominaux' },
  { id: '17', name: 'Planche', category: 'Abdominaux' },
  { id: '44', name: 'Relevé de jambes suspendu', category: 'Abdominaux' },
  { id: '45', name: 'Russian Twist', category: 'Abdominaux' },
  { id: '46', name: 'Roulette (Ab Wheel)', category: 'Abdominaux' },
];

export const MUSCLE_GROUPS = Array.from(new Set(EXERCISES.map(e => e.category)));

export const Icons = {
  Dashboard: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  History: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
  ),
  Add: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Templates: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
  ),
  Workout: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6.5 6.5 11 11"/><path d="m11 4 7 7"/><path d="m4 11 7 7"/><path d="M3 21h18"/></svg>
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>
  ),
  Close: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Timer: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  TrendingUp: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  ),
  Trash: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
  ),
};
