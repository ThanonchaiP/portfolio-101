import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const queryKeys = createQueryKeyStore({
  region: {
    all: null,
    detail: (id: string) => [id],
  },
});
