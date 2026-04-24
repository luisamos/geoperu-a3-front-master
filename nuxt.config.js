const pkg = require('./package')
const data = require('./static/ubigeo.js')

// Uncomment to optimize production deployment
import TerserPlugin from 'terser-webpack-plugin'

module.exports = {
  //generate: {},
  mode: 'universal',
  env: {
    MAP_BASE_URL: process.env.MAP_BASE_URL || "https://visor.geoperu.gob.pe/print",
    REPORTE_URL: process.env.REPORTE_URL || "https://visor.geoperu.gob.pe/print/printer/elevation/",
    MAP_URL: process.env.MAP_URL || "https://visor.geoperu.gob.pe/api/a3/consulta_super/readA3.php",
    REPORTE_CEM_URL: process.env.REPORTE_CEM_URL || "https://visor.geoperu.gob.pe/api/a3/consulta_cem/readA3.php",
    RENADESPPLE_URL: process.env.RENADESPPLE_URL || "https://visor.geoperu.gob.pe/api/geoperu-reportes/renadespple"
  },
  
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      {
        hid: 'og:image',
        property: 'og:image',
        content: "https://www.geoperu.gob.pe/reporte/1600x900.png"
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: "https://www.geoperu.gob.pe/reporte/1600x900.png"
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
      },
      { 
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'
      },
      { 
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'
      },
      { 
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials.css'
      },
      { 
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials-theme-flat.css'
      }

    ],
    script: [      
      {
        src:"https://code.jquery.com/jquery-3.3.1.min.js"
      },
      {
        src:"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
      },
      {
        src:"https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"
      },
      {
        src:"https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials.min.js"
      },
      {
        src:"https://raw.githubusercontent.com/hakimel/zoom.js/master/js/zoom.js",
        type:"application/javascript"
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#1D99FF' },

  /*
  ** Global CSS
  */

  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/zoom.client.js', ssr: false },
    { src: '~/plugins/vmodal.client.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', {
      id: 'UA-137591733-1'
    }],
    
  ],
  manifest: {
    "name": "Geo Perú",
    "short_name": "Geo Perú",
    "icons": [
      {
        "src": "./android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "./android-chrome-256x256.png",
        "sizes": "256x256",
        "type": "image/png"
      }
    ],
    "start_url": "/",
    "display": "standalone",
    "background_color": "#03183a",
    "theme_color": "#e30512"
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },  
  router: {
    //base: '',
    linkActiveClass: 'active'
  },
  /*
  ** Build configuration
  */
  build: {
    splitChunks: {
      layouts: true
    },
    // Uncomment to optimize production deployment
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: false
        })
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
