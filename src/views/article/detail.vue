<template>
  <b-container fluid="true" class="article-container">
    <b-row cols="1">
<!--      <b-col cols="2" class="left-blank">-->
<!--      </b-col>-->
      <b-col cols="9" class="article">
        <b-card class="mt-3 mb-5">
          <b-card-title>
            <h1>{{ article['title']}}</h1>
          </b-card-title>
          <b-card-sub-title>
            <h4>
              &nbsp;&nbsp;Author: {{ article["authors"]}}&nbsp;&nbsp;
              |&nbsp;&nbsp;Published Time: {{article["createTime"]}}&nbsp;&nbsp;
              |&nbsp;&nbsp;Last Updated Time: {{article["updateTime"]}}
              |&nbsp;&nbsp;Views: {{article["views"]}}
            </h4>
          </b-card-sub-title>
          <el-divider></el-divider>
          <b-card-text v-highlight v-html="article['bodyHtml']">
          </b-card-text>
        </b-card>
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
            //
        }

    }
</script>

<style scoped>
  .article-container {
    /*overflow: -moz-scrollbars-vertical;*/
  }
  .article {
    overflow-y: scroll;
    /*white-space: nowrap;*/
    top: 65px;
    width: 100%;
    background: whitesmoke;
    height: 90%;
    left: 15%;
    position: fixed;
  }

  .left-blank {
    left: 0;
    height: 100%;
    position: fixed;
    background: indianred;
  }

  .right-blank {
    right: 1%;
    height: 100%;
    position: fixed;
    background: darkorchid;
  }

</style>
