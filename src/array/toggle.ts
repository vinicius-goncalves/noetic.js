import isFunction from "@/typed/isFunction";

/**
 * Toggles an item in an array - adds it if not present, removes it if present.
 *
 * @template T - The type of elements in the array
 * @param data - The source array to toggle the item in
 * @param target - The item to toggle (add or remove)
 * @param extract - Optional function to extract a comparison key from items
 * @returns A new array with the item toggled
 *
 * @example
 * ```typescript
 * toggle([1, 2, 3], 2) // Returns: [1, 3]
 * toggle([1, 2, 3], 4) // Returns: [1, 2, 3, 4]
 * toggle(users, newUser, user => user.id)
 * ```
 */
export default function toggle<
  T
>(data: T[], target: T, extract?: ((target: T) => PropertyKey) | null): T[] {
  const same = isFunction(extract)
    ? (item: T) => extract(target) === extract(item)
    : (item: T) => item === target;

  const exists = data.find(same);
  return exists ? data.filter(x => !same(x)) : [...data, target];
}