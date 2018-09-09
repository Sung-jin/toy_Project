<template>
  <div id="scroll">
    <template>
      <header id="site-header" class="nav is-fixed">
      <div class="container">
        <scrollactive ref="scrollactive" class="my-nav">
          <ul class="nav-center">
            <li><a href="/#/">메인으로</a></li>
            <li><a href="#section-1" class="scrollactive-item nav-item">설치 된 장소</a></li>
            <li><a href="#section-2" class="scrollactive-item nav-item">진행중인 이벤트</a></li>
            <li><a href="#section-3" class="scrollactive-item nav-item">간단한 소개</a></li>
            <li><a href="#section-4" class="scrollactive-item nav-item">만든이</a></li>
          </ul>
        </scrollactive>
      </div>
    </header>
    <main>
      <section id="section-1" class="section hero is-primary is-fullheight">
        <h1 class="heading title is-1">설치 된 장소</h1>
        <Google-Map/>
        <br><br><br>
      </section>

      <section id="section-2" class="section hero is-info is-fullheight">
        <h1 class="heading title is-1">진행중인 이벤트</h1>
        <Slider/>
        <br><br><br>
      </section>

      <section id="section-3" class="section hero is-danger is-fullheight">
        <h1 class="heading title is-1">간단한 소개</h1>
        <div class="introduce">
          <Carousel/>
        </div>
        <br><br><br>
      </section>

      <section id="section-4" class="section hero is-success is-fullheight">
        <div class="container">
          <h1 class="heading title is-1">만든이</h1>
          <Author-Info/>
          <br><br><br>
        </div>
      </section>
    </main>
    </template>
    <!-- <router-link to="/">GoogleMap</router-link>
    <br>
    <router-link to="/Slider">Silder</router-link> -->
    <router-view/>
  </div>
</template>

<script>
import GoogleMap from './GoogleMap'
import Carousel from './Carousel'
import Slider from './Slider'
import AuthorInfo from './AuthorInfo'

export default {
  name: 'Scroll',
  components: {
    GoogleMap,
    Carousel,
    Slider,
    AuthorInfo
  }
}
</script>

<style scoped>
#site-header {
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2;
}
#site-header li {
  display: inline-block;
  margin-right: 30px;
}
main{
  width: 100%;
  margin-top: 50px;
}
#section-4 div {
  width: 800px;
}
.introduce {
  display: table;
  margin-left: auto;
  margin-right: auto;
}
</style>
