const wrappers = document.querySelectorAll(".content-wrapper .wrapper");
const mainWrapper = document.querySelector(".main-wrapper");
const searchWrapper = document.querySelector(".search-wrapper");
const nav = document.querySelectorAll(".content-wrapper nav a");
const prevBtn = document.querySelector("button.prev");
const nextBtn = document.querySelector("button.next");

const content_wrappers = document.querySelectorAll(".content-wrapper"); //0->mian 1->search 2->list

const musicListItems = document.querySelectorAll(
	".created-music-list .list .item"
);

const lyricPage = document.querySelector("#pageSongDetail");
const lyricPageBtn = document.querySelector("#btnCompressPlayBox");
let backed = false;
let forward = false;
let currentWrapperIndex = 0;
let currentContentWrapperIndex = 0;
nav.forEach((nav, i) => {
	nav.index = i;
	nav.addEventListener("click", changeMainWrapper);
});
prevBtn.addEventListener("click", search2main);
nextBtn.addEventListener("click", main2search);
musicListItems.forEach(item => {
	item.addEventListener("click", handleListClick);
});
nowPlaySongcover.addEventListener("click", toggleLyricPage);
lyricPageBtn.addEventListener("click", toggleLyricPage);
function toggleLyricPage() {
	lyricPage.classList.toggle("active");
}
function changeMainWrapper(e) {
	const { target } = e;
	nav[currentWrapperIndex].classList.remove("active");
	wrappers[currentWrapperIndex].classList.remove("active");
	currentWrapperIndex = target.index;
	nav[currentWrapperIndex].classList.add("active");
	wrappers[currentWrapperIndex].classList.add("active");
}

function main2search() {
	mainWrapper.classList.remove("active");
	searchWrapper.classList.add("active");
	currentContentWrapperIndex = 1;
	changeContentWrapper();
}

function search2main() {
	mainWrapper.classList.add("active");
	searchWrapper.classList.remove("active");
	currentContentWrapperIndex = 0;
	backed = true;
	changeContentWrapper();
}

function changeContentWrapper() {
	currentContentWrapperIndex > 0 ? prevBtn.classList.add("active") : null;
	backed ? nextBtn.classList.add("active") : (backed = true);
	for (let i = 0; i < content_wrappers.length; i++) {
		content_wrappers[i].classList.contains("active")
			? content_wrappers[i].classList.remove("active")
			: null;
	}
	switch (currentContentWrapperIndex) {
		case 0:
			content_wrappers[0].classList.contains("active")
				? null
				: content_wrappers[0].classList.add("active");
			break;
		case 1:
			content_wrappers[1].classList.contains("active")
				? null
				: content_wrappers[1].classList.add("active");
			break;
		case 2:
			content_wrappers[2].classList.contains("active")
				? null
				: content_wrappers[2].classList.add("active");
			break;
	}
}

function handleListClick() {
	currentContentWrapperIndex = 2;
	changeContentWrapper();
}
