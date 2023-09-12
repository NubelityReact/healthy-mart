import passport from "passport";
import Strategy_jwt from "./strategies/jwt.strategy";
import GoogleStrategy from "./strategies/google.strategy";

passport.use(Strategy_jwt);
passport.use(GoogleStrategy);
