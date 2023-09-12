import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../../../config/config";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.access_token,
};

const Strategy_jwt = new Strategy(opts, (payload, done) => {
  try {
    return done(null, payload);
  } catch (error) {
    done(error);
  }
});

export default Strategy_jwt;
