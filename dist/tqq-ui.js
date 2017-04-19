/**
 * Created by Administrator on 2016/3/6.
 */
 var dir = angular.module('tqq.ui',[]);
/**
 * Created by Administrator on 2016/4/2.
 */
dir.factory('loading',function(){
    var monitor=true;
    var style=''
    return {
        show:function(code){

            if(monitor){
                var loadingBody = document.createElement('section');
                 loadingBody.className = 'load-box';
                  document.body.style.overflowY='hidden'
                document.body.appendChild(loadingBody);
                document.getElementsByClassName('load-box')[0].innerHTML=' <div class="load-container"><div class="loader"></div></div>'
                monitor=false;
            }
        },
        hide:function(){
            var del=document.getElementsByClassName('load-box')[0];
            if(del){
                document.body.removeChild(del)
                document.body.style.overflowY='auto'
                monitor=true;
                return;
            };
        },
    };
});
/**
 * Created by Administrator on 2016/3/6.
 */
/**
 * Created by Administrator on 2016/2/28.
 */

  dir.directive('tqqPagination',["$parse", function($parse){
    /*
      ##参数说明
     *total-items:列表总条数，必传。
     * max-size:同时存在的分页按钮的数量，默认5。
     * ng-model:当前选中的页数，必传。
     * items-per-page:当前页有多少条数据，必传。
     * hide-last:布尔值。是否隐藏第一页和最后一页按钮，默认为false，
     * first-text:跳到第一页按钮，默认是'《',可用字符串代替。
     * last-text:跳到最后一页按钮，默认是'》',可用字符串代替。
     * previous-text:跳到上一页按钮，默认是'<',可用字符串代替。
     * next-text:跳到下一页按钮，默认是'>',可用字符串代替。
     * size-class:组件大小，'pagination-lg'(大号)或者'pagination-sm'（小号）
     * tqq-change:变化函数，当ngModel的值改变是，执行这个函数。
     * item-select-hide:是否显示右边模块的选择每页显示条数的模块。默认为false,为true时隐藏。
     */
    function createPage(allCount,perPageItem,size,model){
        var page=[],
            pageCount=Math.ceil(allCount/perPageItem);
        var middle_top = Math.ceil(size/2);
        var middle_bottom =Math.floor(size/2);
        if(pageCount<=size){
            for(var i=1;i<=pageCount;i++){
                page.push(i)
            }
        }else{
            if(model<=middle_top){
                for(var a=1;a<=size;a++){

                    page.push(a);
                }
            }else if(model>middle_top && model+middle_bottom<=pageCount){
                var b=model-middle_top+1;
                var c=model-middle_top+size;
                for(b;b<=c;b++){
                    page.push(b)
                }
            }else if(model>middle_top && model+middle_bottom>pageCount){
                var e=pageCount-size+1;
                for(;e<=pageCount;e++){
                    page.push(e)
                };
            };
        };
         return page;
    };
    function createAllPage(allCount,perPageItem){
        var allPage=[];
        var pageCount=Math.ceil(allCount/perPageItem);
        for(var i=1;i<=pageCount;i++){
            allPage.push(i)
        }
        return allPage
    };
    return {
        restrict:'EA',
        replace:true,
        require:'?ngModel',
        scope:{
            ngModel:'<',
            totalItems:'<',
            maxSize:'<',
            itemsPerPage:'=',
            hideLast:'<',
            itemSelectHide:'<'
        },
        link:function(scope,ele,atrs,ngModel){
            if(!atrs.totalItems)
                throw '\"tqqPagination\"---\"total-items\" is undefined \n 中文:\"total-items\"为必传参数。';
            scope.atrs=atrs;
            function pageInit(){
                scope.itemsPerPage=scope.itemsPerPage || 10;
                scope.maxSize = scope.maxSize || 5;
                scope.naModel= scope.ngModel||1;
                scope.pageNum=Math.ceil(scope.totalItems/(scope.itemsPerPage));
                scope.pageArr = createPage(scope.totalItems,scope.itemsPerPage,scope.maxSize,scope.ngModel)
                scope.allPageArr=createAllPage(scope.totalItems,scope.itemsPerPage);
            }
            scope.$watch('totalItems',function(e){
                 if(e){
                     if(!angular.isNumber(e)){
                         throw '\"tqqPagination\"---\"total-items\" type error \n 中文:\"total-items\"类型错误，必须是number类型。';
                     }
                    pageInit()
                 }
            });
            scope.$watch('itemsPerPage',function(e){
                if(e){
                    pageInit();
                    var currentTotal=scope.ngModel*scope.itemsPerPage
                    if(currentTotal>scope.totalItems){
                        scope.ngModel=scope.pageNum;
                        ngModel.$setViewValue(scope.ngModel)
                    }
                }
            });
            scope.judge={
                first:'first',
                previous:'previous',
                next:'next',
                last:'last'
            };
            ngModel.$formatters.push(function(e){
                if(e && scope.totalItems){
                    scope.pageArr = createPage(scope.totalItems,scope.itemsPerPage,scope.maxSize||5,e);
                }
            });

            scope.updatePage=function(type){
                switch (type){
                    case scope.judge.first:
                        scope.ngModel=1;
                        break;
                    case scope.judge.previous:
                        if(scope.ngModel>1)scope.ngModel--;
                        break;
                    case scope.judge.next:
                        if(scope.ngModel<scope.pageNum)scope.ngModel++;
                        break;
                    case scope.judge.last:
                        scope.ngModel=scope.pageNum;
                        break;
                    default:
                        scope.pageSelect=false;
                        scope.ngModel=type;
                }
                ngModel.$setViewValue(scope.ngModel)
                scope.pageArr = createPage(scope.totalItems,scope.itemsPerPage,scope.maxSize||5,scope.ngModel);


            };
            scope.updateItem=function(val){
                scope.pageSelect=false;
                scope.itemsPerPage=val;
            }
            scope.updateShow=function(){
                scope.pageSelect=!scope.pageSelect;
            };
            scope.dismissSelect=function(){
                 scope.pageSelect=false;
            }
        },
        template:'<nav><div class="page-box" ng-if="pageSelect" ng-click="dismissSelect()"></div><ul class="pagination mg-none {{atrs.sizeClass}}">' +
         '<li ng-if="!hideLast" ng-class="{disabled:ngModel===1}"><a href  ng-click="updatePage(judge.first)"><span ng-if="atrs.firstText">{{atrs.firstText}}</span><span  ng-if="!atrs.firstText"　class="anniu">&laquo;</span></a></li>' +
         '<li ng-class="{disabled:ngModel===1}"><a href  ng-click="updatePage(judge.previous)"><span ng-if="atrs.previousText">{{atrs.previousText}}</span><span  ng-if="!atrs.previousText"　class="anniu">&lsaquo;</span></a></li>' +
        '<li ng-repeat="val in pageArr track by $index" ng-class="{active:ngModel===val}"><a href ng-click="updatePage(val)">{{val}}</a></li>' +
        '<li ng-class="{disabled:ngModel===pageNum}"><a href  ng-click="updatePage(judge.next)"><span ng-if="atrs.nextText">{{atrs.nextText}}</span><span  ng-if="!atrs.nextText"　class="anniu">&rsaquo;</span></a></li>' +
        '<li ng-if="!hideLast" ng-class="{disabled:ngModel===pageNum}"><a href  ng-click="updatePage(judge.last)"><span ng-if="atrs.lastText">{{atrs.lastText}}</span><span  ng-if="!atrs.lastText"　class="anniu">&raquo;</span></a></li>' +
        '</ul>' +
        '<ul ng-if="!itemSelectHide" class="pagination pagination-init page-num-this {{atrs.sizeClass}}"><li><a href ng-click="updateShow()" ng-class="{active:pageSelect}">{{ngModel}}/{{pageNum}}</a>' +
         '<div class="page-list" ng-show="pageSelect">' +
        '<div>每页显示</div><span ng-repeat="data in [10,20,50,100,200] track by $index" ng-class="{active:itemsPerPage===data}" ng-click="updateItem(data)">{{data}}</span>' +
        '<div>页&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp码</div>' +
        '<span ng-repeat="data in allPageArr track by $index" ng-class="{active:ngModel===data}" ng-click="updatePage(data)">{{data}}</span></div>'
    }
}])
/**
 * Created by admin on 2016/11/18.
 */
