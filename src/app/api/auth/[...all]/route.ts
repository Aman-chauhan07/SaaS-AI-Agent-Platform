// Import the `auth` configuration/function from your local auth file
// This contains your authentication setup (strategies, providers, rules, etc.)
import { auth } from "@/lib/auth";

// Import a helper function from `better-auth` package, made for Next.js
// This function helps to convert your auth logic into Next.js-compatible route handlers
import { toNextJsHandler } from "better-auth/next-js";

// Convert your `auth` configuration into Next.js API route handlers (POST, GET)
// This automatically gives you Next.js route functions that you can export
// So when someone sends a GET or POST request to this route, 
// it will use the auth system you configured.
export const { POST, GET } = toNextJsHandler(auth);
