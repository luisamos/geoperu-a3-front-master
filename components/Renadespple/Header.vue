<template>
  <div class="header">
    <LogoSegdi style="width: auto;"/>
    <div class="header__title">
        RENADESPPLE - 
        <select>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022" selected>2022</option>
        </select>
    </div>
    
  </div>
</template>

<script>

import { STATIC_URL } from "~/const"
import LogoMapea from "~/components/LogoMapea";
import LogoSegdi from "~/components/LogoSegdi";

export default {
  data() {
    return {
      STATIC_URL: STATIC_URL
    }
  },
  components: {
      LogoMapea,
      LogoSegdi
  }
}
</script>

<style scoped>
.logo-red {
  background-color: #ff3232 !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
    display: flex;
    align-items: center;
    justify-content: left;
}

.header__title {
    font-size: 24px;
    font-weight: 700;
}
</style>
