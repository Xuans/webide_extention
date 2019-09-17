<template >
  <div class="option-ctn">
    <h4>新建项目</h4>
    <p>2.功能特性</p>
    <div class="option-ctt">
      <template v-if="$route.params.id==='webIDE'">
        <el-checkbox-group v-model="webIDEModel">
          <el-row>
            <el-col :span="12" v-for="(item,index) in webIDEOption" :key="index">
              <el-checkbox :label="item.id" name="type">
                <div class="option-text">
                  <p>{{item.name}}</p>
                  <p>{{item.description}}</p>
                </div>
              </el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </template>
      <template v-if="$route.params.id==='awebVue'">
        <el-form ref="form" :model="webVueModel" label-width="80px">
          <el-form-item label="首页布局">
            <el-select v-model="webVueModel.layout" placeholder="请选择首页布局">
              <el-option label="管理端首页布局" value="manager"></el-option>
              <el-option label="网银首页布局" value="cms"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主题">
            <el-select v-model="webVueModel.theme" placeholder="请选择主题">
              <el-option label="赞同绿" value="agree"></el-option>
              <el-option label="深蓝色" value="drakblue"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </div>
    <div class="option-footer">
      <el-button @click="$router.replace('/new/item')">上一步</el-button>
      <el-button type="primary" @click="install">安装</el-button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      webIDEModel: [],
      webIDEOption: [
        {
          lable: "面向管理端项目编辑器", // 1. V2sual，面向管理端项目编辑器
          name: "v2sual"
        },
        {
          lable: " 面向广告投放，可视化大屏项目编辑器",
          name: "Ad"
        }
      ],
      webVueModel: {
        layout: "manager",
        theme: "agree"
      }
    };
  },
  mounted() {
    if (this.$route.params.id === "webIDE") {
      this.$axios.get("/new/workbench").then(res => {
        console.log(res);
        if (res.data && res.status === 200 && res.data.status) {
          let content = res.data.content;
          this.webIDEOption = content.map(item => {
            let name = (item.id = item.name);
            item.name = name.replace(/[^\/]*\//g, "");
            return item;
          });
        }
      });
    }
  },
  methods: {
    install() {
      if (this.webIDEModel.length) {
        this.$router.push({name:'Install',params:{workbench:this.webIDEModel}})
      } else {
         this.$message({
          message: '至少选择一项',
          type: 'warning'
        });
      }
    }
  }
};
</script>

<style lang="scss">
.option-ctn {
  > p {
    color: #666;
    line-height: 30px;
  }
  .option-ctt {
    background-color: #eee;
    min-height: 100px;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    border-radius: 8px;
  }
  .option-text {
    display: inline-block;
    vertical-align: middle;
  }
  .option-footer {
    text-align: center;
    margin-top: 30px;
  }
}
</style>