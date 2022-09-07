<template>
  <div class="home">
    <cesiumMap />
  </div>
</template>

<script>
// @ is an alias to /src
import cesiumMap from "@/components/cesiumMap.vue";

export default {
  name: "HomeView",
  components: {
    cesiumMap,
  },
};
</script>
