export default {
    methods: {
      formatNumber (n,d=0) {
        if (n !== null){   
          return parseFloat(n).toFixed(d).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
          return 0
        }
      },
      formatNumberInt (n) {
        if (n !== null){
          return parseInt(n).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
          return 0
        }
      },
      formatNumberTextMillions (n) {
        if (n !== null){
          let nu = n/1000000

          if (nu===1){
            return this.formatNumberInt(parseInt(nu)).toString() + ' millón'  
          }
          return this.formatNumberInt(parseInt(nu)).toString() + ' millones'

        } else {
          return "0"
        }
      },
      formatNumberTextThousands(n) {
        if (n !== null){
          let nu = n/1000
          if (nu ===1) {
            return 'Mil'
          }
          return this.formatNumberInt(parseInt(nu)).toString() + ' mil'

        } else {
          return "0"
        }
      },
      cutNumberToText(number) {
        let len = number.toString().length
        console.log(len)
        if (len <= 3 ) {
          return n.toString();
        }
        else if (len > 3 && len <= 6) {
          return this.formatNumberTextThousands(number)
        }
        else if (len > 6){
          return this.formatNumberTextMillions(number)
        }
        
      }
      
    }
  }