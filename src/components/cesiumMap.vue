<template>
    <div id="map"/>


</template>

<script>
    import mixins from "@/mixins";
    export default {
        name: 'HelloWorld',
        mixins: [
            mixins,
        ],
        data() {
            return {}
        },
        methods: {},
        mounted() {
            this.mapInit()
        }
    }
</script>
<style scoped>
    #map {
        width: 100vw;
        height: 100vh;
    }
</style>
