<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <Header></Header>
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
import Header from "@/components/header/Header.vue";
// import Live from "@/components/live/Live.vue";
import {userLogin} from "@/api/user.js"
export default {
  components: {
    Footer,
    Header,
    // Live,
  },
  methods: {
    testAPI() {
      console.log("it is test");
      let data = {}
      userLogin(data).then(
        res=>{
          console.log(res)
        }
      )
    },
  },
};
</script>
<style>
#app .ant-layout-header {
  background-color: #fff;
  height: 80px;
}

#app .ant-layout-content {
  margin-top: 40px;
  /* background-color: green; */
  /* height: 1100px; */
}
#app .ant-layout-footer {
  height: 140px;
}
</style>


