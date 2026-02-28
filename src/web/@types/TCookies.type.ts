type TCookiesGetReturn = { name: string, value: string } | null
type TCookiesGetOptions = { name: string }
type TCookieDeleteOptions = { name: string }
type TCookiesSetOptions = { name: string, value: string, expiresAt?: Date | number }
type TCookieHasOptions = { name: string }

type TCookies = {
  __cookies: Array<string>,

  get(name: string): TCookiesGetReturn
  get(options: TCookiesGetOptions): TCookiesGetReturn

  getAll(): Array<string>,

  values(): IterableIterator<string>;
  keys(): IterableIterator<string>;
  entries(): IterableIterator<[string, string]>;

  set(options: TCookiesSetOptions): Record<string, string>;

  delete(name: string): void;
  delete(options: TCookieDeleteOptions): void;

  has(name: string): boolean;
  has(options: TCookieHasOptions): boolean
}

export type {
  TCookieDeleteOptions,
  TCookieHasOptions,
  TCookies,
  TCookiesGetOptions,
  TCookiesGetReturn,
  TCookiesSetOptions
}

