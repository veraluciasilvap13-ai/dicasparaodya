import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { sendRoutePing } from "@/lib/route-ping";

export function RouteAccessPing() {
  const location = useLocation();

  useEffect(() => {
    // Read the address inside the effect: window does not exist during SSR.
    sendRoutePing(window.location.href);
    // location.href is the dependency that actually changes on navigation;
    // this router's location object has no key property.
  }, [location.href]);

  return null;
}
