'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'davos-charity-admin',
    environment,
    rootURL: '/',
    locationType: 'auto',
    googleFonts: [
      "Open+Sans:100,200,300,400,500,600,700,800,900",
    ],
    contentSecurityPolicy: {
     'font-src': "'self' fonts.gstatic.com",
     'style-src': "'self' fonts.googleapis.com"
    },
    moment: {
     includeTimezone: 'all'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      host: 'https://staging-app.davos.gives'
    },
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: 'https://staging-app.davos.gives/api/admin/session',
    refreshAccessTokens: false,
    headers: {
      "Content-Type": "application/vnd.api+json",
      "Accept": "application/vnd.api+json",
    }
  }

  ENV['ember-simple-auth'] = {
	authenticationRoute: '/login',
};

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
