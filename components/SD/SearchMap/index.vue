<template>
  <div :class="$options.cssName">
    <div class="search-map__form-group justify-content-center">
      <input
        v-model="niddle"
        @keyup="search"
        :placeholder="placeholder_text"
        autocomplete="off"
        ref="input"
        class="search-map__input app-s4 form-control"
        autofocus
      />
      <div
        id="autocomplete-list"
        class="autocomplete-items"
        v-show="result.length > 0 && niddle !== ''"
      >
        <div
          class="app-s4"
          v-for="row in result"
          :key="row.codigo"
          @click="select(row)"
          @mouseover="x => setItemActive(x.target)"
        >
          <span
            class="autocomplete-items__title"
            v-html="row.nombre"
          ></span>
          <br />
          <span
            class="autocomplete-items__subtitle app-s5"
            v-html="row.tipo"
          ></span>
        </div>
      </div>
      <div class="input-group-append search-map__button-wrapper">
        <button
          class="input-group-button search-map__button"
          aria-label="buscar"
          
          @click="emitClose()"
        >
          <i class="fa fa-times search-map__icon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchMap",
  cssName: "search-map",
  props: {
    searchurl:  {
      required: true
    }
  },
  data() {
    return {
      result: [],
      niddle: "",
      selected: "",
      placeholder_text: "Búsqueda: Nombre, Código",
      searchNav: 0,
      searchTimer: ''
    };
  },
  mounted() {},
  methods: {
    emitClose(){
      this.$emit("close");
    },
    emitSelected(data){
      this.$emit("selected", data);
    },
    /**
     * @String str
     * @String separator
     */
    friendlier(str, separator) {
      return str.toLowerCase().replace(" ", separator);
    },
    search(ele) {
      let childCount = document.querySelector("#autocomplete-list")
        .childElementCount;

      if (
        (ele.key == "ArrowDown" || ele.key == "ArrowUp") &&
        childCount > 0 &&
        this.niddle != ""
      ) {
        if (ele.key == "ArrowDown" && this.searchNav < childCount - 1) {
          this.searchNav += 1;
        } else if (ele.key == "ArrowUp" && this.searchNav > 0) {
          this.searchNav -= 1;
        } else if (ele.key == "ArrowUp" && this.searchNav < 0) {
          this.searchNav = 0;
        }

        let offtop = document.querySelectorAll("#autocomplete-list div")[
          this.searchNav
        ].offsetTop;
        document.querySelector("#autocomplete-list").scrollTo(0, offtop);
        let listItems = document.querySelectorAll("#autocomplete-list div");
        this.setItemActive(listItems[this.searchNav]);
      } else if (
        ele.key == "Enter" &&
        this.searchNav >= 0 &&
        this.searchNav <= childCount - 1
      ) {
        document
          .querySelectorAll("#autocomplete-list div")
          [this.searchNav].click();
      } else if (ele.key == "Enter" && this.selected != "") {
        document.querySelector(".search-map__button").click();
      } else {
        this.searchNav = -1;
        if (this.niddle !== "") {
          clearTimeout(this.searchTimer);
          this.searchTimer = setTimeout(() => this.getData(), 500);
        } else {
          this.selected = "";
        }
      }
    },
    async getData() {
       this.$store.dispatch("Loading/START", {
        tipo: "Overlay",
        text: `Generando Reporte`
      });
      const { data } = await fetch(this.searchurl+this.niddle)
                            .then(response => response.json())
                            .then(data => data);
      this.result = data;
      this.$store.dispatch("Loading/STOP");
    },
    setItemActive(ele) {
      let listItems = document.querySelectorAll("#autocomplete-list div");
      for (let i = 0; i < listItems.length; i++) {
        ele != listItems[i]
          ? listItems[i].classList.remove("active")
          : listItems[i].classList.add("active");
      }
    },
    select(registro) {
      this.selected = "";
      //this.niddle = `${registro.nombre}`;
      this.selected = JSON.stringify(registro);
      this.result = [];
      this.emitSelected(registro)
      //document.querySelector(".search-map__button").focus();
    },
  }
};
</script>

<style lang="scss" scoped>

$main-color: rgb(206, 206, 206);
.search-map {
  margin: auto;
  display: inline-block;
  border: 2px solid #193d74 ;
  &__form-group {
    //margin-top: 1rem;
  }

  &__input {
    height: 40px;
    //max-width: calculateRem(712px);
    border: 0.1rem solid #dee3ea;
  }

  &__button {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    //height: calculateRem(46px);
    background-color: #bdbdbd;

    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 0px;
    right: 0px;
    z-index: 12;
    margin: 0.2% 0.1% 0.2% 0;
    display: flex;
    border: none;
    width: 3.2em;
    cursor: pointer;
    color: white;

    &:active,
    &:focus {
      border: 2px solid $main-color !important;
      outline: none;
    }
  }
  &__icon {
    margin: auto;
    top: 0;
    bottom: 0;
  }
}

.autocomplete-items {
  //@errormax-width: calculateRem(712px);
  max-height: 13rem;
  overflow-y: scroll;
  position: absolute;
  border: 1px solid #d4d4d4;
  border-top: none;
  z-index: 101;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
  & span {
    pointer-events: none;
  }
}

.autocomplete-items div {
  text-align: left;
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
  line-height: 1.5rem;

  &.active, 
  &.active span {
    background-color: $main-color;
  }
}

/*when navigating through the items using the arrow keys:*/
.autocomplete-active {
  background-color: DodgerBlue !important;
  color: #ffffff;
}

::-webkit-input-placeholder {
  text-align: center;
  //font-weight: 500;
  padding-right: 8%;
  font-size: 14px;
}

:-moz-placeholder {
  /* Firefox 18- */
  text-align: center;
  //font-weight: 500;
  font-size: 14px;
  padding-right: 8%;
}

::-moz-placeholder {
  /* Firefox 19+ */
  text-align: center;
  //font-weight: 500;
  font-size:14px;
  padding-right: 8%;
}

:-ms-input-placeholder {
  text-align: center;
  //font-weight: 500;
  font-size:14px;
  padding-right: 8%;
}

@media (max-width: 768px) {
  ::-webkit-input-placeholder {
    text-align: center;
    //font-weight: 500;
    padding-right: 8%;
    font-size: 1rem;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    text-align: center;
    //font-weight: 500;
    font-size: 1rem;
    padding-right: 8%;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    text-align: center;
    //font-weight: 500;
    font-size: 1rem;
    padding-right: 8%;
  }

  :-ms-input-placeholder {
    text-align: center;
    //font-weight: 500;
    font-size: 1rem;
    padding-right: 8%;
  }
}

@media (max-width: 468px) {
  ::-webkit-input-placeholder {
    text-align: center;
    //font-weight: 500;
    padding-right: 8%;
    font-size: 0.9rem;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    text-align: center;
    //font-weight: 500;
    font-size: 0.9rem;
    padding-right: 8%;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    text-align: center;
    //font-weight: 500;
    font-size: 0.9rem;
    padding-right: 8%;
  }

  :-ms-input-placeholder {
    text-align: center;
    //font-weight: 500;
    font-size: 0.9rem;
    padding-right: 8%;
  }
}
</style>