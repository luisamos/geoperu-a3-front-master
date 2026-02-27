<template>
<div>
    <header class="home">
    <nav id="mainNav" class="navbar navbar-default navbar-custom affix-top">
        <div class="container-x">
        <div class="navbar-header page-scroll">
            <button
            type="button"
            class="navbar-toggle"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            >
            <i class="fa fa-bars fa-lg"></i>
            </button>
            <a class="navbar-brand page-scroll" href="#page-top">
            <img
                src="https://mapeaperuoficial.sayhuite.gob.pe/wp-content/themes/wpbootstrap/img/mapea-peru.png"
                alt="Mapea Perú"
            >
            </a>
        </div>
        <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse">
            <ul id="menu-menu-home" class="nav navbar-nav navbar-right navbar-nav-main">
            <li
                id="menu-item-33"
                class="menu-item menu-item-type-custom menu-item-object-custom menu-item-33"
            >
                <a title="Nosotros" href="#nosotros" class="page-scroll">Nosotros</a>
            </li>
            <li
                id="menu-item-23"
                class="menu-item menu-item-type-custom menu-item-object-custom menu-item-23"
            >
                <a title="Categorías" href="#capas" class="page-scroll">Categorías</a>
            </li>
            <li
                id="menu-item-67"
                class="menu-item menu-item-type-custom menu-item-object-custom menu-item-67">
                <a
                title="Mapa Interactivo"
                target="_blank"
                href="/mapa"
                class="page-scroll"
                >Mapa Interactivo</a>
            </li>
            <li
                id="menu-item-68"
                class="menu-item menu-item-type-custom menu-item-object-custom menu-item-68">
                <a title="Novedades" href="#novedades" class="page-scroll">Novedades</a>
            </li>
            <li
                id="menu-item-69"
                class="menu-item menu-item-type-custom menu-item-object-custom menu-item-69">
                <a title="Entidades" href="#entidades" class="page-scroll">Entidades</a>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    </header>

<div>
<!-- .navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="navbar-header page-scroll">
    <div class="container-x">
  <button class="navbar-toggler right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">
      <img
        src="https://mapeaperuoficial.sayhuite.gob.pe/wp-content/themes/wpbootstrap/img/mapea-peru.png"
        alt="Mapea Perú"
      >
  </a>
  </div>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  </div>
</nav>
<!-- /.navbar -->
</div>

</div>

</template>


<style>

    /* Make default navbar links display block at choosen breakpoint and adjust styles to fit...*/
    @media (max-width: 62em) {
        .navbar-nav {
            padding-top: .425rem;
            padding-left: 0.75rem;
        }
        .navbar-nav .nav-item {
            float: none;
        }
        .navbar-brand {
            float: right;
        }
        .navbar-brand,
        .navbar-nav .nav-item {
            display: block;
        }
        .navbar-nav .nav-item + .nav-item {
            margin-left: 0;
        }
        .dropdown-menu {
            position: relative;
            float: none;
        }
    }


















    header {
        background-color: #03183A;
        min-height: 106px;
    }
    .navbar-custom {
        background-color: #03183A;
        border-color: transparent;
        min-height: 40px;
        margin: 0;
        padding: 0;
    }

    .container-x {
        width: 100%;
        margin:0 !important;
        padding-right: 15px;
        padding-left: 15px;
    }

    .navbar-custom .navbar-toggle {
        float: left;
        background-color: transparent;
        border: 0;
        font-family: 'Montserrat', sans-serif;
        text-transform: uppercase;
        color: white;
        padding: 0;
        font-size: 30px;
        font-weight: 300;
        margin: 18px 18px;
    }

    .navbar-custom .navbar-toggle i {
        vertical-align: middle;
    }


    @media (min-width: 768px)
    {
        .navbar-custom .navbar-brand {
            font-size: 2em;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            transition: all 0.3s;
        }
    }
    .navbar-brand {
        color: #fed136;
        font-family: 'Montserrat', sans-serif;
        background: #ff3535;
        top: 0;
        height: auto;
        margin: auto;
        padding: 16px 19px;
    }

    .navbar-custom .navbar-collapse {
        border-color: rgba(255, 255, 255, 0.02);
    }

    @media screen and (max-width: 990px) {
        .navbar-custom .nav li a {
            padding: 0 10px;
            max-width: 110px;
            min-width: 110px;
        }
    }
    
    @media screen and (max-width: 1169px)
    {
        .navbar-custom .nav li a {
            max-width: 150px;
            min-width: 150px;
        }
    }

    .navbar-custom .nav li a {
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        text-align: center;
        display: table-cell;
        padding: 0 20px;
        font-family: 'Montserrat', sans-serif;
        max-width: 165px;
        min-width: 165px;
        vertical-align: middle;
        height: 106px;
    }
    .navbar-default .navbar-nav > li > a {
        color: #777;
    }
</style>
