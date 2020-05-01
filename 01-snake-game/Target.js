class Target {
	constructor(size = 10, canvasOptions) {
		this.x = null;
		this.y = null;
		this.size = size;
		this.canvasOptions = canvasOptions;
	}

	draw() {
		const { ctx } = this.canvasOptions;
		ctx.fillStyle = "#e83333";
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}

	genRandomLocation() {
		const { rows, columns } = this.canvasOptions;
		this.x = (Math.floor(Math.random() * columns - 1) + 1) * this.size;
		this.y = (Math.floor(Math.random() * rows - 1) + 1) * this.size;
	}
}
