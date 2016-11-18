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
                if (scope.tableChecked) {
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
}).filter('tqqTableParse', function ($parse) {
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
}).filter('toHtml',function($sce){
    return function(data){
        return $sce.trustAsHtml(data);
}
});