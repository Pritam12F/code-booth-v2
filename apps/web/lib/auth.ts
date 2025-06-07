import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@workspace/db/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email && credentials.password) {
          try {
            const userDb = await prisma.user.findFirst({
              where: {
                email: credentials.email,
              },
            });

            if (!userDb) {
              return null;
            }

            if (userDb.accountType !== "CREDENTIALS") {
              return null;
            }

            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              userDb.password!
            );

            if (!isPasswordCorrect) {
              return null;
            }

            return {
              id: userDb.id,
              email: userDb.email,
              image: userDb.profilePic,
            };
          } catch (err) {
            return null;
          }
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GH_ID ?? "",
      clientSecret: process.env.GH_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          token: account?.id_token,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.name = token.name;
        session.user.token = token.token;
      }

      return session;
    },
    async signIn({ account, user }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const isUserInDB = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });

        user.id = isUserInDB?.id!;

        if (!isUserInDB) {
          const insertedUser = await prisma.user.create({
            data: {
              email: user.email!,
              profilePic: user.image ?? null,
              accountType:
                account.provider === "google" || account.provider === "github"
                  ? "SOCIALS"
                  : "CREDENTIALS",
            },
          });

          user.id = insertedUser.id;
        } else if (isUserInDB && isUserInDB.accountType === "CREDENTIALS") {
          return `/sign-in?error=${encodeURIComponent("User is registered with socials")}`;
        }
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthOptions;
