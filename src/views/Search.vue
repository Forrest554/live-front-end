<template>
  <div class="letc-box">
    <div class="content">
      <a-row :gutter="16">
        <a-col v-for="(item,index) in lectureList" :key="item.id" :span="8">
          <a-card hoverable style="width: 320px" @click="goVideo(index)" class="card">
            <img slot="cover" alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            <template slot="actions" class="ant-card-actions">
              <a-icon key="star" type="star" />
              <a-icon key="edit" type="edit" />
              <a-icon key="ellipsis" type="ellipsis" />
            </template>
            <a-card-meta :title="item.title" :description="item.subject">
              <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>

    </div>
  </div>
</template>

<script>
import { _searchLecture } from "@/api/lecture.js";
export default {
  data() {
    return {
      lectureList: {},
    };
  },
  components: {},
  methods: {
    goPost() {
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
      let step = distance / 30; //每步的距离
      (function jump() {
        if (distance > 0) {
          distance -= step;
          window.scrollTo(0, distance);
          setTimeout(jump, 10);
        }
      })();
    },
    goVideo(index) {
      let lecture = this.lectureList[index];
      let videoUrl = "http://1011.hlsplay.aodianyun.com/demo/game.flv";
      let params = {
        videoUrl: videoUrl,
      };
      params = Object.assign(params, lecture);
      this.$router.push({
        name: "Live",
        params: params,
      });
    },
    onSearch(searchStr) {
      let data = {
        name: "title",
        value: searchStr,
      };
      _searchLecture(data).then((res) => {
        if (res.message == "success") {
          this.lectureList = res.data;
        } else {
          this.$message.error("搜索失败");
        }
      });
    },
    routeUpdate() {
      console.log(this.$route);
      let searchName = this.$route.query.searchName;
      this.onSearch(searchName);
    },
  },
  watch: {
    $route: "routeUpdate",
  },
  mounted() {
    let searchName = this.$route.query.searchName;
    this.onSearch(searchName);
  },
};
</script>

<style  scoped>
.letc-box {
  position: relative;
}
.content {
  margin-bottom: 10px;

  /* background-color: red; */
  /* height: 800px; */
}
.card {
  margin-left: 80px;
  margin-bottom: 10px;
}
.ant-pagination {
  position: absolute;
  left: 50%;
  bottom: -30px;
  margin-left: -166px;
}
</style>