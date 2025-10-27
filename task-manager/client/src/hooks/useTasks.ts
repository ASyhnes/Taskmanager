import { useState, useEffect } from 'react';
import { Task, TaskCategory, SortCriteria } from '@/types/task';

const STORAGE_KEY = 'task-manager-tasks';
const REVIEW_DAY_KEY = 'task-manager-review-day';
const SELECTED_TASKS_KEY = 'task-manager-selected-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [reviewDay, setReviewDay] = useState<number>(0); // 0 = Dimanche, 1 = Lundi, etc.

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    const storedReviewDay = localStorage.getItem(REVIEW_DAY_KEY);
    const storedSelectedTasks = localStorage.getItem(SELECTED_TASKS_KEY);

    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      // Convertir les dates string en objets Date
      const tasksWithDates = parsedTasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
      setTasks(tasksWithDates);
    }

    if (storedReviewDay) {
      setReviewDay(parseInt(storedReviewDay));
    }

    if (storedSelectedTasks) {
      const parsedSelectedTasks = JSON.parse(storedSelectedTasks);
      const selectedWithDates = parsedSelectedTasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
      setSelectedTasks(selectedWithDates);
    }
  }, []);

  // Sauvegarder les tâches dans localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Sauvegarder le jour de revue
  useEffect(() => {
    localStorage.setItem(REVIEW_DAY_KEY, reviewDay.toString());
  }, [reviewDay]);

  // Sauvegarder les tâches sélectionnées
  useEffect(() => {
    localStorage.setItem(SELECTED_TASKS_KEY, JSON.stringify(selectedTasks));
  }, [selectedTasks]);

  const addTask = (
    title: string,
    urgence: number,
    importance: number,
    longTerme: number,
    category: TaskCategory
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      urgence,
      importance,
      longTerme,
      category,
      weight: urgence + importance + longTerme,
      status: 'pending',
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const completeTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: 'completed' as const, completedAt: new Date() }
          : task
      )
    );
    setSelectedTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const postponeTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: 'pending' as const } : task
      )
    );
    setSelectedTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setSelectedTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const selectTasksForWeek = (taskIds: string[]) => {
    const tasksToSelect = tasks.filter((task) => taskIds.includes(task.id));
    const updatedTasks = tasksToSelect.map((task) => ({
      ...task,
      status: 'in_progress' as const,
    }));
    
    setTasks((prev) =>
      prev.map((task) =>
        taskIds.includes(task.id) ? { ...task, status: 'in_progress' as const } : task
      )
    );
    setSelectedTasks(updatedTasks);
  };

  const getPendingTasks = () => {
    return tasks.filter((task) => task.status === 'pending');
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.status === 'completed');
  };

  const getTasksByCategory = (category: TaskCategory) => {
    return tasks.filter((task) => task.category === category && task.status === 'pending');
  };

  const sortTasks = (tasksToSort: Task[], criteria: SortCriteria): Task[] => {
    return [...tasksToSort].sort((a, b) => {
      if (criteria === 'weight') {
        return b.weight - a.weight;
      }
      return b[criteria] - a[criteria];
    });
  };

  return {
    tasks,
    selectedTasks,
    reviewDay,
    setReviewDay,
    addTask,
    completeTask,
    postponeTask,
    deleteTask,
    selectTasksForWeek,
    getPendingTasks,
    getCompletedTasks,
    getTasksByCategory,
    sortTasks,
  };
}

