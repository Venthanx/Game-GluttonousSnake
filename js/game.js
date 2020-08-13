


(function () {
	// var document = window.document;
	var that;     // that记录游戏对象 使其在任何位置都能访问得到
    
	function Game(map) {
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
		that = this;
	}
	Game.prototype.start = function(){

		// 把snake和food渲染到map上来
		this.food.random(this.map);
        this.snake.random(this.map);
        
        // 调用蛇移动函数
        runSnake();

        // 调用键盘控制方法函数
        bindKey();
	}

    // 让蛇移动起来(私有化函数)
    function runSnake() {       
        var timerId = setInterval(function () {

            // 在定时器内部 this是指向window的 所以不能直接用
            // 故在最前面定义了一个that 记录游戏对象
            that.snake.move(that.food, that.map);
            that.snake.random(that.map);

            
            // 获取蛇的坐标
            var maxX = that.map.offsetWidth / that.snake.width;
            var maxY = that.map.offsetHeight / that.snake.height;
            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;

            // 判断蛇是否撞墙 撞上边界 游戏结束
            if (headX < 0 || headX >= maxX) {
                clearInterval(timerId);
                alert('Game Over');      
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timerId);
                alert('Game Over');
            }
            // alert会弹出后会导致页面重新渲染 蛇头跑出边界的bug 这里暂时忽略

        }, 150);
    }

    // 通过键盘控制蛇的移动方向 
    function bindKey() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37:
                    that.snake.direction = 'left';
                    break;
                case 38:
                    that.snake.direction = 'top';
                    break;
                case 39:
                    that.snake.direction = 'right';
                    break;
                case 40:
                    that.snake.direction = 'bottom';
                    break;
            }
        }.bind(that), false);
    }

	window.Game = Game;
})()
