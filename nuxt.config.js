import { i18n } from './configs'

const { NODE_ENV, ADMIN_ROLE  } = process.env

const isDev = [ 'dev', 'development' ].includes( NODE_ENV )

export default {
  ssr: false,
  parallel  : true,
  rootDir   : __dirname,
  modern    : true,
  publicRuntimeConfig: {
    baseURL          : process.env.BASE_URL             || 'https://www.cbd.int',
    drupalApi        : process.env.DAPI                 || 'https://h550gxekak.execute-api.us-east-1.amazonaws.com/stg',
    basePath         : process.env.BASE_PATH            || '/portals/action-agenda',
    drupalMenuName   : process.env.DRUPAL_MENU_NAME     || 'action-agenda',
    drupalSubMenuName: process.env.DRUPAL_SUB_MENU_NAME || 'action',
    adminRole        : process.env.ADMIN_ROLE           || 'ActionAdmin',
    nodeEnv          : process.env.NODE_ENV             || 'production'
  },
  head      : {
                title    : 'Action Agenda Portal',
                htmlAttrs: { lang: 'en' },
                meta     : [
                  { charset: 'utf-8' },
                  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                  { hid: 'description', name: 'description', content: '' }
                ],
                link: [ { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=BenchNine:300,400,600,900' } ]
              },
  css       : [ '@scbd/www-css/dist/style.css', 'assets/style.css' ],
  plugins   : [],
  components: false,                                              // Auto import components: https://go.nuxtjs.dev/config-components
  modules: [                                                    // Modules: https://go.nuxtjs.dev/config-modules
    '@scbd/nuxt-scbd-sso-module',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [ 'nuxt-i18n', i18n ],
    ['@nuxtjs/google-analytics', {
      id: 'UA-1996573-20'
    }]
  ],

  build: {                                                      // Build Configuration: https://go.nuxtjs.dev/config-build
    publicPath: isDev? '/_nuxt/' : 'https://www.cbd.int/portals/action-agenda/_nuxt/',
    babel: {
      plugins: [
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from'
      ]
    },
  },
  router: {
    trailingSlash : true
  },

  axios   : {},
  ssoScbd: { admins: [ ADMIN_ROLE || 'ActionAdmin' ], env: NODE_ENV || 'production'}
}