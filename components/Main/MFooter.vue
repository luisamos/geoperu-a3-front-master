<template>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-4">
            <div class="row">
              <div class="col-md-4 col-sm-4 col-xs-4">
                <h4>Acerca de</h4>
                <ul>
                  <li><nuxt-link to="/nosotros" title="">Nosotros</nuxt-link></li>
                  <li><nuxt-link to="/categorias" title="">Categorías</nuxt-link></li>
                  <li><nuxt-link to="/map/nacional" title="">Mapa Visor</nuxt-link></li>
                  <li><nuxt-link to="/novedades" title="">Novedades</nuxt-link></li>
                  <li><nuxt-link to="/entidades" title="">Entidades</nuxt-link></li>
                </ul>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-4">
                <h4>Usuario</h4>
                <ul>
                  <li><nuxt-link to="#" title="">Compartir</nuxt-link></li>
                </ul>
              </div>
              <div class="col-md-4 col-sm-4 col-xs-4">
                <h4>Ayuda</h4>
                <ul>
                  <li><nuxt-link to="/preguntas-frecuentes" title="">Preguntas Frecuentes</nuxt-link></li>
                  <li><nuxt-link to="/condiciones-de-uso" title="">Condiciones de uso</nuxt-link></li>
                  <li><a href="#" title="">Chat Online</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <h4>Contáctenos</h4>
            <ul class="contact-list">
              <li><i class="icon-send-mail"></i> info@geoperu.gob.pe</li>
              <li><i class="icon-phone-call"></i> (51) 1-219-7000 Anexo 5105</li>
            </ul>
            <p>PRESIDENCIA DEL CONSEJO DE MINISTROS<br>
              Secretaría Gobierno Digital<br>
              Ca. Schell 310, Miraflores - Lima - Perú</p>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="footer-logo">
              <img class="img-responsive" src="/el-peru-primero.png" alt="El Perú primero">
            </div>
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>© Geo Perú 2019 - Derechos reservados - Secretaría de Gobierno Digital</p>
      </div>
    </footer>
</template>

<script>
export default {
    
}
</script>

