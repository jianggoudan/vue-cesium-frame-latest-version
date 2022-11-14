<template>
    <div class="zoomInOut">
        <el-button type="primary" @click="zoomOut">放大</el-button>
        <el-button type="primary" @click="zoomIn">缩小</el-button>
        <el-button type="primary" @click="distance">测距</el-button>
        <el-button type="primary" @click="area">测面</el-button>
        <el-button type="primary" @click="changeLayer">切换地图</el-button>
    </div>
</template>

<script>

    export default {
        name: "zoomIn",
        data() {
            return {}
        },

        methods: {
            distance(){
                this.$emit('distance')
            },
            area(){
                this.$emit('area')
            },
            zoomIn(){
               this.$emit('zoomIn')

            },
            zoomOut(){
               this.$emit('zoomOut')
            },
            changeLayer(){
                this.$emit('changeLayer')
            },
        },
    }
</script>

<style scoped lang="scss">
    .zoomInOut{
        position: fixed;
        top: 300px;
        left: 300px;
        z-index: 1;
    }
</style>
