import React, { useEffect, useState } from 'react';
import { Download, Smartphone, Check, Copy, X, QrCode } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode on Android
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone;
    if (isStandalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
      setIsModalOpen(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleButtonClick = async () => {
    // If prompt is ready, trigger it directly
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setDeferredPrompt(null);
        }
      } catch {
        setIsModalOpen(true);
      }
    } else {
      // If prompt is not immediately available, show modal guide
      setIsModalOpen(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl">
        <Check className="w-3.5 h-3.5" />
        <span>Aplikasi Terpasang (Android)</span>
      </div>
    );
  }

  // QR Code generator URL using public image API for scanning on Android
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    currentUrl
  )}&margin=4`;

  return (
    <>
      {/* Prominent Android Download / Install Button */}
      <button
        onClick={handleButtonClick}
        title="Download / Pasang sebagai Aplikasi Android"
        className="group relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
      >
        <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center text-white">
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
        <div className="text-left flex flex-col">
          <span className="leading-tight">Download Aplikasi Android</span>
          <span className="text-[9px] font-normal text-emerald-100 leading-tight">Khusus Android Chrome</span>
        </div>
      </button>

      {/* Android Installation Modal Guide */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative px-6 py-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30 shadow-inner">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-200">
                    Aplikasi Khusus Android
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight">
                    Ponpes Salamatul Insan
                  </h3>
                  <p className="text-xs text-emerald-100/90">Instalasi Aplikasi Mandiri (Standalone)</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* If direct browser prompt is available */}
              {deferredPrompt ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="text-xs font-semibold text-emerald-900">
                    Browser Chrome Anda mendukung instalasi langsung 1-klik!
                  </div>
                  <button
                    onClick={async () => {
                      if (deferredPrompt) {
                        await deferredPrompt.prompt();
                        setDeferredPrompt(null);
                        setIsModalOpen(false);
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Pasang Sekarang di Android</span>
                  </button>
                </div>
              ) : null}

              {/* Scan with Android QR Code */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0">
                  <img
                    src={qrCodeUrl}
                    alt="Scan untuk pasang di Android"
                    className="w-28 h-28 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-800">
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <span>Scan dari HP Android Anda</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Buka kamera atau Google Lens di HP Android Anda, scan kode di samping untuk langsung membuka dan memasang aplikasi ini.
                  </p>
                  <button
                    onClick={handleCopyLink}
                    className="mt-2.5 flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs mx-auto sm:mx-0"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Tautan Disalin!' : 'Salin Tautan'}</span>
                  </button>
                </div>
              </div>

              {/* Cara Pasang di Android Chrome */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Langkah Pemasangan di Android (Chrome):
                </h4>
                <ol className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      1
                    </span>
                    <span>Buka tautan ini di browser <strong>Google Chrome</strong> pada HP Android Anda.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      2
                    </span>
                    <span>Ketuk ikon menu titik tiga (<strong>⋮</strong>) di sudut kanan atas Chrome.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      3
                    </span>
                    <span>Pilih <strong>"Instal aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      4
                    </span>
                    <span>Aplikasi <strong>Ponpes Salamatul Insan</strong> akan langsung terpasang di laci aplikasi HP Android Anda layaknya aplikasi native.</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Khusus Sistem Operasi Android</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
