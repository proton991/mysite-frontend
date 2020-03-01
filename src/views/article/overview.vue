<template>
    <b-container fluid="true" style="overflow-x: hidden">
        <b-row cols="3" class="content">
            <b-col cols="3" class="left-blank">
                <Category
                        @change="filterArticleByCtg"
                >
                </Category>
            </b-col>
            <b-col cols="6" class="articles-list offset-3">
                <b-list-group>
                    <b-list-group-item class="mt-5"></b-list-group-item>
                    <b-breadcrumb class="mb-0">
                        <b-breadcrumb-item
                                v-for="(factor, index) in sortFactors"
                                :key="index"
                                active-class="background: yellow"
                                @click="sortArticle(index)"
                                :active="factor.property === filter.sort"
                        >
                            {{factor.text}}
                        </b-breadcrumb-item>
                    </b-breadcrumb>
                    <b-card
                            class="mt-3"
                            border-variant="light"
                            v-for="article in this.articles"
                            :key="article.articleId"
                    >
                        <b-card-title>
                            <h4>{{ article.title }}
                                <b-button style="float: right" variant="dark" v-if="loginState">
                                    <b-icon
                                            @click="deleteArticle(article.articleId)"
                                            icon="trash"
                                            variant="light"
                                    >
                                    </b-icon>
                                </b-button>
                            </h4>
                        </b-card-title>
                        <b-card-sub-title class="mb-3 mt-3">
              <span>
                author: {{ getAuthorStr(article.authors) }}
                | views: {{article.views}}
                | published time: {{ formatTime(article.createTime)}}
                | <span style="color: red">Category: {{article.extra.category.categoryName}}</span>
              </span>
                            <span style="float: right">
                <router-link
                        :to="{ name: 'articles', params: { id: article.articleId }}"
                        tag="a"
                        class="card-link">
                  View
                </router-link>
                <router-link v-if="loginState"
                             :to="{ name: 'edit', params: { id: article.articleId }}"
                             tag="a"
                             class="card-link">
                  Edit
                </router-link>

              </span>
                        </b-card-sub-title>
                        <el-divider></el-divider>
                        <b-card-text>
                            {{ article.bodyMd.slice(0, 50) }}...
                        </b-card-text>
                        <template v-slot:footer>
                            <small class="text-muted">Last updated: {{ formatTime(article.updateTime)}}</small>
                        </template>
                    </b-card>

                </b-list-group>
                <vue-pagination
                        @change="pageChange"
                        class="pageNav"
                        :page-config="pageConfig">
                </vue-pagination>
            </b-col>
            <b-col cols="3" class="right-blank">
                <side-nav @change="searchArticle"></side-nav>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    import {deleteArticle, filterArticle} from "@/api/article";
    import {formatTime} from "@/utils/timeParser"
    import {mapGetters} from "vuex";
    import VuePagination from "@/layout/components/Pagination/VuePagination";
    import Category from "@/layout/components/ArticleCategory/Category";
    import SideNav from "@/layout/components/SideBar/SideNav";

    export default {
        name: "overview",
        components: {
            VuePagination,
            Category,
            SideNav
        },
        data() {
            return {
                filter: {
                    categoryId: -1,
                    sort: 'default',
                    keyword: ''
                },
                // currentSortProperty: 'default',
                sortFactors: [
                    {text: 'Default', property: 'default'},
                    {text: 'Hottest', property: 'views'},
                    {text: 'Latest Published', property: 'createTime'},
                    {text: 'Latest Updated', property: 'updateTime'},

                ],
                // categoryId: -1,
                articles: [],
                pageConfig: {pageSize: 5, currentPage: 1, totalPages: 0}
            }

        },
        computed: {
            ...mapGetters([
                'loginState'
            ])
        },
        methods: {
            formatTime(time) {
                return formatTime(time, "")
            },
            getAuthorStr(authorList) {
                let authorStr = "";
                for (let i = 0; i < authorList.length; i++) {
                    authorStr += authorList[i]["username"];
                }
                return authorStr;
            },
            deleteArticle(id) {
                console.log(id);
                MessageBox.confirm('delete article?', 'Confirm', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    deleteArticle(id).then(response => {
                        if (response.code === 200) {
                            Message({
                                message: response.message,
                                type: "success",
                                duration: 500
                            })
                        } else {
                            Message({
                                message: response.message,
                                type: "error",
                                duration: 500
                            })
                        }
                    });
                    location.reload();
                    // this.$router.push('/articles');
                }).catch(() => {
                    Message({
                        type: "info",
                        message: 'Canceled',
                        duration: 500
                    })
                });

            },
            pageChange(page) {
                // eslint-disable-next-line no-debugger
                // debugger
                this.pageConfig.currentPage = page;
                this.filterArticleByCtg(this.categoryId);

            },
            filterArticleByCtg(id) {
                this.filter.categoryId = id;
                filterArticle(this.filter, this.pageConfig.currentPage, this.pageConfig.pageSize).then(response => {
                    const {data} = response;
                    this.articles = data.articles;
                    this.pageConfig.totalPages = data.totalPages;
                });

            },
            sortArticle(index) {
                console.log("sortArticle: ");
                const factor = this.sortFactors[index];
                this.filter.sort = factor.property;
                filterArticle(this.filter, this.pageConfig.currentPage, this.pageConfig.pageSize).then(response => {
                    const {data} = response;
                    this.articles = data.articles;
                    this.pageConfig.totalPages = data.totalPages;
                });


            },
            searchArticle(keyword) {
                this.filter.keyword = keyword;
                filterArticle(this.filter, this.pageConfig.currentPage, this.pageConfig.pageSize).then(response => {
                    const {data} = response;
                    this.articles = data.articles;
                    this.pageConfig.totalPages = data.totalPages;
                });
            }
        },
        mounted: function () {

            filterArticle(this.filter, this.pageConfig.currentPage, this.pageConfig.pageSize).then(response => {
                const {data} = response;
                this.articles = data.articles;
                this.pageConfig.totalPages = data.totalPages;
            });

        }
    }
</script>

<style scoped>
    .articles-list {
        /*overflow-x: hidden;*/
        min-height: 100%;
        background: whitesmoke;
        position: absolute;


    }

    .pageNav {
        bottom: 0;
        position: relative;
        /*bottom: 40px;*/
        /*left: 40%;*/
    }

    .left-blank {
        left: 0;
        height: 100%;
        position: fixed;
        /*background: sandybrown;*/
    }

    .right-blank {
        right: 0;
        height: 100%;
        position: fixed;
        /*background: turquoise;*/
    }

    .article-card {
        margin-top: 5%;
        position: fixed;
        width: 100%;
    }
</style>
