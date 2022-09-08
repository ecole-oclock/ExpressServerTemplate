import Keycloak from 'keycloak-connect';
import ForbiddenError from 'src/utils/errors/ForbiddenError';

/**
 *
 * @param {string} roles
 */
export const withRole = (role = null) => (req, res, next) => {
  if (!role) {
    next(new ForbiddenError());
    return;
  }

  const hasTheRole = req.kauth.grant.access_token.hasRole(role);

  if (!hasTheRole) {
    next(new ForbiddenError());
  } else {
    next();
  }
};

export default new Keycloak({}, {
  realm: process.env.KEYCLOAK_REALM,
  'auth-server-url': process.env.KEYCLOAK_URL,
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_CLIENT_ID,
  credentials: {
    secret: process.env.KEYCLOAK_SECRET,
  },
  'confidential-port': 0,
});
