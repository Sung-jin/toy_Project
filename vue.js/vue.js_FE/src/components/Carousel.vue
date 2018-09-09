<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="640"
                img-height="360"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="640" height="360"
             :src="images[0]" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="640" height="360"
             :src="images[1]" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="640" height="360"
             :src="images[2]" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="640" height="360"
             :src="images[3]" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="640" height="360"
             :src="images[4]" alt="image slot">
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="640" height="360"
             :src="images[5]" alt="image slot">
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Carousel',
  data () {
    return {
      slide: 0,
      sliding: null,
      images: [],
      images_type: [],
      images_name: []
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
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
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>

div {
    height: 360px;
    width: 640px;
}
</style>
