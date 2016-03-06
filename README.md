# tqqUi-angular-pagination
##简介
仿照bootstrapUI，根据自己的需求添加一些功能，首先ngModel绑定的当前页在插件初始化的时候如果已经存在这个变量并且大于1的时候不会将他初始成1，这样保存了绑定值。添加啦当前页码和最大页码，明确知道总页数，并且点击当前页可以选择总页码的数量，可以直接跳转到指定页，防止在页数太多的时候不能很好的定位到指定页码。点击最大页码可以选择每页显示的数量。

![alt text](/001.jpg "Title")

##使用说明
首先引入angular,tqqUi.css(tqqUi.min.css)和tqqUi.js(tqqUi.min.js);
