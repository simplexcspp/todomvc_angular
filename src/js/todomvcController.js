/**
 * Created by xc on 2017/1/28.
 */
(function (angular) {
	// todomvc控制器模块
	angular.module('todoApp.todoCtrl',['ngRoute'])
		// 配置路由
		.config(['$routeProvider',function ($routeProvider) {
			$routeProvider
				.when('/:status?',{
					templateUrl: './src/template.html',
					controller: 'todoCtrl'
				})
		}])
		.controller('todoCtrl',['$scope','$location','$routeParams','todoSer',function ($scope,$location,$routeParams,todoSer) {
			// 添加任务列表功能
			// 从服务中获取数据
			$scope.todoList = todoSer.exportData();

			// 添加任务功能
			$scope.newTask = '';
			$scope.add = function () {
				// 过滤空内容
				if(!$scope.newTask) {
					return;
				}
				todoSer.addData($scope.newTask);
				// 任务添加后清空原输入内容
				$scope.newTask = '';
			};

			// 删除任务的功能
			$scope.remove = function (id) {
				todoSer.delData(id);
			};

			// 修改任务的功能
			//标识id匹配修改时候的样式
			$scope.updateId = -1;
			$scope.update = function (id) {
				$scope.updateId = id;
			};
			$scope.save = function () {
				$scope.updateId = -1;
			};

			// 切换任务选中状态功能
			$scope.isCheckedAll = false;
			$scope.checkedAll = function () {
				todoSer.checkedAll($scope.isCheckedAll);
			};

			// 切换单个任务的选中状态
			$scope.$watch('todoList',function (curValue,oldValue) {
				if(curValue === oldValue) {
					return;
				}
				todoSer.saveData();
			},true);

			// 清除已完成任务功能
			$scope.clearCompleted = function () {
				todoSer.clearCompleted();
				// $scope.todoList = todoSer.exportData(); // 服务中的todoList数据和控制器中的todoList指向不同
			};

			// 控制清除按钮的展示和隐藏功能
			$scope.isShow = function () {
				for (var i = 0; i < $scope.todoList.length; i++) {
					var temp = $scope.todoList[i];
					if(temp.isCompleted){
						return true;
					}
				}
				return false;
			};

			// 显示未完成的任务数功能
			$scope.getCount = function () {
				var count = 0;
				$scope.todoList.forEach(function (value) {
					if(!value.isCompleted){
						count++;
					}
				});
				return count;
			};

			// 显示不同状态的任务,根据URL变化显示相应任务功能
			switch ($routeParams.status) {
				case 'active':
					$scope.status = {isCompleted: false};
					break;
				case 'completed':
					$scope.status = {isCompleted: true};
					break;
				default:
					$scope.status = {};
					break;
			}
		}]);
})(angular);