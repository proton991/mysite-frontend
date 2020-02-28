<template>
  <div id="loginPage">
    <keep-alive v-if="$route.meta.keepAlive">
      <header-nav></header-nav>
    </keep-alive>
    <div class="img-container">
      <b-img thumbnail fluid src="https://picsum.photos/370/250/?image=99" alt="Image 1"></b-img>
    </div>

    <b-form @reset="onReset" v-if="show" class="loginForm">

      <b-form-group
              id="input-group-1"
              label="Username"
              label-for="input-1"
      >
        <span class="svg-container">
            <svg-icon icon-class="user"/>
        </span>
        <b-form-input
                v-model="form.username"
                required
                placeholder="Username"
        >
        </b-form-input>

      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <span class="svg-container">
            <svg-icon icon-class="password"/>
        </span>
        <b-form-input
                v-model="form.password"
                required
                type="password"
                placeholder="Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="button" variant="primary" @click="handleLogin2">Login</b-button>
      <b-button type="reset" variant="danger" class="reset-button">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
    import Header from "@/layout/components/Header/Header";
    import {login} from '@/api/user'

    export default {
        name: "index",
        components: {
            headerNav: Header
        },
        data() {
            return {
                form: {
                    username: "",
                    password: "",
                },
                show: true
            }
        },
        watch: {
            $route: {
                handler: function(route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        methods: {
            handleLogin2() {
                this.$store.dispatch('user/login', this.form).then(() => {
                    this.$router.push({ path: this.redirect || '/'})
                }).catch(error => {
                    console.log(error)
                    // alert(error)
                })
            },
            handleLogin() {
                // alert(JSON.stringify(this.form));
                console.log(this.form);
                login({username: this.form.username, password: this.form.password}).then(response => {
                    console.log(JSON.stringify(response.data));
                    alert(JSON.stringify(response.data));

                    this.$router.push({ path: this.redirect || '/'})
                }).catch(error => {
                    alert(error)
                })
            },
            onReset() {
                // evt.preventDefault();
                // Reset our form values
                this.form.username = '';
                this.form.password = '';
                // Trick to reset/clear native browser form validation state
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>

<style scoped>
  #loginPage {
    /*top: 50%;*/
  }

  .loginForm {
    /*offset: 50%;*/
    position: fixed;
    width: 20%;
    left: 40%;
    padding-top: 15%;
    /*top: 40%;*/
    /*text-align: center;*/
    /*background: black;*/
  }

  .reset-button {
    /*text-align: center;*/

    float: right;
    left: 40%;
    margin-right: 0;
  }

  .img-container {
    /*height: 40%;*/
    /*width: 30%;*/
    left: 40%;
    position: fixed;
  }

  .svg-container {

  }
</style>
