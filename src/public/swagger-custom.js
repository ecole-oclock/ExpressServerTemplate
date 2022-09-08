 // Doit être configuré à la main
 const clientId = null;
 const realm = null;
 // Le keycloakBaseUrl peut être changé pour adapter aux besoins
 const keycloakBaseUrl = window.location.host.endsWith('.lan')
  ? 'https://preprod.auth.oclock.io/'
  : 'https://auth.oclock.io/';
  
/**
 *******************************************************************************
 * Utils
 *******************************************************************************
 */

/**
 * Permet d'attendre qu'un élément ou objet etc. passé soit réellement chargé
 * dans le DOM
 * @param {String} check - The condition to verify formatted in string
 * @param {Array} actions - An array of strings of functions to execute
 * @param {Method} resolve - Optional Resolve method of a Promise
 * @returns {Void}
 */
const checkExistFunc = (check, actions, resolve = null) => {
  if (check && actions && actions.length > 0) {
    const checkExist = setInterval( () => {
      if (eval(check)) {
        clearInterval(checkExist);
        for (const action of actions) {
          actionToExec = eval(action);
          actionToExec;
        }
      }
    }, 50);
  }
}

/**
 *******************************************************************************
 * Script permettant de gérer automatiquement l'obtention d'un token
 * Keycloak dans swagger doc et de le rafraichir à son expiration
 *******************************************************************************
 */

/**
 * Permet de récupérer et intégrer un script à la page
 * @returns {Promise}
 */
const getScript = (url) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    script.onerror = reject;

    script.onload = script.onreadystatechange = function () {
      const loadState = this.readyState;

      if (loadState && loadState !== 'loaded' && loadState !== 'complete')
        return;

      script.onload = script.onreadystatechange = null;

      resolve();
    };

    document.head.appendChild(script);
  });

const getUI = new Promise((resolve) => {
  checkExistFunc(
    `typeof ui !== 'undefined'`,
    ['resolve(ui)'],
    resolve
  );
});

const setSwaqggerAuthorization = async (token) => {
  const _ui = await getUI;
  _ui.authActions.preAuthorizeImplicit({
    auth: {
      schema: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        get: function (key) {
          return this[key];
        },
      },
      name: 'bearerAuth',
      value: token,
    },
    token: {},
    isValid: true,
  });
};

const initKeycloak = () => {
  if (!clientId || !realm){
    alert('Le clientId et le real doit être configuré manuellement dans src/public/swagger-custom.js');
  }
  const keycloak = new Keycloak({
    url: keycloakBaseUrl,
    realm,
    clientId,
  });
  keycloak.onAuthSuccess = () => {
    setSwaqggerAuthorization(keycloak.token);
  };
  keycloak.onAuthError = (error) => {
    console.error('Error Keycloak', error.message);
  };
  keycloak.init({
    onLoad: 'login-required',
    checkLoginIframe: false,
    enableLogging: true,
  });
  keycloak.onTokenExpired = async () => {
    await keycloak.updateToken();
  };
  keycloak.onAuthRefreshSuccess = () => {
    setSwaqggerAuthorization(keycloak.token);
  };
  keycloak.onAuthRefreshError = (error) => {
    console.error('Error Keycloak', error.message);
  };
};

// Récupère la lib keyclock sur le provider O'clock
getScript(`${keycloakBaseUrl}js/keycloak.js`)
  .then(() => {
    initKeycloak();
  })
  .catch(() => {
    console.error('Could not load script');
  });
