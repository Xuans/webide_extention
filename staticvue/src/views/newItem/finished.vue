<template>
  <div>
    <div class="finished-ctn">
      <h4>新建项目</h4>
      <p>
        <span class="finished-icon el-icon-circle-check"></span>完成
      </p>
      <p>您可以</p>
      <div class="finished-ctt">
          <el-row :gutter="40">
            <el-col  :span="12" v-for="(item,index) in items" :key="index">
                <div class="finished-inner-item">
                    <p>{{item.title}}</p>
                    <span class="item-label">{{item.label}}</span>
                    <span class="finished-doc el-icon-question"></span>
            </div>
            </el-col>
          </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: "运行项目",
          label: "运行项目,监听项目资源",
          id: "runServer",
          command: "npm run serve"
        },
        {
          title: "打包项目",
          label: "打包项目资源",
          id: "command",
          command: "npm run build"
        },
        {
          title: "任务管理",
          label: "执行启动、监听项目资源更新等监听任务",
          id: "task",
          doc: ""
        },
        {
          title: "依赖管理",
          id: "dependence",
          label: "新增、删除、更新项目前端资源",
          doc: ""
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.finished-ctn {
    .finished-ctt{
        margin-top:30px;
    }
  > p {
    line-height: 30px;
    color: #666;
  }
  .finished-icon {
    color: $--color-primary;
    margin-right: 5px;
  }
  .finished-inner-item{
            background: #efefef;
           margin-bottom: 20px;
           padding:6px 10px;
           box-sizing: border-box;
           cursor: pointer;
           position: relative;
           p{
               margin-bottom: 5px;
               color:#000;
           }
           .item-label{
               font-size: 12px;
           }
           span{
              
               padding-left: 5px;
               color: #666;
           }
           .finished-doc{
               position: absolute;
               top:13px;
               right: 10px;
           }
       }
}
</style>