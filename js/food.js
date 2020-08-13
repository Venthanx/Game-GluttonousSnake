
(function () {

	function Food(options) {		// 创建Food的构造函数
		options = options || {}; 	// 防止没有传入参数而出错
	
		// 设置对象的属性
		this.color = options.color || "red";
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.x = options.x || 0;
		this.y = options.y || 0;
	}

	var position = "absolute"; // 不用把定位写死 写在全局下便于修改
	var elements = []; // 用来保存记录被吃掉删除的食物方块

	// 通过原型设置方法 动态创建食物div 渲染到页面上
	Food.prototype.random = function (map) {

		remove();

		// 创建食物div 将它添加到map中
		var div = document.createElement('div');
		map.appendChild(div);

		// 随机改变食物的位置
		this.x = parseInt(Math.random() * map.offsetWidth / this.width - 1) * this.width;
		this.y = parseInt(Math.random() * map.offsetHeight / this.height - 1) * this.height;

		// 设置对象的具体属性
		div.style.position = position;
		div.style.left = this.x + 'px';
		div.style.top = this.y + 'px';
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.backgroundColor = this.color;

		elements.push(div);
	}

	function remove() {
		for (var i = elements.length - 1; i >= 0; i--) { // 从末往头遍历
			elements[i].parentNode.removeChild(elements[i]); // 移除自身
			elements.splice(i, 1); // 从尾数起 第i个元素开始删除1个元素
		}
	}

	window.Food = Food;		// 通过window暴露Food对象
})()


var map = document.getElementById('map');
var food = new Food(); // 创建实例 引用创建好的构造函数
food.random(map); // 赋予函数执行方法