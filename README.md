# tqqUi-angular-pagination
##简介
仿照bootstrapUI，根据自己的需求添加一些功能，首先ngModel绑定的当前页在插件初始化的时候如果已经存在这个变量并且大于1的时候不会将他初始成1，这样保存了绑定值。添加啦当前页码和最大页码，明确知道总页数，并且点击当前页可以选择总页码的数量，可以直接跳转到指定页，防止在页数太多的时候不能很好的定位到指定页码。点击最大页码可以选择每页显示的数量。

![alt text](/001.jpg "Title")

##使用说明
  首先引入angular,tqqUi.css(tqqUi.min.css)和tqqUi.js(tqqUi.min.js);
  
````
<link rel="stylesheet" href="dist/tqqUi.min.css">
<script src="dist/angular.min.js"></script>
<script src="dist/tqqUi.min.js"></script>
```

angular.js必须在tqqUi.js之前引入。

***
##参数说明
  ```total-items:列表总条数，必传。
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
  ```
  
##使用实例
`<tqq-pagination ng-model="page" items-per-page="10" total-items="200" >``</tqq-pagination>`


####注：
使用时有什么意见或建议欢迎加QQ  827423258  共同探讨学习。

