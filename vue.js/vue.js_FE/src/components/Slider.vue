<template>
  <div style="width:100%;margin:20px auto;height:100%">
        <!-- Configuring slider components -->
        <slider ref="slider" :pages="pages" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
        </slider>
   </div>
</template>

<script>
import slider from 'vue-concise-slider'// import slider components
import axios from 'axios'

export default {
  name: 'ImageSlider',
  data () {
    return {
      pages: [
        // {example
        //   html: '<div class="slider1"><img src="../assets/champange.jpg"/></div>',
        //   style: {
        //     // 'background': '#7baabe'
        //     // url로 이미지 받아오면 손코딩 할 필요없이 서버에 업/다운로드 하면 되겠지
        //   }
        // }
      ],
      // Sliding configuration [obj]
      sliderinit: {
        currentPage: 0,
        thresholdDistance: 500,
        thresholdTime: 100,
        autoplay: 3000,
        loop: true,
        direction: 'horizon',
        infinite: 1,
        slidesToScroll: 1,
        timingFunction: 'ease',
        duration: 1000
      },
      images: [],
      images_type: [],
      images_name: []
    }
  },
  components: {
    slider
  },
  mounted () {
    axios
      .get('http://www.api.smokingspot.co.kr/api/v1/ashtray/eventImages')
      .then((response) => {
        if (response.data.status[0] === 'Success') {
          for (let i = 0; i < response.data.length; i++) {
            this.images.push('data:' + response.data.image.type[i] +
            ';base64, ' + response.data.image.base64_Images[i])
            this.images_type.push(response.data.image.type[i])
            this.images_name.push(response.data.image.name[i])
            var page = {
              'html': '<div class="eventImages"><img src="' + this.images[i] + '"/></div>',
              'style': {}
            }
            this.pages.push(page)
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    // Listener event
    slide (data) {
      // 슬라이드 될 때 마다
    },
    onTap (data) {
      // 여기에다가 그 이벤트에 대한 페이지 이동 넣으면 될듯
    },
    onInit (data) {
      // 초기화 할 때
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
