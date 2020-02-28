<template>
  <div class="container">
    <b-card>
      <b-card-title class="h2">About Programming</b-card-title>
      <b-card-text>
        <h4>Technology Stack</h4>
        <ul>
          <li>
            Programming skills: J2SE, Vuejs, html5+css+javascript, JavaSpark
          </li>
          <li>
            Database: MySQL, Redis
          </li>
        </ul>
        <h4>Projects Experience</h4>
        <ul>
          <li>
            Course System(springboot + vuejs)
          </li>
          <li>
            Blog Website(springboot + vuejs)
          </li>
        </ul>
        <h4>English</h4>
        <ul>
          <li>CET-4</li>
          <li>CET-6</li>
        </ul>
      </b-card-text>
      <a href="https://github.com/proton991" class="card-link">Github Link</a>
    </b-card>
    <b-card>
      <b-card-title class="h2">Education</b-card-title>
      <b-card-sub-title>Majoring in Software Engineering at Fudan University</b-card-sub-title>
      <b-card-text class="pt-3">
        I am a junior now, a nobody doing trivial things, hoping that I could make a difference someday.
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
    export default {
        name: "developerInfo",
        data() {
            return {
                items: [
                    { Skill: 40,  },
                ]
            }
        }
    }
</script>

<style scoped>
  .container {
    /*padding-top: 195px;*/
    /*height: 100%;*/
    /*margin-top: 40px;*/
    padding-top: 5%;
    bottom: 0;
    right: 0;
    left: 0;
    min-width: 50%;
    box-sizing: border-box;
    min-height: 100%;
    width: 100%;
    position: absolute;
    background: whitesmoke;
  }

</style>
