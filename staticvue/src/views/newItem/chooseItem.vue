<template >
    <div class="item-ctn">
        <h4>新建项目</h4>
        <p>1.选择初始应用</p>
        <div class="item-ctt">
            <div class="choose-item" v-for="(item,index) in selectData" :key="index" @click="$router.push(`/new/option/${item.id}`)">
                <div class="img-item"><img :src="item.img" alt=""></div>
                <div class="text-item">
                    <p>{{item.title}}</p>
                    <span>{{item.label}}</span>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    data(){
        return{
             selectData:[{
                img:require('../../assets/web.png'),
                title:'WEB IDE',
                label:'新一代云化和可视化开发工具',
                id:'webIDE'
            },
            {
                img:require('../../assets/vue.png'),
                title:'AWEB Vue SPA',
                label:'基于 Vue Cli 3 和 Element UI 的单页应用框架',
                id:'awebVue'
            
            }
            ]
        }
    }
}
// WEB IDE
// 新一代云化可视化开发工具

// 1. V2sual，面向管理端项目编辑器

// 2. Ad，面向广告投放，可视化大屏项目编辑器

//  3 安装
</script>

<style lang="scss" >
.item-ctn{
 
  
    >p{
        color: #666;
        line-height: 30px;
    }
    .choose-item{
        background-color:#eee;
        padding: 20px;
        margin: 20px 0;
        border-radius: 8px;
        display: flex;
        cursor: pointer;
    }
    .img-item{
        float: left;
        width: 70px;
        height: 70px;
        img{
            width: 100%;
            height: 100%;

        }
    }
    .text-item{
        flex:1;
        padding-left: 10px;
        box-sizing: border-box;
        >p{
            margin-top:5px;
            line-height: 30px;
        }
        >span{
            color: #666;
            font-size:14px;
        }
    }
}
</style>