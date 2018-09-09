<template>
  <main>
    <div id='authorinfo'>
      <div id='author1'>
        <b-card title="오성진"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
          <p class="card-text">
            웹웹웹웹웹
          </p>
          <div>
            <md-dialog-alert
              :md-active.sync="SungJin"
              md-title="오성진"
              md-content="Html형태로 입력" />

            <md-button class="md-primary md-raised" @click="SungJin = true">More Info</md-button>
          </div>

        </b-card>
      </div>

      <div id='author2'>
        <b-card title="이정욱"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
          <p class="card-text">
            임베디드
          </p>
          <div>
            <md-dialog-alert
              :md-active.sync="JungWook"
              md-title="이정욱"
              md-content="Html형태로 입력" />

            <md-button class="md-primary md-raised" @click="JungWook = true">More Info</md-button>
          </div>

        </b-card>
      </div>

      <div id='author3'>
        <b-card title="최재형"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
          <p class="card-text">
            안드로이드
          </p>
          <div>
            <md-dialog-alert
              :md-active.sync="JaeHyeong"
              md-title="최재형"
              md-content="Html형태로 입력" />

            <md-button class="md-primary md-raised" @click="JaeHyeong = true">More Info</md-button>
          </div>

        </b-card>
      </div>

    </div>
  </main>
</template>

<script>
import bCard from 'bootstrap-vue/es/components/card/card'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

export default {
  name: 'AuthorInfo',
  data () {
    return {
      SungJin: false,
      JungWook: false,
      JaeHyeong: false
    }
  },
  components: {
    bCard
  },
  methods: {
  }
}
</script>

<style scoped>
#authorinfo {
  height: 100%;
  width: 100%;
  display: flex;
}
#author1 {
  width: 100%;
}
#author2 {
  width: 100%;
}
#author3 {
  width: 100%;
}
#authorinfo {
  color: #000;
}
</style>
