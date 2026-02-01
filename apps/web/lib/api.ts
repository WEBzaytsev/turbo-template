import { getHello, type IConnection } from "@repo/api-sdk";

export const connection: IConnection = {
  host: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
};

// Типобезопасные query keys из SDK метаданных
export const queryKeys = {
  hello: [getHello.METADATA.path] as const,
} as const;

// API функции для использования в хуках
export const api = {
  getHello: () => getHello(connection),
};
