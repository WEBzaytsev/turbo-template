"use client";

import { useHello, useInvalidateHello } from "../lib/hooks";

export function HelloClient() {
  const { data, isLoading, error } = useHello();
  const invalidate = useInvalidateHello();

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return (
    <div>
      <strong>Client API Response:</strong> {data?.message}
      <button onClick={invalidate} style={{ marginLeft: 8 }}>
        Refresh
      </button>
    </div>
  );
}
