<template>
  <div>
    <div class="mainContainer">
      <h2 align="center">{{title}}</h2>
      <p>{{info}}</p>
      <video id="videoElement" class="centeredVideo" controls autoplay width="1024" height="576">Your browser is too old
        which doesn't support HTML5 video.</video>
    </div>
  </div>
</template>

<script>
import flvjs from "flv.js";
export default {
  data() {
    return {
      // videoUrl: "http://1011.hlsplay.aodianyun.com/demo/game.flv"
      videoUrl: "",
      title: "LIVE",
      info:"来自个人的直播"
    };
  },
  mounted() {
    if(this.$route.params.videoUrl){
      // 从课程查询进入
      this.title = this.$route.params.title
      this.videoUrl = this.$route.params.videoUrl
      this.info = this.$route.params.lecturer + '  ' +this.$route.params.university
    } else {
      this.videoUrl = 'http://106.14.126.120/live?app=demo&stream=666&key=test'
      console.log("直播！")
    }
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById("videoElement");
      this.flvPlayer = flvjs.createPlayer({
        type: "flv",
        isLive: true,
        hasAudio: false,
        url: this.videoUrl,
      });
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
      this.flvPlayer.play();
    }
  },
  methods: {
    play() {
      this.flvPlayer.play();
    },
  },
};
</script>

<style>
.mainContainer {
  display: block;
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

.urlInput {
  display: block;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
  margin-bottom: 8px;
}

.centeredVideo {
  display: block;
  width: 100%;
  height: 576px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
}
</style>