<template>
  <div class="dep-ctn">
    <el-row class="dep-ctt">
      <el-col :span="5" class="left-ctn">
        <div class="search-ctn">
          <el-input placeholder="请搜索" prefix-icon="el-icon-search" v-model="searchVal"></el-input>
        </div>

        <el-collapse v-model="activeName" accordion class="collapse-ctn">
          <el-collapse-item
            v-for="(child,index) in items"
            :key="index"
            :title="child.label"
            :name="index"
          >
            <div v-for="(elm,i) in child.children" :key="i">
              <div class="comp-ctn" >
                <div @click="showDetail(elm.name)">
                  <span class="comp-title">{{elm.label}}</span>
                  <span class="comp-ver">{{elm.version}}</span>
                  <p>{{elm.name}}</p>
                </div>

                <div class="btn-ctn">
                  <el-button type="primary" size="mini">发布</el-button>
                  <el-button type="primary" size="mini">卸载</el-button>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="19" class="iframe-ctn">
        <iframe v-if="currentDetailSrc" :src="currentDetailSrc" width="100%" height="100%"></iframe>
      </el-col>
    </el-row>
    <div></div>
  </div>
</template>
<script>
// https://market.awebide.com/package/
export default {
  data() {
    return {
      currentDetailSrc: "",
      activeName: 0,
      searchVal:"",
      items: [
        {
          label: "前端组件",
          children: [
            {
              name: "@v2-components/v2-page",
              label: "页面容器",
              version: "6.0.0"
            },
            {
              name: "@v2-components/v2-switchable",
              label: "可切换组件",
              version: "6.0.0"
            }
          ]
        },
        {
          label: "管道",
          children: [
            {
              name: "@v2-pipe/map",
              label: "map遍历",
              version: "6.0.0"
            }
          ]
        },
        {
          label: "工具库",
          children: [
            {
              name: "@v2-lib/v2sual",
              label: "v2sual工具库",
              version: "6.0.0"
            }
          ]
        },
        {
          label: "首页布局",
          children: [
            {
              name: "@v2-layout/manager",
              label: "管理端首页布局",
              version: "6.0.0"
            }
          ]
        },
        {
          label: "主题",
          children: [
            {
              name: "@v2-theme/darkBlue",
              label: "深蓝色主题",
              version: "6.0.0"
            }
          ]
        }
      ]
    };
  },
  methods: {
    showDetail(name) {
      if (name) {
        this.currentDetailSrc = `https://market.awebide.com/package/${name}`;
      }
    }
  }
};
</script>

<style lang="scss">
.dep-ctt {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  .el-collapse-item__header {
    padding-left: 10px;
    font-size: 16px;
  }
}
.left-ctn {
  border-right: 1px solid #cecece;
  height: 100%;
}
.search-ctn{
    .el-input__inner{
        border:none;
    }
}
.iframe-ctn {
  iframe {
    border: none;
    outline: none;
  }
  height: 100%;
}
.comp-ctn {
  padding: 0 10px 0 18px;
  box-sizing: border-box;
  border-top: 1px solid #EBEEF5;
  margin-bottom: 10px;
  padding-top: 10px;
  cursor: pointer;
  .comp-title {
    font-size: 15px;
    color: #333;
  }
  .comp-ver {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    color: #666;
  }
}
.btn-ctn {
  text-align: right;
}
</style>
