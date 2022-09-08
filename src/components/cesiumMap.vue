<template>
    <div id="map"/>
    <zoom-in-and-out @zoomIn="zoomIn"
                     @zoomOut="zoomOut"
                     @distance="distance"
                     @area="area"
    />

</template>

<script>
    import * as Cesium from 'cesium';
    import mixins from "@/mixins";
    import zoomInAndOut from "@/components/tools/zoomInAndOut";
    export default {
        name: 'HelloWorld',
        components:{
            zoomInAndOut,
        },
        mixins: [
            mixins,
        ],
        data() {
            return {

            }
        },
        methods: {



        },

    }
</script>
<style scoped>
    #map {
        width: 100vw;
        height: 100vh;
    }
</style>
