<template lang="html">
  <div
    ref="travelMap"
    class="travel-map">
    <svg
      id="map"
      :width="width"
      :height="height"
       shape-rendering="geometricPrecision"
      :class="{'debug': debug}">

      <g class="background">
        <path
          :d="path(graticule())"
          class="graticule"/>
        <path
          :d="path(land)"
          class="land"/>
      </g>

      <g class="countries">
        <path
          :d="path(visitedCountries)"
          class="visited"/>
        <path
          :d="path(borders)"
          class="borders"/>
        <path
          v-for="(country, i) in debugCountry"
          :key="`country_${i}`"
          :d="path(country)"
          fill="gold"
          stroke="black"
          stroke-width="1px"
          @click="addVisitedIds(country)"/>
      </g>

      <g class="trip-drawing">
        <g
          :transform="translater(tripPointsProjected[0].coords)"
          class="start-trip-point">
          <line
            :x1="-4"
            :y1="-4"
            :x2="4"
            :y2="4"/>
          <line
            :x1="-4"
            :y1="4"
            :x2="4"
            :y2="-4"/>
        </g>
        <g
          :transform="translater(tripPointsProjected[tripPointsProjected.length - 1].coords)"
          class="end-trip-point">
          <circle
            :cx="0"
            :cy="0"
            r="5"/>
          <circle
            :cx="0"
            :cy="0"
            r="2"/>
        </g>

        <path
          :d="path(tripLine)"
          class="trip-line"/>
      </g>
    </svg>
  </div>
</template>

<script>
import { geoPath, geoConicConformal, geoGraticule } from 'd3-geo'
import { mapState } from 'vuex'
import { feature, merge, mesh } from 'topojson'
import geodata from '@/assets/geodata/50m.json'

export default {
  name: 'TravelMap',

  data () {
    return {
      debug: false,
      loaded: false,
      width: 0,
      height: 0,
      scale: 500,
      translate: [0, 0],
      borders: [],
      land: [],
      debugVisited: [],
      debugCountry: [],
      rotate: [0, 19],
      publicPath: process.env.BASE_URL,
      centeringCountries: null,
      visitedCountries: null
    }
  },

  computed: {
    ...mapState({
      // rotate: state => state.mapParams.rotate,
      centeringIds: state => state.mapParams.centeringIds,
      visitedIds: state => state.mapParams.visitedIds,
      tripPoints: state => state.mapParams.tripPoints,
      isItAMobile: state => state.isItAMobile
    }),

    projection () {
      return geoConicConformal()
        .scale(this.scale)
        .rotate(this.rotate)
        .translate(this.translate)

    },

    path () {
      return geoPath(this.projection).pointRadius(2.5)
    },

    tripPointsProjected () {
      return this.tripPoints.map(p => {
        let projected = {...p}
        projected.coords = this.projection(p.coords)
        return projected
      })
    },

    graticule () {
      return geoGraticule().step([4, 4])
    },

    tripLine () {
      let res = {type: 'LineString', coordinates: []}
      this.tripPoints.map(p => {
        res.coordinates.push(p.coords)
      })
      return res
    },

    percent () {
      return this.isItAMobile ? 0.98 : 0.95
    }
  },

  mounted () {
    // let geodata = this.isItAMobile ? `${this.publicPath}geodata/110m.json` : `.${this.publicPath}geodata/50m.json`
    // console.log('geodata', geodata);
    // geodata = require(geodata)
    // console.log(geodata);
    this.borders = mesh(geodata, geodata.objects.countries, (a, b) => a !== b)
    this.land = feature(geodata, geodata.objects.land)
    this.centeringCountries = merge(geodata, geodata.objects.countries.geometries.filter(d => this.centeringIds.includes(d.id)))
    this.visitedCountries = merge(geodata, geodata.objects.countries.geometries.filter(d => this.visitedIds.includes(d.id)))

    // DEBUG:
    // this.debugCountry = feature(g, g.objects.countries).features

    this.setupListeners()
    this.setDimensions()
  },

  beforeDestroy () {
    this.removeListeners()
  },

  methods: {
    addVisitedIds (d) {
      if (!this.debug) return
      let index = this.debugVisited.indexOf(d.id)
      if (index === -1) this.debugVisited.push(d.id)
      // eslint-disable-next-line
      console.log(d.id)
      if (this.isItAMobile) window.prompt('pays visités', this.debugVisited.join(','));
    },

    setupListeners () {
      window.addEventListener('resize', this.setDimensions)
    },

    removeListeners () {
      window.removeEventListener('resize', this.setDimensions)
    },

    setDimensions () {
      // setup dimensions
      let e = this.$refs.travelMap
      let cs = getComputedStyle(e)
      let h = e.clientHeight;
      let w = e.clientWidth;

      h -= parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      w -= parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);

      this.width = w
      this.height = h

      // Center map
      var projection = geoConicConformal()
          .scale(1)
          .rotate(this.rotate)
          .translate([0, 0]);

      // Create a path generator.
      var path = geoPath(projection)

      // Compute the bounds of a feature of interest, then derive scale & translate.
      var b = path.bounds(this.centeringCountries),
          s = this.percent / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h),
          t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];

      // Update the projection to use computed scale & translate.
      this.scale = s
      this.translate = t
    },

    translater (coords) {
      return `translate(${coords[0]}, ${coords[1]})`
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variables";

.travel-map{
  margin: auto;
  margin-bottom: 48px;

  svg{
    display: block;
    fill: none;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    height: 170px;

    .background{
      .land{
        pointer-events: none;
        fill: $landcolor;
      }
      .graticule{
        fill: none;
        stroke: $graticulecolor;
        stroke-width: 0.1px;
      }
    }

    .countries{

      .borders{
        pointer-events: none;
        fill: none;
        stroke: $bordercolor;
        stroke-width: 0.5px;
      }

      .visited{
        pointer-events: none;
        fill: $visitedcolor;
        stroke: $bordercolor;
        stroke-width: 0.2px;
      }
      .centering{
        fill: tomato;
      }
    }

    .trip-drawing{
      line{
        stroke: $tripcolor;
        stroke-width: 1.5;
        pointer-events: none;
      }
      .end-trip-point{
        circle:nth-child(1){
          stroke: $tripcolor;
          stroke-width: 1.5;
          fill: none;
          pointer-events: none;
        }
        circle:nth-child(2){
          fill: $tripcolor;
          stroke: none;
        }
      }

      .trip-line{
        fill: none;
        stroke: $tripcolor;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 3,3;
        pointer-events: none;
        shape-rendering: optimizeQuality
      }
    }
  }
}
@media only screen and (min-width: 620px) {
  .travel-map{
    svg{
      height: 300px
    }
  }
}
@media only screen and (min-width: 950px) {
  .travel-map{
    svg{
      height: 450px;
    }
  }
}
</style>
