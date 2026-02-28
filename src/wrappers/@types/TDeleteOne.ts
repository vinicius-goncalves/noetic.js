export type TDeleteOne<T> = T extends undefined
  ? {
    where: (key: string) => {
      eq: (value: unknown) => Promise<{
        deletedLength: number;
        deletedData: Array<Record<PropertyKey, unknown>>;
      }>;
    };
  } : Promise<{
    deletedLength: number;
    deletedData: Record<PropertyKey, unknown>[];
  }>