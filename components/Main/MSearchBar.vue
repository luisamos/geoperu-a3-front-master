<template>
  <div class="search-box text-center">
    <div>
      <button :class="['btn', 'btn-'+this.btnCollection.soc]" @click="btnCollection.soc='success';btnCollection.pre='default';reporte='reporte';results=[];selected.cod='';searchText=''">Indicadores Socioeconómicos</button>
      <button :class="['btn', 'btn-'+this.btnCollection.pre]" @click="btnCollection.soc='default';btnCollection.pre='success';reporte='presupuesto';results=[];selected.cod='';searchText=''">Presupuesto Regional 2020</button>
    </div>
    <br>
    <!--form class="navbar-form" role="search"-->
    <div class="input-group add-on">
      <div class="row no-gutters">
        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
          <input
            class="form-control"
            autocomplete="off"
            type="search"
            id="searchTerm"
            placeholder="Buscar información por departamento, provincia, distrito"
            autofocus
            @keyup="filter()"
            v-model="searchText"
          >
         <!-- SEARCH RESULTS -->
          <div id="searchResults" v-show="results.length > 1">
            <nav class="resultBox">
              <ul>
                <li class="item" v-for="r in results" :key="r.cod_dist">
                    <span class="item-select"  @click="selectDepa" :data-all="r.all" data-tipo="dpto" :data-cod="r.cod_dpto" v-text="r.nom_dpto"></span> /
                    <span :class="[btnCollection.pre === 'success'?'item-blocked':'item-select']"  @click="selectProv" :data-all="r.all" data-tipo="prov" :data-cod="r.cod_prov" v-text="r.nom_prov"></span> /
                    <span :class="[btnCollection.pre === 'success'?'item-blocked':'item-select']"  @click="selectDist" :data-all="r.all" data-tipo="dist" :data-cod="r.cod_dist" v-text="r.nom_dist"></span>
                </li>
              </ul>
            </nav>
          </div>
         <!-- SEARCH RESULTS #end -->
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <div class="input-group-btn">
            <button @click="goToReporte" class="btn btn-block" type="button" id="searchBtn" :disabled="this.selected.cod===''">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <p class="example">Ejemplo: Ica / Pisco / Pisco</p>
    
    <!--/form-->
  </div>
</template>

<script>
import data from '~/public/ubigeo.js'
import Fuse from 'fuse.js'
import gaEvent from '~/mixins/GoogleAnalytics'

export default {
    mixins: [gaEvent],
    data: ()=> {
        return {
            reporte: 'reporte',
            isRegion: false,
            btnCollection: {
              soc: 'success',
              pre: 'default'
            },
            objUbigeo: '',
            results: [],
            fuseOptions: {
              shouldSort: true,
              findAllMatches: false,
              threshold: 0.4,
              location: 0,
              distance: 100,
              maxPatternLength: 20,
              minMatchCharLength: 2,
              keys: [
                "nom_dist",
                "all"
              ]
            },
            searchText: '',
            selected: {
              tipo: '',
              cod: ''
            }
        }
    },
    methods: {
        search() {
          let ele = document.querySelector("#searchTerm");
        },
        filter() {
          this.selected =  {
              tipo: '',
              cod: ''
          };
          let fuse = new Fuse(this.objUbigeo, this.fuseOptions); // "list" is the item array
          this.results = fuse.search(this.searchText);

          this.$store.dispatch("mapAvailable/setSelection", "default")
        },
        goToReporte() {
          // todo
          this.gaEvent('send', 'event', 'Reporte', 'ver', this.goto)
          //this.$router.push(this.goto);
          window.open('/'+this.reporte+'/'+this.goto, '_blank')
        },
        selectDist(ele){
           // todo
          if (this.btnCollection.pre === 'success'){ return false }
          this.selected.tipo = ele.target.dataset.tipo;
          this.selected.cod = ele.target.dataset.cod;
          this.searchText = ele.target.dataset.all;
          this.goto = this.selected.cod;
          this.isRegion = false
          console.log(ele.target.dataset.cod)
          this.$store.dispatch("mapAvailable/setSelection", ele.target.dataset.cod)

          //this.url = this.$store.getters['mapAvailable/selected'].mapUrl;

          this.results = []
        },
        selectProv(ele) {
          // todo
          if (this.btnCollection.pre === 'success'){ return false }
          this.selected.tipo = ele.target.dataset.tipo;
          this.selected.cod = ele.target.dataset.cod;
          this.searchText = ele.target.dataset.all.split('/')[0]+'/'+ele.target.dataset.all.split('/')[1];
          this.goto = this.selected.cod;
          this.isRegion = false;
          this.results = []
        },
        selectDepa(ele) {
          // todo
          this.selected.tipo = ele.target.dataset.tipo;
          this.selected.cod = ele.target.dataset.cod;
          this.searchText = ele.target.dataset.all.split('/')[0];
          this.isRegion = true
          this.goto = this.selected.cod;
          this.results = []
        },
        
    },
    mounted () {
      data.Ubigeo.map((obj)=>{
        obj.all = obj.nom_dpto+'/'+obj.nom_prov+'/'+obj.nom_dist;
      });

      this.objUbigeo = data.Ubigeo;
    }
};
</script>

<style>
#searchResults {
    background-color: white;
    height: 100%;
    position: relative;
}
#searchResults .resultBox {
    width: 100%;
    position: absolute;
    z-index: 10;
    background-color: white;
    top: 46px;

}

.resultBox ul {
    overflow: hidden;
    overflow-y: scroll;
}
.resultBox ul {
    max-height: 200px;
    width: 100%;
}

#searchResults .resultBox .item {
    border-bottom: 1px solid #d6c7c7;
    font-family: 'Montserrat', sans-serif;
    border-top: none;
    /*height: 32px;*/
    color: #000000bf;
    text-align: left;
    padding-left: 20px;
    padding-top: 4px;
    font-size: 14px;
}

.item-select {
  cursor:pointer;
}

.item-blocked {
  cursor:pointer;
  color:gray;
}

.item-select:hover {
  color: red;
  font-weight: bold;
}
</style>
