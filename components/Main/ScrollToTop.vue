<template>
  <a class="scroll-to-top rounded js-scroll-trigger" v-show="show" @click="toTop">
    <i class="fa fa-angle-up" aria-hidden="true"></i>
  </a>
</template>

<script>
export default {
  data: () => {
    return {
        show: false
    }
  },
  methods: {
      getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}
 ,
    handleScroll (event) {
       let winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
        let docheight = this.getDocHeight()
        let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
        let trackLength = docheight - winheight
        let pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)

        if(pctScrolled > 10){
            this.show = true; 
        } else {
            this.show = false;
        }
    },
    toTop (){
      
       $('html, body').stop().animate({
            scrollTop: (0)
        }, 1250, 'easeInOutExpo');
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }

};
</script>
