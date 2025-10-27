import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ActiveTasksProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onPostpone: (taskId: string) => void;
}

export function ActiveTasks({ tasks, onComplete, onPostpone }: ActiveTasksProps) {
  if (tasks.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Tâches en cours cette semaine</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Aucune tâche sélectionnée pour cette semaine.
            <br />
            Rendez-vous dans la section "Revue Hebdomadaire" pour en choisir !
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tâches en cours cette semaine</CardTitle>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {tasks.length} / 4
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">Urgence: {task.urgence}</Badge>
                    <Badge variant="outline">Importance: {task.importance}</Badge>
                    <Badge variant="outline">Long terme: {task.longTerme}</Badge>
                    <Badge className="bg-primary">Poids: {task.weight}</Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Button
                    onClick={() => onComplete(task.id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Terminé
                  </Button>
                  <Button
                    onClick={() => onPostpone(task.id)}
                    size="sm"
                    variant="outline"
                    className="border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reporter
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

