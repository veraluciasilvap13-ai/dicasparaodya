import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/termini")({
  head: () => ({ meta: [
    { title: "Termini | Dicas Cotidianas" },
    { name: "description", content: "Termini di uso, identificazione del responsabile e condizioni essenziali dell'offerta." },
    { property: "og:title", content: "Termini | Dicas Cotidianas" },
    { property: "og:description", content: "Termini di uso, identificazione del responsabile e condizioni essenziali dell'offerta." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Terms,
});
function Terms() {
  return <main className="mx-auto min-h-screen max-w-2xl bg-background px-5 py-8 text-foreground">
    <Link to="/" className="underline">Torna alla pagina</Link>
    <h1 className="mt-6 text-2xl font-bold">Termini di uso</h1>
    <p className="mt-4">Aggiornamento: 8 novembre 2026.</p>
    <h2 className="mt-6 text-lg font-bold">Responsabile</h2>
    <p className="mt-2">Email: <a href="mailto:comprasuporte146@gmail.com" className="underline">comprasuporte146@gmail.com</a>.</p>
    <h2 className="mt-6 text-lg font-bold">Contenuto e offerta</h2>
    <p className="mt-2">La pagina presenta un contenuto digitale e un’offerta gestita tramite Hotmart. Il prezzo finale, le imposte, le modalità di pagamento, consegna, accesso, cancellazione e rimborso devono essere verificati nella pagina di pagamento prima dell’acquisto. Le promesse e la garanzia indicate nella pagina devono corrispondere alle condizioni realmente applicate dal venditore.</p>
    <h2 className="mt-6 text-lg font-bold">Uso del sito</h2>
    <p className="mt-2">Non usare il sito in modo illecito, non inserire dati sensibili negli URL e non interferire con il funzionamento della pagina. I contenuti sono protetti e non possono essere copiati o ridistribuiti senza autorizzazione.</p>
    <h2 className="mt-6 text-lg font-bold">Limitazioni</h2>
    <p className="mt-2">Il sito può contenere collegamenti a servizi esterni, come VTurb e Hotmart, che rispondono dei propri servizi e delle proprie informative. Per assistenza sull’acquisto, sul pagamento o sul rimborso usa l’email di supporto indicata sopra.</p>
  </main>;
}
