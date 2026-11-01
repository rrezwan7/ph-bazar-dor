import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db, mongoClient } from "@/lib/mongodb";

const appURL = process.env.BETTER_AUTH_URL;

if (!appURL) {
  throw new Error("BETTER_AUTH_URL is missing");
}

export const auth = betterAuth({
  appName: "বাজার দর",

  baseURL: appURL,
  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [
  new URL(appURL).origin,
  ...(process.env.NODE_ENV === "development"
    ? ["http://localhost:3000"]
    : []),
],

  database: mongodbAdapter(db, {
    client: mongoClient,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
  },
  socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    prompt: "select_account",
  },

  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  },
},
account: {
  accountLinking: {
    enabled: true,
  },
},
});