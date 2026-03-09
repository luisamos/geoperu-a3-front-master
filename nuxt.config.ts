export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      mapBaseUrl: process.env.MAP_BASE_URL || 'https://visor.geoperu.gob.pe/print',
      reporteUrl: process.env.REPORTE_URL || 'https://visor.geoperu.gob.pe/print/printer/elevation/',
      mapUrl: process.env.MAP_URL || 'https://visor.geoperu.gob.pe/api/a3/consulta_super/readA3.php',
      reporteCemUrl: process.env.REPORTE_CEM_URL || 'https://visor.geoperu.gob.pe/api/a3/consulta_cem/readA3.php',
    }
  },

  app: {
    head: {
      title: 'GeoPeru',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'GEOPERÚ es la Plataforma Digital Geográfica del Estado Peruano' },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://www.geoperu.gob.pe/reporte/1600x900.png'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://www.geoperu.gob.pe/reporte/1600x900.png'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i'
        }
      ]
    }
  },

  devServer: {
    port: 8080
  },

  compatibilityDate: '2024-01-01'
})
