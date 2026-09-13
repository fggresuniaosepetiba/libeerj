import type { CarnivalEvent } from "@/lib/types";
import { EVENTS_DATA } from "@/lib/data/events";

// ISO date strings compare correctly for the date+time ordering we need.

const compareByDate = (a: CarnivalEvent, b: CarnivalEvent) =>
  a.date.localeCompare(b.date) || a.time.localeCompare(b.time);

export const eventsRepo = {
  all(): CarnivalEvent[] {
    return [...EVENTS_DATA].sort(compareByDate);
  },

  getById(id: string): CarnivalEvent | undefined {
    return EVENTS_DATA.find((e) => e.id === id);
  },

  upcoming(from = toDateISO(new Date())): CarnivalEvent[] {
    return EVENTS_DATA.filter((e) => e.date >= from).sort(compareByDate);
  },

  past(until = toDateISO(new Date())): CarnivalEvent[] {
    return EVENTS_DATA.filter((e) => e.date < until).sort(compareByDate);
  },

  byKind(kind: CarnivalEvent["kind"]): CarnivalEvent[] {
    return EVENTS_DATA.filter((e) => e.kind === kind).sort(compareByDate);
  },

  freePublic(): CarnivalEvent[] {
    return EVENTS_DATA.filter((e) => e.free).sort(compareByDate);
  },
};

const toDateISO = (date: Date) => date.toISOString().slice(0, 10);