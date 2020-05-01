class Snake {
	constructor(size = 10, canvasOptions) {
		this.x = 0; //x轴坐标
		this.y = 0; //y轴坐标
		this.size = size; // 蛇身大小
		this.speedTimes = 1; //速度倍数
		this.xSpeed = size * this.speedTimes; //x轴速度
		this.ySpeed = 0; //y轴速度
		this.targetNum = 0; //吃掉的target数目
		this.tails = []; // 蛇尾坐标
		this.direction = "Right"; //移动方向
		this.canvasOptions = canvasOptions; 
	}
	// 画蛇
	draw() {
		const { ctx } = this.canvasOptions;
		ctx.fillStyle = "#fff";
		//画蛇尾
		for (let i = 0; i < this.tails.length; i++) {
			const { x, y } = this.tails[i];
			ctx.fillRect(x, y, this.size, this.size);
		}
		//画蛇头
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
	//更新状态
	update() {
		for (let i = 0; i < this.tails.length - 1; i++) {
			this.tails[i] = this.tails[i + 1];
		}

		if (this.targetNum > 0) {
			this.tails[this.targetNum - 1] = { x: this.x, y: this.y };
		}
		this.x += this.xSpeed;
		this.y += this.ySpeed;

		const { width, height } = this.canvasOptions.canvas;
		if (this.x > width) {
			this.x = 0;
		}

		if (this.y > height) {
			this.y = 0;
		}

		if (this.x < 0) {
			this.x = width;
		}

		if (this.y < 0) {
			this.y = height;
		}
	}
	//改变移动方向
	changeDirection(direction) {
		switch (direction) {
			case "Up":
				if (this.targetNum > 0) {
					if (this.direction !== "Down") {
						this.xSpeed = 0;
						this.ySpeed = -size * this.speedTimes;
						this.direction = "Up";
					}
				} else {
					this.xSpeed = 0;
					this.ySpeed = -size * this.speedTimes;
					this.direction = "Up";
				}

				break;
			case "Down":
				if (this.targetNum > 0) {
					if (this.direction !== "Up") {
						this.xSpeed = 0;
						this.ySpeed = size * this.speedTimes;
						this.direction = "Down";
					}
				} else {
					this.xSpeed = 0;
					this.ySpeed = size * this.speedTimes;
					this.direction = "Down";
				}

				break;
			case "Left":
				if (this.targetNum > 0) {
					if (this.direction !== "Right") {
						this.xSpeed = -size * this.speedTimes;
						this.ySpeed = 0;
						this.direction = "Left";
					}
				} else {
					this.xSpeed = -size * this.speedTimes;
					this.ySpeed = 0;
					this.direction = "Left";
				}

				break;
			case "Right":
				if (this.targetNum > 0) {
					if (this.direction !== "Left") {
						this.xSpeed = size * this.speedTimes;
						this.ySpeed = 0;
						this.direction = "Right";
					}
				} else {
					this.xSpeed = size * this.speedTimes;
					this.ySpeed = 0;
					this.direction = "Right";
				}
				break;
		}
	}

	eatTarget(target) {
		if (this.x === target.x && this.y === target.y) {
			this.targetNum++;
			return true;
		}
		return false;
	}

	checkCollision() {
		for (let i = 0; i < this.tails.length; i++) {
			if (this.x === this.tails[i].x && this.y === this.tails[i].y) {
				this.targetNum = 0;
				this.tails = [];
				return true;
			}
		}
		return false;
	}
}
