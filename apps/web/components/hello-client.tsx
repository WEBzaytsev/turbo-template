"use client";

import type { ReactNode } from "react";
import { useHello, useInvalidateHello } from "../lib/hooks";

export function HelloClient() {
  const { data, isLoading, error, isFetching } = useHello();
  const invalidate = useInvalidateHello();
  let content: ReactNode = data?.message;

  if (isLoading) {
    content = "Loading...";
  } else if (error) {
    content = <span style={{ color: "#e53935" }}>Error: {error.message}</span>;
  }

  return (
    <>
      <strong>Client API Response:</strong> {content}
      <button
        onClick={invalidate}
        disabled={isFetching}
        style={{
          marginLeft: 8,
          padding: "4px 12px",
          borderRadius: 4,
          border: "1px solid var(--gray-alpha-200, rgba(0,0,0,0.1))",
          background: "transparent",
          cursor: isFetching ? "wait" : "pointer",
          opacity: isFetching ? 0.6 : 1,
          fontSize: 12,
        }}
      >
        {isFetching ? "..." : "↻"}
      </button>
    </>
  );
}
