(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["newItem-finished"],{"1e39":function(n,i,t){"use strict";var e=t("44d5"),s=t.n(e);s.a},"301c":function(n,i,t){"use strict";t.r(i);var e=function(){var n=this,i=n.$createElement,t=n._self._c||i;return t("div",[t("div",{staticClass:"finished-ctn"},[t("h4",[n._v("新建项目")]),n._m(0),t("p",[n._v("您可以 "),t("span",{staticClass:"repeat-install",on:{click:n.repeatInstall}},[n._v("重新安装依赖")])]),t("div",{staticClass:"finished-ctt"},[t("el-row",{attrs:{gutter:40}},n._l(n.items,function(i,e){return t("el-col",{key:e,attrs:{span:12}},[t("div",{staticClass:"finished-inner-item",on:{click:function(t){return n.run(i)}}},[t("p",[n._v(n._s(i.title))]),t("span",{staticClass:"item-label"},[n._v(n._s(i.label))])])])}),1)],1)])])},s=[function(){var n=this,i=n.$createElement,t=n._self._c||i;return t("p",[t("span",{staticClass:"finished-icon el-icon-circle-check"}),n._v("完成\n    ")])}],o={data:function(){return{items:[{title:"启动",label:"启动项目",command:"npm run startup"},{title:"暂停",label:"暂停项目",command:"npm run shutdown"},{title:"查看",label:"查看启动服务列表",command:"npm run list"}]}},methods:{run:function(n){this.$axios.post("/new/command",{command:n.command},function(){})},repeatInstall:function(){this.$axios.post("/new/command",{command:"npm install"},function(){})}}},c=o,a=(t("1e39"),t("2877")),r=Object(a["a"])(c,e,s,!1,null,null,null);i["default"]=r.exports},"44d5":function(n,i,t){var e=t("c208");"string"===typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);var s=t("499e").default;s("6f4c5d04",e,!0,{sourceMap:!1,shadowMode:!1})},c208:function(n,i,t){i=n.exports=t("2350")(!1),i.push([n.i,".finished-ctn .finished-ctt{margin-top:30px}.finished-ctn .repeat-install{color:red;cursor:pointer;text-decoration:underline;font-size:13px}.finished-ctn>p{line-height:30px;color:#666}.finished-ctn .finished-icon{color:#04bebd;margin-right:5px}.finished-ctn .finished-inner-item{background:#efefef;margin-bottom:20px;padding:6px 10px;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;position:relative}.finished-ctn .finished-inner-item p{margin-bottom:5px;color:#000}.finished-ctn .finished-inner-item .item-label{font-size:12px}.finished-ctn .finished-inner-item span{padding-left:5px;color:#666}.finished-ctn .finished-inner-item .finished-doc{position:absolute;top:13px;right:10px}",""])}}]);