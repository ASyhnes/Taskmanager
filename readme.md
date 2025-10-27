# 🎯 Gestionnaire de Tâches Intelligent

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

**Une application web moderne de gestion de tâches avec interface conversationnelle**

[Démo en ligne](#) • [Documentation](./DOCUMENTATION_TECHNIQUE.md) • [Signaler un bug](../../issues)

![Screenshot](https://via.placeholder.com/800x450/6366f1/ffffff?text=Gestionnaire+de+Tâches)

</div>

---

## ✨ Fonctionnalités

### 🎯 Gestion intelligente des tâches

- 💬 **Interface conversationnelle** - Ajoutez vos tâches via un système de chat intuitif
- 📊 **Notation multi-critères** - Évaluez chaque tâche sur 3 axes (Urgence, Importance, Long terme)
- ⚖️ **Calcul automatique du poids** - Priorisation intelligente basée sur vos critères
- 🏷️ **5 catégories personnalisées** - Organisez par Plaisir, Professionnel, Personnel, Couple, Développement

### 📅 Planification hebdomadaire

- 🗓️ **Revue hebdomadaire** - Choisissez votre jour de revue préféré
- 🎯 **Sélection de 4 tâches** - Concentrez-vous sur l'essentiel chaque semaine
- 🔄 **Tri flexible** - Organisez par poids total, urgence, importance ou long terme
- 📈 **Statistiques en temps réel** - Suivez votre progression

### ✅ Suivi et complétion

- ⏳ **Tâches en cours** - Visualisez vos tâches de la semaine
- ✅ **Marquage terminé** - Célébrez vos accomplissements
- 🔄 **Report de tâches** - Reportez facilement ce qui n'est pas fait
- 📜 **Historique complet** - Consultez toutes vos tâches terminées

### 💾 Données et accessibilité

- 🔒 **Stockage local** - Vos données restent privées sur votre appareil
- 📱 **100% Responsive** - Fonctionne sur mobile, tablette et desktop
- 🎨 **Design moderne** - Interface colorée et agréable
- ♿ **Accessible** - Conforme aux standards WCAG 2.1

---

## 🛠️ Stack Technique

### Frontend Core

| Technologie | Version | Description |
|------------|---------|-------------|
| [React](https://react.dev/) | `19.0.0` | Bibliothèque UI avec hooks modernes et concurrent rendering |
| [TypeScript](https://www.typescriptlang.org/) | `5.x` | Typage statique pour un code robuste et maintenable |
| [Vite](https://vitejs.dev/) | `7.1.9` | Build tool ultra-rapide avec HMR instantané |

### Styling & UI

| Technologie | Version | Description |
|------------|---------|-------------|
| [Tailwind CSS](https://tailwindcss.com/) | `4.0.0` | Framework CSS utilitaire avec JIT compiler |
| [shadcn/ui](https://ui.shadcn.com/) | `latest` | Composants UI accessibles et personnalisables |
| [Lucide React](https://lucide.dev/) | `latest` | Bibliothèque d'icônes SVG modernes (1000+ icônes) |
| [Radix UI](https://www.radix-ui.com/) | `latest` | Primitives UI non stylées et accessibles |

### Routing & State

| Technologie | Version | Description |
|------------|---------|-------------|
| [Wouter](https://github.com/molefrog/wouter) | `3.7.1` | Routeur React minimaliste (2KB) |
| [React Hooks](https://react.dev/reference/react) | Built-in | Gestion d'état avec useState, useEffect, custom hooks |

### Notifications & UX

| Technologie | Version | Description |
|------------|---------|-------------|
| [Sonner](https://sonner.emilkowal.ski/) | `latest` | Toast notifications élégantes et performantes |

### Outils de développement

| Outil | Description |
|-------|-------------|
| [pnpm](https://pnpm.io/) | Gestionnaire de paquets rapide et efficace |
| [ESLint](https://eslint.org/) | Linter pour maintenir la qualité du code |
| [PostCSS](https://postcss.org/) | Transformation CSS avec autoprefixer |

### Persistance des données

- **localStorage** - Stockage navigateur pour la persistance locale
- Format JSON pour sérialisation/désérialisation
- Sauvegarde automatique à chaque modification

---

## 📦 Installation

### Prérequis

- **Node.js** ≥ 18.0.0
- **pnpm** ≥ 8.0.0 (recommandé) ou npm/yarn

### Étapes d'installation

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/task-manager.git
cd task-manager

# 2. Installer les dépendances
pnpm install

# 3. Lancer le serveur de développement
pnpm dev

# 4. Ouvrir dans le navigateur
# L'application sera disponible sur http://localhost:3000
```

### Scripts disponibles

```bash
pnpm dev          # Démarre le serveur de développement avec HMR
pnpm build        # Compile l'application pour la production
pnpm preview      # Prévisualise le build de production localement
pnpm lint         # Vérifie le code avec ESLint
```

---

## 🚀 Déploiement

### Déploiement rapide

#### Vercel (Recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/votre-username/task-manager)

```bash
# Via CLI
npm i -g vercel
vercel
```

#### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/votre-username/task-manager)

```bash
# Via CLI
pnpm build
netlify deploy --prod --dir=dist
```

#### Autres plateformes

- **GitHub Pages** - Hébergement gratuit pour sites statiques
- **Cloudflare Pages** - CDN mondial ultra-rapide
- **Render** - Déploiement automatique depuis Git

---

## 📁 Structure du projet

```
task-manager/
├── client/                          # Application frontend
│   ├── public/                      # Assets statiques
│   ├── src/
│   │   ├── components/              # Composants React
│   │   │   ├── ui/                 # Composants shadcn/ui
│   │   │   ├── TaskChat.tsx        # Interface de chat
│   │   │   ├── TaskLists.tsx       # Listes par catégories
│   │   │   ├── ActiveTasks.tsx     # Tâches en cours
│   │   │   ├── WeeklyReview.tsx    # Revue hebdomadaire
│   │   │   └── CompletedTasks.tsx  # Tâches terminées
│   │   ├── contexts/               # Contextes React (Theme)
│   │   ├── hooks/                  # Hooks personnalisés
│   │   │   └── useTasks.ts         # Logique métier principale
│   │   ├── lib/                    # Utilitaires
│   │   ├── pages/                  # Pages de l'application
│   │   │   ├── Home.tsx            # Page principale
│   │   │   └── NotFound.tsx        # Page 404
│   │   ├── types/                  # Définitions TypeScript
│   │   │   └── task.ts             # Types des tâches
│   │   ├── App.tsx                 # Composant racine avec routing
│   │   ├── main.tsx                # Point d'entrée React
│   │   └── index.css               # Styles globaux + thème
│   └── index.html                  # Template HTML
├── package.json                    # Dépendances et scripts
├── tsconfig.json                   # Configuration TypeScript
├── vite.config.ts                  # Configuration Vite
├── tailwind.config.ts              # Configuration Tailwind
├── components.json                 # Configuration shadcn/ui
├── README.md                       # Ce fichier
└── DOCUMENTATION_TECHNIQUE.md      # Documentation complète
```

---

## 🎨 Design System

### Palette de couleurs

L'application utilise le format **OKLCH** pour des couleurs perceptuellement uniformes :

- **Primaire** : Violet vibrant (`oklch(0.55 0.22 270)`)
- **Accent** : Orange énergique (`oklch(0.65 0.20 40)`)
- **Graphiques** : Palette de 5 couleurs harmonieuses

### Typographie

- **Police principale** : [Inter](https://fonts.google.com/specimen/Inter) - Police moderne et lisible
- **Poids** : 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Composants

Tous les composants UI sont basés sur **shadcn/ui** et **Radix UI**, garantissant :
- ✅ Accessibilité (ARIA, navigation clavier)
- ✅ Personnalisabilité complète
- ✅ Performance optimale
- ✅ Support du mode sombre (si activé)

---

## 💡 Utilisation

### 1️⃣ Ajouter une tâche

1. Cliquez sur l'onglet **"Ajouter"**
2. Tapez le titre de votre tâche dans le chat
3. Répondez aux questions :
   - **Urgence** (1-5) : À quel point c'est urgent ?
   - **Importance** (1-5) : À quel point c'est important ?
   - **Long terme** (1-5) : Est-ce un projet à long terme ?
   - **Catégorie** : Choisissez parmi 5 options
4. Votre tâche est créée avec un poids calculé automatiquement !

### 2️⃣ Planifier votre semaine

1. Cliquez sur l'onglet **"Revue"**
2. Choisissez votre jour de revue hebdomadaire
3. Parcourez vos tâches organisées par catégorie
4. Utilisez les boutons de tri pour réorganiser
5. Sélectionnez jusqu'à 4 tâches pour la semaine
6. Confirmez votre sélection

### 3️⃣ Suivre vos tâches

1. Cliquez sur l'onglet **"En cours"**
2. Visualisez vos 4 tâches de la semaine
3. Pour chaque tâche :
   - Cliquez sur **"Terminé"** si elle est accomplie ✅
   - Cliquez sur **"Reporter"** si vous devez la reporter 🔄

### 4️⃣ Consulter l'historique

1. Cliquez sur l'onglet **"Terminées"**
2. Consultez toutes vos tâches accomplies
3. Supprimez les anciennes tâches si nécessaire

---

## 🔧 Architecture

### Flux de données

```
┌─────────────────────────────────────┐
│         Composants UI               │
│  (TaskChat, TaskLists, etc.)        │
└─────────────────────────────────────┘
              ↓ ↑
┌─────────────────────────────────────┐
│    Hook personnalisé (useTasks)     │
│  - État React (useState)            │
│  - Logique métier                   │
│  - CRUD opérations                  │
└─────────────────────────────────────┘
              ↓ ↑
┌─────────────────────────────────────┐
│      localStorage (Browser)         │
│  - Persistance automatique          │
│  - 3 clés : tasks, reviewDay,       │
│    selectedTasks                    │
└─────────────────────────────────────┘
```

### Hook useTasks

Le cœur de l'application est le hook personnalisé `useTasks` qui expose :

```typescript
const {
  // État
  tasks,              // Toutes les tâches
  selectedTasks,      // Tâches de la semaine
  reviewDay,          // Jour de revue (0-6)
  
  // Actions
  addTask,            // Créer une tâche
  completeTask,       // Marquer comme terminée
  postponeTask,       // Reporter une tâche
  deleteTask,         // Supprimer une tâche
  selectTasksForWeek, // Sélectionner pour la semaine
  
  // Filtres & Tri
  getPendingTasks,    // Tâches en attente
  getCompletedTasks,  // Tâches terminées
  getTasksByCategory, // Filtrer par catégorie
  sortTasks,          // Trier selon critère
} = useTasks();
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

### 1. Fork & Clone

```bash
# Fork le projet sur GitHub, puis :
git clone https://github.com/votre-username/task-manager.git
cd task-manager
```

### 2. Créer une branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

### 3. Développer

```bash
# Installer les dépendances
pnpm install

# Lancer en mode dev
pnpm dev

# Faire vos modifications...
```

### 4. Commit & Push

```bash
git add .
git commit -m "feat: ajout de ma nouvelle fonctionnalité"
git push origin feature/ma-nouvelle-fonctionnalite
```

### 5. Pull Request

Ouvrez une Pull Request sur GitHub avec une description détaillée.

### Conventions de commit

Nous suivons [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, style
- `refactor:` Refactoring
- `test:` Ajout de tests
- `chore:` Tâches de maintenance

---

## 📖 Documentation

- **[Documentation technique complète](./DOCUMENTATION_TECHNIQUE.md)** - Guide détaillé de l'architecture
- **[Composants shadcn/ui](https://ui.shadcn.com/)** - Documentation des composants UI
- **[React 19 Docs](https://react.dev/)** - Documentation officielle React
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Documentation Tailwind

---

## 🐛 Signaler un bug

Si vous trouvez un bug, merci de :

1. Vérifier qu'il n'a pas déjà été signalé dans les [Issues](../../issues)
2. Ouvrir une nouvelle issue avec :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs observé
   - Captures d'écran si pertinent
   - Environnement (navigateur, OS, version)

---

## 💬 Support

- 📧 **Email** : support@example.com
- 💬 **Discord** : [Rejoindre le serveur](https://discord.gg/votre-serveur)
- 🐦 **Twitter** : [@votre_compte](https://twitter.com/votre_compte)

---

## 🗺️ Roadmap

### Version 1.1 (À venir)

- [ ] Mode sombre complet
- [ ] Export des tâches (JSON, CSV)
- [ ] Statistiques avancées
- [ ] Graphiques de progression

### Version 2.0 (Futur)

- [ ] Synchronisation cloud (Firebase/Supabase)
- [ ] Application mobile (React Native)
- [ ] Partage de tâches entre utilisateurs
- [ ] Rappels et notifications

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2025 Votre Nom

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Remerciements

- [React Team](https://react.dev/) pour React 19
- [shadcn](https://twitter.com/shadcn) pour shadcn/ui
- [Radix UI](https://www.radix-ui.com/) pour les primitives accessibles
- [Tailwind Labs](https://tailwindcss.com/) pour Tailwind CSS
- [Lucide](https://lucide.dev/) pour les icônes
- Tous les contributeurs du projet

---

## ⭐ Star History

Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile ! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=votre-username/task-manager&type=Date)](https://star-history.com/#votre-username/task-manager&Date)

---

<div align="center">

**Fait avec ❤️ par [Votre Nom](https://github.com/votre-username)**

[⬆ Retour en haut](#-gestionnaire-de-tâches-intelligent)

</div>

