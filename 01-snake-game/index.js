const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const size = 10;
const rows = canvas.height / size;
const columns = canvas.width / size;

let snake = new Snake(size, { canvas, ctx });
let target = new Target(size, { canvas, ctx, rows, columns });
const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
let timer = null;
let isPause = false;
let fps = 25;
function init() {
	pauseBtn.style.display = "none";
	target.genRandomLocation();
	target.draw();
	snake.draw();
}

function start() {
	pauseBtn.style.display = "block";
	timer = setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		target.draw();
		snake.update();
		snake.draw();
		if (snake.eatTarget(target)) target.genRandomLocation();
		if (snake.checkCollision()) {
			clearInterval(timer);
			startBtn.style.display = "block";
			pauseBtn.style.display = "none";
		}
		document.getElementById("score").innerText = snake.targetNum;
	}, 1000 / fps);
}

init();
startBtn.addEventListener("click", () => {
	start();
	startBtn.style.display = "none";
});

pauseBtn.addEventListener("click", () => {
	if (!isPause) {
		clearInterval(timer);
		isPause = true;
	} else {
		start();
		isPause = false;
	}
});

window.addEventListener("keydown", event => {
	const direction = event.key.replace("Arrow", "");
	snake.changeDirection(direction);
});
