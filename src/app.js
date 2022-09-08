import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import ForbiddenError from 'src/utils/errors/ForbiddenError';


import mainRouter from 'src/routes';
import keycloak from 'src/utils/keycloak';
import 'src/utils/dayjs';

import { errorMiddleware } from 'src/middlewares';

// Express app
const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // environment: process.env.NODE_ENV,
});

// Morgan logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // `dev` is equal to `:method :url :status :response-time ms`
}

// Security
// See : http://expressjs.com/en/advanced/best-practice-security.html
// Helmet is actually just a collection of nine smaller middleware
// functions that set security-related HTTP headers:
app.use(helmet());

app.use(
  keycloak.middleware({
    admin: process.env.KEYCLOAK_URL,
    logout: '/api/keycloak/logout',
  }),
);

keycloak.accessDenied = (req, res, next) => {
  if (
    req.xhr && !req?.kauth?.grant?.['access_token']?.content
  ) {
    return next(new AuthError('Erreur de token keycloak'));
  }
  return next(new ForbiddenError());
};

keycloak.redirectToLogin = (req) => req.xhr;

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.static(path.join(__dirname, '..', 'front-react', 'dist'), {
    index: false,
  }),
);

// Cors
app.use(cors({ origin: true })); // FIXME: accepte toutes les origines pour le moment

// Security
app.disable('x-powered-by'); // Disable the X-Powered-By header. Attackers can use this header to detect apps running Express. And then launch specifically-targeted attacks

// Body parsers for custom routes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Le routeur initial
app.use(mainRouter(app));

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Error middleware
app.use(errorMiddleware);

export default app;
