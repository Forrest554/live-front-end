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
    <a-pagination :current="page" :total="total*12" show-less-items @change="onChange" />
  </div>
</template>

<script>
import { _getLectureByPage } from "@/api/lecture.js";
export default {
  data() {
    return {
      lectureList: {},
      page: 1,
      size: 12,
      total: 0,
    };
  },
  components: {},
  methods: {
    getLectureByPage() {
      let data = {
        page: this.page,
        size: this.size,
      };
      _getLectureByPage(data).then((res) => {
        if (res != "error") {
          let data = res.data;
          this.total = data.total;
          this.lectureList = data.lectures;
        } else {
          this.$message.error("请求出错");
        }
      });
    },
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
    onChange(current) {
      this.page = current;
      this.getLectureByPage();
      this.goPost();
    },
    goVideo(index) {
      let lecture = this.lectureList[index];
      console.log(lecture);
      let videoUrl = "http://1011.hlsplay.aodianyun.com/demo/game.flv";
      let params = {
        videoUrl: videoUrl,
      };
      params = Object.assign(params , lecture)
      this.$router.push({
        name: "Live",
        params: params,
      });
    },
  },
  mounted() {
    this.getLectureByPage();
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