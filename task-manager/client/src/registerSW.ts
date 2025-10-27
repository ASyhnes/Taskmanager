// Enregistrement du Service Worker pour la PWA

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker enregistré avec succès:', registration.scope);

          // Vérifier les mises à jour toutes les heures
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);

          // Écouter les mises à jour
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Nouvelle version disponible
                  console.log('🔄 Nouvelle version disponible');
                  
                  // Afficher une notification à l'utilisateur
                  if (confirm('Une nouvelle version est disponible. Voulez-vous mettre à jour ?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('❌ Erreur lors de l\'enregistrement du Service Worker:', error);
        });

      // Recharger la page quand un nouveau Service Worker prend le contrôle
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  } else {
    console.warn('⚠️ Service Worker non supporté par ce navigateur');
  }
}

// Fonction pour désinstaller le Service Worker (utile pour le développement)
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('Service Worker désinstallé');
      })
      .catch((error) => {
        console.error('Erreur lors de la désinstallation:', error);
      });
  }
}

// Fonction pour vérifier si l'app est installée
export function isAppInstalled(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
}

// Fonction pour afficher le prompt d'installation
let deferredPrompt: any = null;

export function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Empêcher le prompt automatique
    e.preventDefault();
    // Sauvegarder l'événement pour l'utiliser plus tard
    deferredPrompt = e;
    console.log('💾 Prompt d\'installation disponible');
    
    // Émettre un événement personnalisé pour informer l'app
    window.dispatchEvent(new CustomEvent('installable', { detail: true }));
  });

  window.addEventListener('appinstalled', () => {
    console.log('✅ Application installée avec succès');
    deferredPrompt = null;
  });
}

// Fonction pour déclencher le prompt d'installation
export async function promptInstall(): Promise<boolean> {
  if (!deferredPrompt) {
    console.warn('Prompt d\'installation non disponible');
    return false;
  }

  // Afficher le prompt
  deferredPrompt.prompt();

  // Attendre la réponse de l'utilisateur
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`Résultat de l'installation: ${outcome}`);

  // Réinitialiser le prompt
  deferredPrompt = null;

  return outcome === 'accepted';
}

