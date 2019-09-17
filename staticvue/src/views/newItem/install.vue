<template>
  <div class="install-ctn">
    <h4>新建项目</h4>
    <p>3.安装</p>
    <!-- <div class="project-progress-ctn">
      <div class="progress-ctt">
        <div class="inner-ctt" :style="{width:process+'%'}"></div>
      </div>
      <span class="progress-text"></span>
    </div>-->
    <div class="project-progress-ctn">
      <el-steps :space="300" :active="1">
        <el-step title="下载初始应用" :icon="initStatusCls"></el-step>
        <el-step title="安装初始应用" :icon="installStatusCls"></el-step>
      </el-steps>
    </div>

    <!-- <div>
      <span :class="['install-init-icon',initStatusCls]"></span> 下载初始应用
    </div>-->

    <template>
      <div>
        <!-- <span :class="['install-init-icon',installStatusCls]"></span> 安装初始应用 -->
        <div class="install-tip" v-if="initStatus===3">
          <span @click="repeatInstall" v-if="installStatus===2">点击重新安装依赖</span> 注意：如已自行安装,
          <em @click="goFinished">请点击</em>
        </div>
        
        <div class="install-stdout-ctn">
          {{content}}
          </div>
      </div>
    </template>
  </div>
</template>
     

   
    
  </div>
</template>
<script>
import io from "socket.io-client";
const socket = io();
socket.on("connect", () => {
  console.log("连接成功");
});
socket.on("disconnect", () => {
  console.log("断开连接");
});
socket.on("connect_error", () => {
  console.log("连接失败");
});

export default {
  data() {
    return {
      content: "",
      // process: 0,
      initStatus: 1, //   1,正在初始化 2 初始化失败 ，3成功初始化
      installStatus: 0 //0,等待，1,正在安装 2 安装失败 ，3安装成功
    };
  },
  computed: {
    initStatusCls() {
      let ret;
      switch (this.initStatus) {
        case 1:
          ret = "process el-icon-loading";
          break;

        case 2:
          ret = "error el-icon-error";

          break;
        case 3:
          ret = "success el-icon-success";
          break;
      }
      return ret;
    },
    installStatusCls() {
      let ret;
      // wait / process / finish / error / success

      switch (this.installStatus) {
        case 0:
          ret = "wait el-icon-download";
          break;
        case 1:
          ret = "process el-icon-loading";
          break;

        case 2:
          ret = "error el-icon-error";
          break;
        case 3:
          ret = "success  el-icon-success";
          break;
      }
      return ret;
    }
  },
  mounted() {
    let { workbench } = this.$route.params;
    socket.on("/client/installing", content => {
      this.content = `${this.content} ${content}`;
    });

    socket.on("/client/installed", content => {
      // this.process = 100;
      this.installStatus = 3;
      this.$router.push({ name: "Finished" });
    });

    //安装失败
    socket.on("/client/uninstall", content => {
      this.installStatus = 2;
    });

    this.$axios.post("/new/init", { workbench: workbench }).then(res => {
      if (res.data && res.status === 200 && res.data.status) {
        // this.process = 50;
        this.initStatus = 3;
        this.installStatus = 1;
        socket.emit("/new/install");
      } else {
        this.initStatus = 2;
        this.$notify({
          title: "失败",
          message: res.data.errorMsg,
          type: "error"
        });
      }
    });
  },
  methods: {
    repeatInstall() {
      this.content = "";
      this.installStatus = 1;
      socket.emit("/new/install");
    },
    goFinished() {
      this.$axios.post("/new/changeFinished").then(res => {
        if (res.data && res.status === 200 && res.data.status) {
          this.$router.push({ name: "Finished" });
        } else {
          this.$notify({
            title: "失败",
            message: res.data.errorMsg,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.install-ctn {
  > div {
    color: #666;
    line-height: 30px;
  }
  .install-tip {
    display: inline-block;
    > span {
      text-decoration: underline;
      color: red;
      cursor: pointer;
      margin-right: 10px;
    }
    > em {
      text-decoration: underline;
      color: #f9af57;
      cursor: pointer;
      font-style: normal;
    }
  }
  .install-init-icon {
    &.error {
      color: red;
    }
    &.success {
      color: green;
    }
  }
}
.project-progress-ctn {
  width: 100%;
  margin-top: 10px;
  > p {
    line-height: 30px;
  }
  .progress-ctt {
    width: 100%;
    border: 1px solid #eee;
    height: 25px;
    border-radius: 30px;
    overflow: hidden;
  }
  .inner-ctt {
    background-color: #04bebd;
    height: 100%;
    // width: 80%;
  }
  .progress-text {
    display: block;
    text-align: right;
  }
}
.install-stdout-ctn {
  margin-top: 10px;
  width: 100%;
  height: 550px;
  overflow-y: auto;
  /* white-space: pre-wrap; */
  background: #333333;
  color: #cccc;
  padding: 8px;
  user-select: text;
  line-height: 1.5;
}
.install-footer {
  text-align: center;
  margin-top: 30px;
}
</style>