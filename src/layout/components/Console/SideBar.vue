<template>
  <b-col class="left-nav pt-3 offset-1" cols="2">
    <b-list-group class="pt-5">
      <br>
      <span class="h3 pb-3" style="text-align: center">Backend Console</span>
      <b-list-group-item
              href="javascript:void(0);"
              :active="this.$route.params['panel_name'] === 'ctgManage'"
      >
        <router-link
                tag="li"
                :to="{ name : 'ctgManage', params: { panel_name : 'ctgManage'}}">
          Manage Article Categories
        </router-link>
      </b-list-group-item>
      <b-list-group-item
              href="javascript:void(0);"
              :active="this.$route.params['panel_name'] === 'prfManage'"
      >
        <router-link
                tag="li"
                :to="{ name : 'prfManage', params: { panel_name : 'prfManage'}}">
          Manage Profile
        </router-link>
      </b-list-group-item>
    </b-list-group>
  </b-col>
</template>

<script>
    export default {
        name: "SideBar"
    }
</script>

<style scoped>
  .left-nav {
    height: 100%;
    background: burlywood;
    position: absolute;
    /*left: 10%;*/
  }
</style>
