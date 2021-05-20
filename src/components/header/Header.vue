<template>
  <div class="header">
    <!-- logo -->
    <div class="logo-box">
      <router-link to="/">
        <img src="@/assets/logo.png" height="82" alt="Logo">
      </router-link>
      <h1>LMC LIVE</h1>
    </div>

    <!-- 导航栏模块 -->
    <div class="menu">
      <a-menu mode="horizontal">
        <a-menu-item key="home" @click="goHome">
          <a-icon type="home" />首页
        </a-menu-item>
        <a-sub-menu @click="goLecture">
          <span slot="title" class="submenu-title-wrapper">
            <a-icon type="unordered-list" />课程
          </span>
          <a-menu-item-group title="工科">
            <a-menu-item key="setting:1">
              计算机
            </a-menu-item>
            <a-menu-item key="setting:2">
              物理学
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group title="外语">
            <a-menu-item key="setting:3">
              听力
            </a-menu-item>
            <a-menu-item key="setting:4">
              口语
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-menu-item key="live" @click="goLive">
          <a-icon type="camera" />直播
        </a-menu-item>
        <a-menu-item key="alipay">
          <a-icon type="video-camera" /> 视频
        </a-menu-item>
      </a-menu>
    </div>

    <!-- 搜索框模块 -->
    <div class="search">
      <a-input-search placeholder="搜索" v-model="searchStr" @search="onSearch" />
    </div>
    <!-- 登录区域 -->
    <div class="loginarea">

      <div class="sign" v-if="!isLogin">
        <span class="sign-btn" @click="handleLoginClick">登录</span>/
        <span class="sign-btn" @click="handleRegisterClick">注册</span>
      </div>
      <!-- 头像区域 -->
      <div class="avator" v-if="isLogin" @click="goCenter">
        <a-avatar>
          <a-icon slot="icon" type="user" />
        </a-avatar>
        <p>{{userInfo.username}}</p>
      </div>
    </div>

    <!-- 登录注册框-->
    <div class="login-box" v-if="showLogin">
      <a-icon type="close-circle" class="close" @click="closeLogin" />
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="登录">
          <!-- 登录 -->
          <a-form-model :model="loginForm" @submit="loginSubmit" @submit.native.prevent>
            <a-form-model-item>
              <a-input v-model="loginForm.username" placeholder="Username">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-input v-model="loginForm.password" type="password" placeholder="Password">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" html-type="submit" class="center-button"
                :disabled="loginForm.username === '' || loginForm.password === ''">
                Log in
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>

        <a-tab-pane key="2" tab="注册" force-render>
          <!-- 注册 -->
          <a-form-model ref="regForm" :model="regForm" :rules="rules" @submit="regSubmit">
            <a-form-model-item has-feedback prop="username">
              <a-input v-model="regForm.username" placeholder="Username">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item has-feedback prop="password">
              <a-input v-model="regForm.password" type="password" autocomplete="off" placeholder="Password">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item has-feedback prop="checkPass">
              <a-input type="password" v-model="regForm.checkPass" autocomplete="off" placeholder="Password">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" html-type="submit" class="center-button"
                :disabled="regForm.username === '' || regForm.password === ''|| regForm.checkPass === ''">
                注册
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { _userLogin, _userReg } from "@/api/user.js";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.regForm.checkPass !== "") {
          this.$refs.regForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.password) {
        callback(new Error("两次输入不一致!"));
      } else {
        callback();
      }
    };
    return {
      isLogin: false,
      showLogin: false,
      userInfo: {},
      loginForm: {
        username: "",
        password: "",
      },
      regForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
      },
      searchStr: "",
    };
  },
  methods: {
    onSearch() {
      this.$router.push({
        name: "Search",
        query: {
          searchName: this.searchStr,
        },
      });
      this.searchStr = "";
    },
    handleLoginClick() {
      this.showLogin = true;
    },
    handleRegisterClick() {
      this.showLogin = true;
    },
    goLive() {
      this.$router.push("/live");
    },
    goHome() {
      this.$router.push("/");
    },
    goCenter() {
      console.log(this.userInfo);
      this.$router.push({
        name: "Usercenter",
        params: {
          userName: this.userInfo.username,
        },
      });
    },
    goLecture() {
      this.$router.push("/lecture");
    },
    closeLogin() {
      this.showLogin = false;
    },
    loginSubmit() {
      _userLogin(this.loginForm).then((res) => {
        console.log(res);
        if (res === "error") {
          this.$message.error("登录失败");
        } else {
          this.$message.success(res.message);
          this.userInfo = res.data;
          this.showLogin = false;
          this.isLogin = true;
        }
      });
    },

    regSubmit() {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          let data = {
            username: "",
            password: "",
            role: "ROLE_USER",
          };
          data.username = this.regForm.username;
          data.password = this.regForm.password;
          _userReg(data).then((res) => {
            console.log(res);
            this.$message.success(res.message);
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>


<style>
.header {
  z-index: 200;
  background-color: #fff;
  white-space: nowrap;
  position: relative;
}
.logo-box {
  display: inline-block;
}
.logo-box > h1 {
  display: inline;
  margin-left: 24px;
  color: #909090;
  font-family: "微软雅黑", "宋体", "黑体", Arial;
  font-size: 23px;
  font-weight: bold;
}
.menu {
  display: inline-block;
  margin-left: 100px;
}
.search {
  display: inline-block;
  margin-left: 180px;
}
.loginarea {
  position: absolute;
  left: 1100px;
  top: 8px;
}
.sign-btn {
  display: inline-block;
  padding: 0 18px;
  cursor: pointer;
}
.sign {
  font-size: 14px;
  color: #71777d;
}
.avator {
  margin-left: 50px;
  cursor: pointer;
}
.avator > p {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-left: 20px;
  font-size: 18px;
}
.login-box {
  width: 350px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 200px;
  margin-left: -175px;
  padding: 10px 10px;
}
.close {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 25px;
  margin-top: -190px;
  margin-left: 140px;
  z-index: 999;
}
.center-button {
  margin-left: 115px;
}
</style>