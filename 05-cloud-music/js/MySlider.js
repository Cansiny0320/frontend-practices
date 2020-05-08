class MySlider {
	constructor(sliderContainerClassName = "slider-container") {
		this.autoPlay = true;
		this.sliderContainer = document.querySelector(
			"." + sliderContainerClassName
		);
		this.sliders = document.querySelectorAll(".slider");
		this.dots = null;
		this.prevBtn = document.querySelectorAll(".slider-content i")[0];
		this.nextBtn = document.querySelectorAll(".slider-content i")[1];
		this.prevBtn.onclick = this.prev.bind(this);
		this.nextBtn.onclick = this.next.bind(this);
		this.timer = null;
		this.interval = 3000;
		this.currentIndex = 0;
		this.preset();
		this.dots.forEach(dot => {
			dot.onmouseenter = this.handleDotClick.bind(this);
		});
		this.sliders.forEach(slide => {
			slide.onmouseenter = this.pause.bind(this);
			slide.onmouseleave = this.play.bind(this);
		});
		this.play();
	}

	preset() {
		//设置dot
		let dots = document.querySelector(".dots");
		for (let i = 0; i < this.sliders.length; i++) {
			let dot = document.createElement("span");
			dot.index = i;
			i === 0 ? dot.classList.add("active") : null;
			dots.appendChild(dot);
		}
		this.dots = dots.childNodes;

		//设置slider
		this.sliders[0].classList.add("active");
		this.sliders[this.sliders.length - 1].classList.add("prev");
		this.sliders[1].classList.add("next");
	}

	play() {
		this.pause();
		if (this.autoPlay) {
			this.timer = setInterval(() => {
				this.next();
			}, this.interval);
		}
	}

	next() {
		this.sliders[this.currentIndex].classList.remove("active");
		let currentIndex = this.currentIndex;
		if (this.currentIndex - 1 < 0) {
			this.sliders[this.sliders.length - 1].classList.remove("prev");
		} else {
			this.sliders[this.currentIndex - 1].classList.remove("prev");
		}
		if (this.currentIndex + 1 >= this.sliders.length) {
			this.sliders[0].classList.remove("next");
			this.currentIndex = 0;
			this.sliders[this.sliders.length - 1].classList.add("prev");
		} else {
			this.sliders[this.currentIndex + 1].classList.remove("next");
			this.currentIndex++;
			this.sliders[this.currentIndex - 1].classList.add("prev");
		}
		this.sliders[this.currentIndex].classList.add("active");
		if (this.currentIndex + 1 >= this.sliders.length) {
			this.sliders[0].classList.add("next");
		} else {
			this.sliders[this.currentIndex + 1].classList.add("next");
		}
		this.changeDotStyle(currentIndex, this.currentIndex);
	}
	prev() {
		let currentIndex = this.currentIndex;
		this.sliders[this.currentIndex].classList.remove("active");
		if (this.currentIndex + 1 >= this.sliders.length) {
			this.sliders[0].classList.remove("next");
		} else {
			this.sliders[this.currentIndex + 1].classList.remove("next");
		}

		if (this.currentIndex - 1 < 0) {
			this.sliders[this.sliders.length - 1].classList.remove("prev");
			this.currentIndex = this.sliders.length - 1;
			this.sliders[0].classList.add("next");
		} else {
			this.sliders[this.currentIndex - 1].classList.remove("prev");
			this.currentIndex--;
			this.sliders[this.currentIndex + 1].classList.add("next");
		}
		this.sliders[this.currentIndex].classList.add("active");
		if (this.currentIndex - 1 < 0) {
			this.sliders[this.sliders.length - 1].classList.add("prev");
		} else {
			this.sliders[this.currentIndex - 1].classList.add("prev");
		}
		this.changeDotStyle(currentIndex, this.currentIndex);
	}
	pause() {
		clearInterval(this.timer);
	}
	changeDotStyle(pre, next) {
		this.dots[pre].classList.remove("active");
		this.dots[next].classList.add("active");
	}

	handleDotClick(e) {
		let { target } = e;
		if (typeof target.index !== undefined) {
			let currentIndex = this.currentIndex;
			this.sliders[this.currentIndex].classList.remove("active");
			if (this.currentIndex - 1 < 0) {
				this.sliders[this.sliders.length - 1].classList.remove("prev");
				this.sliders[this.currentIndex + 1].classList.remove("next");
			} else if (this.currentIndex + 1 >= this.sliders.length) {
				this.sliders[this.currentIndex - 1].classList.remove("prev");
				this.sliders[0].classList.remove("next");
			} else {
				this.sliders[this.currentIndex - 1].classList.remove("prev");
				this.sliders[this.currentIndex + 1].classList.remove("next");
			}
			this.currentIndex = target.index;
			this.pause();
			this.sliders[this.currentIndex].classList.add("active");
			if (this.currentIndex - 1 < 0) {
				this.sliders[this.sliders.length - 1].classList.add("prev");
				this.sliders[this.currentIndex + 1].classList.add("next");
			} else if (this.currentIndex + 1 >= this.sliders.length) {
				this.sliders[this.currentIndex - 1].classList.add("prev");
				this.sliders[0].classList.add("next");
			} else {
				this.sliders[this.currentIndex - 1].classList.add("prev");
				this.sliders[this.currentIndex + 1].classList.add("next");
			}
			this.changeDotStyle(currentIndex, this.currentIndex);
			this.play();
		}
	}
}
