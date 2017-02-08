/**
 * Created by xc on 2017/1/28.
 */
(function (angular) {
	// todomvc服务模块，处理数据（CRUE）
	angular.module('todoApp.todoSer',[])
		.service('todoSer',['$window',function ($window) {
			var storage = $window.localStorage;
			//获取缓存中任务列表数据
			var strData = storage.getItem('todoData');
			var todoList = JSON.parse(strData) || [];
			this.exportData = function () {
				return todoList;
			};

			// 保存数据
			this.saveData = function () {
				storage.setItem('todoData',JSON.stringify(todoList));
			};

			//添加数据
			this.addData = function (newTask) {
                // 设置数据id
				var id;
				if(todoList.length === 0){
					id = 0;
				}
				else {
					id = todoList[todoList.length - 1].id + 1;
				}
				todoList.push({id:id,name:newTask,isCompleted:false});
				this.saveData();
			};

			// 删除数据
			this.delData = function (id) {
				for (var i = 0; i < todoList.length; i++) {
					var temp = todoList[i];
					if(temp.id === id) {
						todoList.splice(i,1);
						this.saveData();
						return;
					}
				}
			};

			//切换任务选中状态
			this.checkedAll = function (isCheckedAll) {
				for (var i = 0; i < todoList.length; i++) {
					todoList[i].isCompleted = isCheckedAll;
				}
				this.saveData();
			};

			// 清除已完成任务
			this.clearCompleted = function () {
				var newTodoList = [];
				for (var i = 0; i < todoList.length; i++) {
					var temp = todoList[i];
					if(!temp.isCompleted){
						newTodoList.push(temp);
					}
				}
				// todoList = newTodoList;
				todoList.length = 0;
				[].push.apply(todoList,newTodoList);
				this.saveData();
			};
		}]);
})(angular);
