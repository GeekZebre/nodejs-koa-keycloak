import cors from "@koa/cors";
import dotenv from "dotenv";
import Koa from "koa";
import path from "path";
// import router from "./routes";

import bodyParser from "koa-bodyparser"
import session from "koa-session"
import passport from "koa-passport"

import { Issuer, Strategy, } from "openid-client"

dotenv.config({ path: path.resolve(".env") });

const app = new Koa();

app.use(cors());

// body parser
app.use(bodyParser())

// Sessions
app.keys = ['secret']
app.use(session({}, app))


app.use(passport.initialize())
app.use(passport.session())

const keycloakIssuer = await Issuer.discover('http://localhost:8080/realms/keycloak-express')
// don't think I should be console.logging this but its only a demo app
// nothing bad ever happens from following the docs :)
console.log('Discovered issuer %s %O', keycloakIssuer.issuer, keycloakIssuer.metadata);

const client = new keycloakIssuer.Client({
    client_id: 'keycloak-express',
    client_secret: 'long_secret-here',
    redirect_uris: ['http://localhost:3000/auth/callback'],
    post_logout_redirect_uris: ['http://localhost:3000/logout/callback'],
    response_types: ['code'],
  });


//passport.use('oidc', new Strategy({ client }, 
//  (issuer, sub, profile, accessToken, refreshToken, done) => {
passport.use('oidc', new Strategy({ client }, (tokenSet, userinfo, done) => {
    //return done(null, tokenSet.claim())
    //console.log('claims', tokenSet.claims);
    //console.log('bingo userinfo', userinfo);
    console.log({profile:userinfo});
    return done(null, userinfo);
  })
);

passport.serializeUser(function(user, done) {
  //console.log({serializeUser: user});
  done(null, user);
});
//passport.serializeUser(user, done => {
//  done(null, user);
//});

passport.deserializeUser(function(user, done) {
  //console.log({deserializeUser: user});
  done(null, user);
});
//passport.deserializeUser(user, done => {
//  done(null, user);
//});

app.get('/auth/oidc', async (req, res, next) => {
  await passport.authenticate('oidc')(req,res,next)
});

app.get('/auth/callback', async (req,res,next) => {
  await passport.authenticate('oidc', {
    successRedirect: 'https://imb-visio-visioimb.apps.math.cnrs.fr/',
    failureRedirect: 'https://imb-visio-visioimb.apps.math.cnrs.fr/'
  })(req, res, next)
});




//app.use(router().routes());

app.listen(process.env.PORT, () => {
  console.log(
    `api listening on port ${process.env.PORT}, check http://localhost:${process.env.PORT}`
  );
});