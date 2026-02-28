import isNumber from "@/typed/isNumber";
import type { TCookieDeleteOptions, TCookieHasOptions, TCookies, TCookiesGetOptions } from "./@types/TCookies.type";

export default function cookies(): TCookies {
  return {
    __cookies: document.cookie.split(';').map(value => value.trim()),
    getAll: function () {
      return this.__cookies as Array<string>;
    },
    values: function* () {
      for (let i = 0; i < this.__cookies.length; i++) {
        const [, value = ''] = this.__cookies[i].split('=');
        yield value;
      }
    },
    keys: function* () {
      for (let i = 0; i < this.__cookies.length; i++) {
        const [key = ''] = this.__cookies[i].split('=');
        yield key;
      }
    },
    entries: function* () {
      for (let i = 0; i < this.__cookies.length; i++) {
        const [name = '', value = ''] = this.__cookies[i].split('=');
        yield [name, value] as [string, string];
      }
    },
    get: function (this: TCookies, param: string | TCookiesGetOptions): { name: string, value: string } | null {
      const name = typeof param === 'string' ? param : param.name;
      const entries = [...this.entries()];

      for (let i = 0; i < entries.length; i++) {
        const [eKey] = entries[i];

        if (eKey && eKey === name) {
          const [name, value] = entries[i];
          return { name, value };
        }
      }

      return null
    },
    set: ({ name, value, expiresAt }: { name: string, value: string, expiresAt?: Date | number }): Record<string, string> => {
      const date =
        expiresAt instanceof Date
          ? expiresAt.toUTCString() : isNumber(expiresAt)
            ? new Date(expiresAt).toUTCString() : undefined;

      // biome-ignore lint/suspicious/noDocumentCookie: #
      document.cookie = `${name}=${value}; expires=${date}`;

      return { name, value };
    },
    delete: function (params: string | TCookieDeleteOptions) {
      const name = typeof params === 'string' ? params : params.name
      const cookie = this.get(name);

      if (cookie) {
        // biome-ignore lint/suspicious/noDocumentCookie: #
        document.cookie = `${cookie.name}=${cookie.value}; expires=${new Date()}`;
      }
    },
    has: function (params: string | TCookieHasOptions): boolean {
      const name = typeof params === 'string' ? params : params.name;
      return !!this.get(name);
    }
  }
}