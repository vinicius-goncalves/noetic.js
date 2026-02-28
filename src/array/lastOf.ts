import isArray from "@/typed/isArray";

export default function lastOf<
  const TData extends Array<any>,
  const TFallback = undefined
>(data: TData, fallback?: TFallback): TData extends [...unknown[], infer R] ? R : TFallback {
  const len = data.length || 0;

  if (isArray(data) && len > 0) {
    return data[len - 1];
  }

  return fallback as any;
}

lastOf([1, 2, 3])