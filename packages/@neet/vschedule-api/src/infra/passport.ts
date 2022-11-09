import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

// http://www.passportjs.org/packages/passport-jwt/
// https://zenn.dev/msksgm/articles/20211113-typescript-jwt-passport-server
const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    issuer: 'accounts.examplesoft.com',
    audience: 'yoursite.net',
  },
  function (_jwtPayload, done) {
    return done(null, true);
    // サービスアカウント的な概念がほしいかも
    // User.findOne({ id: jwtPayload.sub }, (err: unknown, user) => {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //     // or you could create a new account
    //   }
    // });
  },
);

passport.use(jwtStrategy);
