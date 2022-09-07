
import * as Cesium from 'cesium';
import 'cesium/Source/Widgets/widgets.css';
export default {

    data(){
        return {
            viewer: null,
        }
    },
    methods:{
        //初始化地图
        mapInit() {
            Cesium.Ion.defaultAccessToken = window.CESIUM_TOKEN;
            this.viewer = new Cesium.Viewer('map', {
                terrainProvider: Cesium.createWorldTerrain(),
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
                navigationHelpButton: false,
                fullscreenButton:false,
            });
            this.viewer.cesiumWidget.creditContainer.style.display = "none";//去掉logo
        },
    },
}
