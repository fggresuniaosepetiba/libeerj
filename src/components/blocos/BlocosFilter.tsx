"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function BlocosFilter({ neighborhoods }: { neighborhoods: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [draft, setDraft] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setDraft(searchParams.get("q") ?? "");
  }, [searchParams]);

  const update = useCallback(
    (patch: Record<string, string | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value === undefined || value === "" || value === "all") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      }
      next.delete("page");
      router.replace(`${pathname}?${next.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const debouncedSearch = useDebounced(draft, 450);

  useEffect(() => {
    const current = searchParams.get("q") ?? "";
    if (debouncedSearch !== current) {
      update({ q: debouncedSearch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div className="filter-bar">
      <div className="field" style={{ flex: "2 1 240px" }}>
        <label htmlFor="blocos-search">Buscar bloco</label>
        <input
          id="blocos-search"
          className="input"
          type="search"
          placeholder="Buscar por nome…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </div>

      <div className="field" style={{ flex: "0 1 180px" }}>
        <label htmlFor="blocos-neighborhood">Bairro</label>
        <select
          id="blocos-neighborhood"
          className="select"
          value={searchParams.get("neighborhood") ?? "all"}
          onChange={(e) => update({ neighborhood: e.target.value })}
        >
          <option value="all">Todos os bairros</option>
          {neighborhoods.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}