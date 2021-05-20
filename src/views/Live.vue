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
          <a-button @click="sendMessage">提交</a-button>
        </div>

      </a-drawer>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Video from "@/components/live/Video.vue";
// import { _getAllMessage, _sendMessage } from "@/api/discuss.js";
export default {
  data() {
    return {
      visible: false,
      userStr: "",
      allStr: [],
      socket: null,
      stompClient: null,
      username: "",
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    initWebSocket() {
      this.connection();
      let self = this;
      // 断开重连机制,尝试发送消息,捕获异常发生时重连
      this.timer = setInterval(() => {
        try {
          self.stompClient.send("test");
        } catch (err) {
          console.log("断线了: " + err);
          self.connection();
        }
      }, 5000);
    },
    connection() {
      // 建立连接对象
      this.socket = new SockJS("http://118.178.16.192/ws");
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(this.socket);
      // 向服务器发起websocket连接
      this.stompClient.connect({}, this.onConnected, (err) => {
        // 连接发生错误时的处理函数
        console.log(err);
      });
    },
    // 连接成功
    onConnected() {
      //订阅/topic/public，有消息时调用回调
      this.stompClient.subscribe("/topic/public", this.onMessageReceived);
      //加入用户
      this.stompClient.send(
        "/app/chat.addUser",
        {},
        JSON.stringify({ sender: this.username, type: "JOIN" })
      );
    },
    // 发送聊天消息
    sendMessage() {
      let messageContent = this.userStr;
      if (messageContent && this.stompClient) {
        let chatMessage = {
          sender: this.username,
          content: messageContent,
          type: "CHAT",
        };
        this.stompClient.send(
          "/app/chat.sendMessage",
          {},
          JSON.stringify(chatMessage)
        );
      }
      this.userStr = "";
    },
    // 收到消息时调用
    onMessageReceived(payload) {
      let message = JSON.parse(payload.body);
      if (message.content != null) {
        let str = message.sender + "说:" + message.content;
        this.allStr.push(str);
        console.log("onMessageReceived==>", message);
      }
    },
    // 断开连接
    disconnect() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log("Disconnected");
      }
    },
  },
  components: {
    Video,
  },
  beforeDestroy() {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
  },
  created() {},
  mounted() {
    if (this.$store.state.username != "") {
      this.username = this.$store.state.username;
    } else {
      this.username = "匿名用户";
    }
    console.log(this.username);
    this.initWebSocket();
  },
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