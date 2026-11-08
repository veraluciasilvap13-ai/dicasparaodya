import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { hasReachedOfferTime } from "@/lib/offer-timing";
import headAsset from "@/assets/head.png.asset.json";
import lashAsset from "@/assets/lash.png.asset.json";
import suAsset from "@/assets/su.png.asset.json";
import lgAsset from "@/assets/lg.png.asset.json";

import { trackInitiateCheckout } from "@/lib/meta-pixel";
const CHECKOUT_URL = "https://pay.hotmart.com/R107974728Q?checkoutMode=10";

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
        href: "https://scripts.converteai.net/8e3d38fc-92fe-4a74-9b67-e8c32032f004/players/6ae492b9217265d6b618f7ab/v4/player.js",
        as: "script",
      },
      {
        rel: "preload",
        href: "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js",
        as: "script",
      },
      {
        rel: "preload",
        href: "https://cdn.converteai.net/8e3d38fc-92fe-4a74-9b67-e8c32032f004/6ae491a13ce680b34e9e8919/main.m3u8",
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
    player.id = "vid-6ae492b9217265d6b618f7ab";
    player.style.display = "block";
    player.style.margin = "0 auto";
    player.style.width = "100%";
    player.style.maxWidth = "400px";

    const placeholder = document.createElement("div");
    placeholder.className = "vturb-player-placeholder";
    placeholder.style.position = "relative";
    placeholder.style.width = "100%";
    placeholder.style.padding = "127.48267898383372% 0 0";
    placeholder.style.zIndex = "0";
    placeholder.style.backgroundColor = "black";
    player.appendChild(placeholder);
    host.appendChild(player);

    const playerScript = document.createElement("script");
    playerScript.src =
      "https://scripts.converteai.net/8e3d38fc-92fe-4a74-9b67-e8c32032f004/players/6ae492b9217265d6b618f7ab/v4/player.js";
    playerScript.async = true;
    playerScript.dataset["vturbPlayer"] = "6ae492b9217265d6b618f7ab";
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

  return (
    <main className="min-h-screen bg-page-surround font-sans text-foreground">
      <div className="mx-auto min-h-screen w-full max-w-[414px] bg-background shadow-page">
        <header className="bg-primary shadow-header">
          <img
            src={lashAsset.url}
            alt="Novena a Maria che Scioglie i Nodi — La diretta di oggi termina tra poco"
            className="mx-auto block h-[45px] w-auto max-w-full object-contain"
          />
        </header>

        <section className="px-3 pt-[14px]">
          <h1 className="mx-auto max-w-[372px]">
            <img
              src={headAsset.url}
              alt="Ascolta Queste 9 Parole Prima di Dormire e Svegliati con il Nodo del Denaro Sciolto"
              className="mx-auto block w-full"
            />
          </h1>
          <img
            src={suAsset.url}
            alt="Clicca qui sotto, guarda fino alla fine e scopri l'ordine giusto in cui la Madonna che Scioglie i Nodi ti ascolta."
            className="mx-auto mt-2 block w-full max-w-[330px]"
          />

          <div className="mx-auto mt-4 w-full max-w-[365px] rounded-[7px] border border-video-frame bg-video-frame p-[16px] pb-0 shadow-video">
            <div ref={playerHostRef} className="min-h-[400px]" />
          </div>

          {showOffer && (
            <div className="mx-auto mt-8 max-w-[365px] text-center" data-delayed-offer>
              <a
                href={CHECKOUT_URL}
                onClick={trackInitiateCheckout}
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


          <footer className="mt-[26px] border-t border-divider pt-[20px] text-center">
            <img
              src={lgAsset.url}
              alt="Maria che Scioglie i Nodi — La Novena delle 9 Parole"
              className="mx-auto block w-full max-w-[365px]"
            />
            <div className="mx-auto max-w-[365px] px-2 pb-5 pt-4 text-[11px] leading-[1.45] text-muted-foreground">
              <p>Contenuto digitale con elementi vocali o visivi creati o modificati con strumenti di intelligenza artificiale.</p>
              <p className="mt-2">Responsabile: Amanda Carolina Da Silva Pinto, produttrice indipendente – persona fisica. Rua Maria do Rosário de Carvalho, 131, Bonfim, São João del-Rei, MG, 3630-738, Brasile. Supporto e privacy: <a href="mailto:comprasuporte146@gmail.com" className="underline">comprasuporte146@gmail.com</a>.</p>
              <p className="mt-2"><Link to="/privacy" className="underline">Privacy</Link> · <Link to="/termini" className="underline">Termini</Link></p>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
