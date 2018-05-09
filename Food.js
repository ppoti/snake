//自调用函数----食物的
(function(){
	var el = []; //用来保存每个小方块食物的
	//食物就是一个对象,有宽,有高,有颜色,有横纵坐标,先定义构造函数,然后创建对象
	function Food(x,y,w,h,bg){
		//初始化style样式
		var n =  [0,20,'url(Strawberry.png)']
		this.x = x||n[0],
		this.y = y||n[0],
		this.w = w||n[1],
		this.h = h||n[1],
		this.bg = bg||n[2];
	}
	//为原型添加初始化的方法(作用：在页面上显示这个食物)
	//因为食物要在地图上显示,所以,需要地图的这个参数(map---就是页面上的.class=map的这个div)
	Food.prototype.init = function(map){
		//先删除这个小食物 ，外部无法访问的函数
		remove()
		var div = document.createElement('div');
		map.appendChild(div);
		div.style.width = this.w + 'px',
		div.style.height = this.h + 'px',
		div.style.backgroundImage = this.bg,
		div.style.backgroundSize = "100%",
		div.style.position = 'absolute',
		this.x =  parseInt(Math.random()*(map.offsetWidth/this.w))*this.w,
		this.y =  parseInt(Math.random()*(map.offsetHeight/this.h))*this.h,
		div.style.left = this.x + 'px',
		div.style.top = this.y + 'px';
		el.push(div)
	}

	//私有的函数---删除食物的
	function remove (){
		for (var i = el.length - 1; i >= 0; i--) {
			el[i].parentNode.removeChild(el[i]);
			el.splice(i,1)
		}	
	}

	window.Food = Food;
}());