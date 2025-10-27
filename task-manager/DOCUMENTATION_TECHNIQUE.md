# Documentation Technique - Gestionnaire de Tâches Intelligent

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Stack technique](#stack-technique)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Structure du projet](#structure-du-projet)
6. [Composants principaux](#composants-principaux)
7. [Gestion des données](#gestion-des-données)
8. [Système de design](#système-de-design)
9. [Déploiement](#déploiement)
10. [Maintenance et évolution](#maintenance-et-évolution)

---

## 🎯 Vue d'ensemble

**Gestionnaire de Tâches Intelligent** est une application web moderne de gestion de tâches avec une interface conversationnelle. Elle permet d'organiser ses tâches par catégories, de les prioriser selon plusieurs critères, et de planifier une revue hebdomadaire.

### Fonctionnalités principales

- ✅ Ajout de tâches via un système de chat conversationnel
- ✅ Classification en 5 catégories (Plaisir, Professionnel, Personnel Admin, Couple, Développement Personnel)
- ✅ Notation sur 3 axes : Urgence, Importance, Long terme (échelle 1-5)
- ✅ Calcul automatique du poids (somme des 3 notes)
- ✅ Revue hebdomadaire avec sélection de 4 tâches maximum
- ✅ Tri flexible par poids, urgence, importance ou long terme
- ✅ Gestion des tâches en cours (Terminé / Reporter)
- ✅ Historique des tâches terminées
- ✅ Stockage local persistant (localStorage)
- ✅ Interface responsive (mobile, tablette, desktop)

---

## 🛠️ Stack technique

### Frontend

| Technologie | Version | Description |
|------------|---------|-------------|
| **React** | 19.0.0 | Bibliothèque UI avec hooks modernes |
| **TypeScript** | 5.x | Typage statique pour JavaScript |
| **Vite** | 7.1.9 | Build tool ultra-rapide |
| **Tailwind CSS** | 4.0.0 | Framework CSS utilitaire |
| **Wouter** | 3.7.1 | Routeur léger (2KB) |
| **shadcn/ui** | Latest | Composants UI accessibles |
| **Sonner** | Latest | Notifications toast élégantes |
| **Lucide React** | Latest | Icônes SVG modernes |

### Outils de développement

- **pnpm** : Gestionnaire de paquets rapide
- **ESLint** : Linter JavaScript/TypeScript
- **PostCSS** : Transformation CSS

---

## 🏗️ Architecture

### Pattern architectural

L'application suit une architecture **composants + hooks personnalisés** :

```
┌─────────────────────────────────────┐
│         Pages (Home.tsx)            │
│  ┌───────────────────────────────┐  │
│  │   Composants UI               │  │
│  │  - TaskChat                   │  │
│  │  - TaskLists                  │  │
│  │  - ActiveTasks                │  │
│  │  - WeeklyReview               │  │
│  │  - CompletedTasks             │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
              ↓ ↑
┌─────────────────────────────────────┐
│    Hook personnalisé (useTasks)     │
│  - Logique métier                   │
│  - Gestion d'état                   │
│  - CRUD opérations                  │
└─────────────────────────────────────┘
              ↓ ↑
┌─────────────────────────────────────┐
│      localStorage (Browser)         │
│  - Persistance des données          │
└─────────────────────────────────────┘
```

### Flux de données

**Flux unidirectionnel :**
1. L'utilisateur interagit avec un composant UI
2. Le composant appelle une fonction du hook `useTasks`
3. Le hook met à jour l'état React
4. Le hook sauvegarde dans localStorage
5. React re-rend les composants concernés

---

## 📦 Installation

### Prérequis

- **Node.js** : version 18.x ou supérieure
- **pnpm** : version 8.x ou supérieure (ou npm/yarn)

### Étapes d'installation

```bash
# 1. Extraire l'archive ZIP
unzip task-manager.zip
cd task-manager

# 2. Installer les dépendances
pnpm install

# 3. Lancer le serveur de développement
pnpm dev

# 4. Ouvrir dans le navigateur
# http://localhost:3000
```

### Scripts disponibles

```bash
pnpm dev          # Démarrer le serveur de développement
pnpm build        # Compiler pour la production
pnpm preview      # Prévisualiser le build de production
pnpm lint         # Vérifier le code avec ESLint
```

---

## 📁 Structure du projet

```
task-manager/
├── client/                      # Application frontend
│   ├── public/                  # Fichiers statiques
│   ├── src/
│   │   ├── components/          # Composants React
│   │   │   ├── ui/             # Composants shadcn/ui
│   │   │   ├── TaskChat.tsx    # Interface de chat
│   │   │   ├── TaskLists.tsx   # Listes par catégories
│   │   │   ├── ActiveTasks.tsx # Tâches en cours
│   │   │   ├── WeeklyReview.tsx # Revue hebdomadaire
│   │   │   └── CompletedTasks.tsx # Tâches terminées
│   │   ├── contexts/           # Contextes React
│   │   │   └── ThemeContext.tsx # Gestion du thème
│   │   ├── hooks/              # Hooks personnalisés
│   │   │   └── useTasks.ts     # Logique métier
│   │   ├── lib/                # Utilitaires
│   │   │   └── utils.ts        # Fonctions helper
│   │   ├── pages/              # Pages de l'application
│   │   │   ├── Home.tsx        # Page principale
│   │   │   └── NotFound.tsx    # Page 404
│   │   ├── types/              # Définitions TypeScript
│   │   │   └── task.ts         # Types des tâches
│   │   ├── App.tsx             # Composant racine
│   │   ├── main.tsx            # Point d'entrée
│   │   └── index.css           # Styles globaux
│   └── index.html              # Template HTML
├── package.json                # Dépendances
├── tsconfig.json               # Configuration TypeScript
├── vite.config.ts              # Configuration Vite
└── tailwind.config.ts          # Configuration Tailwind
```

---

## 🧩 Composants principaux

### 1. Types TypeScript (`types/task.ts`)

#### Interface Task

```typescript
export interface Task {
  id: string;                    // Identifiant unique
  title: string;                 // Titre de la tâche
  urgence: number;              // Note d'urgence (1-5)
  importance: number;           // Note d'importance (1-5)
  longTerme: number;            // Note long terme (1-5)
  category: TaskCategory;       // Catégorie
  weight: number;               // Poids calculé (somme)
  status: TaskStatus;           // Statut actuel
  createdAt: Date;              // Date de création
  completedAt?: Date;           // Date de complétion (optionnel)
}
```

#### Types auxiliaires

```typescript
export type TaskCategory = 
  | 'plaisir'
  | 'professionnel'
  | 'personnel_admin'
  | 'couple'
  | 'personnel_dev';

export type TaskStatus = 
  | 'pending'        // En attente
  | 'in_progress'    // En cours
  | 'completed'      // Terminée
  | 'postponed';     // Reportée

export type SortCriteria = 
  | 'weight'         // Tri par poids total
  | 'urgence'        // Tri par urgence
  | 'importance'     // Tri par importance
  | 'longTerme';     // Tri par long terme
```

---

### 2. Hook useTasks (`hooks/useTasks.ts`)

**Responsabilités :**
- Gestion de l'état des tâches
- Persistance dans localStorage
- Opérations CRUD
- Logique de filtrage et tri

#### API du hook

```typescript
const {
  // État
  tasks,              // Toutes les tâches
  selectedTasks,      // Tâches de la semaine
  reviewDay,          // Jour de revue (0-6)
  
  // Setters
  setReviewDay,       // Définir le jour de revue
  
  // Actions CRUD
  addTask,            // Ajouter une tâche
  completeTask,       // Marquer comme terminée
  postponeTask,       // Reporter une tâche
  deleteTask,         // Supprimer une tâche
  selectTasksForWeek, // Sélectionner pour la semaine
  
  // Filtres
  getPendingTasks,    // Obtenir tâches en attente
  getCompletedTasks,  // Obtenir tâches terminées
  getTasksByCategory, // Filtrer par catégorie
  
  // Tri
  sortTasks,          // Trier selon critère
} = useTasks();
```

#### Exemple d'utilisation

```typescript
// Ajouter une tâche
addTask(
  "Préparer la présentation",  // titre
  5,                            // urgence
  4,                            // importance
  3,                            // long terme
  "professionnel"               // catégorie
);

// Marquer comme terminée
completeTask("task-id-123");

// Trier par urgence
const sortedTasks = sortTasks(tasks, 'urgence');
```

---

### 3. TaskChat (`components/TaskChat.tsx`)

**Interface conversationnelle pour ajouter des tâches.**

#### Machine à états

```typescript
type ConversationStep = 
  | 'idle'                  // Attente du titre
  | 'awaiting_urgence'      // Attente note urgence
  | 'awaiting_importance'   // Attente note importance
  | 'awaiting_long_terme'   // Attente note long terme
  | 'awaiting_category';    // Attente catégorie
```

#### Flux de conversation

1. **Idle** : "Quelle tâche souhaitez-vous ajouter ?"
2. **Urgence** : "Quel est le niveau d'urgence (1-5) ?"
3. **Importance** : "Quelle est l'importance (1-5) ?"
4. **Long terme** : "Est-ce une tâche à long terme (1-5) ?"
5. **Catégorie** : "Choisissez une catégorie (1-5)"
6. **Confirmation** : "Tâche créée avec succès !"

#### Props

```typescript
interface TaskChatProps {
  onTaskCreated: (
    title: string,
    urgence: number,
    importance: number,
    longTerme: number,
    category: TaskCategory
  ) => void;
}
```

---

### 4. TaskLists (`components/TaskLists.tsx`)

**Affiche les tâches organisées par catégories avec tri.**

#### Configuration des catégories

```typescript
const categoryConfig = {
  plaisir: {
    label: 'Plaisir',
    icon: Heart,
    color: 'bg-pink-500'
  },
  professionnel: {
    label: 'Professionnel',
    icon: Briefcase,
    color: 'bg-blue-500'
  },
  // ... autres catégories
};
```

#### Fonctionnalités

- Affichage en grille responsive (1 colonne mobile, 2 desktop)
- Badges colorés pour chaque critère
- Checkboxes pour sélection
- Compteur de tâches par catégorie
- Tri dynamique (4 options)

#### Props

```typescript
interface TaskListsProps {
  tasks: Task[];
  sortTasks: (tasks: Task[], criteria: SortCriteria) => Task[];
  onSelectTask: (taskId: string, selected: boolean) => void;
  selectedTaskIds: string[];
}
```

---

### 5. WeeklyReview (`components/WeeklyReview.tsx`)

**Gestion de la revue hebdomadaire.**

#### Fonctionnalités

- Sélection du jour de revue (7 jours)
- Limitation à 4 tâches maximum
- Compteur visuel (X / 4)
- Validation avant confirmation
- Notifications toast

#### Validation

```typescript
if (selectedTaskIds.length === 0) {
  toast.error('Veuillez sélectionner au moins une tâche.');
  return;
}
if (selectedTaskIds.length > 4) {
  toast.error('Vous ne pouvez sélectionner que 4 tâches maximum !');
  return;
}
```

---

### 6. ActiveTasks (`components/ActiveTasks.tsx`)

**Affiche les tâches en cours avec actions.**

#### Actions disponibles

- **Terminé** : Marque la tâche comme complétée
  - Déplace vers "Tâches terminées"
  - Enregistre la date de complétion
  - Affiche une notification de succès

- **Reporter** : Remet la tâche en attente
  - Retourne dans la liste principale
  - Conserve toutes les données
  - Notification d'information

#### Props

```typescript
interface ActiveTasksProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onPostpone: (taskId: string) => void;
}
```

---

### 7. CompletedTasks (`components/CompletedTasks.tsx`)

**Liste des tâches terminées.**

#### Affichage

- Titre barré (text-decoration: line-through)
- Fond vert clair pour distinction visuelle
- Date de complétion formatée
- Bouton de suppression définitive
- Badge avec le poids de la tâche

---

## 💾 Gestion des données

### LocalStorage

L'application utilise 3 clés dans localStorage :

```typescript
const STORAGE_KEY = 'task-manager-tasks';           // Liste des tâches
const REVIEW_DAY_KEY = 'task-manager-review-day';   // Jour de revue (0-6)
const SELECTED_TASKS_KEY = 'task-manager-selected-tasks'; // Tâches sélectionnées
```

### Persistance automatique

```typescript
// Sauvegarde automatique à chaque modification
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, [tasks]);
```

### Chargement initial

```typescript
useEffect(() => {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  if (storedTasks) {
    const parsedTasks = JSON.parse(storedTasks);
    // Conversion des dates string → Date objects
    const tasksWithDates = parsedTasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
    }));
    setTasks(tasksWithDates);
  }
}, []);
```

### Limites du localStorage

- **Capacité** : ~5-10 MB selon le navigateur
- **Portée** : Données isolées par domaine
- **Synchronisation** : Aucune entre appareils
- **Sécurité** : Stockage en clair (non chiffré)

---

## 🎨 Système de design

### Palette de couleurs

L'application utilise le format **OKLCH** pour des couleurs perceptuellement uniformes.

#### Thème clair

```css
:root {
  /* Couleurs principales */
  --primary: oklch(0.55 0.22 270);           /* Violet vibrant */
  --primary-foreground: oklch(0.98 0.005 270); /* Blanc cassé */
  
  /* Couleur d'accent */
  --accent: oklch(0.65 0.20 40);             /* Orange */
  --accent-foreground: oklch(0.98 0.005 270);
  
  /* Couleurs de graphiques */
  --chart-1: oklch(0.60 0.20 270);           /* Violet */
  --chart-2: oklch(0.65 0.20 40);            /* Orange */
  --chart-3: oklch(0.60 0.18 200);           /* Bleu */
  --chart-4: oklch(0.65 0.18 140);           /* Vert */
  --chart-5: oklch(0.60 0.20 330);           /* Rose */
  
  /* Couleurs de fond */
  --background: oklch(1 0 0);                /* Blanc pur */
  --foreground: oklch(0.235 0.015 65);       /* Gris foncé */
  
  /* Couleurs UI */
  --card: oklch(1 0 0);
  --muted: oklch(0.967 0.001 286.375);
  --border: oklch(0.92 0.004 286.32);
  
  /* Rayon de bordure */
  --radius: 0.65rem;
}
```

### Typographie

```css
body {
  font-family: 'Inter', sans-serif;
  font-feature-settings: "rlig" 1, "calt" 1;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600; /* Semi-bold */
}
```

### Composants shadcn/ui

Tous les composants suivent les guidelines d'accessibilité :
- **ARIA labels** appropriés
- **Focus visible** pour la navigation clavier
- **Contraste** conforme WCAG 2.1 AA
- **Responsive** par défaut

---

## 🚀 Déploiement

### Option 1 : Manus (Recommandé)

1. Cliquer sur **"Publish"** dans l'interface Manus
2. L'application est déployée automatiquement
3. URL publique fournie : `https://votre-projet.manus.space`

### Option 2 : Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel
```

### Option 3 : Netlify

```bash
# 1. Builder le projet
pnpm build

# 2. Déployer le dossier dist/
netlify deploy --prod --dir=dist
```

### Variables d'environnement

Aucune variable d'environnement requise pour le fonctionnement de base.

---

## 🔧 Maintenance et évolution

### Ajout d'une nouvelle catégorie

1. Modifier le type dans `types/task.ts` :
```typescript
export type TaskCategory = 
  | 'plaisir'
  | 'professionnel'
  | 'personnel_admin'
  | 'couple'
  | 'personnel_dev'
  | 'nouvelle_categorie'; // Ajouter ici
```

2. Ajouter la configuration dans `TaskLists.tsx` :
```typescript
const categoryConfig = {
  // ... catégories existantes
  nouvelle_categorie: {
    label: 'Nouvelle Catégorie',
    icon: IconName,
    color: 'bg-color-500'
  }
};
```

3. Mettre à jour le chat dans `TaskChat.tsx` :
```typescript
const categoryMap = {
  // ... mappings existants
  '6': 'nouvelle_categorie',
};
```

### Migration vers une base de données

Pour synchroniser entre appareils, remplacer localStorage par :

**Option A : Firebase**
```typescript
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const addTask = async (task: Task) => {
  const db = getFirestore();
  await addDoc(collection(db, 'tasks'), task);
};
```

**Option B : Supabase**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);
const { data, error } = await supabase
  .from('tasks')
  .insert([task]);
```

### Tests

Pour ajouter des tests :

```bash
# Installer Vitest
pnpm add -D vitest @testing-library/react @testing-library/jest-dom

# Créer un test
// hooks/useTasks.test.ts
import { renderHook, act } from '@testing-library/react';
import { useTasks } from './useTasks';

test('should add a task', () => {
  const { result } = renderHook(() => useTasks());
  
  act(() => {
    result.current.addTask('Test', 5, 4, 3, 'professionnel');
  });
  
  expect(result.current.tasks).toHaveLength(1);
  expect(result.current.tasks[0].title).toBe('Test');
});
```

---

## 📚 Ressources

### Documentation officielle

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

### Communauté

- [GitHub Issues](https://github.com/votre-repo/issues)
- [Discord](https://discord.gg/votre-serveur)

---

## 📄 Licence

Ce projet est sous licence MIT.

---

**Dernière mise à jour** : 27 octobre 2025

