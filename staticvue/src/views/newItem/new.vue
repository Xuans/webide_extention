
<template>
    <div class="new-ctn">
        <p>1. 选择初始应用
        <p>2. 功能特性</p>
        <p>3. 安装</p>
        <div class="new-ctt">
        <router-view></router-view>

        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .new-ctn{
        padding: 20px;
        box-sizing: border-box;
          user-select: none;
        >p{
            line-height: 30px;
        }
        .new-ctt{
         
               width: 740px;
                height: auto;
                margin: 40px auto 0;
        }
    }
</style>