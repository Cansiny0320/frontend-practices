const audioPlayer = new AudioPlayer();
const fullScreenBtns = document.querySelectorAll(".window-control a")[2]
	.childNodes; //0为放大 1为缩小 默认为0
const closeBtn = document.querySelector(".fas.fa-times");

closeBtn.addEventListener("click", () => {
	window.opener = null;

	window.close();
});

fullScreenBtns.forEach(el => {
	el.addEventListener("click", handleFullScreen);
});

async function setSliders() {
	const slider_content = document.querySelector(".slider-content");
	await axios({
		url: `http://localhost:${port}/banner?type=0`,
		withCredentials: true,
	}).then(res => {
		for (let i = 0; i < res.data.banners.length; i++) {
			let sliderImgUrl = res.data.banners[i].imageUrl;
			let slider = document.createElement("div");
			slider.style.backgroundImage = `url(${sliderImgUrl})`;
			slider.classList.add("slider");
			slider_content.appendChild(slider);
		}
		const mySlider = new MySlider("slider-container");
	});
}

window.onload = function () {
	setSliders();
};
