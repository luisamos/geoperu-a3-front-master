export default {
    methods: {
        hasGa(){
            if (typeof ga === 'function') {
                // console.log('Loaded :'+ ga);
                return true
            } else {
                console.log('Not loaded');
                // setTimeout(check_ga,500);
                return false
            }
        },
        gaEvent(modo, tipo, info, accion, valor ) {
            if(this.hasGa()) {
                try {
                    // Runs code that may or may not work.
                    ga(modo, tipo, info, accion, valor);
                } catch(err) {
                    ga('send', 'exception', {
                        'exDescription': err.message,
                        'exFatal': false
                    });
                }
            }
        }
    }
}