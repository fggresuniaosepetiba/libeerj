import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type {
  BlockCategory,
  CarnivalBlock,
  CarnivalEvent,
  NewsItem,
} from "@/lib/types";
import { CATEGORY_SHORT } from "@/lib/types";

/* ---------- Badge ---------- */
export function Badge({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "navy" | "enredo" | "embalo" | "muted";
}) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}

export function CategoryBadge({ category }: { category: BlockCategory }) {
  const tone = category === "enredo" ? "enredo" : "embalo";
  return <Badge tone={tone}>{CATEGORY_SHORT[category]}</Badge>;
}

/* ---------- Section header ---------- */
export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <span className="section-head__eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {lede && <p>{lede}</p>}
      </div>
      {action && (
        <Link className="link-arrow" href={action.href}>
          {action.label} →<span className="sr-only">{title}</span>
        </Link>
      )}
    </div>
  );
}

/* ---------- Button link ---------- */
export function ButtonLink({
  href,
  variant = "gold",
  children,
}: {
  href: string;
  variant?: "gold" | "ghost" | "navy" | "line";
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`btn btn--${variant}`}>
      {children}
    </Link>
  );
}

/* ---------- Stat ---------- */
export function Stat({
  value,
  label,
  emphasis,
}: {
  value: string;
  label: string;
  emphasis?: string;
}) {
  return (
    <div className="stat">
      <div className="stat__value">
        {value} {emphasis && <em>{emphasis}</em>}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

/* ---------- Block card ---------- */
function formatFounded(block: CarnivalBlock): string {
  if (block.foundedDate) {
    const date = new Date(`${block.foundedDate}T12:00:00`);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  }
  return String(block.foundedYear);
}

export function BlockCard({ block }: { block: CarnivalBlock }) {
  return (
    <Link className="card card--link block-card" href={`/blocos/${block.slug}`}>
      <span className="block-card__logo">
        <Image src={block.logo} alt={`Logomarca do bloco ${block.name}`} width={64} height={64} />
      </span>
      <h3>{block.name}</h3>
      <CategoryBadge category={block.category} />
      <dl className="block-card__meta">
        <div className="block-card__item">
          <dt>Local</dt>
          <dd>📍 {block.neighborhood}</dd>
        </div>
        <div className="block-card__item">
          <dt>Fundação</dt>
          <dd>{formatFounded(block)}</dd>
        </div>
        {block.enredo && (
          <div className="block-card__item">
            <dt>{block.category === "embalo" ? "Tema" : "Enredo"}</dt>
            <dd className="block-card__enredo">{block.enredo}</dd>
          </div>
        )}
      </dl>
    </Link>
  );
}

/* ---------- Event card ---------- */
export function EventCard({ event }: { event: CarnivalEvent }) {
  const date = new Date(`${event.date}T12:00:00`);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "");

  return (
    <article className="card">
      <div className="card__body event-card">
        <div className="event-date" aria-hidden>
          <span className="event-date__day">{day}</span>
          <span className="event-date__mon">{month}</span>
        </div>
        <div>
          <h3>{event.title}</h3>
          <dl className="event-meta">
            <dt>Onde </dt>
            <dd>{event.location}</dd>
            {event.neighborhood && <dd>{event.neighborhood}</dd>}
            <dt> · Horário </dt>
            <dd>
              {event.time}
              {event.timeEnd ? `–${event.timeEnd}` : ""}
            </dd>
            {event.free && <dd> · <strong>Grátis</strong></dd>}
          </dl>
          <p className="muted">{event.description}</p>
        </div>
      </div>
    </article>
  );
}

/* ---------- News card ---------- */
export function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <Link className="card card--link news-card" href={`/noticias/${item.slug}`}>
      <div className="card__media">
        <Image
          src={item.image}
          alt={item.imageAlt ?? item.title}
          fill
          sizes={featured ? "(max-width: 1000px) 100vw, 40vw" : "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"}
        />
      </div>
      <div className="card__body">
        <div className="news-meta">
          <Badge tone="navy">{item.category}</Badge>
          <time dateTime={item.date}>
            {new Date(`${item.date}T12:00:00`).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>
        <h3>{item.title}</h3>
        <p className="muted">{item.excerpt}</p>
      </div>
    </Link>
  );
}

/* ---------- Empty state ---------- */
export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="empty">{children}</div>;
}