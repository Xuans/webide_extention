<template>
  <div>
    <div class="finished-ctn">
      <h4>新建项目</h4>
      <p>
        <span class="finished-icon el-icon-circle-check"></span>完成
      </p>
      <p>您可以 <span class="repeat-install" @click="repeatInstall">重新安装依赖</span></p>
      <div class="finished-ctt">
          <el-row :gutter="40">
            <el-col  :span="12" v-for="(item,index) in items" :key="index">
                <div class="finished-inner-item" @click="run(item)">
                    <p>{{item.title}}</p>
                    <span class="item-label">{{item.label}}</span>
                    <!-- <span class="finished-doc el-icon-question"></span> -->
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
          title: "启动",
          label: "启动项目",
          command: "npm run startup"
        },
        {
          title: "暂停",
          label: "暂停项目",
          command: "npm run shutdown"
        },
        {
          title: "查看",
          label: "查看启动服务列表",
          command: "npm run list"
        }
      ]
    };
  },
  methods:{
    run(item){
      this.$axios.post('/new/command',{command:item.command},()=>{
            
      })
    },
    repeatInstall(){
         this.$axios.post('/new/command',{command:'npm install'},()=>{

          })

    }
  }
};
</script>
<style lang="scss">
.finished-ctn {
    .finished-ctt{
        margin-top:30px;
    }
    .repeat-install{
      color:red;
      cursor: pointer;
      text-decoration: underline;
      font-size: 13px;
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