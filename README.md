
# angular-tqqUi
CMS管理系统 开发中，将需要用到的组件整合，结合自身项目将组件优化修改，将大部分的机械化操作抽离成组件，其中有仿ui.bootstrap.pagination的分页插件，添加啦页码展开选择和调节每页显示数以及修改啦其每次都会初始当前页为1的机制，使得其能记录保存预览到的页数；开发啦table组件和tableFilter，由于每个列表都是从一个json里面挑选不同的字段出来显示，所以只要配置每个th叫什么？它对应的tr显示什么字段？由此开发table组件，只需传入ajax得到的json数组和title配置项，就能自动生成table，还可以控制title来控制是否显示对应的列，tableFilter组件就是做这事的。



##使用说明
  首先引入angular,tqq-ui.css(tqq-ui.min.css)和tqq-ui.js(tqq-ui.min.js);
  
````
<link rel="stylesheet" href="dist/tqq-ui-pagination-all.css">
<script src="dist/angular.min.js"></script>
<script src="dist/tqq-ui-pagination.js"></script>
```

angular.js必须在tqq-ui.js之前引入。

如果你的项目中有bootstrap.css的话，你的css文件只需要引tqq-ui-pagination.css;

在模块初始的时候注入模块。
```sh
var app = angular.module('myApp',['tqq.ui'])
```
***
##参数说明
  ```
  total-items:列表总条数，必传。
  max-size:同时存在的分页按钮的数量，默认5。
  ng-model:当前选中的页数，必传。
  items-per-page:当前页有多少条数据，必传。
  hide-last:布尔值。是否隐藏第一页和最后一页按钮，默认为false，
  first-text:跳到第一页按钮，默认是'《',可用字符串代替。
  last-text:跳到最后一页按钮，默认是'》',可用字符串代替。
  previous-text:跳到上一页按钮，默认是'<',可用字符串代替。
  next-text:跳到下一页按钮，默认是'>',可用字符串代替。
  size-class:组件大小，'pagination-lg'(大号)或者'pagination-sm'（小号）
  tqq-change:变化函数，当ngModel的值改变是，执行这个函数。
  item-select-hide:是否显示右边模块的选择每页显示条数的模块。默认为false,为true时隐藏。
  ```
  
##使用实例
```
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
    <meta charset="UTF-8">
    <title>tqqUi分页</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="dist/tqqUi.min.css">
</head>
<body>
<div ng-controller="pageController">
  <div style="width:200px; height:300px;"></div>
    {{page}}
    <tqq-pagination ng-model="page" items-per-page="10" total-items="200" size-class=""></tqq-pagination>
</div>
<script src="dist/angular.min.js"></script>
<script src="dist/tqqUi.min.js"></script>
<script>
    var app = angular.module('myApp',['tqq.ui']).controller('pageController',function(){
    })
</script>
</body>
</html>
```


####注：
使用时有什么意见或建议欢迎加QQ  827423258  共同探讨学习。

