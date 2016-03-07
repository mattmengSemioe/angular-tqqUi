/**
 * Created by Administrator on 2016/3/6.
 */
var dir = angular.module('tqq.ui',[]);
/**
 * Created by Administrator on 2016/3/6.
 */
/**
 * Created by Administrator on 2016/2/28.
 */

dir.directive('tqqPagination',function(){
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
        var page=[]
        var pageCount=Math.ceil(allCount/perPageItem);
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
        var pageCount=Math.ceil(allCount/perPageItem)
        for(var i=1;i<=pageCount;i++){
            allPage.push(i)
        }
        return allPage
    };
    return {
        restrict:'EA',
        replace:true,
        scope:{
            totalItems:'=',
            maxSize:'=',
            itemsPerPage:'=',
            ngModel:'=',
            hideLast:'=',
            tqqChange:'&',
            itemSelectHide:'='
        },
        link:function(scope,ele,atrs,dir){
            scope.atrs=atrs;
            if(!atrs.ngModel)
                throw '\"ng-model\" is undefined \n 中文:\"ng-model\"为必传参数。';
            if(!atrs.itemsPerPage)
                throw '\"items-per-page\" is undefined \n 中文:\"items-per-page\"为必传参数。';
            if(!atrs.totalItems)
                throw '\"total-items\" is undefined \n 中文:\"total-items\"为必传参数。';
            if(!((scope.totalItems && typeof scope.totalItems === 'number') || +scope.totalItems === +scope.totalItems))
                throw '\"total-items\" only Numbers \n 中文:\"total-items\"这个参数只能是数字。';
            var _watchModel,_watchTotal,_watchPage;
            scope.ngModel=scope.ngModel || 1;
            scope.pageNum=Math.ceil(scope.totalItems/(scope.itemsPerPage || 10));
            scope.pageArr = createPage(scope.totalItems,scope.itemsPerPage || 10,scope.maxSize || 5,scope.ngModel || 1)
            scope.allPageArr=createAllPage(scope.totalItems,scope.itemsPerPage || 10);
            scope.judge={
                first:'first',
                previous:'previous',
                next:'next',
                last:'last',
            }
            scope.$watch('ngModel',function(ev,er){
                if(_watchModel){
                    scope.pageArr = createPage(scope.totalItems,scope.itemsPerPage || 10,scope.maxSize || 5,scope.ngModel || 1);
                    scope.tqqChange()
                }
                _watchModel = true;
            });
            scope.$watch('totalItems',function(){
                if(_watchTotal){
                    scope.ngModel = 1;
                    scope.pageArr = createPage(scope.totalItems,scope.itemsPerPage || 10,scope.maxSize || 5,scope.ngModel || 1);
                    scope.allPageArr=createAllPage(scope.totalItems,scope.itemsPerPage || 10);
                    scope.pageNum=Math.ceil(scope.totalItems/(scope.itemsPerPage || 10));
                }
                 _watchTotal = true;
            });
            scope.$watch('itemsPerPage',function(){
                if(_watchPage){
                    scope.ngModel = 1;
                    scope.pageArr = createPage(scope.totalItems,scope.itemsPerPage || 10,scope.maxSize || 5,scope.ngModel || 1);
                    scope.allPageArr=createAllPage(scope.totalItems,scope.itemsPerPage || 10);
                    scope.pageNum=Math.ceil(scope.totalItems/(scope.itemsPerPage || 10));
                }
                _watchPage = true;
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
                        console.log(342)
                        scope.pageSelect=false;
                        scope.ngModel=type;
                }

            };
            scope.updateItem=function(val){
                scope.numSelect=false;
                scope.itemsPerPage=val;
            }
            scope.updateSelect=function(){
                scope.pageSelect =! scope.pageSelect;
            }
            scope.updateSelectNum=function(){
                scope.numSelect =! scope.numSelect;
            }
        },
        template:'<nav><ul class="pagination mg-none {{atrs.sizeClass}}">' +
        '<li ng-if="!hideLast"  ng-class="{disabled:ngModel===1}"><a href aria-label="First" ng-click="updatePage(judge.first)"><span ng-if="atrs.firstText">{{atrs.firstText}}</span><span aria-hidden="true" ng-if="!atrs.firstText">&laquo;</span></a></li>' +
        '<li ng-class="{disabled:ngModel===1}"><a href aria-label="Previous" ng-click="updatePage(judge.previous)"><span ng-if="atrs.previousText">{{atrs.previousText}}</span><span aria-hidden="true" ng-if="!atrs.previousText">&lsaquo;</span></a></li>' +
        '<li ng-repeat="val in pageArr track by $index" ng-class="{active:ngModel===val}"><a href ng-click="updatePage(val)">{{val}}</a></li>' +
        '<li ng-class="{disabled:ngModel===pageNum}"><a href aria-label="Next" ng-click="updatePage(judge.next)"><span ng-if="atrs.nextText">{{atrs.nextText}}</span><span aria-hidden="true" ng-if="!atrs.nextText">&rsaquo;</span></a></li>' +
        '<li ng-if="!hideLast" ng-class="{disabled:ngModel===pageNum}"><a href aria-label="Last" ng-click="updatePage(judge.last)"><span ng-if="atrs.lastText">{{atrs.lastText}}</span><span aria-hidden="true" ng-if="!atrs.lastText">&raquo;</span></a></li>' +
        '</ul>' +
        '<ul ng-if="!itemSelectHide" class="pagination pagination-init {{atrs.sizeClass}}"><li><a href class="left" ng-click="updateSelect()" ng-class="{active:pageSelect}">{{ngModel}}</a><li><a href="" class="init">/</a></li></li> <li><a href class="right" ng-class="{active:numSelect}" ng-click="updateSelectNum()">{{pageNum}}</a></li>' +
        '<div class="page-list" ng-if="pageSelect"><span ng-repeat="data in allPageArr track by $index" ng-class="{active:ngModel===data}" ng-click="updatePage(data)">{{data}}</span></div>' +
        '<div class="page-list num-select" ng-if="numSelect"><div>每页显示条数</div><span ng-repeat="data in [10,20,50,100,200] track by $index" ng-class="{active:itemsPerPage===data}" ng-click="updateItem(data)">{{data}}</span></div></ul></nav>'
    }
})