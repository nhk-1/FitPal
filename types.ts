
export type MuscleGroup = 'Pectoraux' | 'Dos' | 'Épaules' | 'Biceps' | 'Triceps' | 'Jambes' | 'Abdominaux' | 'Mollets' | 'Avant-bras';

export interface ExerciseDefinition {
  id: string;
  name: string;
  category: MuscleGroup;
}

export interface SetLog {
  reps: number;
  weight: number;
  isCompleted: boolean;
}

export interface TemplateExercise {
  id: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  restTime: number; // in seconds
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  exercises: TemplateExercise[];
  createdAt: number;
}

export interface LoggedExercise {
  exerciseId: string;
  sets: SetLog[];
}

export interface WorkoutSession {
  id: string;
  templateId?: string;
  templateName: string;
  startTime: number;
  endTime: number;
  exercises: LoggedExercise[];
}

export type ViewState = 'dashboard' | 'templates' | 'history' | 'active' | 'create_template';
