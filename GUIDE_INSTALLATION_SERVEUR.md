# 🚀 Guide d'Installation Serveur - Pas à Pas

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Étape 1 : Préparer le projet sur GitHub](#étape-1--préparer-le-projet-sur-github)
3. [Étape 2 : Compiler l'application](#étape-2--compiler-lapplication)
4. [Étape 3 : Transférer sur votre serveur](#étape-3--transférer-sur-votre-serveur)
5. [Étape 4 : Configurer le serveur web](#étape-4--configurer-le-serveur-web)
6. [Étape 5 : Activer HTTPS](#étape-5--activer-https)
7. [Étape 6 : Tester l'installation](#étape-6--tester-linstallation)
8. [Dépannage](#dépannage)

---

## Prérequis

### Sur votre ordinateur local

- ✅ Node.js 18+ installé
- ✅ pnpm installé (`npm install -g pnpm`)
- ✅ Git installé
- ✅ Compte GitHub

### Sur votre serveur (david-chardon.fr)

- ✅ Accès SSH ou FTP
- ✅ Apache ou Nginx installé
- ✅ Certificat SSL (HTTPS) - **OBLIGATOIRE pour PWA**
- ✅ Droits d'écriture dans `/var/www/html/` (ou votre dossier web)

---

## Étape 1 : Préparer le projet sur GitHub

### 1.1 Créer un repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"New repository"** (bouton vert)
3. Remplissez les informations :
   - **Repository name** : `task-manager`
   - **Description** : `Gestionnaire de Tâches Intelligent - Progressive Web App`
   - **Visibilité** : Public ou Private (selon votre choix)
   - ⚠️ **NE PAS** cocher "Initialize with README" (on a déjà un README)
4. Cliquez sur **"Create repository"**

### 1.2 Pousser votre code sur GitHub

Ouvrez un terminal dans le dossier `task-manager` :

```bash
# Se placer dans le dossier du projet
cd /chemin/vers/task-manager

# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "feat: initial commit - PWA task manager"

# Ajouter le remote GitHub (remplacez VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/task-manager.git

# Pousser sur GitHub
git branch -M main
git push -u origin main
```

✅ **Votre code est maintenant sur GitHub !**

Vérifiez sur `https://github.com/VOTRE-USERNAME/task-manager`

---

## Étape 2 : Compiler l'application

### 2.1 Installer les dépendances

```bash
# Dans le dossier task-manager
cd task-manager

# Installer les dépendances
pnpm install
```

⏱️ Cela prend 1-2 minutes.

### 2.2 Compiler pour la production

```bash
# Compiler l'application
pnpm build
```

✅ Un dossier `dist/` est créé avec tous les fichiers compilés.

### 2.3 Vérifier le contenu du dossier dist/

```bash
# Lister les fichiers
ls -la dist/

# Vous devriez voir :
# - index.html
# - assets/ (CSS, JS compilés)
# - icons/ (icônes PWA)
# - manifest.json
# - sw.js (Service Worker)
```

---

## Étape 3 : Transférer sur votre serveur

Vous avez **3 options** pour transférer les fichiers :

### Option A : Via SCP (ligne de commande)

```bash
# Remplacez par vos informations
scp -r dist/* utilisateur@david-chardon.fr:/var/www/html/tasks/

# Exemple concret :
# scp -r dist/* david@david-chardon.fr:/var/www/html/tasks/
```

Entrez votre mot de passe SSH quand demandé.

### Option B : Via SFTP (FileZilla)

1. **Télécharger FileZilla** : [filezilla-project.org](https://filezilla-project.org/)
2. **Se connecter** :
   - Hôte : `sftp://david-chardon.fr`
   - Utilisateur : votre nom d'utilisateur SSH
   - Mot de passe : votre mot de passe SSH
   - Port : `22`
3. **Naviguer** vers `/var/www/html/` (côté serveur)
4. **Créer un dossier** `tasks/` (clic droit → Créer un dossier)
5. **Glisser-déposer** tout le contenu du dossier `dist/` dans `tasks/`

### Option C : Via FTP classique

Si vous avez un accès FTP (moins sécurisé) :

1. Utilisez FileZilla avec `ftp://` au lieu de `sftp://`
2. Port : `21`
3. Même procédure que l'option B

---

## Étape 4 : Configurer le serveur web

### Si vous utilisez Apache

#### 4.1 Créer un fichier `.htaccess`

Connectez-vous en SSH à votre serveur :

```bash
ssh utilisateur@david-chardon.fr
cd /var/www/html/tasks/
nano .htaccess
```

Copiez-collez ce contenu :

```apache
# Activer la réécriture d'URL
RewriteEngine On
RewriteBase /tasks/

# Rediriger toutes les requêtes vers index.html (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /tasks/index.html [L]

# Headers pour PWA
<IfModule mod_headers.c>
  # Service Worker
  <FilesMatch "sw\.js$">
    Header set Service-Worker-Allowed "/"
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </FilesMatch>
  
  # Manifest
  <FilesMatch "manifest\.json$">
    Header set Content-Type "application/manifest+json"
  </FilesMatch>
  
  # Cache des assets (images, CSS, JS)
  <FilesMatch "\.(jpg|jpeg|png|gif|svg|ico|webp|css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  
  # CORS pour les fonts
  <FilesMatch "\.(woff|woff2|ttf|eot)$">
    Header set Access-Control-Allow-Origin "*"
  </FilesMatch>
</IfModule>

# Compression GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

Sauvegardez : `Ctrl+O`, `Enter`, `Ctrl+X`

#### 4.2 Activer les modules Apache nécessaires

```bash
# Activer mod_rewrite et mod_headers
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod deflate

# Redémarrer Apache
sudo systemctl restart apache2
```

### Si vous utilisez Nginx

#### 4.1 Éditer la configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/david-chardon.fr
```

Ajoutez cette configuration :

```nginx
server {
    listen 443 ssl http2;
    server_name david-chardon.fr www.david-chardon.fr;
    
    # Certificat SSL (voir Étape 5)
    ssl_certificate /etc/letsencrypt/live/david-chardon.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/david-chardon.fr/privkey.pem;
    
    # Dossier de l'application
    root /var/www/html/tasks;
    index index.html;
    
    # Gestion SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Service Worker
    location /sw.js {
        add_header Service-Worker-Allowed "/";
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
    
    # Manifest
    location /manifest.json {
        add_header Content-Type "application/manifest+json";
    }
    
    # Cache des assets
    location ~* \.(jpg|jpeg|png|gif|svg|ico|webp)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    location ~* \.(css|js)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # CORS pour les fonts
    location ~* \.(woff|woff2|ttf|eot)$ {
        add_header Access-Control-Allow-Origin "*";
    }
    
    # Compression GZIP
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}

# Redirection HTTP → HTTPS
server {
    listen 80;
    server_name david-chardon.fr www.david-chardon.fr;
    return 301 https://$server_name$request_uri;
}
```

Sauvegardez et testez la configuration :

```bash
# Tester la configuration
sudo nginx -t

# Si OK, redémarrer Nginx
sudo systemctl restart nginx
```

---

## Étape 5 : Activer HTTPS

⚠️ **OBLIGATOIRE** : Les PWA nécessitent HTTPS pour fonctionner !

### 5.1 Vérifier si vous avez déjà un certificat SSL

```bash
# Vérifier
sudo ls -la /etc/letsencrypt/live/david-chardon.fr/
```

Si vous voyez des fichiers `.pem`, vous avez déjà un certificat → **Passez à l'Étape 6**.

### 5.2 Installer Certbot (Let's Encrypt)

```bash
# Installer Certbot
sudo apt-get update
sudo apt-get install certbot

# Pour Apache
sudo apt-get install python3-certbot-apache

# Pour Nginx
sudo apt-get install python3-certbot-nginx
```

### 5.3 Obtenir un certificat SSL gratuit

#### Pour Apache

```bash
sudo certbot --apache -d david-chardon.fr -d www.david-chardon.fr
```

#### Pour Nginx

```bash
sudo certbot --nginx -d david-chardon.fr -d www.david-chardon.fr
```

Suivez les instructions :
1. Entrez votre email
2. Acceptez les conditions (Y)
3. Choisissez de rediriger HTTP → HTTPS (option 2)

✅ Votre certificat est installé et se renouvellera automatiquement !

### 5.4 Tester le renouvellement automatique

```bash
# Tester le renouvellement (dry-run)
sudo certbot renew --dry-run
```

Si aucune erreur → tout est bon ! 🎉

---

## Étape 6 : Tester l'installation

### 6.1 Accéder à l'application

Ouvrez votre navigateur et allez sur :

```
https://david-chardon.fr/tasks/
```

Vous devriez voir l'application ! 🎉

### 6.2 Tester la PWA

#### Sur Desktop (Chrome/Edge)

1. Ouvrez `https://david-chardon.fr/tasks/`
2. Regardez dans la barre d'adresse : une icône **+** ou **⬇** devrait apparaître
3. Cliquez dessus → "Installer Gestionnaire de Tâches"
4. L'app s'installe et s'ouvre dans une fenêtre séparée

#### Sur Mobile (Android)

1. Ouvrez `https://david-chardon.fr/tasks/` dans Chrome
2. Une bannière "Installer l'application" devrait apparaître en bas
3. Cliquez sur "Installer"
4. L'icône apparaît sur votre écran d'accueil

#### Sur iOS (Safari)

1. Ouvrez `https://david-chardon.fr/tasks/` dans Safari
2. Appuyez sur le bouton **Partager** (carré avec flèche)
3. Faites défiler et sélectionnez **"Sur l'écran d'accueil"**
4. Appuyez sur "Ajouter"

### 6.3 Tester le fonctionnement hors ligne

1. Installez l'application (voir ci-dessus)
2. Ouvrez l'app
3. **Activez le mode Avion** sur votre téléphone
4. L'app devrait continuer à fonctionner ! ✅

### 6.4 Vérifier avec Lighthouse

1. Ouvrez `https://david-chardon.fr/tasks/` dans Chrome
2. Appuyez sur **F12** (DevTools)
3. Onglet **"Lighthouse"**
4. Sélectionnez **"Progressive Web App"**
5. Cliquez sur **"Analyze page load"**

**Score attendu** : 90-100/100 ✅

---

## Dépannage

### Problème : L'app ne s'affiche pas

**Solution 1 : Vérifier les permissions**

```bash
# Sur le serveur
sudo chown -R www-data:www-data /var/www/html/tasks/
sudo chmod -R 755 /var/www/html/tasks/
```

**Solution 2 : Vérifier les logs Apache**

```bash
sudo tail -f /var/log/apache2/error.log
```

**Solution 3 : Vérifier les logs Nginx**

```bash
sudo tail -f /var/log/nginx/error.log
```

### Problème : "Not Secure" ou pas de HTTPS

**Solution : Forcer HTTPS**

Vérifiez que votre `.htaccess` ou configuration Nginx redirige HTTP → HTTPS.

Pour Apache, ajoutez au début du `.htaccess` :

```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Problème : Le Service Worker ne s'enregistre pas

**Solution 1 : Vider le cache**

- Chrome : `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
- Ou : DevTools (F12) → Application → Clear storage → Clear site data

**Solution 2 : Vérifier la console**

- F12 → Console
- Recherchez des erreurs liées au Service Worker

**Solution 3 : Vérifier le chemin**

Le fichier `sw.js` doit être à la racine : `https://david-chardon.fr/tasks/sw.js`

### Problème : Les icônes ne s'affichent pas

**Solution : Vérifier les chemins dans manifest.json**

```bash
# Sur le serveur
nano /var/www/html/tasks/manifest.json
```

Les chemins doivent être relatifs : `/icons/icon-192x192.png`

### Problème : "Failed to fetch" hors ligne

**Solution : Vérifier le Service Worker**

1. F12 → Application → Service Workers
2. Vérifiez que le SW est "activated and is running"
3. Si erreur, cliquez sur "Unregister" puis rechargez la page

---

## 🎉 Félicitations !

Votre application est maintenant en ligne et installable comme une vraie app mobile !

### Prochaines étapes

1. ✅ **Partagez l'URL** avec votre conjointe et vos amis
2. ✅ **Testez l'installation** sur différents appareils
3. 💡 **Personnalisez** l'icône et les couleurs si souhaité
4. 📊 **Suivez les statistiques** d'utilisation (Google Analytics, etc.)
5. 🔄 **Mettez à jour** régulièrement (voir section suivante)

---

## 🔄 Mettre à jour l'application

Quand vous faites des modifications :

### 1. Modifier le code localement

```bash
# Faire vos modifications dans le code
# ...

# Commit sur GitHub
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push
```

### 2. Incrémenter la version du Service Worker

Éditez `client/public/sw.js` :

```javascript
const CACHE_NAME = 'task-manager-v2'; // v1 → v2
```

### 3. Recompiler

```bash
pnpm build
```

### 4. Transférer sur le serveur

```bash
scp -r dist/* utilisateur@david-chardon.fr:/var/www/html/tasks/
```

### 5. Les utilisateurs verront une notification

"Une nouvelle version est disponible. Voulez-vous mettre à jour ?"

---

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifiez les logs** du serveur (Apache/Nginx)
2. **Consultez la console** du navigateur (F12)
3. **Testez avec Lighthouse** pour diagnostiquer
4. **Ouvrez une issue** sur GitHub si le problème persiste

---

**Bon courage pour l'installation ! 🚀**

