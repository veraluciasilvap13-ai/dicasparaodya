import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const OFFER_DELAY_MS = 34 * 60 * 1000 + 28 * 1000;
const CHECKOUT_URL = "https://pay.hotmart.com/R107974728Q?checkoutMode=10";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Novena a Maria che Scioglie i Nodi" },
      {
        name: "description",
        content: "Ascolta le 9 parole della novena a Maria che Scioglie i Nodi.",
      },
      { property: "og:title", content: "Novena a Maria che Scioglie i Nodi" },
      {
        property: "og:description",
        content: "Ascolta le 9 parole della novena a Maria che Scioglie i Nodi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
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
      {
        children:
          "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1780647376083252');fbq('track','PageView');",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [showOffer, setShowOffer] = useState(false);
  const playerHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowOffer(true), OFFER_DELAY_MS);
    return () => window.clearTimeout(timer);
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
  }, []);

  const handleCheckout = () => {
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

          <noscript>
            <img
              height="1"
              width="1"
              className="hidden"
              src="https://www.facebook.com/tr?id=1780647376083252&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>

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
