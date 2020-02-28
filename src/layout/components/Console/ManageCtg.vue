<template>
  <b-form>
    <b-card class="mt-4 " header="Article Categories">
      <b-card-sub-title>
        You can only change the name of a category,
        or delete it when there are no articles of that category.
      </b-card-sub-title>
      <b-list-group class="pt-4">
        <b-list-group-item>
          <span style="display: inline">sad</span>
          <b-button style="float: right" variant="info">edit</b-button>
          <b-button style="float: right" variant="danger">delete</b-button>
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
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
    export default {
        name: "ManageCtg",
        data() {
            return {
                Category: '',
            }
        },
    }
</script>

<style scoped>
</style>
