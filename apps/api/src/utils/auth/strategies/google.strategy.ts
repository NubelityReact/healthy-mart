// @ts-nocheck
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import config from "../../../config/config";

const GoogleStrategy = new Strategy(
  {
    clientID: config.google_client_id,
    clientSecret: config.google_client_secret,
    callbackURL: `http://localhost:${config.port}/auth/google/callback`,
  },
  function (accessToken, refreshToken, profile: any, done) {
    done(null, profile);
  }
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  const data = { ElementInternals: obj.emails[0].value };
  done(null, data);
});

export default GoogleStrategy;
