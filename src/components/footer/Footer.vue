<template>
  <div class="footer">
    <div class="footer-container m-center">
      <div class="footer-links">
        <ul>
          <li v-for="(item,index) in linkList" :key="index" class="link-item">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="copyright">
        <p>Academic conference live broadcast ©2021 Created by ECNUER</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      linkList: ["帮助中心", "意见反馈", "人才招聘", "友情链接"],
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.footer {
  width: 100%;
  height: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  background-color: #f7f9fb;
  text-align: center;
}
footer-container {
  position: relative;
}
.link-item {
  display: inline-block;
  padding: 0 10px;
  color: #b7bdc2;
  font-size: 14px;
  cursor: pointer;
}
.copyright {
  margin-top: 8px;
  padding-left: 10px;
  line-height: 24px;
  color: #b7bdc2;
  font-size: 12px;
}
</style>
