import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy | Dicas Cotidianas" },
    { name: "description", content: "Informazioni su privacy, cookie, preferenze pubblicitarie e contatti del responsabile." },
    { property: "og:title", content: "Privacy | Dicas Cotidianas" },
    { property: "og:description", content: "Informazioni su privacy, cookie, preferenze pubblicitarie e contatti del responsabile." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Privacy,
});
function Privacy() {
  return <main className="mx-auto min-h-screen max-w-2xl bg-background px-5 py-8 text-foreground">
    <Link to="/" className="underline">Torna alla pagina</Link>
    <h1 className="mt-6 text-2xl font-bold">Privacy e preferenze pubblicitarie</h1>
    <p className="mt-4">Aggiornamento: 8 novembre 2026.</p>
    <h2 className="mt-6 text-lg font-bold">Responsabile e contatti</h2>
    <p className="mt-2">Responsabile: Amanda Carolina Da Silva Pinto, produttrice indipendente – persona fisica. Indirizzo: Rua Maria do Rosário de Carvalho, 131, bairro Bonfim, São João del-Rei, Minas Gerais, 3630-738, Brasile. Email per supporto e privacy: <a href="mailto:comprasuporte146@gmail.com" className="underline">comprasuporte146@gmail.com</a>.</p>
    <h2 className="mt-6 text-lg font-bold">Dati e destinatari</h2>
    <p className="mt-2">Meta Platforms Ireland Ltd. (Pixel di Meta) può ricevere indirizzo IP, identificatori del browser e cookie, URL visitati, visualizzazioni di pagina e clic sul pulsante di acquisto, per misurare e ottimizzare gli annunci su Facebook e Instagram, con possibile trasferimento verso gli Stati Uniti secondo le garanzie di Meta. UTMify può ricevere indirizzo IP, identificatori del browser e dei clic pubblicitari, URL visitati e interazioni, per misurare visite e avvii del checkout. UTMify può inoltre raccogliere nome, email e telefono inseriti nei moduli; questa pagina non contiene moduli di raccolta di questi dati. Il video è fornito da VTurb e il checkout da Hotmart, secondo le loro informative. Non inserire dati sensibili negli URL.</p>
    <h2 className="mt-6 text-lg font-bold">Base del trattamento e consenso</h2>
    <p className="mt-2">Gli script pubblicitari restano bloccati finché non clicchi su Accetta. Il rifiuto impedisce il loro caricamento e Global Privacy Control prevale su una precedente accettazione. Puoi accettare, rifiutare o revocare tramite Impostazioni cookie in fondo alla pagina; la revoca interrompe le nuove trasmissioni e non elimina i dati già ricevuti dai destinatari.</p>
    <h2 className="mt-6 text-lg font-bold">Registrazione delle scelte</h2>
    <p className="mt-2">Questo browser conserva un identificatore casuale, la data, la regione, la scelta e la versione del testo mostrato, mantenendo la precedente accettazione anche dopo la revoca. Le preferenze si applicano alle schede aperte dello stesso sito. Cancellare i dati del browser elimina questa registrazione locale.</p>
    <h2 className="mt-6 text-lg font-bold">Diritti</h2>
    <p className="mt-2">Puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione e portabilità dei dati scrivendo a <a href="mailto:comprasuporte146@gmail.com" className="underline">comprasuporte146@gmail.com</a>. Se ti trovi nell’Unione Europea, puoi anche rivolgerti all’autorità di controllo competente.</p>
    <h2 className="mt-6 text-lg font-bold">Servizi esterni</h2>
    <p className="mt-2">Per informazioni sui dati ricevuti consulta le informative di <a href="https://utmify.com.br" className="underline">UTMify</a>, VTurb e Hotmart.</p>
  </main>;
}
