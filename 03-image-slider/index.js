const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

const slides = document.querySelectorAll(".slide");

var currentIndex = 0;
var timer = null;
var autoPlay = true;
var forward = true;
var interval = 5000;

next.addEventListener("click", handleNextClicked);
prev.addEventListener("click", handlePrevClicked);

function handleNextClicked() {
	clearInterval(timer);
	timer = null;
	let current = slides[currentIndex];
	current.classList.remove("current");

	currentIndex++;
	if (currentIndex >= slides.length) {
		currentIndex = 0;
	}

	slides[currentIndex].classList.add("current");
	timer = setInterval(
		forward ? handleNextClicked : handlePrevClicked,
		interval
	);
}

function handlePrevClicked() {
	clearInterval(timer);
	timer = null;
	let current = slides[currentIndex];
	current.classList.remove("current");

	currentIndex--;
	if (currentIndex < 0) {
		currentIndex = slides.length - 1;
	}

	slides[currentIndex].classList.add("current");
	timer = setInterval(
		forward ? handleNextClicked : handlePrevClicked,
		interval
	);
}

if (autoPlay) {
	timer = setInterval(
		forward ? handleNextClicked : handlePrevClicked,
		interval
	);
}
