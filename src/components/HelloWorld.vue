<template>
  <div id="map">

  </div>
</template>

<script>
  //引入cesium
  import * as Cesium from 'cesium';
  import 'cesium/Source/Widgets/widgets.css';
  export default {
    name: 'HelloWorld',
  data(){
      return{
        TianMapImage : new Cesium.WebMapTileServiceImageryProvider({
          url: "http://t0.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=a3dfb742357fb07dfca6a7ec78d89359",
          layer: "img",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "EPSG:4326",
          tilingScheme: new Cesium.GeographicTilingScheme(),
          tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']
        })
      }
  },
    setup(){
      //注意要配置

      // window.CESIUM_BASE_URL = '/cesium/';
      //你申请的token
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYzcwZmJmNi02MzQ5LTQ1MGEtODgzMy0yZTZiZGExY2MzMGMiLCJpZCI6MTAxOTgsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJnYyJdLCJpYXQiOjE1ODEzMDgxNTR9.NeJU4yfUi-SnLrNDOBYsQgmiSh3B4axCTi1m84Qw99c';
    },
    mounted(){
      // "cesiumContainer"是需要渲染地图的dom的id.
      const viewer = new Cesium.Viewer('map', {
        terrainProvider: Cesium.createWorldTerrain(),
        imageryProvider: this.TianMapImage,
        scene3DOnly: true,
        // baseLayerPicker:true,
        animation: false,
        timeline: false,
        geocoder: false,
        homeButton: false,
        navtrueigationHelpButton: false,
        infoBox: false,
        selectionIndicator: false,//去除自带绿色选择框
        baseLayerPicker: false,
        navigationHelpButton: false
      });


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map{
    width: 100vw;
    height: 90vh;
  }
</style>