/**
 * @function tableOptions
 * @description  整个title配置规则描述
 * @argument name {String}  table每一列的标题显示配置；如果是“@”会直接显示一个多选框。
 * @argument defaultHide {Boolean} 此列默认是否隐藏。默认是false,不隐藏，
 * @argument lock {Boolean} 此列是否锁定，锁定就不能修改defaultHide的值。默认是false,不锁定，
 * @argument field {String | Array} 此列的取值规则，如果是String,应用表达式取值，如果第一个字符串是“@”就直接显示，如果是“@”会直接显示一个多选框。
 * @argument class {String} 此列的class规则，应用表达式取值，如果第一个字符串是“@”就直接显示，
 * @argument field.isHide {String} 此项是否隐藏，应用表达式取值，如果第一个字符串是“@”就直接显示，
 * @argument judge {String} 点击函数的标识符
 * @argument isHover {String} 鼠标经过显示的内容
 */
/**
 *
 * @function tqqTable
 * @description  tqqTable指令，按使用指令的方式使用。
 * @argument tableData {Array}  整个talbe用到的json数据
 * @argument tableOptions {Array} 整个table的列的配置，详情看tableOptions函数说明。
 * @argument tableChecked {Array} 如配置了多选框，这对象会接受一个数组，表示哪一行被选中。
 * @argument tqqClick(data,judge,key) {Function} 所有的table点击操作,此函数接收三个参数；data是操作的行的数据，judge是区分操作列，是配置时候judge的值，key是操作行的索引。
 * @argument ngModel {Object} 这个对象里有三个属性，isAll：列表是否每列都选中啦，isOne：列表是否只是选中一列，isMony：列表是否选中了多列。
 */
