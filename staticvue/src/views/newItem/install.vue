<template>
  <div class="install-ctn">
    <h4>新建项目</h4>
    <p>3.安装</p>
    <div class="project-progress-ctn">
      <div class="progress-ctt">
        <div class="inner-ctt"></div>
      </div>
      <span class="progress-text"></span>

      <p>
        <span class="el-icon-loading"></span> 正在下载初始应用
      </p>

      <p>
        <span class="el-icon-loading"></span> 正在安装初始应用
      </p>
    </div>
    <div class="install-stdout-ctn">
      <div></div>
    </div>
      <div class="install-footer">
      <el-button type="primary" @click="$router.push('/new/finished')" >完成</el-button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.install-ctn{
    >p{
            color: #666;
    line-height: 30px;
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
    width: 80%;
  }
  .progress-text {
    display: block;
    text-align: right;
  }
}
.install-stdout-ctn {
  margin-top: 10px;
  > div {
    width: 100%;

    height: 550px;
    overflow-y: auto;
    border: 1px solid #ccc;
    white-space: pre-wrap;
  }
}
.install-footer{
    text-align: center;
    margin-top:30px;
}
</style>