//自调用函数---小蛇
(function(){
	var el = []; //存放小蛇的每个身体部分
	//小蛇的构造函数
	function Snake (w,h,direction) {
		this.w = w || 20,
		this.h = h || 20,
		//小蛇的身体
		this.body = [
			{x:3,y:2,color:"#f02424",borderRadius:"50%"},
			{x:2,y:2,color:"#ec5d30",borderRadius:"25%"},
			{x:1,y:2,color:"#ec5d30",borderRadius:"25%"}
		],
		this.direction = direction || 'right';
	}

	//为原型添加方法--小蛇初始化的方法
	Snake.prototype.init = function(map){
		remove() //先删除之前的小蛇
		//循环遍历创建div
		for (var i = this.body.length - 1; i >= 0; i--) {
			var obj = this.body[i];
			var div = document.createElement('div');
			map.appendChild(div);
			div.style.position = 'absolute';
			div.style.width = this.w + 'px';
			div.style.height = this.h + 'px';
			div.style.left = obj.x * this.w +'px';
			div.style.top = obj.y * this.h +'px';
			div.style.background = obj.color;
			div.style.borderRadius = obj.borderRadius;
			el.push(div);
		}
	}
	//为原型添加方法---小蛇动起来
	Snake.prototype.move =function (food,map){
		//改变小蛇的身体的坐标位置
		for (var i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}
		//判断方向---改变小蛇的头的坐标位置
		switch (this.direction){
			case 'right' : 
				this.body[0].x += 1;
				break;
			case 'left' : 
				this.body[0].x -= 1;
				break;
			case 'top' : 
				this.body[0].y -= 1;
				break;
			case 'bottom' : 
				this.body[0].y += 1;
				break;
		}
		//判断有没有吃到食物
		//小蛇的头的坐标和食物的坐标一致
		var headX = this.body[0].x*this.w;
		var headY = this.body[0].y*this.h;
		//判断小蛇的头的坐标和食物的坐标是否相同
		if(headX === food.x && headY === food.y){
			//获取小蛇的最后的尾巴
			var last = this.body[this.body.length - 1];
			//把最后的蛇尾复制一个,重新的加入到小蛇的body中
			this.body.push({
				x:last.x,
				y:last.y,
				color:last.color,
				borderRadius:last.borderRadius
			});
			//把食物删除,重新初始化食物
			food.init(map);
		}
	}
	//删除小蛇的私有的函数
	function remove () {
		//删除map中的小蛇的每个div,同时删除elements数组中的每个元素,从蛇尾向蛇头方向删除div
		for (var i = el.length - 1; i >= 0; i--) {
			//从map地图上删除这个子元素div
			el[i].parentNode.removeChild(el[i]);
			el.splice(i,1);
		}
	}

	window.Snake = Snake;
}());