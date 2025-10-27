import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { promptInstall, isAppInstalled } from '@/registerSW';

export function InstallPWA() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    setIsInstalled(isAppInstalled());

    // Écouter l'événement personnalisé 'installable'
    const handleInstallable = () => {
      if (!isAppInstalled()) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('installable', handleInstallable);

    return () => {
      window.removeEventListener('installable', handleInstallable);
    };
  }, []);

  const handleInstall = async () => {
    const accepted = await promptInstall();
    if (accepted) {
      setShowInstallPrompt(false);
      setIsInstalled(true);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Sauvegarder dans localStorage pour ne pas réafficher pendant 7 jours
    localStorage.setItem('install-prompt-dismissed', Date.now().toString());
  };

  // Ne rien afficher si déjà installé ou si le prompt a été fermé récemment
  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  const dismissedTime = localStorage.getItem('install-prompt-dismissed');
  if (dismissedTime) {
    const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
    if (daysSinceDismissed < 7) {
      return null;
    }
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-4 text-white">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex items-start gap-3 pr-6">
          <div className="bg-white/20 p-2 rounded-lg">
            <Download className="h-6 w-6" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">
              Installer l'application
            </h3>
            <p className="text-sm text-white/90 mb-3">
              Accédez rapidement à vos tâches depuis votre écran d'accueil !
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                variant="secondary"
                size="sm"
                className="bg-white text-primary hover:bg-white/90"
              >
                Installer
              </Button>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                Plus tard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

