import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { TaskCategory } from '@/types/task';
import { Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
}

type ConversationStep = 
  | 'idle'
  | 'awaiting_urgence'
  | 'awaiting_importance'
  | 'awaiting_long_terme'
  | 'awaiting_category';

interface TaskData {
  title?: string;
  urgence?: number;
  importance?: number;
  longTerme?: number;
  category?: TaskCategory;
}

interface TaskChatProps {
  onTaskCreated: (
    title: string,
    urgence: number,
    importance: number,
    longTerme: number,
    category: TaskCategory
  ) => void;
}

export function TaskChat({ onTaskCreated }: TaskChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '👋 Bonjour ! Quelle tâche souhaitez-vous ajouter ?',
    },
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<ConversationStep>('idle');
  const [taskData, setTaskData] = useState<TaskData>({});

  const addMessage = (type: 'user' | 'bot', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage('user', input);
    processInput(input);
    setInput('');
  };

  const processInput = (userInput: string) => {
    switch (step) {
      case 'idle':
        setTaskData({ title: userInput });
        setStep('awaiting_urgence');
        addMessage('bot', '📊 Sur une échelle de 1 à 5, quel est le niveau d\'urgence de cette tâche ?');
        break;

      case 'awaiting_urgence':
        const urgence = parseInt(userInput);
        if (isNaN(urgence) || urgence < 1 || urgence > 5) {
          addMessage('bot', '⚠️ Veuillez entrer un nombre entre 1 et 5.');
          return;
        }
        setTaskData((prev) => ({ ...prev, urgence }));
        setStep('awaiting_importance');
        addMessage('bot', '⭐ Sur une échelle de 1 à 5, quelle est l\'importance de cette tâche ?');
        break;

      case 'awaiting_importance':
        const importance = parseInt(userInput);
        if (isNaN(importance) || importance < 1 || importance > 5) {
          addMessage('bot', '⚠️ Veuillez entrer un nombre entre 1 et 5.');
          return;
        }
        setTaskData((prev) => ({ ...prev, importance }));
        setStep('awaiting_long_terme');
        addMessage('bot', '🎯 Sur une échelle de 1 à 5, est-ce une tâche à long terme ?');
        break;

      case 'awaiting_long_terme':
        const longTerme = parseInt(userInput);
        if (isNaN(longTerme) || longTerme < 1 || longTerme > 5) {
          addMessage('bot', '⚠️ Veuillez entrer un nombre entre 1 et 5.');
          return;
        }
        setTaskData((prev) => ({ ...prev, longTerme }));
        setStep('awaiting_category');
        addMessage(
          'bot',
          '🏷️ Choisissez une catégorie :\n1. Plaisir\n2. Professionnel\n3. Personnel (administratif)\n4. Couple\n5. Personnel (développement personnel)'
        );
        break;

      case 'awaiting_category':
        const categoryMap: { [key: string]: TaskCategory } = {
          '1': 'plaisir',
          '2': 'professionnel',
          '3': 'personnel_admin',
          '4': 'couple',
          '5': 'personnel_dev',
        };
        const category = categoryMap[userInput];
        if (!category) {
          addMessage('bot', '⚠️ Veuillez choisir un nombre entre 1 et 5.');
          return;
        }

        // Créer la tâche
        if (taskData.title && taskData.urgence && taskData.importance && taskData.longTerme) {
          onTaskCreated(
            taskData.title,
            taskData.urgence,
            taskData.importance,
            taskData.longTerme,
            category
          );
          
          const weight = taskData.urgence + taskData.importance + taskData.longTerme;
          addMessage(
            'bot',
            `✅ Tâche créée avec succès !\n\n📝 "${taskData.title}"\n📊 Poids total : ${weight}/15\n\nQue souhaitez-vous ajouter d'autre ?`
          );
          
          // Réinitialiser
          setStep('idle');
          setTaskData({});
        }
        break;
    }
  };

  return (
    <Card className="flex flex-col h-[600px] shadow-lg">
      <div className="p-4 border-b bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Assistant de Tâches</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 whitespace-pre-line ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-muted/30">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tapez votre réponse..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}

