import passport from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth2";
import { Request } from "express";
import UserService from "./services/user";
import UserModel from "./db/logics/user";
import { UserType } from "./db/models/User";
import { ExtendedUserType } from "./types";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET as string;
const User = new UserService();
const UserDB = new UserModel();
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/v1/user/auth/callback/google",
      passReqToCallback: true,
    },
    async function (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) {
      try {
        const userData = {
          name: profile.displayName,
          email: profile.email,
          provider: profile.provider,
          avatar: profile.picture,
          verified: profile.verified,
        };
        const user = await User.CreateUser(userData);
        if (user) {
          return done(null, user);
        }
      } catch (error) {
        return done(error, null);
      }
      return done(null, profile);
    }
  )
);

// serializeUser and deserializeUser are Passport.js methods used to handle how user information is stored in and retrieved from the session. These methods are essential for session management in Passport-based authentication.

// The serializeUser method determines which data of the user object should be stored in the session.
passport.serializeUser(function (
  user: Express.User,
  done: (err: any, id?: string) => void
) {
  console.log("id serializeUser", user);
  done(null, (user as ExtendedUserType)._id);
});

// The deserializeUser method takes the data stored in the session (usually a user ID) and turns it back into the complete user object
passport.deserializeUser(async function (
  id: string,
  done: (err: any, user?: Express.User | false | null) => void
) {
  try {
    console.log("id deserializeUser", id);
    const user = await UserDB.findUserById(id);
    console.log("deserializeUser found", user);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
