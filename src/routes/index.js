/*
 * Package Import
 */
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import { Router } from 'express';
/*
 * Local Import
 */
import docs from 'src/docs';
import { swaggerOptions } from 'src/utils/swaggerUtils';
import keycloak from 'src/utils/keycloak';

// Import des routes
import apiRoutes from 'src/routes/api';

export default () => {
  const router = new Router();
  /**
   * Doc Swagger
   */
  router.use(
    '/api-docs',
    keycloak.protect(),
    swaggerUI.serve,
    swaggerUI.setup(docs, swaggerOptions),
  );

  router.use('/api', apiRoutes);
  router.use((_, res) => res.sendFile(
    path.join(__dirname, '..', '..', 'front-react', 'dist', 'index.html'),
  ));

  return router;
};
