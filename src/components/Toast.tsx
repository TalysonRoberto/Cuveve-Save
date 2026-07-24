import { useCallback, useEffect, useState } from 'react';

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
  if (!msg) return null;
  return (
    <div className="toast" role="status">
      {msg}
    </div>
  );
}
