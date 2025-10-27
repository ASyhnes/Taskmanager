# 🎯 Gestionnaire de Tâches Intelligent

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)
![License](https://img.shields.io/badge/license-MIT-green)

**Une Progressive Web App moderne pour gérer vos tâches avec intelligence**

[Démo en ligne](#) • [Documentation](/DOCUMENTATION_TECHNIQUE.md) • [Guide PWA](/GUIDE_DEPLOIEMENT_PWA.md) •

</div>

---

## ✨ Fonctionnalités

### 🎯 Gestion intelligente des tâches

- 💬 **Interface conversationnelle** - Ajoutez vos tâches via un système de chat intuitif
- 📊 **Notation multi-critères** - Évaluez chaque tâche sur 3 axes (Urgence, Importance, Long terme)
- ⚖️ **Calcul automatique du poids** - Priorisation intelligente basée sur vos critères (somme des 3 notes)
- 🏷️ **5 catégories personnalisées** - Organisez par Plaisir, Professionnel, Personnel (Admin), Couple, Développement Personnel

### 📅 Planification hebdomadaire

- 🗓️ **Revue hebdomadaire** - Choisissez votre jour de revue préféré (Lundi, Mardi, etc.)
- 🎯 **Sélection de 4 tâches** - Concentrez-vous sur l'essentiel chaque semaine
- 🔄 **Tri flexible** - Organisez par poids total, urgence, importance ou long terme
- 📈 **Statistiques en temps réel** - Suivez votre progression (en attente, en cours, terminées)

### 📱 Progressive Web App (PWA)

- 📲 **Installable** - Installez l'app sur votre écran d'accueil (iOS, Android, Desktop)
- 🔌 **Fonctionne hors ligne** - Utilisez l'app sans connexion internet
- 🚀 **Rapide et fluide** - Service Worker pour performances optimales
- 🎨 **Icône personnalisée** - Design moderne avec gradient violet-orange
- 🔔 **Prompt d'installation** - Bannière élégante pour installer l'app

---

## 🛠️ Stack Technique

### Frontend Core

| Technologie | Version | Description |
|------------|---------|-------------|
| [React](https://react.dev/) | `19.0.0` | Bibliothèque UI avec hooks modernes |
| [TypeScript](https://www.typescriptlang.org/) | `5.x` | Typage statique pour un code robuste |
| [Vite](https://vitejs.dev/) | `7.1.9` | Build tool ultra-rapide avec HMR |

### Styling & UI

| Technologie | Version | Description |
|------------|---------|-------------|
| [Tailwind CSS](https://tailwindcss.com/) | `4.0.0` | Framework CSS utilitaire avec JIT |
| [shadcn/ui](https://ui.shadcn.com/) | `latest` | Composants UI accessibles basés sur Radix UI |
| [Lucide React](https://lucide.dev/) | `latest` | Bibliothèque d'icônes SVG (1000+ icônes) |

### PWA & Routing

| Technologie | Version | Description |
|------------|---------|-------------|
| [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) | Native | Cache et fonctionnement hors ligne |
| [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) | Native | Configuration PWA (icônes, couleurs) |
| [Wouter](https://github.com/molefrog/wouter) | `3.7.1` | Routeur React minimaliste (2KB) |

---

## 📦 Installation

### Prérequis

- **Node.js** ≥ 18.0.0
- **pnpm** ≥ 8.0.0 (recommandé) ou npm/yarn

### Installation locale

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/task-manager.git
cd task-manager

# 2. Installer les dépendances
pnpm install

# 3. Lancer le serveur de développement
pnpm dev

# 4. Ouvrir dans le navigateur
# → http://localhost:3000
```

### Scripts disponibles

```bash
pnpm dev          # Serveur de développement avec HMR
pnpm build        # Compile pour la production (dossier dist/)
pnpm preview      # Prévisualise le build de production
pnpm lint         # Vérifie le code avec ESLint
```

---

## 🚀 Déploiement

### Plateformes cloud (Gratuit)

#### Vercel (Recommandé)

```bash
npm i -g vercel
vercel
```

#### Netlify

```bash
pnpm build
netlify deploy --prod --dir=dist
```

### Votre propre serveur

Consultez le **[Guide d'installation serveur](./GUIDE_INSTALLATION_SERVEUR.md)** pour des instructions détaillées pas à pas.

**Résumé rapide :**

```bash
# 1. Compiler
pnpm build

# 2. Transférer sur le serveur
scp -r dist/* user@serveur.com:/var/www/html/tasks/

# 3. Configurer Apache/Nginx (voir guide)
# 4. Vérifier HTTPS (obligatoire pour PWA)
```

---

## 📁 Structure du projet

```
task-manager/
├── client/
│   ├── public/
│   │   ├── icons/              # Icônes PWA (8 tailles)
│   │   ├── manifest.json       # Configuration PWA
│   │   └── sw.js               # Service Worker
│   ├── src/
│   │   ├── components/         # Composants React
│   │   │   ├── ui/            # shadcn/ui (40+ composants)
│   │   │   ├── TaskChat.tsx   # Chat conversationnel
│   │   │   ├── TaskLists.tsx  # Listes par catégories
│   │   │   ├── ActiveTasks.tsx # Tâches en cours
│   │   │   ├── WeeklyReview.tsx # Revue hebdomadaire
│   │   │   ├── CompletedTasks.tsx # Historique
│   │   │   └── InstallPWA.tsx # Bannière d'installation
│   │   ├── hooks/
│   │   │   └── useTasks.ts    # Logique métier (CRUD)
│   │   ├── types/
│   │   │   └── task.ts        # Types TypeScript
│   │   ├── pages/
│   │   │   └── Home.tsx       # Page principale
│   │   ├── registerSW.ts      # Fonctions Service Worker
│   │   └── index.css          # Thème OKLCH
│   └── index.html             # Meta tags PWA
├── README.md                  # Ce fichier
├── DOCUMENTATION_TECHNIQUE.md # Doc complète
├── GUIDE_DEPLOIEMENT_PWA.md   # Guide PWA
└── GUIDE_INSTALLATION_SERVEUR.md # Guide serveur
```

---

## 💡 Utilisation

### 1️⃣ Ajouter une tâche

1. Onglet **"Ajouter"** → Tapez le titre
2. Répondez aux 4 questions (Urgence, Importance, Long terme, Catégorie)
3. La tâche est créée avec son **poids calculé automatiquement** !

### 2️⃣ Planifier votre semaine

1. Onglet **"Revue"** → Choisissez votre jour de revue
2. Triez vos tâches (Poids, Urgence, Importance, Long terme)
3. Sélectionnez **jusqu'à 4 tâches** → Confirmez

### 3️⃣ Suivre vos tâches

1. Onglet **"En cours"** → Visualisez vos 4 tâches
2. **"Terminé"** ✅ ou **"Reporter"** 🔄

### 4️⃣ Installer l'app (PWA)

**Mobile :** Bannière automatique → "Installer"  
**Desktop :** Icône + dans la barre d'adresse

---

## 🎨 Design System

### Palette de couleurs (OKLCH)

```css
--primary: oklch(0.55 0.22 270);      /* Violet vibrant */
--accent: oklch(0.65 0.20 40);        /* Orange énergique */
```

### Typographie

- **Police** : [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- **Poids** : 300, 400, 500, 600, 700

---

## 🤝 Contribution

```bash
# 1. Fork & Clone
git clone https://github.com/votre-username/task-manager.git

# 2. Créer une branche
git checkout -b feature/ma-fonctionnalite

# 3. Développer
pnpm install
pnpm dev

# 4. Commit & Push
git commit -m "feat: ma nouvelle fonctionnalité"
git push origin feature/ma-fonctionnalite

# 5. Pull Request sur GitHub
```

### Conventions de commit

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance

---

## 📖 Documentation

- **[Documentation technique](./DOCUMENTATION_TECHNIQUE.md)** - Architecture, API, maintenance
- **[Guide PWA](./GUIDE_DEPLOIEMENT_PWA.md)** - Configuration PWA, Service Worker
- **[Guide serveur](./GUIDE_INSTALLATION_SERVEUR.md)** - Installation pas à pas
- **[shadcn/ui](https://ui.shadcn.com/)** - Composants UI
- **[React 19](https://react.dev/)** - Documentation React

---

## 🗺️ Roadmap

### Version 1.1
- [ ] Mode sombre complet
- [ ] Export/Import (JSON, CSV, PDF)
- [ ] Statistiques avancées
- [ ] Notifications push

### Version 2.0
- [ ] Authentification (email/Google)
- [ ] Base de données cloud
- [ ] Synchronisation multi-appareils
- [ ] Mode collaboratif


---

## 🙏 Remerciements

- [React Team](https://react.dev/) pour React 19
- [shadcn](https://twitter.com/shadcn) pour shadcn/ui
- [Radix UI](https://www.radix-ui.com/) pour les primitives accessibles
- [Tailwind Labs](https://tailwindcss.com/) pour Tailwind CSS
- [Lucide](https://lucide.dev/) pour les icônes

---

<div align="center">

**Fait avec ❤️ par [Votre Nom](https://github.com/votre-username)**

[⬆ Retour en haut](#-gestionnaire-de-tâches-intelligent)

</div>

