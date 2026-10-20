import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { hasReachedOfferTime } from "@/lib/offer-timing";

const CHECKOUT_URL = "https://pay.hotmart.com/R107974728Q?checkoutMode=10";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dicas Cotidianas" },
      { name: "description", content: "Dicas Cotidianas" },
      { property: "og:title", content: "Dicas Cotidianas" },
      { property: "og:description", content: "Dicas Cotidianas" },
      { property: "og:url", content: "https://dicascotidianas.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://dicascotidianas.lovable.app/" },
      {
        rel: "preload",
        href: "https://scripts.converteai.net/36beff1e-b251-48ad-bc1e-db52402befba/players/6acf765c942fcaa25b9befee/v4/player.js",
        as: "script",
      },
      {
        rel: "preload",
        href: "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js",
        as: "script",
      },
      {
        rel: "preload",
        href: "https://cdn.converteai.net/36beff1e-b251-48ad-bc1e-db52402befba/6acf74ffbabbf50015460d62/main.m3u8",
        as: "fetch",
        crossOrigin: "anonymous",
      },
      { rel: "dns-prefetch", href: "https://cdn.converteai.net" },
      { rel: "dns-prefetch", href: "https://scripts.converteai.net" },
      { rel: "dns-prefetch", href: "https://images.converteai.net" },
      { rel: "dns-prefetch", href: "https://license.vturb.com" },
    ],
    scripts: [
      {
        children:
          "!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [showOffer, setShowOffer] = useState(false);
  const playerHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let revealed = false;
    const checkPlaybackTime = () => {
      const player = playerHostRef.current?.querySelector<HTMLElement & { currentTime?: number }>(
        "vturb-smartplayer",
      );
      if (revealed || !hasReachedOfferTime(player?.currentTime ?? 0)) return;
      revealed = true;
      setShowOffer(true);
    };
    // Read the player's actual video clock, including restored playback and seeks.
    const timer = window.setInterval(checkPlaybackTime, 250);
    document.addEventListener("visibilitychange", checkPlaybackTime);
    checkPlaybackTime();
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", checkPlaybackTime);
    };
  }, []);

  useEffect(() => {
    const host = playerHostRef.current;
    if (!host || host.childElementCount > 0) return;

    const player = document.createElement("vturb-smartplayer");
    player.id = "vid-6acf765c942fcaa25b9befee";
    player.style.display = "block";
    player.style.margin = "0 auto";
    player.style.width = "100%";
    player.style.maxWidth = "400px";

    const placeholder = document.createElement("div");
    placeholder.className = "vturb-player-placeholder";
    placeholder.style.position = "relative";
    placeholder.style.width = "100%";
    placeholder.style.padding = "120.72072072072073% 0 0";
    placeholder.style.zIndex = "0";
    placeholder.style.backgroundColor = "black";
    player.appendChild(placeholder);
    host.appendChild(player);

    const playerScript = document.createElement("script");
    playerScript.src =
      "https://scripts.converteai.net/36beff1e-b251-48ad-bc1e-db52402befba/players/6acf765c942fcaa25b9befee/v4/player.js";
    playerScript.async = true;
    playerScript.dataset["vturbPlayer"] = "6acf765c942fcaa25b9befee";
    document.head.appendChild(playerScript);

    // Autoplay: start the video as soon as the player is ready, muted if the
    // browser blocks autoplay with sound.
    const tryAutoplay = window.setInterval(() => {
      const smartplayer = (
        window as unknown as {
          smartplayer?: { instances?: Array<{ play: () => void; mute?: (m: boolean) => void }> };
        }
      ).smartplayer;
      const instance = smartplayer?.instances?.[0];
      if (!instance) return;
      window.clearInterval(tryAutoplay);
      try {
        instance.play();
      } catch {
        try {
          instance.mute?.(true);
          instance.play();
        } catch {
          /* autoplay blocked by the browser */
        }
      }
    }, 500);
    window.setTimeout(() => window.clearInterval(tryAutoplay), 30000);
    return () => window.clearInterval(tryAutoplay);
  }, []);

  const checkoutTracked = useRef(false);
  const handleCheckout = () => {
    if (checkoutTracked.current) return;
    checkoutTracked.current = true;
    window.fbq?.("track", "InitiateCheckout");
  };

  return (
    <main className="min-h-screen bg-page-surround font-sans text-foreground">
      <div className="mx-auto min-h-screen w-full max-w-[414px] bg-background shadow-page">
        <header className="flex h-[45px] items-center justify-center gap-3 bg-primary px-5 text-primary-foreground shadow-header">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-header-mark text-[15px] leading-none text-header-mark">
            †
          </span>
          <div className="leading-tight">
            <p className="font-serif text-[11px] font-semibold">
              Novena a Maria che Scioglie i Nodi
            </p>
            <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-header-subtitle">
              <span className="mr-1 text-status">●</span>
              La diretta di oggi termina tra poco
            </p>
          </div>
        </header>

        <section className="px-3 pt-[14px]">
          <h1 className="mx-auto max-w-[372px] text-center font-serif text-[20px] leading-[1.28] text-title">
            Ascolta Queste <em className="font-normal text-gold">9 Parole</em> Prima di Dormire e
            Svegliati con il <em className="font-normal text-gold">Nodo del Denaro</em> Sciolto
          </h1>
          <p className="mx-auto mt-2 max-w-[330px] text-center text-[13px] leading-[1.5] text-muted-foreground">
            Clicca qui sotto, guarda fino alla fine e scopri l'ordine giusto in cui la Madonna che
            Scioglie i Nodi ti ascolta.
          </p>

          <div className="mx-auto mt-4 w-full max-w-[365px] rounded-[7px] border border-video-frame bg-video-frame p-[16px] pb-0 shadow-video">
            <div ref={playerHostRef} className="min-h-[400px]" />
          </div>

          {showOffer && (
            <div className="mx-auto mt-8 max-w-[365px] text-center" data-delayed-offer>
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="block rounded-[8px] bg-checkout px-5 py-7 text-[20px] font-bold uppercase leading-[1.22] text-checkout-foreground shadow-checkout"
              >
                Voglio contribuire e sciogliere i miei nodi ora!
              </a>
              <p className="mt-3 px-2 text-[15px] leading-[1.45] text-offer-copy">
                Prega per nove giorni. Se i nodi non iniziano a sciogliersi, il sacerdote ti
                restituirà per intero il tuo contributo e la novena resterà comunque tua.
              </p>
            </div>
          )}


          <footer className="mt-[26px] border-t border-divider pt-[20px] text-center text-gold">
            <span className="mx-auto flex size-[29px] items-center justify-center rounded-full border border-gold text-[21px] leading-none">†</span>
            <p className="mt-3 font-serif text-[12px] uppercase tracking-[0.2em]">Maria che Scioglie i Nodi</p>
            <p className="mt-2 text-[9px] tracking-[0.12em] text-footer-muted">La Novena delle 9 Parole</p>
          </footer>
        </section>
      </div>
    </main>
  );
}
