<template>
  <div class="center">
    <div class="menu">
      <a-menu style="width: 256px" mode="inline" @click="handleClick">
        <a-menu-item key="1">
          <a-icon type="camera" />
          发布直播
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="file-add" />
          文件管理
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="calendar" />
          我的直播
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="appstore" /><span>个人管理</span>
          </span>
          <a-menu-item key="4">
            资料管理
          </a-menu-item>
          <a-menu-item key="5">
            修改密码
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="6">
          <a-icon type="money-collect" />
          我的钱包
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="bar-chart" />
          直播统计
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="mail" />
          我的私信
        </a-menu-item>
        <a-menu-item key="9">
          <a-icon type="mail" />
          系统通知
        </a-menu-item>
      </a-menu>
    </div>

    <div class="show-area">
      <div v-if="menuKey=='1'" class="submit-live common">
        <a-form-model :model="liveForm" @submit="liveSubmit" @submit.native.prevent>
          <a-form-model-item>
            <a-input v-model="liveForm.introduction" placeholder="简介">
              <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="liveForm.lecturer" :placeholder="userName">
              <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="liveForm.subject" placeholder="主题">
              <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="liveForm.title" placeholder="会议名">
              <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="liveForm.university" placeholder="学校">
              <a-icon slot="prefix" type="file-text" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-date-picker :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }" @change="dateChange" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" html-type="submit">
              提交直播
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div v-if="menuKey=='2'" class="file-manager common">file-manager</div>
      <div v-if="menuKey=='5'" class="pass-modify common">pass-modify</div>
    </div>
  </div>
</template>
<script>
import { _addLecture } from "@/api/lecture.js";
import moment from "moment";
export default {
  data() {
    return {
      menuKey: 1,
      userName: "",
      liveForm: {
        introduction: "",
        lecturer: "",
        subject: "",
        timestamp: 0,
        title: "",
        university: "",
      },
    };
  },
  methods: {
    moment,
    handleClick(e) {
      console.log("click ", e);
      this.menuKey = e.key;
    },
    timesTamp(str) {
      // 获取某个时间格式的时间戳
      const stringTime = str;
      let timestamp = Date.parse(new Date(stringTime));
      timestamp /= 1000;
      return timestamp;
    },
    dateChange(date, dateString) {
      console.log(date, dateString);
      this.liveForm.timestamp = this.timesTamp(dateString);
    },
    liveSubmit() {
      _addLecture(this.liveForm).then((res) => {
        console.log(res.message)
        this.$message.success("发起成功");
        for (let key in this.liveForm) {
          if (key != "timestamp") {
            this.liveForm[key] = "";
          } else {
            this.liveForm[key] = 0;
          }
        }
      });
    },
  },
  mounted() {
    this.userName = this.$route.params.userName;
    console.log(this.userName);
  },
};
</script>
<style>
.center {
  height: 600px;
  position: relative;
}
.menu {
  margin-left: 15px;
}
.show-area {
  position: absolute;
  left: 22%;
  top: 5%;
  background-color: rbga(255, 255, 255, 0.7);
  height: 600px;
  width: 70%;
}
.common {
  padding: 10px 10px;
}
.submit-live {
}
</style>
