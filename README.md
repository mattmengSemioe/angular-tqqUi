
# angular-tqqUi
CMS管理系统 开发中，将需要用到的组件整合，结合自身项目将组件优化修改，将大部分的机械化操作抽离成组件，其中有仿ui.bootstrap.pagination的分页插件，添加啦页码展开选择和调节每页显示数以及修改啦其每次都会初始当前页为1的机制，使得其能记录保存预览到的页数；开发啦table组件和tableFilter，由于每个列表都是从一个json里面挑选不同的字段出来显示，所以只要配置每个th叫什么？它对应的tr显示什么字段？由此开发table组件，只需传入ajax得到的json数组和title配置项，就能自动生成table，还可以控制title来控制是否显示对应的列，tableFilter组件就是做这事的。

 [演示dome](http://tangqq.github.io/angular-tqqUi/)

## 使用说明
  首先引入angular,tqq-ui.css(tqq-ui.min.css)和tqq-ui.js(tqq-ui.min.js);
  
```
<link rel="stylesheet" href="dist/tqq-ui-pagination-all.css">
<script src="dist/angular.min.js"></script>
<script src="dist/tqq-ui-pagination.js"></script>
```

angular.js必须在tqq-ui.js之前引入。

如果你的项目中有bootstrap.css的话，你的css文件只需要引tqq-ui-pagination.css;

在模块初始的时候注入模块。
```
var app = angular.module('myApp',['tqq.ui'])
```
***

## tqqPagination 指令：分页控制

### 参数说明
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
  
### 使用实例
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
  <div></div>
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
## tqqTable 指令：table列表，使用配置json和数据数组生成一个列表。

### 参数说明
  ```
  table-data:数据数组，从后端返回的json数组，需要显示的源数据，必传。
  table-options:配置，对每个列的显示规则的配置，必传。
  ng-model:这个对象里有三个属性，isAll：列表是否每列都选中啦，isOne：列表是否只是选中一列，isMony：列表是否选中了多列。。
  table-checked:这是一个数组，每个数组的值类型为布尔值，记录或操作table的每一列是否为选中项。
  tqq-click(items,judge,key):这是一个方法，每个单元格都会触发这事件，里面会有三个参数，items是触发事件的整行的数据，judge是触发事件是属于哪列，key是触发事件的索引。
  ```
### tableOptions  配置说明
  ```
  *  name {String}  table每一列的标题显示配置；如果是“@”会直接显示一个多选框。
  *  defaultHide {Boolean} 此列默认是否隐藏。默认是false,不隐藏，
  *  lock {Boolean} 此列是否锁定，锁定就不能修改defaultHide的值。默认是false,不锁定，
  *  field {String | Array} 此列的取值规则，如果是String,应用表达式取值，如果第一个字符串是“@”就是字符串，否则为表达式，如果是“@”会直接显示一个多选框。
  *  class {String} 此列的class规则，应用表达式取值，如果第一个字符串是“@”就是字符串，否则为表达式，
  *  field.isHide {String} 此项是否隐藏，应用表达式取值，如果第一个字符串是“@”就是字符串，否则为表达式，
  *  isHide {String} 此项是否隐藏，应用表达式取值，如果第一个字符串是“@”就是字符串，否则为表达式，
  *  judge {String} 点击函数的标识符
  *  isHover {String} 鼠标经过显示的内容
   ```
### 使用实例
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
  <div></div>
    {{abc}}
    <tqq-table table-data="listData" class="table" table-options="options" table-checked="abc"></tqq-table>
</div>
<script src="dist/angular.min.js"></script>
<script src="dist/tqqUi.min.js"></script>
<script>
    var app = angular.module('myApp',['tqq.ui']).controller('pageController',function(){
    $scope.options=[
               {name:'@',field:'@',isHtml:true},
               {name:'姓名',field:'name'},
               {name:'性别',field:'sex'},
                {name:'年龄',field:'year',isHover:"@dkfsjl"}
           ];
            $scope.listData=[
                 {name:'老李',sex:'男',year:23,child:true},
                {name:'小刘',sex:'男',year:19,child:false},
                {name:'小丽',sex:'女',year:18,child:false,},
                {name:'老王',sex:'男',year:79,child:true},
                {name:'大卫',sex:'男',year:50,child:true}
            ]
    })
</script>
</body>
</html>
```


#### 注：
使用时有什么意见或建议欢迎加QQ  827423258  共同探讨学习。

