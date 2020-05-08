class AudioPlayer {
	constructor() {
		this.audio = document.querySelector("audio");
		this.audio.muted = false;
		this.audio.volume = 1;
		this.muteBtns = document.querySelectorAll(".volumn-control i"); // 0有声 1静音
		this.playBtns = document.querySelectorAll(".play-pause"); //0播放 1暂停
		this.volumnBar = document.querySelector("#volumn-bar");
		this.timeBar = document.querySelector("#progress-bar");
		this.playBtns[0].onclick = this.play.bind(this);
		this.playBtns[1].onclick = this.pause.bind(this);
		this.muteBtns.forEach(btn => {
			btn.onclick = this.mute.bind(this);
		});
		this.volumnBar.oninput = this.changeVolumn.bind(this);
		this.timeBar.oninput = this.changeTime.bind(this);
		this.audio.ontimeupdate = this.timeUpdate.bind(this);
		this.bgDisc = $("#bgDisc");
		this.discNeedle = $("#discNeedle");
	}

	preset() {}
	load() {
		this.audio.load();
	}
	play() {
		this.audio.play();
		this.playBtns[0].style.display = "none";
		this.playBtns[1].style.display = "block";
		// 转盘动画恢复
		this.bgDisc.css({
			"-webkit-animation-play-state": "running",
			"animation-play-state": "running",
		});
		// 磁针放下
		this.discNeedle.addClass("play");
	}
	pause() {
		this.audio.pause();
		this.playBtns[0].style.display = "block";
		this.playBtns[1].style.display = "none";
		this.bgDisc.css({
			"-webkit-animation-play-state": "paused",
			"animation-play-state": "paused",
		});
		// 磁针抬起
		this.discNeedle.removeClass("play");
	}
	mute() {
		if (this.audio.muted) {
			this.muteBtns[1].style.display = "none";
			this.muteBtns[0].style.display = "block";
			this.audio.muted = false;
		} else {
			this.muteBtns[0].style.display = "none";
			this.muteBtns[1].style.display = "block";
			this.audio.muted = true;
		}
	}
	changeVolumn() {
		this.audio.volume = this.volumnBar.value / 100;
		this.volumnBar.style.backgroundSize = `${this.volumnBar.value}%  100%`;
	}

	changeTime() {
		this.audio.currentTime =
			(this.timeBar.value / 1000) * this.audio.duration;
		this.timeUpdate();
	}

	timeUpdate() {
		if (this.audio.duration) {
			let currentTime = document.querySelector(".now-play-time");
			let duration = document.querySelector(".total-time");
			let percent = (this.audio.currentTime / this.audio.duration) * 1000;
			duration.innerText = formatTime(this.audio.duration);
			currentTime.innerText = formatTime(this.audio.currentTime);
			this.timeBar.value = percent;
			this.timeBar.style.backgroundSize = `${
				this.timeBar.value / 10
			}%  100%`;
			if (this.audio.currentTime === this.audio.duration) {
				this.pause();
			}
		}
	}
}
