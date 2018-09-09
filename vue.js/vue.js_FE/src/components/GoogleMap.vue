<template>
  <div id="map">
    <gmap-autocomplete
      style="width: 100%; height: 23px"
      placeholder="Please type your address"
      @place_changed="setPlace"
    />
    <gmap-map
      :center="center"
      :zoom="16"
      style="width:100%; height: 800px;"
      :options="{disableDefaultUI: true, zoomControl: true}"
      ref="map"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon.sync="m.icon"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GoogleMap',
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      map: '',
      center: { lat: 37.340191, lng: 126.733529 },
      markers: [],
      places: [],
      currentPlace: null,
      marker: { lat: null, lng: null }
    }
  },

  create () {
  },

  mounted () {
    // this.geolocate()
    let marker = {
      //  테스트 중이라서 위치를 고정
      //  실배포 할 때에는 현재 내 위치를 기반
      //   navigator.geolocation.getCurrentPosition(position => {
      //     this.center = {
      //       lat: position.coords.latitude,
      //       lng: position.coords.longitude
      //     }
      //   })
      lat: 37.340191,
      lng: 126.733529
    }
    this.markers.push({ position: marker })
    this.markers[0].icon = {url: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png'}
    axios
      .get('http://www.api.smokingspot.co.kr/api/v1/ashtray')
      .then((response) => {
        for (var i = 0; i < response.data.location.length; i++) {
          let marker = {
            lat: parseFloat(response.data.location[i].lat),
            lng: parseFloat(response.data.location[i].lng)
          }
          this.markers.push({ position: marker })
          this.markers[i + 1].icon = {url: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_yellow.png'}
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    this.$nextTick(() => {
      this.$refs.map.$gmapApiPromiseLazy().then(this.myLocationControls)
    })
  },

  ready () {
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      console.log(place)
      const marker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.center = marker
    },
    myLocationControls (map) {
      var controlDiv = document.createElement('div')
      var firstChild = document.createElement('button')
      firstChild.style.backgroundColor = '#fff'
      firstChild.style.border = 'none'
      firstChild.style.outline = 'none'
      firstChild.style.width = '28px'
      firstChild.style.height = '28px'
      firstChild.style.borderRadius = '1px'
      firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)'
      firstChild.style.cursor = 'pointer'
      firstChild.style.marginRight = '10px'
      firstChild.style.padding = '0px'
      firstChild.title = 'Your Location'
      controlDiv.appendChild(firstChild)
      var secondChild = document.createElement('div')
      secondChild.style.margin = '5px'
      secondChild.style.width = '18px'
      secondChild.style.height = '18px'
      secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)'
      secondChild.style.backgroundSize = '180px 18px'
      secondChild.style.backgroundPosition = '0px 0px'
      secondChild.style.backgroundRepeat = 'no-repeat'
      secondChild.id = 'you_location_img'
      firstChild.appendChild(secondChild)
      window.google.maps.event.addListener(this.$refs.map.$mapObject, 'center_changed', function () {
        secondChild.style['background-position'] = '0 0'
      })
      var ref = this
      firstChild.addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(position => {
          // let latlng = new window.google.maps.LatLng(
          //   parseFloat(position.coords.latitude),
          //   parseFloat(position.coords.longitude))
          ref.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          // ref.createMarker(latlng)
        })
      })
      controlDiv.index = 1
      this.$refs.map.$mapObject.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv)
    }
  }
}
</script>

<style scoped>
::-webkit-input-placeholder {
   text-align: center;
}
:-moz-placeholder { /* Firefox 18- */
   text-align: center;
}
::-moz-placeholder {  /* Firefox 19+ */
   text-align: center;
}
:-ms-input-placeholder {
   text-align: center;
}
</style>
