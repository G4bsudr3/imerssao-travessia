import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { EventProvider } from "@/contexts/EventContext";
import { buildEventModuleFromRow, getEvent, type EventRow } from "@/events/registry";
import type { EventModule } from "@/events/types";
import NotFound from "@/pages/NotFound";

/** Resolve o evento da URL (DB primeiro, fallback código-side) e provê via EventContext. */
export function EventRoute({ children }: { children: React.ReactNode }) {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const [state, setState] = useState<{ status: "loading" | "ok" | "notfound"; event?: EventModule }>(
    { status: "loading" },
  );

  useEffect(() => {
    let active = true;
    if (!eventSlug) {
      setState({ status: "notfound" });
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("events")
        .select("slug,name,description,theme,contacts,is_published")
        .eq("slug", eventSlug)
        .maybeSingle();
      if (!active) return;
      if (data) {
        setState({ status: "ok", event: buildEventModuleFromRow(data as unknown as EventRow) });
        return;
      }
      // fallback: evento só em código
      const fb = getEvent(eventSlug);
      setState(fb ? { status: "ok", event: fb } : { status: "notfound" });
    })();
    return () => {
      active = false;
    };
  }, [eventSlug]);

  if (state.status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <p className="eyebrow opacity-60">carregando…</p>
      </div>
    );
  }
  if (state.status === "notfound" || !state.event) return <NotFound />;
  return <EventProvider event={state.event}>{children}</EventProvider>;
}
