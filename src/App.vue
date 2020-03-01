<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <header-nav></header-nav>
    </keep-alive>
    <keep-alive v-if="$route.meta.bgParticle">
      <vue-particles id="particles-js"
                     color="#fff"
                     :particleOpacity="0.7"
                     :particlesNumber="60"
                     shapeType="circle"
                     :particleSize="1"
                     linesColor="#fff"
                     :linesWidth="1"
                     :lineLinked="true"
                     :lineOpacity="0.4"
                     :linesDistance="150"
                     :moveSpeed="2"
                     :hoverEffect="true"
                     hoverMode="grab"
                     :clickEffect="true"
                     clickMode="push"
      >
      </vue-particles>
    </keep-alive>
    <keep-alive>
      <router-view  v-if="$route.meta.isOverview">
      </router-view>
    </keep-alive>
      <router-view  v-if="!$route.meta.isOverview">

      </router-view>



  </div>
</template>

<script>
    import Header from "@/layout/components/Header/Header";
    import Footer from "@/layout/components/Footer/Footer";

    export default {
        name: 'App',
        components: {
            headerNav: Header,
            // eslint-disable-next-line vue/no-unused-components
            footerNav: Footer
        },
        mounted: function () {


        }
    }
</script>

<style>
  #app {
    z-index: auto;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    /*background: black;*/
    height: 100%;
    /*padding-bottom: 50px;*/
    /*position: relative;*/
    /*overflow-y: scroll;*/
  }

  #particles-js {
    width: 100%;
    height: 100%;
    z-index: auto;
    background: deepskyblue;
    position: fixed;
  }


</style>
