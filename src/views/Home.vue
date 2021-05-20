<template>
  <div class="home">
    <!-- 轮播图 -->
    <a-carousel arrows autoplay>
      <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
        <a-icon type="left-circle" />
      </div>
      <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
        <a-icon type="right-circle" />
      </div>
      <div v-for="item in imgList" :key="item" class="carousel-img">
        <img :src="item" :alt=item>
      </div>
    </a-carousel>
    <!-- 最近直播 -->
    <div class="recent-live">
      <a-icon type="play-circle" class="rec-live-icon" />
      <h3>最近直播</h3>
    </div>
    <!-- 直播卡片 -->
    <div class="live-card">
      <div style="background-color: #ececec; padding: 20px;">
        <a-row :gutter="16">
          <a-col v-for="item in recentLive" :key="item.id" :span="8">
            <a-card :title=item.title :bordered="false">
              <p>主题 {{item.subject}}</p>
              <p class="introduction">简介 {{item.introduction}}</p>
              <p>学校 {{item.university}}</p>
              <p>时间 {{item.timestamp | formatDate}}</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { _getNear } from "@/api/lecture.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      imgList: [
        // require("../assets/img/carousel/0.png"),
        // require("../assets/img/carousel/1.png"),
        // require("../assets/img/carousel/2.png"),
        // require("../assets/img/carousel/3.png"),
        "http://public-bucket-cyf.oss-cn-shanghai.aliyuncs.com/0.png",
        "http://public-bucket-cyf.oss-cn-shanghai.aliyuncs.com/1.png",
        "http://public-bucket-cyf.oss-cn-shanghai.aliyuncs.com/2.png",
        "http://public-bucket-cyf.oss-cn-shanghai.aliyuncs.com/3.png",
      ],
      recentLive: {},
    };
  },
  methods: {
    getNear() {
      let data = {
        num: 6,
      };
      _getNear(data).then((res) => {
        this.recentLive = res.data;
      });
    },
  },
  mounted() {
    this.getNear();
  },
};
</script>

<style scoped>
.home {
  height: 500px;
}
ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.carousel-img {
  width: 100%;
  height: 300px;
  background-color: rgba(238, 234, 234, 0.32);
}
.carousel-img img {
  width: 600px;
  height: 300px;
  margin: 0 auto;
}
.recent-live {
  margin-left: 50px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.32);
}
h3 {
  font-size: 23px;
  display: inline-block;
  margin-left: 10px;
  margin-top: 2px;
}
.rec-live-icon {
  float: left;
  overflow: hidden;
  font-size: 38px;
}
.introduction {
  display: inline-block;
  height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.ant-col-8 {
  height: 320px;
}
</style>
