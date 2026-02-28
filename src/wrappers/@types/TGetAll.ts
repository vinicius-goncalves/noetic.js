export type TGetAll<T> = T extends undefined
  ? Promise<unknown[]>
  & { limit: (limit: number) => Promise<unknown[]> } : Promise<T[]>