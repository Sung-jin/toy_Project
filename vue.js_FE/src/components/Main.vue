<template>
  <div class="total">
    <div class="icon">
      <div class="image_block">
        <img src="../assets/smoking.png"/>
      </div>
    </div>
    <div class="text">
      <h1>Smoking Spot</h1>
      <h2>Wellcom Smoking Spot Page.</h2>
    </div>
    <div class="button">
      <b-button :size="size" style="color:#fff" href="/#/version1">Version 1</b-button>
      <b-button :size="size" style="color:#fff" href="/#/version2">Version 2</b-button>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import bButton from 'bootstrap-vue/es/components/button/button'

export default {
  name: 'Main',
  components: {
    bButton
  },
  data () {
    return {
      size: 'lg'
    }
  }
}
</script>

<style scoped>
.total {
  width: 100%;
  height: 100%;
  background: #1bbc9b;
}
.icon {
  width: 100%;
  height: 40%;
  position: relative;
}
.text {
  width: 100%;
  height: 30%;
}
.button {
  width: 100%;
  height: 30%;
}
.image_block {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0px;
}
h1 {
  font-size: 70px;
}
</style>
