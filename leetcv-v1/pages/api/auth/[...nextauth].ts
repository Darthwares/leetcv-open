import { Resume } from "data/models/UserInfo";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import admin from "server/router/firebaseAdmin";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import {
  getDefaultBasicDetails,
  getDefaultEducation,
  getDefaultExperience,
  getDefaultProject,
  getDefaultSocialMedia,
} from "@constants/defaults";
import { uniqueNamesGenerator, NumberDictionary } from "unique-names-generator";
import Parse from "parse-full-name";
import LinkedInProvider from "next-auth/providers/linkedin";
import crypto from "crypto";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      checks: ["pkce", "state"],
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      client: { token_endpoint_auth_method: "client_secret_post" },
      async profile(profile, tokens) {
        const emailResponse = await fetch(
          "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))",
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        );
        const emailData = await emailResponse.json();
        return {
          id: profile.id,
          name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
          firstName: profile.localizedFirstName,
          lastName: profile.localizedLastName,
          email: emailData?.elements?.[0]?.["handle~"]?.emailAddress,
          image:
            profile.profilePicture?.["displayImage~"]?.elements?.[0]
              ?.identifiers?.[0]?.identifier,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      const db = admin.firestore();
      if (!user.id) {
        return false;
      }
      const recoveryCode = crypto.randomBytes(8).toString("hex");

      const firstName = Parse.parseFullName(`${user?.name}`, "first");
      const lastName = Parse.parseFullName(`${user?.name}`, "last");
      const numberDictionary = NumberDictionary.generate({
        min: 100,
        max: 9999,
      });
      const handleName: string = uniqueNamesGenerator({
        dictionaries: [[`${firstName}_${lastName}`], numberDictionary],
        length: 2,
        separator: "_",
        style: "lowerCase",
      });
      const userRef = db.collection("users").doc(user.id);
      const userLinkRef = db
        .collection("users")
        .doc(user.id)
        .collection("permanentLink")
        .doc(user.id);
      const counterRef = db
        .collection("users")
        .doc(user.id)
        .collection("viewCounter")
        .doc(user.id);
      const tokenCounterRef = db
        .collection("users")
        .doc(user.id)
        .collection("gpt-token")
        .doc(user.id);
      const recoveryEmailRef = db
        .collection("users")
        .doc(user.id)
        .collection("recoveryEmail")
        .doc(user.id);

      const recoveryEmailRecord = await recoveryEmailRef.get();

      if (!recoveryEmailRecord.exists) {
        await recoveryEmailRef.set({
          recoverCode: recoveryCode,
          email: "",
        });
      }

      const record = await userRef.get();
      if (!record.exists) {
        const userNameRef = db.collection("usernames").doc(handleName);

        const userNameRecord = await userNameRef.get();
        if (!userNameRecord.exists) {
          await userNameRef.set({
            userId: user.id,
          });
        }
        await userRef.set({
          ...user,
          provider: account?.provider,
          registeredAt: admin.firestore.FieldValue.serverTimestamp(),
          version: "1.0",
        });
      }
      const resumeRef = db.collection("resumes").doc(user.id);
      const resume = await resumeRef.get();

      if (!resume.exists) {
        const defaultResume: Resume = {
          id: user.id,
          displayName: user.name ?? "",
          description: getDefaultBasicDetails().description,
          email: user.email!,
          avatar: "",
          image: user.image!,
          phoneNumber: getDefaultBasicDetails().phoneNumber,
          handle: handleName,
          position: getDefaultBasicDetails().position,
          currentCompany: getDefaultBasicDetails().currentCompany,
          yoe: "",
          skills: getDefaultBasicDetails().skills,
          socialMedia: [getDefaultSocialMedia(1)],
          projects: [getDefaultProject(1)],
          educations: [getDefaultEducation(1)],
          experiences: [getDefaultExperience(1)],
          awards: [],
          preferences: [],
          languages: [],
          courses: [],
          certificates: [],
          publications: [],
          causes: [],
          causesList: [],
          workType: "",
          city: getDefaultBasicDetails().address.city,
          state: getDefaultBasicDetails().address.state,
          country: getDefaultBasicDetails().address.country,
          remoteWork: "Office",
          private: true,
          version: "1.0",
          followers: 0,
          rating: 0,
          dob: "",
          address: "",
          portfolioLink: "",
          hiddenQrCode: false,
          hiddenImage: false,
          isJoinedWaitList: "Waitlist",
          waitListDescription: "",
          yearOfExperience: "",
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        await resumeRef.set(defaultResume);
        await userLinkRef.set({
          passCode: Math.floor(100000 + Math.random() * 900000),
        });
        await counterRef.set({
          pageViews: 0,
        });
        await tokenCounterRef.set({
          count: process.env.MANAGE_GPT_TOKENS,
        });
      }
      return true;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
