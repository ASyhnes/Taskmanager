export type TaskCategory = 
  | 'plaisir'
  | 'professionnel'
  | 'personnel_admin'
  | 'couple'
  | 'personnel_dev';

export interface Task {
  id: string;
  title: string;
  urgence: number; // 1-5
  importance: number; // 1-5
  longTerme: number; // 1-5
  category: TaskCategory;
  weight: number; // somme de urgence + importance + longTerme
  status: 'pending' | 'in_progress' | 'completed' | 'postponed';
  createdAt: Date;
  completedAt?: Date;
}

export interface WeeklyReview {
  selectedTasks: Task[];
  reviewDate: Date;
}

export type SortCriteria = 'weight' | 'urgence' | 'importance' | 'longTerme';

