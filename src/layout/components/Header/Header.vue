<template>
  <b-navbar type="dark" variant="dark" fixed="top">
    <b-navbar-brand class="my-sm-1">
      Navigation
    </b-navbar-brand>
    <b-navbar-nav class="ml-lg-auto">
      <router-link :to="{ path: '/' }" tag="b-nav-item" class="pl-lg-5">Home</router-link>
      <router-link :to="{ path: '/articles' }" tag="b-nav-item" class="pl-lg-5">Articles</router-link>
<!--      <b-nav-item href="#" class="pl-lg-5">Pictures</b-nav-item>-->
<!--      <b-nav-item href="#" class="pl-lg-5">Discussions</b-nav-item>-->
      <router-link :to="{ path: '/aboutMe' }" tag="b-nav-item" class="pl-lg-5">About Me</router-link>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <router-link :to="{ path: '/mEditor'}" v-if="loginState">
        <b-button variant="danger" class="my-2 mr-3">
          <b-icon icon="pen" aria-hidden="true"></b-icon>
          Write
        </b-button>
      </router-link>
      <b-nav-item class="mr-lg-3">
        <router-link :to="{ path: '/contactMe'}">
          <b-button variant="light" class="mr-lg-2">
            <b-icon icon="envelope-fill" aria-hidden="true"></b-icon>
            Contact Me
          </b-button>
        </router-link>
      </b-nav-item>
      <router-link :to="{ path: '/login'}" v-if="!loginState">
        <b-button variant="light" class="my-2">
          <b-icon icon="box-arrow-right" aria-hidden="true"></b-icon>
          Login
        </b-button>
      </router-link>
      <b-nav-item>
        <b-dropdown class="mr-lg-5" text="User" variant="light" v-if="loginState">
          <template v-slot:button-content>
            <b-icon icon="person-fill" scale="1.8" class="mr-2">
            </b-icon>
            <span>{{name}}</span>
          </template>
          <router-link :to="{ path : '/console'}" tag="b-dropdown-item">Console</router-link>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="handleLogout">
            Logout
          </b-dropdown-item>
        </b-dropdown>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Header",
        computed: {
            ...mapGetters([
                'name',
                'loginState'
            ])
        },
        methods: {

            handleLogout() {

                this.$store.dispatch('user/logout');
                this.$router.push('/')
            },
        },
    }
</script>

<style scoped>

</style>
