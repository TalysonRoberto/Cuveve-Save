import { useCallback, useEffect, useRef, useState } from 'react';
import { elasticIn } from '../animations';

/** Hook de toast com auto-hide. */
export function useToast(timeoutMs = 2600) {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), timeoutMs);
    return () => clearTimeout(t);
  }, [toast, timeoutMs]);

  const showToast = useCallback((msg: string) => setToast(msg), []);

  return { toast, showToast };
}

export default function Toast({ msg }: { msg: string | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msg && ref.current) elasticIn(ref.current);
  }, [msg]);

  if (!msg) return null;
  return (
    <div className="toast" role="status" ref={ref}>
      {msg}
    </div>
  );
}
