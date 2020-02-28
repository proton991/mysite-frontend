<template>
  <div>
    <div class="top-bar">
      <b-form inline>
        <router-link :to="{path: '/'}">
          <b-button variant="primary" size="lg" class="back-button">
            <b-icon icon="arrow-left"></b-icon>Back
          </b-button>
        </router-link>

        <span class="bar-tab">Edit Your Article</span>
        <b-input
                id="title-input"
                placeholder="Write your title here"
                v-model="article.title"
        ></b-input>
        <b-button
                @click="post"
                variant="danger"
                size="lg"
                class="post-button"
        >
          <b-icon icon="cursor-fill">
          </b-icon>Post
        </b-button>
      </b-form>

    </div>
    <mavon-editor
            :ishljs=true
            language="en"
            codeStyle="idea"
            class="markdown-editor"
            @save="save"
            @change="onChange"
            value="sdasdsa"
    >

    </mavon-editor>
  </div>

</template>

<script>
    import { Message } from 'element-ui'
    import { postArticle, getArticleById } from "@/api/article";
    import {formatTime} from "@/utils/timeParser";

    export default {
        name: "MarkdownEditor",
        data() {
            return {
                article: {
                    title: '',
                    bodyMd: '',
                    bodyHtml: '',
                    author: '',
                    state: ''
                }
            }
        },
        mounted: function(){
            getArticleById(this.$route.params.id).then(response => {
                const {data} = response;
                this.article.title = data.title;
                this.article.bodyMd = data.bodyMd;
                this.article.bodyHtml = data.bodyHtml;
                this.article.author = this.$store.user.name;
                console.log(this.article)
            });
        },
        methods: {
            onChange(val, render) {
                this.article.bodyMd = val;
                this.article.bodyHtml = render;
            },
            save(val, render) {
                if (this.article.title === '') {
                    Message({
                        message: "Title can't be null!",
                        type: "error",
                    });
                } else {
                    this.article.bodyHtml = render;
                    this.article.bodyMd = val;
                    this.article.author = this.$store.user.name;
                    this.article.state = 'draft';
                    postArticle(this.article);
                }
                console.log(val);
                console.log(render);
            },
            post() {
                if (this.article.title === '') {
                    Message({
                        message: "Title can't be null!",
                        type: "error"
                    });
                }
                else {
                    // this.article.bodyHtml = render;
                    // this.article.bodyMd = val;
                    this.article.author = this.$store.state.user.name;
                    this.article.state = 'published';
                    console.log(this.article);
                    postArticle(this.article).then(response => {
                        if (response.code === 200) {
                            Message({
                                message: response.message,
                                type: "success"
                            })
                        }
                        else {
                            Message({
                                message: response.message,
                                type: "error"
                            })
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
  .top-bar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: whitesmoke;
  }
  #title-input {
    /*height: 65px;*/
    position: fixed;
    /*margin-top: 10px;*/
    width: 50%;
    height: 40px;
    margin-left: 20rem;
  }
  .markdown-editor {
    position: fixed;
    /*width: 800px;*/
    margin-top: 50px;
    width: 100%;
    height: 100%;
    tab-size: 4;
  }
  .bar-tab {
    position: relative;
    left: 5%;
  }
  .post-button {
    margin-top: 0;
    right: 0;
    position: fixed;
  }
</style>
