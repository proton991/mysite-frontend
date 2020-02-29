<template>
  <b-form>
    <b-card class="mt-4 " header="Article Categories">
      <b-card-sub-title>
        You can only change the name of a category,
        or delete it when there are no articles of that category.
      </b-card-sub-title>
      <b-list-group class="pt-4 ctgList">
        <b-list-group-item
                v-for="category in categories"
                :key="category.categoryId"
        >
          <span style="display: inline">{{ category.categoryName}}</span>
          <b-button style="float: right" variant="info" @click="editCtg(category.categoryId)">edit</b-button>
          <b-button style="float: right" variant="danger" @click="deleteCtg(category.categoryId, category.categoryName)">
            delete
          </b-button>
        </b-list-group-item>
      </b-list-group>
    </b-card>
    <el-divider></el-divider>
    <span class="h4">Add new Categories</span>
    <b-form-group id="input-group-2" label="Category Name:" label-for="input-2">
      <b-form-input
              v-model="Category"
              required
              size="lg"
              style="width: 40%"
              placeholder="Enter Category..."
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary" @click="newCtg">Submit</b-button>
  </b-form>
</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    // eslint-disable-next-line no-unused-vars
    import {getArticleCategory, newCtg, editCtg, deleteCtg} from "@/api/article";
    export default {
        name: "ManageCtg",
        data() {
            return {
                Category: '',
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
            newCtg() {
                newCtg(this.Category).then(response => {
                    if (response.code === 200) {
                        Message({
                            message: 'Add category success!',
                            type: "success",
                            duration: 5000
                        });
                        getArticleCategory().then(response => {
                            const {data} = response;
                            this.categories = data;
                        });
                    }
                });

            },
            editCtg(id) {
                MessageBox.prompt('Please enter a new name', 'Edit', {
                    confirmButtonText: 'Submit',
                    cancelButtonText: 'Cancel',
                }).then(({value}) => {
                    editCtg(id, value).then(response => {
                        if (response.code === 200) {
                            Message({
                                message: 'edit success!',
                                type: "success",
                                duration: 500
                            });
                            getArticleCategory().then(response => {
                                const {data} = response;
                                this.categories = data;
                            })
                        }
                    })
                })
            },
            deleteCtg(id, name) {
                MessageBox.confirm('Delete Category?', 'Confirm', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    deleteCtg(id, name).then(response => {
                        if (response.code === 200) {
                            Message({
                                message: 'delete success!',
                                type: "success",
                                duration: 500
                            });
                            getArticleCategory().then(response => {
                                const {data} = response;
                                this.categories = data;
                            })
                        }
                        else {
                            Message({
                                message: response.message,
                                type: "error",
                                duration: 500
                            })
                        }
                    });

                }).catch(() => {
                    Message({
                        type: "info",
                        message: 'Canceled',
                        duration: 500
                    })
                })
            }
        }
    }
</script>

<style scoped>
  .ctgList{
    max-height: 300px;
    overflow-y: scroll;
  }
</style>
