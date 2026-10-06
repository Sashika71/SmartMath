import { useEffect, useState } from 'react';

export default function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
    setIsInstalled(standalone);

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (isInstalled) {
    return null;
  }

  const handleInstall = async () => {
    if (!installPrompt) {
      window.alert('To install SmartMath, open your browser menu and choose "Install SmartMath" or "Add to Home screen".');
      return;
    }

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return (
    <button
      type="button"
      onClick={handleInstall}
      className="shrink-0 bg-[#003152] hover:bg-[#003152]/90 text-white text-[11px] sm:text-sm font-bold px-2.5 sm:px-4 py-2 rounded-full transition-all whitespace-nowrap shadow-sm"
      aria-label="Install SmartMath app"
    >
      <span className="sm:hidden">Install</span>
      <span className="hidden sm:inline">Install app</span>
    </button>
  );
}
