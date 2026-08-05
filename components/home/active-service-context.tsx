"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ActiveServiceContextValue = {
  activeServiceId: string | null;
  setActiveServiceId: (id: string) => void;
  /** Set by CapabilityGrid while a visitor hovers a service card —
   * ServiceOrbit reads this to pause its own autoplay and bring that
   * service's node to the featured angle, so the orbit reads as a real
   * navigation surface for Services rather than a purely ambient loop.
   * `null` means "no override, keep auto-rotating." */
  forcedServiceId: string | null;
  setForcedServiceId: (id: string | null) => void;
};

/** No-op default (not `null`) — ClientWall is also reused standalone on
 * /work (via WorkCredibility.tsx), outside any ActiveServiceProvider.
 * There, `activeServiceId` should just stay permanently null (no
 * relevance highlight, since there's no orbit above it to drive one)
 * rather than the whole page crashing because the provider wasn't
 * mounted. */
const defaultValue: ActiveServiceContextValue = {
  activeServiceId: null,
  setActiveServiceId: () => {},
  forcedServiceId: null,
  setForcedServiceId: () => {},
};

const ActiveServiceContext = createContext<ActiveServiceContextValue>(defaultValue);

/**
 * Shared between ServiceOrbit (writes, on every settled index change) and
 * ClientWall (reads, to highlight the clients most relevant to whichever
 * service is currently featured) — the two are sibling sections on the
 * homepage, not parent/child, so this is the one piece of state that has
 * to travel through context rather than props. Scoped to wrapping just
 * those two sections in app/page.tsx, not the whole app — nothing else
 * needs it.
 */
export function ActiveServiceProvider({ children }: { children: ReactNode }) {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [forcedServiceId, setForcedServiceId] = useState<string | null>(null);
  return (
    <ActiveServiceContext.Provider
      value={{ activeServiceId, setActiveServiceId, forcedServiceId, setForcedServiceId }}
    >
      {children}
    </ActiveServiceContext.Provider>
  );
}

export function useActiveService() {
  return useContext(ActiveServiceContext);
}
