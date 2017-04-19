/**
 * Created by Administrator on 2016/3/6.
 */
/**
 * Created by Administrator on 2016/2/28.
 */

  dir.directive('tqqPagination',function($parse){
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
})