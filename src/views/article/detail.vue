<template>
  <b-container fluid="true" class="article-container">
    <b-row cols="1">
      <b-col cols="9" class="article">
        <b-button variant="primary" size="lg" class="mb-3" @click="pageBack"><b-icon icon="arrow-left"></b-icon>Back</b-button>
        <b-card>
          <b-card-title>
            <h1>{{ article['title']}}</h1>
          </b-card-title>
          <b-card-sub-title>
            <h5>
              &nbsp;&nbsp;Author: {{ article["authors"]}}&nbsp;&nbsp;
              |&nbsp;&nbsp;Published Time: {{article["createTime"]}}&nbsp;&nbsp;
              |&nbsp;&nbsp;Last Updated Time: {{article["updateTime"]}}
              |&nbsp;&nbsp;Views: {{article["views"]}}
              |&nbsp;&nbsp;<span style="color: red">Category: {{article.extra.category.categoryName}}</span>
            </h5>
          </b-card-sub-title>
          <el-divider></el-divider>
          <b-card-text v-highlight v-html="article['bodyHtml']">
          </b-card-text>
        </b-card>
        <b-button variant="dark" @click="pressLike" ><b-icon icon="heart"></b-icon>Like</b-button>
      </b-col>
<!--      <b-col cols="1" class="right-blank">-->
<!--      </b-col>-->
    </b-row>
  </b-container>
</template>

<script>
    import {getArticleById} from "@/api/article";
    import {formatTime} from "@/utils/timeParser"
    export default {
        name: "detail",
        data: function () {
            return {
                article: {}
            }
        },
        mounted: function () {

            getArticleById(this.$route.params.id).then(response => {
                const {data} = response;
                this.article = data;
                // console.log(this.article);
                let authorStr = "";
                const authorList = this.article.authors;
                for (let i = 0; i < authorList.length; i++) {
                    authorStr += authorList[i]["username"];
                }
                this.article.authors = authorStr;
                this.article.createTime = formatTime(this.article.createTime, "");
                this.article.updateTime = formatTime(this.article.updateTime, "");
                console.log(this.article)
            });
        },
        methods: {
            pressLike() {

            },
            pageBack() {
                history.back();
              // this.$router.go(-1);
            }
        }

    }
</script>

<style scoped>
  .article-container {
    /*overflow-x: hidden;*/
  }
  .article {

    overflow-y: scroll;
    /*overflow-y: scroll;*/
    /*white-space: nowrap;*/
    top: 65px;
    background: whitesmoke;
    height: 100%;
    left: 15%;
    position: absolute;
  }

  .left-blank {
    top: 65px;
    height: 50%;
    position: relative;
  }

  .right-blank {
    right: 1%;
    height: 100%;
    position: fixed;
    background: darkorchid;
  }

</style>
