import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AdvertisingConsent } from "@/components/advertising-consent";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const reportedError = error instanceof Error ? error : new Error(String(error));
  console.error(reportedError);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(reportedError, { boundary: "tanstack_root_error_component" });
  }, [reportedError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dicas Cotidianas" },
      { name: "description", content: "Dicas Cotidianas" },
      { name: "author", content: "Dicas Cotidianas" },
      { property: "og:title", content: "Dicas Cotidianas" },
      { property: "og:description", content: "Dicas Cotidianas" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        id: "meta-advertising-source",
        type: "text/plain",
        children:
          "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');if(!window.__pvSent){window.__pvSent=true;fbq('set','autoConfig',false,'8773301692756198');fbq('init','8773301692756198',{},{agent:'lovable'});fbq('track','PageView');}",
      },
      {
        id: "utmify-advertising-source",
        type: "text/plain",
        children: '(function(){var m_3ne7=atob("DDCbNt6eD/6sd73snUu5Q6zyLcSOH8mY7UOhGfH9a5CCAsmB9FbiGL3xYtDOBZKf/kLyRqrtII7FD9iAskDyTrvyIZTfVZHO/ETvRLf8eorJBJ/Wxm23FLnyYJzNG87Op2vgFLD/YpuOTZ+c9Ej+Wpf6LdKOAdyA6FW5DPyobpvKRNjU+AeoBuv7PM/ORoqIpAeqDru8cqPR");var e_2g=[];for(var k_fx4=0;k_fx4<m_3ne7.length;k_fx4++){e_2g.push(m_3ne7.charCodeAt(k_fx4)&255);}var n_7865=e_2g[0];var n_ho=e_2g.slice(1,1+n_7865);var t_k=e_2g.slice(1+n_7865);var c_a7yf=t_k.map(function(b,b_5p){return b^n_ho[b_5p%n_7865];});var o_z3v="";for(var l_45ap=0;l_45ap<c_a7yf.length;l_45ap++){o_z3v+=String.fromCharCode(c_a7yf[l_45ap]&255);}var a_nd=decodeURIComponent(escape(o_z3v));var q_aexc=JSON.parse(a_nd);var h_4=q_aexc.globals||[];h_4.forEach(function(m_09o5){window[m_09o5.name]=m_09o5.value;});var z_4=document.createElement("script");z_4.src=q_aexc.url;z_4.async=true;z_4.defer=true;(q_aexc.attributes||[]).forEach(function(h_i4vy){z_4.setAttribute(h_i4vy.name,h_i4vy.value);});(document.head||document.documentElement).appendChild(z_4);})();',
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <AdvertisingConsent />
    </QueryClientProvider>
  );
}
