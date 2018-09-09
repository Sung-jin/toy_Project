<template>
  <main>
    <div class="fullpage-container">
      <div class="button-group">
        <a href="/#/"><button type="button" :class="home">Home</button></a>
        <button type="button" :class="0" @click="moveTo(0)">Emplacement</button>
        <button type="button" :class="1" @click="moveTo(1)">Introduce</button>
        <button type="button" :class="2" @click="moveTo(2)">More</button>
      </div>
      <div class="fullpage-wp" v-fullpage="opts" ref="example">
        <div class="page-1 page">
          <h1>설치 된 장소</h1>
          <p class="part-1">
            <Google-Map/>
          </p>
        </div>
        <div class="page-2 page">
          <p class="part-2">
            <h1>제품 소개 페이지</h1>
            <Slider/>
          </p>
        </div>
        <div class="page-3 page">
          <h1>이벤트 / 만든이 소개 페이지</h1>
          <div style="width:100%;" class="part-3">
            <p style="display: table; margin-left: auto; margin-right: auto;" class="part-3">
              <Carousel/>
            </p>
          </div>
          <div class="auth">
            <div class="auth2">
              <div class="auth-info">
                <Author-Info/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import GoogleMap from './GoogleMapFull'
import Slider from './Slider'
import Carousel from './Carousel'
import AuthorInfo from './AuthorInfo'
import 'animate.css'
import 'fullpage-vue/src/fullpage.css'

export default {
  name: 'FullPage',
  components: {
    GoogleMap,
    Slider,
    Carousel,
    AuthorInfo
  },
  data () {
    return {
      opts: {
        start: 0,
        dir: 'v',
        duration: 500,
        beforeChange: function (prev, next) {
        },
        afterChange: function (prev, next) {
        }
      }
    }
  },
  methods: {
    moveNext () {
      this.$refs.example.$fullpage.moveNext()
      // Move to the next page
    },
    moveTo (index) {
      this.$refs.example.$fullpage.moveTo(index, true)
    }
  }
}
</script>

<style scoped>
.page-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
body {
  margin: 0;
}
.fullpage-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.page {
  display: block;
  text-align: center;
  font-size: 26px;
  color: #eee;
}
.page-1 {
  padding-top: 100px;
  background: #1bbc9b;
}
.page-2 {
  padding-top: 100px;
  background-color: rgb(75, 191, 195);
}
.page-3 {
  padding-top: 100px;
  background: #aabbcc;
}
h3,
p {
  font-size: 16px;
}
.button-group {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 9;
}
.button-group button {
  display: inline-block;
  margin: 10px;
  color: #000;
  background: #fff;
  background: rgba(255, 255, 255, .5);
  -webkit-border-radius: 10px;
  border-radius: 10px;
  padding: 9px 18px;
  border: none;
  outline: none;
}
.button-group button.active {
  background: rgba(0, 0, 0, .5);
  color: #fff;
}
.button-group a {
  border: 0;
}
.part-1 {
  height: 100%;
}
.part-3 {
  float: center;
}
.auth {
  display: table;
  width: 100%;
  height: 100%;
}
.auth2 {
  display: table-cell;
}
.auth-info {
  height: 100%;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>
