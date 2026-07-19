import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

// `next-auth/jwt` re-exports its `JWT` type from `@auth/core/jwt` via `export *`,
// which TypeScript does not reliably declaration-merge through — augmenting the
// origin module directly is what actually makes `token.id` typed in callbacks.
declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
  }
}
