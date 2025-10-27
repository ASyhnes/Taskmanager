import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompletedTasksProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
}

export function CompletedTasks({ tasks, onDelete }: CompletedTasksProps) {
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  if (completedTasks.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Tâches terminées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Aucune tâche terminée pour le moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Tâches terminées
          </CardTitle>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {completedTasks.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-between gap-4 p-3 rounded-lg border bg-green-50 dark:bg-green-950/20"
            >
              <div className="flex-1">
                <h3 className="font-medium line-through text-muted-foreground">
                  {task.title}
                </h3>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    Poids: {task.weight}
                  </Badge>
                  {task.completedAt && (
                    <Badge variant="outline" className="text-xs">
                      Terminé le {new Date(task.completedAt).toLocaleDateString('fr-FR')}
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                onClick={() => onDelete(task.id)}
                size="sm"
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

