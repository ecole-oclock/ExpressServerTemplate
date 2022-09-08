/**
 *******************************************************************************
 * Options de swagger lancées à son initialisation :
 * - Plugin qui permet de sélectionner automatiquement le bon serveur
 * dans la sélection en fonction de l'url où l'on se situe sur la doc swagger
 * - Chargement d'un fichier custom js
 *******************************************************************************
 */

const autoSelectServerPlugin = () => ({
  statePlugins: {
    spec: {
      wrapActions: {
        updateJsonSpec: (oriAction) => (specs) => {
          const { servers } = specs;
          if (typeof window !== 'undefined') {
            // eslint-disable-next-line no-undef
            const currentServerIndex = servers.findIndex((server) => server.url.includes(window.location.host));
            if (currentServerIndex) {
              servers.unshift(servers[currentServerIndex]);
              servers.splice(currentServerIndex + 1, 1);
              const newSpecs = specs;
              newSpecs.servers = servers;
              return oriAction(newSpecs);
            }
          }
          return oriAction(specs);
        },
      },
    },
  },
});

export const swaggerOptions = {
  swaggerOptions: {
    plugins: [
      autoSelectServerPlugin,
    ],
  },
  customJs: '/swagger-custom.js',
};
