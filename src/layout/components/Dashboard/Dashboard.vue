<template>
  <div class="dashboard ">
    <china-map></china-map>
  </div>
</template>

<script>
  import Map from "@/layout/components/ChinaMap/Map";
    export default {
        name: "Dashboard",
        components: {
            ChinaMap: Map
        },
        mounted : function () {

        }
    }
</script>

<style scoped>
  .dashboard {
    padding-top: 10%;
    padding-bottom: 10%;
    /*bottom: 20%;*/
    /*position: fixed;*/
    /*margin-top: 200px;*/
    /*width: 100%;*/
    /*height: 100%;*/
  }
</style>
