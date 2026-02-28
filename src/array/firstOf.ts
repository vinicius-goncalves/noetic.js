import isArray from "@/typed/isArray"

export default function firstOf<
  const TData extends Array<any>,
  const TFallback = undefined
>(data: TData, fallback?: TFallback): TData extends [infer R, ...unknown[]] ? R : TFallback {
  if (isArray(data) && data.length > 0) {
    return data[0]
  };

  return fallback as any
}