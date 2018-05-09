//自调用函数---游戏对象
(function(){
	//保存游戏Game的实例对象，定时器
	var $ = null,timer = null;
	//游戏的构造函数
	function Game (map) {
		this.food = new Food(); //食物对象
		this.snake = new Snake(); //小蛇对象
		this.map = map;//地图
		$ = this; //保存当前的实例对象到$变量中
	}

	//初始化游戏-----可以设置小蛇和食物显示出来
	Game.prototype.init = function(e){
		//初始化游戏
		this.food.init(this.map); //食物初始化
		this.snake.init(this.map); //小蛇初始化
		//调用自动移动小蛇的方法===||调用了小蛇自动移动的方法
		this.runSnake(this.food,this.map);
		//调用按键的方法
		this.bindKey();
	}

	//添加原型方法---设置小蛇可以自动的跑起来
	Game.prototype.runSnake = function(food,map){
		//自动的去移动
		timer = setInterval(function(){
			this.snake.move(food,map); //移动小蛇
			this.snake.init(map); //初始化小蛇
			var maxX = map.offsetWidth/this.snake.w; //横坐标的最大值
			var maxY = map.offsetHeight/this.snake.h; //纵坐标的最大值
			//小蛇的头的坐标
			var headX = this.snake.body[0].x;
			var headY = this.snake.body[0].y;
			var obj2 = deepCopy(this.snake.body);
			var arr = [];

			//拷贝小蛇身体
			function deepCopy(obj){
			    if(typeof obj != 'object'){
			        return obj;
			    }
			    var newobj = {};
			    for ( var attr in obj) {
			        newobj[attr] = deepCopy(obj[attr]);
			    }
			    return newobj;
			}
			
			//对象转换成数组
			for (var i in obj2) {
			    arr.push(obj2[i]); 
			}

			arr.shift(); //删除小蛇头部
			//判断小蛇头部有没有撞到自己的身体
			for (var value of arr) {
			  console.log(headX + " ===="+value.x + ":" +headY + "==="+ value.y);
			  if(headX == value.x && headY == value.y){
			  	clearInterval(timer);
			  }
			}

			//撞墙了,停止定时器
			if(headX < 0 || headX >= maxX || headY < 0 || headY >= maxY){
				clearInterval(timer);
			}
		}.bind($),100)
	}

	//添加原型方法---设置用户按键,改变小蛇移动的方向
	Game.prototype.bindKey = function (food,map){
		var _this = this, isStop = true;
		//获取用户的按键,改变小蛇的方向
		document.addEventListener('keydown',function(e){
			switch (e.keyCode){
				case 37:
					this.snake.direction = 'left';
					break;
				case 38:
					this.snake.direction = 'top';
					break;
				case 39:
					this.snake.direction = 'right';
					break;
				case 40:
					this.snake.direction = 'bottom';
					break;
				case 32:  //暂停
					isStop ? 
					 (isStop = false, clearInterval(timer)) 
					:(isStop = true, _this.runSnake(_this.food,_this.map));
					break;
			}
		}.bind($),false)
	}

	window.Game = Game;
}());