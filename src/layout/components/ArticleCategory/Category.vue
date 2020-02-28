<template>
  <div class="category-nav">
    <span class="h2" style="font-family: Serif">
      Category
    </span>

    <b-list-group style="text-align: center">
      <b-list-group-item>
        <a href="javascript:void(0)" @click="filterByCtg(-1)">ALL</a>
      </b-list-group-item>
      <b-list-group-item
              v-for="category in categories"
              :key="category.categoryId"
      >
        <a href="javascript:void(0)" @click="filterByCtg(category.categoryId)">{{category.categoryName}}</a>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

    import {getArticleCategory} from "@/api/article";
    export default {
        name: "Category",
        data() {
            return {
                categories: []
            }
        },
        mounted: function() {
            getArticleCategory().then(response => {
                const {data} = response;
                this.categories = data;
            })
        },
        methods: {
            filterByCtg(id) {
                console.log(id)
                this.$emit('change', id);
            }
        }
    }
</script>

<style scoped>
  .category-nav {
    border-width: 1pt;
    border-style: solid;
    background: wheat;
    /*position: relative;*/
    margin-top: 20%;
    margin-left: 10%;
    /*height: 60%;*/
    width: 80%;
  }

  /*.category-nav li {*/
  /*  list-style: none;*/
  /*  text-decoration: none;*/
  /*}*/
</style>
