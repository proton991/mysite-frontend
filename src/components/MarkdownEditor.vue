<template>
  <div>
    <div class="top-bar">
      <b-form inline>
        <router-link :to="{path: '/articles'}">
          <b-button variant="primary" size="lg" class="back-button">
            <b-icon icon="arrow-left"></b-icon>
            Back
          </b-button>
        </router-link>

        <span class="bar-tab">Edit Your Article</span>
        <b-input
                id="title-input"
                placeholder="Write your title here"
                v-model="article.title"
        ></b-input>
        <span class="bar-tab2">Category</span>
        <b-form-select
                class="offset-7"
                v-model="article.categoryName"
                :options="categories"
                required
        ></b-form-select>

        <b-button
                @click="post"
                variant="danger"
                size="lg"
                class="post-button"
        >
          <b-icon icon="cursor-fill">
          </b-icon>
          Post
        </b-button>
      </b-form>

    </div>
<!--    <div class="tag-bar">-->
<!--      <b-form-tags placeholder="Add tag for your article..."-->
<!--                   v-model="tags"-->
<!--                   tag-pills-->
<!--                   size="lg"-->
<!--                   class="offset-2"-->
<!--                   tag-variant="primary"-->
<!--                   style="width: 30%;">-->
<!--      </b-form-tags>-->
<!--    </div>-->
    <mavon-editor
            :ishljs=true
            language="en"
            :tabSize=4
            class="mavonEditor"
            @save="save"
            @change="onChange"
            v-model="this.article.bodyMd"
    >

    </mavon-editor>
  </div>

</template>

<script>
    import {Message} from 'element-ui'
    // eslint-disable-next-line no-unused-vars
    import {getArticleById, postArticle, editArticle, getArticleCategory} from "@/api/article";

    export default {
        name: "MarkdownEditor",
        data() {
            return {
                article: {
                    title: '',
                    bodyMd: '',
                    bodyHtml: '',
                    author: '',
                    state: '',
                    categoryId: '',
                    categoryName: ''
                },
                tags: [],
                categories: [],
                categoryMap: {}
            }
        },
        created: function () {
            if (this.$route.params["id"] !== undefined) {
                getArticleById(this.$route.params.id).then(response => {
                    const {data} = response;
                    this.article.title = data.title;
                    this.article.bodyMd = data.bodyMd;
                    this.article.bodyHtml = data.bodyHtml;
                    this.article.author = this.$store.state.user.name;
                    if (data.extra.category === null) {
                        this.article.categoryName = 'ALL';
                        this.article.categoryId = -1;
                    } else {
                        this.article.categoryName = data.extra.category.categoryName;
                        this.article.categoryId = data.extra.category.categoryId;
                    }
                });
            }
            getArticleCategory().then(response => {
                const {data} = response;
                const objList = data;
                for (let i = 0; i < objList.length; i++) {
                    this.categories.push(objList[i].categoryName);
                    this.categoryMap[objList[i].categoryName] = objList[i].categoryId;
                }
            })
            console.log(this.categoryMap);
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
                        duration: 800
                    });
                } else {
                    this.article.bodyHtml = render;
                    this.article.bodyMd = val;
                    this.article.author = this.$store.user.name;
                    this.article.state = 'draft';
                    this.article.categoryId = this.categoryMap[this.article.categoryName];
                    if (this.$route.params["id"] !== undefined) {
                        editArticle(this.$route.params["id"], this.article);
                    } else {
                        postArticle(this.article);
                    }

                }
            },
            post() {
                if (this.article.title === '') {
                    Message({
                        message: "Title can't be null!",
                        type: "error",
                        duration: 800
                    });

                } else {
                    this.article.author = this.$store.state.user.name;
                    this.article.state = 'published';
                    this.article.categoryId = this.categoryMap[this.article.categoryName];
                    console.log("edit article" + this.article);
                    if (this.$route.params["id"] !== undefined) {
                        editArticle(this.$route.params["id"], this.article).then(response => {
                            if (response.code === 200) {
                                Message({
                                    message: response.message,
                                    type: "success",
                                    duration: 800
                                })
                            } else {
                                Message({
                                    message: response.message,
                                    type: "error",
                                    duration: 800
                                })
                            }
                        })
                    } else {
                        postArticle(this.article).then(response => {
                            if (response.code === 200) {
                                Message({
                                    message: response.message,
                                    type: "success",
                                    duration: 800
                                })
                            } else {
                                Message({
                                    message: response.message,
                                    type: "error",
                                    duration: 800
                                })
                            }
                        })
                    }
                }
            }
        },
    }
</script>

<style scoped>
  .top-bar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: wheat;
  }
  .tag-bar {
    position: relative;
    top: 50px;
    height: auto;
    width: 100%;
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

  .bar-tab2{
    left: 58%;
    position: relative;
  }
  .mavonEditor {
    position: fixed;
    /*width: 800px;*/
    margin-top: 50px;
    width: 100%;
    height: 100%;
    /*tab-size: 4;*/
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
