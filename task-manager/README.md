# 🎯 Gestionnaire de Tâches Intelligent

Application web moderne de gestion de tâches avec interface conversationnelle.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

---

## ✨ Fonctionnalités

- 💬 **Chat conversationnel** pour ajouter des tâches
- 📊 **Notation multi-critères** : Urgence, Importance, Long terme (1-5)
- 🏷️ **5 catégories** : Plaisir, Professionnel, Personnel, Couple, Développement
- ⚖️ **Calcul automatique** du poids (somme des notes)
- 📅 **Revue hebdomadaire** avec sélection de 4 tâches
- 🔄 **Tri flexible** par différents critères
- ✅ **Gestion complète** : En cours, Terminées, Reportées
- 💾 **Stockage local** persistant

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ 
- pnpm (ou npm/yarn)

### Installation

```bash
# 1. Extraire l'archive
unzip task-manager.zip
cd task-manager

# 2. Installer les dépendances
pnpm install

# 3. Lancer l'application
pnpm dev

# 4. Ouvrir dans le navigateur
# → http://localhost:3000
```

---

## 📦 Scripts disponibles

```bash
pnpm dev        # Serveur de développement
pnpm build      # Build de production
pnpm preview    # Prévisualiser le build
pnpm lint       # Vérifier le code
```

---

## 🛠️ Stack technique

| Technologie | Description |
|------------|-------------|
| **React 19** | Framework UI moderne |
| **TypeScript** | Typage statique |
| **Vite** | Build tool rapide |
| **Tailwind CSS** | Framework CSS |
| **shadcn/ui** | Composants UI |
| **Wouter** | Routeur léger |

---

## 📁 Structure

```
task-manager/
├── client/src/
│   ├── components/      # Composants React
│   ├── hooks/          # Hook useTasks (logique)
│   ├── types/          # Types TypeScript
│   ├── pages/          # Pages de l'app
│   └── index.css       # Styles globaux
├── package.json
└── vite.config.ts
```

---

## 🎨 Utilisation

### 1. Ajouter une tâche

1. Cliquez sur l'onglet **"Ajouter"**
2. Tapez le titre de votre tâche
3. Répondez aux 4 questions :
   - Urgence (1-5)
   - Importance (1-5)
   - Long terme (1-5)
   - Catégorie (1-5)
4. La tâche est automatiquement créée !

### 2. Revue hebdomadaire

1. Cliquez sur l'onglet **"Revue"**
2. Choisissez votre jour de revue
3. Sélectionnez jusqu'à 4 tâches
4. Confirmez la sélection

### 3. Gérer les tâches en cours

1. Cliquez sur l'onglet **"En cours"**
2. Pour chaque tâche :
   - **Terminé** : Marque comme complétée
   - **Reporter** : Remet en attente

---

## 🌐 Déploiement

### Option 1 : Manus (Recommandé)

Cliquez sur **"Publish"** dans l'interface Manus.

### Option 2 : Vercel

```bash
vercel
```

### Option 3 : Netlify

```bash
pnpm build
netlify deploy --prod --dir=dist
```

---

## 📖 Documentation complète

Consultez **DOCUMENTATION_TECHNIQUE.md** pour :
- Architecture détaillée
- API des composants
- Guide de maintenance
- Exemples de code

---

## 🤝 Support

Pour toute question ou problème :
- Consultez la documentation technique
- Ouvrez une issue sur GitHub

---

## 📄 Licence

MIT License - Libre d'utilisation et de modification

---

**Créé avec ❤️ par Manus AI**

