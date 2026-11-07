import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy | Dicas Cotidianas" },
    { name: "description", content: "Informazioni sulle preferenze pubblicitarie e sul trattamento dei dati." },
    { property: "og:title", content: "Privacy | Dicas Cotidianas" },
    { property: "og:description", content: "Informazioni sulle preferenze pubblicitarie e sul trattamento dei dati." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Privacy,
});
function Privacy() {
  return <main className="mx-auto min-h-screen max-w-2xl bg-background px-5 py-8 text-foreground">
    <Link to="/" className="underline">Torna alla pagina</Link>
    <h1 className="mt-6 text-2xl font-bold">Privacy e preferenze pubblicitarie</h1>
    <p className="mt-4">Aggiornamento: 7 novembre 2026.</p>
    <h2 className="mt-6 text-lg font-bold">Dati e destinatari</h2>
    <p className="mt-2">Meta e UTMify possono ricevere indirizzo IP, identificatori del browser e dei clic pubblicitari, URL visitati e interazioni, per misurare visite e avvii del checkout e ottimizzare la pubblicità. UTMify può inoltre raccogliere nome, email e telefono inseriti nei moduli. Il sito non contiene moduli di raccolta di questi dati. Non inserire dati sensibili negli URL.</p>
    <h2 className="mt-6 text-lg font-bold">Consenso e revoca</h2>
    <p className="mt-2">Nelle regioni che richiedono consenso, o quando la posizione non è verificabile, il tracciamento resta bloccato fino all’accettazione. Altrove la misurazione ordinaria Meta può essere attiva, salvo rifiuto o Global Privacy Control. UTMify si attiva soltanto dopo un’accettazione esplicita. Puoi accettare, rifiutare o revocare tramite Impostazioni cookie in fondo alla pagina. La revoca interrompe le nuove trasmissioni; non elimina i dati già ricevuti dai destinatari.</p>
    <h2 className="mt-6 text-lg font-bold">Registrazione delle scelte</h2>
    <p className="mt-2">Questo browser conserva un identificatore casuale, la data, la regione, la scelta e la versione del testo mostrato, mantenendo la precedente accettazione anche dopo la revoca. Le preferenze si applicano alle schede aperte dello stesso sito. Cancellare i dati del browser elimina questa registrazione locale.</p>
    <h2 className="mt-6 text-lg font-bold">Servizi esterni</h2>
    <p className="mt-2">Il video è fornito da VTurb e il checkout da Hotmart, secondo le loro informative. Per informazioni sui dati ricevuti consulta le informative di <a href="https://www.facebook.com/privacy/policy/" className="underline">Meta</a> e <a href="https://utmify.com.br" className="underline">UTMify</a>.</p>
  </main>;
}