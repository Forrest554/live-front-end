<template>
  <div class="live">
    <div class="video-area"><Video></Video></div>
    <div class="discuss-area">
      <a-button type="primary" @click="showDrawer" class="discusss-button">
        <a-icon type="left" />讨论区
      </a-button>
      <a-drawer title="讨论区" placement="right" :closable="false" :visible="visible" @close="onClose">
        <div class="content">
          <p v-for="(item,index) in allStr" :key="index">{{item}}</p>
        </div>

        <div class="user-input">
          <a-input placeholder="请输入内容" v-model="userStr" />
          <a-button @click="submitUserStr">提交</a-button>
        </div>

      </a-drawer>
    </div>
  </div>
</template>

<script>
import Video from "@/components/live/Video.vue";
import { _getAllMessage, _sendMessage } from "@/api/discuss.js";
export default {
  data() {
    return {
      visible: false,
      userStr: "",
      allStr: [],
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
      window.setInterval(() => {
        setTimeout(this.getMessage(), 0);
      }, 3000);
    },
    onClose() {
      this.visible = false;
    },
    submitUserStr() {
      let data = {
        message: this.userStr,
        queueName: "jim",
      };
      _sendMessage(data).then((res) => {
        if (res.message === "success") {
          this.$message.success("发送成功");
        } else {
          this.$message.error("发送失败");
        }
      });
      this.userStr = "";
    },
    getMessage() {
      let data = {
        queueName: "jim",
      };
      _getAllMessage(data).then((res) => {
        if (res.data.length !== 0) {
          this.allStr = this.allStr.concat(res.data);
        }
      });
    },
  },
  components: {
    Video,
  },
  created() {},
};
</script>

<style  scoped>
.live {
  position: relative;
}
.discusss-button {
  position: absolute;
  float: left;
  overflow: hidden;
  left: 80%;
  top: 40%;
  background-color: rbga(255, 255, 255, 0.1);
}
.discuss-area {
  /* position: absolute;
  float: left;
  overflow: hidden;
  width: 300px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.8);
  left: 80%;
  top: 40%; */
}
.user-input {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.user-input > .ant-input {
  width: 180px;
}
</style>