import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskChat } from '@/components/TaskChat';
import { ActiveTasks } from '@/components/ActiveTasks';
import { WeeklyReview } from '@/components/WeeklyReview';
import { CompletedTasks } from '@/components/CompletedTasks';
import { InstallPWA } from '@/components/InstallPWA';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  ListTodo, 
  Calendar, 
  CheckCircle2,
  Sparkles 
} from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const {
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
    sortTasks,
  } = useTasks();

  const [activeTab, setActiveTab] = useState('chat');

  const handleTaskCreated = (
    title: string,
    urgence: number,
    importance: number,
    longTerme: number,
    category: any
  ) => {
    addTask(title, urgence, importance, longTerme, category);
    toast.success('Tâche ajoutée avec succès !');
  };

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId);
    toast.success('Tâche terminée ! 🎉');
  };

  const handlePostponeTask = (taskId: string) => {
    postponeTask(taskId);
    toast.info('Tâche reportée.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Gestionnaire de Tâches
              </h1>
              <p className="text-sm text-muted-foreground">
                Organisez votre vie avec intelligence
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Ajouter</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-2">
              <ListTodo className="w-4 h-4" />
              <span className="hidden sm:inline">En cours</span>
            </TabsTrigger>
            <TabsTrigger value="review" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Revue</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">Terminées</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TaskChat onTaskCreated={handleTaskCreated} />
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border">
                  <h3 className="font-semibold text-lg mb-2">📊 Statistiques</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tâches en attente</span>
                      <span className="text-2xl font-bold text-primary">
                        {getPendingTasks().length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">En cours</span>
                      <span className="text-2xl font-bold text-accent">
                        {selectedTasks.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Terminées</span>
                      <span className="text-2xl font-bold text-green-600">
                        {tasks.filter((t) => t.status === 'completed').length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border">
                  <h3 className="font-semibold text-lg mb-2">💡 Astuce</h3>
                  <p className="text-sm text-muted-foreground">
                    Utilisez le système de notation pour prioriser vos tâches. Plus le poids est élevé, plus la tâche est importante !
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="active">
            <ActiveTasks
              tasks={selectedTasks}
              onComplete={handleCompleteTask}
              onPostpone={handlePostponeTask}
            />
          </TabsContent>

          <TabsContent value="review">
            <WeeklyReview
              tasks={getPendingTasks()}
              sortTasks={sortTasks}
              onSelectTasks={selectTasksForWeek}
              reviewDay={reviewDay}
              onSetReviewDay={setReviewDay}
            />
          </TabsContent>

          <TabsContent value="completed">
            <CompletedTasks tasks={tasks} onDelete={deleteTask} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-card/50">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Gestionnaire de Tâches Intelligent - Organisez votre vie efficacement</p>
        </div>
      </footer>

      {/* PWA Install Prompt */}
      <InstallPWA />
    </div>
  );
}

