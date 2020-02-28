<template>
  <b-container id="home">
    <dashboard class="dsBoard"></dashboard>
<!--    <b-row class="mt-auto ml-auto mr-auto content" cols="1">-->
<!--      <b-col class="pt-4 mt-5 pl-5" cols="3">-->
<!--        <b-card-->
<!--                class="sideCard"-->
<!--                no-body-->
<!--                style="max-width: 350px;"-->
<!--                :img-src=picUrl1-->
<!--                img-alt="Image"-->
<!--                img-top-->
<!--        >-->
<!--          <b-card-header><h4>Welcome To My Blog</h4></b-card-header>-->
<!--          <b-card-img-->
<!--                  :src="picUrl2" >-->
<!--          </b-card-img>-->
<!--        </b-card>-->
<!--      </b-col>-->
<!--      <b-col cols="8">-->
<!--        <dashboard></dashboard>-->
<!--      </b-col>-->
<!--      <b-col class="pt-4 mt-5 pl-5" cols="2">-->
<!--        <b-card-->
<!--                no-body-->
<!--                style="min-width: 350px;"-->
<!--                class="sideCard2"-->
<!--        >-->
<!--          <b-card-title>-->
<!--            Enjoy Your Reading!-->
<!--          </b-card-title>-->
<!--          <b-card-img-->
<!--                  :src="right"></b-card-img>-->
<!--        </b-card>-->
<!--      </b-col>-->
<!--    </b-row>-->
  </b-container>

</template>

<script>
    import Dashboard from "@/layout/components/Dashboard/Dashboard";
    export default {
        name: "index",
        components: {
            Dashboard: Dashboard,
            // headerNav: Header,
        },
        // mounted: function () {
        //     this.picUrl1 = getPicUrl('left1.jpg');
        //     this.picUrl2 = getPicUrl('left2.jpg');
        //     this.right = getPicUrl('right.jpg');
        //     console.log(this.right);
        // },
        data() {
            // console.log(getPicUrl('left1.jpg'));
            return {
                picUrl1: '',
                picUrl2: '',
                right: ''
            }
        }
    }
</script>

<style scoped>
  .dsBoard{
  }
  #home {

    /*overflow-y: auto;*/
    /*position: relative;*/
  }

  .sideCard {
    /*bottom: 0;*/
    /*left: 0;*/
  }

  .sideCard2 {
    /*right: 180px;*/
    /*top: 100px;*/
    /*margin-top: -880px;*/
    /*height: 890px;*/
    /*position: fixed;*/
  }

</style>
