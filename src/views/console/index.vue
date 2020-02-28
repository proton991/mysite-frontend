<template>

  <b-container fluid="true" class="outer">
    <b-row cols="2">
      <SideBar></SideBar>
      <b-col cols="6" class="console-panel offset-3">
        <keep-alive v-if="this.$route.params['panel_name'] === 'ctgManage'">
          <manage-ctg>
          </manage-ctg>
        </keep-alive>
        <keep-alive v-if="this.$route.params['panel_name'] === 'prfManage'">
          <manage-prf>
          </manage-prf>
        </keep-alive>
      </b-col>
    </b-row>
  </b-container>


</template>

<script>
    import SideBar from "@/layout/components/Console/SideBar";
    import ManageCtg from "@/layout/components/Console/ManageCtg";
    import ManagePrf from "@/layout/components/Console/ManagePrf";
    export default {
        name: "index",
        components: {
            SideBar,
            ManageCtg,
            ManagePrf
        },
        data() {
            return {
                Category: '',
            }
        },
    }
</script>

<style scoped>
  .outer {
    /*box-sizing: border-box;*/
    height: 100%;
    overflow-x: hidden;
  }


  .console-panel {
    padding-top: 5%;
    height: 100%;
    position: absolute;
    background: lightgray;
    /*border-style: wave;*/
    border-width: thin;
  }

</style>
