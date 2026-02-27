<template>
  <header class="home">
    <nav id="mainNav" class="navbar navbar-default navbar-custom affix-top">
      <div class="container">
        <div class="navbar-header page-scroll">
          <button
            type="button"
            class="navbar-toggle"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <i class="fa fa-bars fa-lg"></i>
          </button>
          <nuxt-link
            @mouseover="hoverize"
            @mouseout="dehoverize"
            :class="{'navbar-brand': true, 'page-scroll':true}"
            to="/"            
            exact
          >
            <img
              src="/mapea-peru.png"
              alt="Geo Perú"
            >
          </nuxt-link>
        </div>
        <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse">
          <ul id="menu-menu-home" class="nav navbar-nav navbar-right navbar-nav-main">
            <li
              @mouseover="hoverize"
              @mouseout="dehoverize"
              v-show="$store.getters['mmenu/mode'] ==='hash'"
              v-for="item in $store.getters['mmenu/items']"
              :key="item.id"
              :id="'menu-item-' + item.id"
              :class="{'menu-item': true, 'menu-item-type-custom':true, 'menu-item-object-custom':true, 'active': $route.hash === item.url}"
            >
              <a
                :title="item.label"
                :href="item.url"
                class="page-scroll"
                v-text="item.label"
              ></a>              
            </li>
            <li
              @mouseover="hoverize"
              @mouseout="dehoverize"
              v-show="$store.getters['mmenu/mode'] ==='href'"
              v-for="item in $store.getters['mmenu/items']"
              :key="item.id+'h'"
              :id="'menu-item-' + item.id"
              :class="{'menu-item': true, 'menu-item-type-custom':true, 'menu-item-object-custom':true, 'active': $route.path === item.url}"
            >             
              <nuxt-link
                :title="item.label"
                :to="item.url"
                class="page-scroll"
                v-text="item.label"
              ></nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data: () => {
    return {
      items: [],
      defaultActive: ""
    };
  },
  watch: {
    /*'$route': function(to, from) {
      this.defaultActive = document.querySelector('#mainNav .container .active');
    }*/
  },
  mounted() {
    this.items = this.$store.getters["mmenu/items"];
    //this.defaultActive = document.querySelector('#mainNav .container .active');
    //console.log(document.querySelector('#mainNav .container .active'))
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $("a.page-scroll").bind("click", function(event) {
      var $anchor = $(this);

      // Smooth Scroll for HASH routes
      if ($anchor.attr("href").indexOf("#") !== -1) {
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $($anchor.attr("href")).offset().top - 60
            },
            1250,
            "easeInOutExpo"
          );
      }

      // Close MENU on SELECTION

      $(".navbar-toggle:visible").click();
    });


     // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 80
    });
    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
          top: 100
        }
    });
    
  },
  methods: {
    hoverize: function() {
      /*if (this.$route.path === '/') {
        console.log(this.defaultActive)
        //this.defaultActive.classList.remove("active")
      } else {
        this.defaultActive.classList.remove("active")
      }*/
    },
    dehoverize: function() {
      /*if (this.$route.path === '/') {
        //this.defaultActive.classList.add("active");
      } else {
        this.defaultActive.classList.add("active");
    }*/
    }
  }
};
</script>

<style>

#mainNav {
  border-radius: 0px;
}

</style>
