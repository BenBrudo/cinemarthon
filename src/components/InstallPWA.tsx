import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPWA: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Vérifier si déjà installé
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Détecter iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Sur iOS, vérifier si pas déjà en mode standalone
    if (isIOSDevice && !window.matchMedia('(display-mode: standalone)').matches) {
      // Vérifier si l'utilisateur a déjà vu les instructions (localStorage)
      const hasSeenInstructions = localStorage.getItem('pwa-ios-instructions-seen');
      if (!hasSeenInstructions) {
        setIsInstallable(true);
      }
      return;
    }

    // Capturer l'événement d'installation (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
      console.log('✅ PWA installable détectée');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Détecter si l'app a été installée
    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA installée avec succès');
      setIsInstalled(true);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    // iOS : afficher les instructions
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    // Android/Chrome : utiliser l'événement beforeinstallprompt
    if (!installPrompt) {
      console.warn('❌ Événement d\'installation non disponible');
      alert('Installation non disponible. Utilisez le menu du navigateur : ⋮ → "Installer Le Silverado"');
      return;
    }

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ Utilisateur a accepté l\'installation');
        setIsInstallable(false);
      } else {
        console.log('❌ Utilisateur a refusé l\'installation');
      }
      
      setInstallPrompt(null);
    } catch (error) {
      console.error('Erreur lors de l\'installation:', error);
    }
  };

  const handleCloseInstructions = () => {
    setShowIOSInstructions(false);
    localStorage.setItem('pwa-ios-instructions-seen', 'true');
    setIsInstallable(false);
  };

  // Ne rien afficher si déjà installé
  if (isInstalled) {
    return null;
  }

  // Afficher le bouton uniquement si installable
  if (!isInstallable) {
    return null;
  }

  return (
    <>
      {/* Bouton d'installation */}
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
        title="Installer l'application"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="hidden sm:inline">Installer l&apos;application</span>
        <span className="sm:hidden">Installer</span>
      </button>

      {/* Instructions iOS */}
      {showIOSInstructions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={handleCloseInstructions}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Fermer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-4 pr-8">
              📱 Installer sur iOS
            </h3>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <p>
                  Appuyez sur le bouton <strong>&quot;Partager&quot;</strong> 
                  <svg className="inline w-5 h-5 mx-1 align-middle" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 5l-1.42 1.42-1.59-1.59V16h-2V4.83L9.41 6.41 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z"/>
                  </svg>
                  (en bas de votre navigateur)
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <p>
                  Faites défiler et sélectionnez<br />
                  <strong>&quot;Sur l&apos;écran d&apos;accueil&quot;</strong>
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <p>
                  Appuyez sur <strong>&quot;Ajouter&quot;</strong>
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleCloseInstructions}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                J&apos;ai compris
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallPWA;
