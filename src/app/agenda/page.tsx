import Link from "next/link";
import type { Metadata } from "next";
import { eventsService } from "@/lib/services";
import { EventCard, SectionHead } from "@/components/ui";
import { EVENT_KIND_LABEL, type CarnivalEvent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Agenda de eventos da LIBEERJ: desfiles, ensaios, lançamentos e atividades abertas em 2027.",
};

const groupByMonth = (events: CarnivalEvent[]) => {
  const map = new Map<string, CarnivalEvent[]>();
  for (const event of events) {
    const key = event.date.slice(0, 7);
    map.set(key, [...(map.get(key) ?? []), event]);
  }
  return [...map.entries()];
};

export default function AgendaPage() {
  const events = eventsService.all();
  const months = groupByMonth(events);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <nav className="breadcrumb" aria-label="Trilha">
            <Link href="/">Início</Link> / Agenda
          </nav>
          <h1>Agenda de eventos</h1>
          <p>
            {events.length} eventos programados em 2027 — entre desfiles de
            apuração, ensaios técnicos abertos e atividades da Liga.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container stack">
          {months.map(([monthKey, items]) => {
            const [year, month] = monthKey.split("-").map(Number);
            const monthLabel = new Date(year, month - 1, 1).toLocaleDateString(
              "pt-BR",
              { month: "long", year: "numeric" },
            );
            return (
              <div key={monthKey}>
                <SectionHead title={monthLabel} eyebrow="Mês" />
                <div className="card-grid">
                  {items.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            );
          })}

          <p className="muted">
            Legenda dos tipos:{" "}
            {Object.entries(EVENT_KIND_LABEL)
              .map(([, label]) => label)
              .join(" · ")}
            .
          </p>
        </div>
      </section>
    </>
  );
}