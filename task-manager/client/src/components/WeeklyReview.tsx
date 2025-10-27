import { useState } from 'react';
import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskLists } from './TaskLists';
import { toast } from 'sonner';
import { Calendar } from 'lucide-react';

interface WeeklyReviewProps {
  tasks: Task[];
  sortTasks: (tasks: Task[], criteria: any) => Task[];
  onSelectTasks: (taskIds: string[]) => void;
  reviewDay: number;
  onSetReviewDay: (day: number) => void;
}

const daysOfWeek = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

export function WeeklyReview({
  tasks,
  sortTasks,
  onSelectTasks,
  reviewDay,
  onSetReviewDay,
}: WeeklyReviewProps) {
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [showDaySelector, setShowDaySelector] = useState(reviewDay === 0);

  const handleSelectTask = (taskId: string, selected: boolean) => {
    if (selected) {
      if (selectedTaskIds.length >= 4) {
        toast.error('Vous ne pouvez sélectionner que 4 tâches maximum !');
        return;
      }
      setSelectedTaskIds((prev) => [...prev, taskId]);
    } else {
      setSelectedTaskIds((prev) => prev.filter((id) => id !== taskId));
    }
  };

  const handleConfirmSelection = () => {
    if (selectedTaskIds.length === 0) {
      toast.error('Veuillez sélectionner au moins une tâche.');
      return;
    }
    if (selectedTaskIds.length > 4) {
      toast.error('Vous ne pouvez sélectionner que 4 tâches maximum !');
      return;
    }
    onSelectTasks(selectedTaskIds);
    setSelectedTaskIds([]);
    toast.success(`${selectedTaskIds.length} tâche(s) sélectionnée(s) pour cette semaine !`);
  };

  const handleSetReviewDay = (day: number) => {
    onSetReviewDay(day);
    setShowDaySelector(false);
    toast.success(`Jour de revue défini : ${daysOfWeek[day]}`);
  };

  if (showDaySelector) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Choisir le jour de la revue hebdomadaire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Quel jour de la semaine souhaitez-vous faire votre revue hebdomadaire ?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {daysOfWeek.map((day, index) => (
              <Button
                key={index}
                onClick={() => handleSetReviewDay(index)}
                variant="outline"
                className="h-auto py-4"
              >
                {day}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-md bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Revue Hebdomadaire
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDaySelector(true)}
            >
              Changer le jour ({daysOfWeek[reviewDay]})
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Sélectionnez jusqu'à <strong>4 tâches</strong> à accomplir cette semaine.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">
                {selectedTaskIds.length} / 4 tâches sélectionnées
              </div>
              <Button
                onClick={handleConfirmSelection}
                disabled={selectedTaskIds.length === 0}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                Confirmer la sélection
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskLists
        tasks={tasks}
        sortTasks={sortTasks}
        onSelectTask={handleSelectTask}
        selectedTaskIds={selectedTaskIds}
      />
    </div>
  );
}

