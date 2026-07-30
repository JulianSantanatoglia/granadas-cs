import { useCallback, useEffect, useState } from "react";

function readIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useLocalStorageSet(key: string) {
  const [ids, setIds] = useState<string[]>(() => readIds(key));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(ids));
  }, [ids, key]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  return { ids, has, toggle };
}