dir.directive('tqqTable', function () {
     return {
        restrict: 'EA',
        replace: true,
        require: '?ngModel',
        scope: {
            tableData: '=',
            tableOptions: '=',
            tqqClick: '&',
            tableChecked: '=',
        },
        link: function (scope, ele, atrs, ctr) {
            scope.$watch('tableData', function (ev) {
                if (ev && !angular.isArray(ev)) {
                    throw 'table-data属性的值必须是一个数组'
                }
            })
            if (atrs.tableChecked) {
                scope.tableChecked = [];
                scope.checkClick = function () {
                    var _check = [];
                    if (scope.tableData.length > 0) {
                        if (!scope.allChecked) {
                            angular.forEach(scope.tableData, function (result, key) {
                                _check[key] = true;
                            })

                        }
                        scope.tableChecked = _check;
                    }
                };
                scope.$watch('tableChecked', function (ev) {
                    if (scope.tableData && atrs.tableChecked) {
                        var _one = 0;
                        angular.forEach(scope.tableData, function (result, key) {
                            if (scope.tableChecked[key]) {
                                _one++;
                            }
                        });
                        if (_one == scope.tableData.length) {
                            scope.allChecked = true;
                        } else {
                            scope.allChecked = false;
                        }
                        if (ctr) {
                            ctr.$setViewValue({
                                isAll: scope.allChecked,
                                isOne: _one == 1 ? true : false,
                                isMany: _one > 0 ? true : false
                            });
                        }
                    }
                }, true)
            }
            scope.tdClick = function (data, judge, key) {
                if (atrs.tqqClick) {
                    scope.tqqClick()(data, judge, key);
                }
                if (scope.tableChecked && judge=='@') {
                    scope.tableChecked[key] = !scope.tableChecked[key];
                }
            }

        },
        template: '<table> ' +
        '<thead> ' +
        '<tr> ' +
        '<th ng-repeat="data in tableOptions track by $index" ng-if="!data.defaultHide" ng-class="{checkedNo:!allChecked,checkedYes:allChecked}"><div ng-if="data.name !== \'@\'">{{data.name}}</div><div ng-if="data.name === \'@\'" class="checkCtrl pointer" ng-click="checkClick()"></div></th> ' +
        '</tr> ' +
        '</thead> ' +
        '<tbody> ' +
        '<tr ng-if="!tableData"><td style="height:300px;" valign="middle" colspan="{{tableOptions.length}}">加载中...</td></tr>' +
        '<tr ng-if="tableData.length==0"><td style="height:300px;" valign="middle" colspan="{{tableOptions.length}}">没有数据</td></tr>' +
        '<tr ng-repeat="(key,value) in tableData track by $index" > ' +
        '<td ng-repeat="title in tableOptions track by $index" ng-class="{checkedNo:!tableChecked[key],checkedYes:tableChecked[key]}" ng-if="!title.defaultHide && !(title.field|tqqTableFieldIsArray)"><div class="{{title.class|tqqTableParse:value}}" ng-class = "{\'table-tr-hover\': title.isHover}" data-title = "{{title.isHover|tqqTableParse:value}}" ng-if="!title.isHtml && !(title.isHide|tqqTableParse:value)" ng-click="tdClick(value,title.judge,key)" ng-bind="title.field|tqqTableParse:value"></div><div class="{{title.class|tqqTableParse:value}}" ng-click="tdClick(value,title.judge,key)" ng-if="title.isHtml && !(title.isHide|tqqTableParse:value)" ng-class="{checkedNo:!tableChecked[key],checkedYes:tableChecked[key]}" ng-bind-html="title.field|tqqTableParse:value|toHtml"></div></td> ' +
        '<td ng-repeat="title in tableOptions track by $index" ng-if="!title.defaultHide && title.field|tqqTableFieldIsArray">' +
        '<div ng-repeat=" child in title.field track by $index" ng-if="!child.isHtml && !(child.isHide|tqqTableParse:value)" ng-click="tdClick(value,child.judge,key)" class="{{child.class|tqqTableParse:value}}" ng-bind="child.field|tqqTableParse:value"></div>' +
        '<div ng-repeat=" child in title.field track by $index" ng-if="child.isHtml && !(child.isHide|tqqTableParse:value)" ng-click="tdClick(value,child.judge,key)" class="{{child.class|tqqTableParse:value}}" ng-bind-html="child.field|tqqTableParse:value|toHtml"></div></td> ' +
        '</tr> ' +
        '</tbody> ' +
        '</table> '
    }
}).filter('tqqTableFieldIsArray', function () {
    return function (data) {
        return angular.isArray(data);
    }
}).filter('tqqTableParse', ["$parse", function ($parse) {
    return function (field, value) {
        if (field) {
            if (field.substr(0, 1) === "@" && field.length>1) {
                return field.slice(1);
            } else if (field === '@') {
                return '<div class="checkCtrl"></div>'
            } else {
                return $parse(field)(value)
            }
        }
    }
}]).filter('toHtml',["$sce", function($sce){
    return function(data){
        return $sce.trustAsHtml(data);
}
}]);