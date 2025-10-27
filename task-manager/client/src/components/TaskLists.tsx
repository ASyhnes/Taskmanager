import { useState } from 'react';
import { Task, TaskCategory, SortCriteria } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Heart, 
  Briefcase, 
  FileText, 
  Users, 
  TrendingUp,
  Flame,
  Star,
  Clock
} from 'lucide-react';

interface TaskListsProps {
  tasks: Task[];
  sortTasks: (tasks: Task[], criteria: SortCriteria) => Task[];
  onSelectTask: (taskId: string, selected: boolean) => void;
  selectedTaskIds: string[];
}

const categoryConfig: Record<TaskCategory, { label: string; icon: any; color: string }> = {
  plaisir: { label: 'Plaisir', icon: Heart, color: 'bg-pink-500' },
  professionnel: { label: 'Professionnel', icon: Briefcase, color: 'bg-blue-500' },
  personnel_admin: { label: 'Personnel (Admin)', icon: FileText, color: 'bg-gray-500' },
  couple: { label: 'Couple', icon: Users, color: 'bg-red-500' },
  personnel_dev: { label: 'Développement Personnel', icon: TrendingUp, color: 'bg-green-500' },
};

const sortConfig: Record<SortCriteria, { label: string; icon: any }> = {
  weight: { label: 'Poids Total', icon: Star },
  urgence: { label: 'Urgence', icon: Flame },
  importance: { label: 'Importance', icon: Star },
  longTerme: { label: 'Long Terme', icon: Clock },
};

export function TaskLists({ tasks, sortTasks, onSelectTask, selectedTaskIds }: TaskListsProps) {
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>('weight');

  const categories: TaskCategory[] = [
    'plaisir',
    'professionnel',
    'personnel_admin',
    'couple',
    'personnel_dev',
  ];

  const getTasksByCategory = (category: TaskCategory) => {
    return tasks.filter((task) => task.category === category && task.status === 'pending');
  };

  const renderTaskList = (category: TaskCategory) => {
    const categoryTasks = getTasksByCategory(category);
    const sortedTasks = sortTasks(categoryTasks, sortCriteria);
    const config = categoryConfig[category];
    const Icon = config.icon;

    return (
      <Card key={category} className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${config.color} text-white`}>
              <Icon className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">{config.label}</CardTitle>
            <Badge variant="secondary" className="ml-auto">
              {sortedTasks.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {sortedTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucune tâche dans cette catégorie
            </p>
          ) : (
            <div className="space-y-2">
              {sortedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <Checkbox
                    checked={selectedTaskIds.includes(task.id)}
                    onCheckedChange={(checked) => onSelectTask(task.id, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight">{task.title}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        <Flame className="w-3 h-3 mr-1" />
                        U: {task.urgence}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        I: {task.importance}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        LT: {task.longTerme}
                      </Badge>
                      <Badge className="text-xs bg-primary">
                        Poids: {task.weight}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Contrôle de tri */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Trier par</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(sortConfig) as SortCriteria[]).map((criteria) => {
              const config = sortConfig[criteria];
              const Icon = config.icon;
              return (
                <Button
                  key={criteria}
                  variant={sortCriteria === criteria ? 'default' : 'outline'}
                  onClick={() => setSortCriteria(criteria)}
                  className="justify-start"
                  size="sm"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {config.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Listes de tâches par catégorie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => renderTaskList(category))}
      </div>
    </div>
  );
}

