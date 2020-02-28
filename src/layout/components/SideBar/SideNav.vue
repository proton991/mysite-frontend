<template>
  <div>
    <div id="sidebar-wrapper">
      <b-form-group>
        <b-form-input placeholder="Search Article..." v-model="keyword">Search Article</b-form-input>
        <b-button style="float: right">Search<b-icon icon="search"></b-icon></b-button>
      </b-form-group>
      <span class="h4">Search Results: </span>
      <br>
      <span class="h5">relative articles: {{relativeArticles}}</span>

    </div> <!-- /#sidebar-wrapper -->
  </div>


</template>

<script>
    export default {
        name: "SideNav",
        data() {
            return {
                keyword: '',
                relativeArticles: 0
            }
        }
    }
</script>

<style scoped>
  #sidebar-wrapper {
    margin-top: 20%;
    /*height: 30%;*/
    width: 80%;
    border-radius: 11px;
    border-style: groove;
    border-width: 10px;
  }
</style>
