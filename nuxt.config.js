const webpack = require('webpack');
const config = require('./app.config.js');
const URL = !(process.env.NODE_ENV === 'production') ? '' : config.URL;

module.exports = {
  mode: 'universal',
  head: {
    title: 'Project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
      { hid: 'description', name: 'description', content: 'Project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'manifest', href: '/manifest.json' },
    ]
  },
  loading: '~/components/loading.vue',
  css: [
    '~/assets/style.scss'
  ],
  router: {
    middleware: ['auth', 'detect']
  },
  plugins: [
    { src: '~/plugins/client', mode: 'client' },
    { src: '~/plugins/app' },
  ],
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: URL+'/api',
  },
  vuetify: {
    optionsPath: '~/vuetify.config.js',
    defaultAssets: {
      icons: ['md']
    },
  },
  build: {
    cache: true,
    optimizeCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        '_': 'lodash'
      })
    ],
    extend (config, ctx) {
    }
  }
}
