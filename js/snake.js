(function () {

	function Snake(options) {
		options = options || {};
		// 设置蛇身属性
		this.width = options.width || 20;
		this.height = options.height || 20;
		// 蛇初始默认方向
		this.direction = options.direction || 'right';
		// 蛇初始组成部分 数组记录位置 第一部分是蛇头
		this.body = [
			{x: 3,y: 2,color: 'red'},
			{x: 2,y: 2,color: 'blue'},
			{x: 1,y: 2,color: 'blue'}
		];
	}

	var position = 'absolute';
	var elements = []; // 用来保存记录之前被创建的蛇


	Snake.prototype.random = function (map) {

		// 删除之前创建的蛇
		remove();

		// 再创建蛇
		for (var i = 0, len = this.body.length; i < len; i++) {

			var obj = this.body[i];
			var div = document.createElement('div');
			map.appendChild(div);

			// 设置具体属性
			div.style.left = obj.x * this.width + 'px';
			div.style.top = obj.y * this.height + 'px';
			div.style.position = position;
			div.style.backgroundColor = obj.color;
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';

			elements.push(div);
		}
	}

	// 移除蛇轨迹 
	// (由于定义在"自调用函数"中 故它是一个私有化成员 外部无法访问 也防止被误调用)
	function remove(){
		for (var i = elements.length - 1; i >= 0; i--) { // 从末往头遍历
			elements[i].parentNode.removeChild(elements[i]); // 移除自身
			elements.splice(i, 1); // 从尾数起 第i个元素开始删除1个元素
		}
	}
	// 控制蛇移动方向
	Snake.prototype.move = function (food, move) {

		// 当前蛇节位置 移到 前一个蛇节位置
		for (var i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		var head = this.body[0];
		switch (this.direction) {
			case 'left':
				head.x -= 1;
				break;
			case 'right':
				head.x += 1;
				break;
			case 'top':
				head.y -= 1;
				break;
			case 'bottom':
				head.y += 1;
				break;
		}

		// 食物的坐标是像素，蛇的坐标是几个宽度，需要进行转换
		var headX = head.x * this.width;
		var headY = head.y * this.height;

		// 判断蛇在移动的过程中是否吃到食物 若蛇头和食物的位置重合代表吃到食物
		if (headX === food.x && headY === food.y) {

			// 吃到食物 往蛇节的最后添加一节
			// 原理: 取到蛇尾 复制它添加到最后
			var last = this.body[this.body.length - 1];
			this.body.push({
				x: last.x,
				y: last.y,
				color: last.color
			})
			
			food.random(map);	// 把现在的食物对象删除 并重新在地图上随机渲染一个食物对象
		}
	}

	window.Snake = Snake;
})()

var map = document.getElementById('map');
var snake = new Snake();
snake.random(map);