import { createFileRoute } from "@tanstack/react-router";

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
  }),
  component: Index,
});

function Index() {
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
            <div className="flex aspect-[332/414] w-full flex-col items-start justify-center bg-video px-[17px] text-video-foreground">
              <p className="text-[16px] font-bold">Hai già iniziato a guardare questo video</p>
              <div className="mt-[18px] ml-[54px] space-y-[12px]">
                <button type="button" className="flex items-center gap-[11px] text-left text-[13px] font-bold">
                  <span className="flex size-[29px] items-center justify-center rounded-full border-2 border-video-foreground text-[14px]">▶</span>
                  Continuare da dove eri rimasto?
                </button>
                <button type="button" className="flex items-center gap-[11px] text-left text-[13px] font-bold">
                  <span className="flex size-[29px] items-center justify-center rounded-full border-2 border-video-foreground text-[19px]">↶</span>
                  Guardare dall'inizio?
                </button>
              </div>
            </div>
          </div>

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
