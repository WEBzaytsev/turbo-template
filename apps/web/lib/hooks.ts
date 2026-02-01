"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, queryKeys } from "./api";

// Типобезопасный хук для getHello
export function useHello() {
  return useQuery({
    queryKey: queryKeys.hello,
    queryFn: api.getHello,
  });
}

// Хук для инвалидации кеша (без хардкода путей!)
export function useInvalidateHello() {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: queryKeys.hello });
}
