function sendXhr({
	method = "GET",
	url,
	async = true,
	success,
	error = () => {
		console.log("error");
	},
	beforeSuccess = null,
	afterSuccess = null,
} = {}) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 1 && beforeSuccess) beforeSuccess();
		if (xhr.readyState == 4) {
			if (xhr.status >= 200 && xhr.status < 300) {
				let res = JSON.parse(xhr.responseText);
				success(res);
				afterSuccess && afterSuccess();
			} else {
				error();
			}
		}
	};
	xhr.open(method, url, async);
	xhr.send();
}

function setPoetry({ title, author, dynasty, content } = {}) {
	document.querySelector(".poetry__title").innerText = title || "";
	document.querySelector(".poetry__author").innerText = author || "";
	document.querySelector(".poetry__dynasty").innerText = dynasty || "";
	const poetryContent = document.querySelector(".poetry__content");
	let contentHtml = "";
	for (let i = 0; i < content.length; i++) {
		contentHtml += `<p class="poetry__content__p">${content[i]}</p>`;
	}
	poetryContent.innerHTML = contentHtml;
}

const OnePoetry = {
	handleRes: res => {
		let origin = res.data.origin;
		document.querySelector(
			".one"
		).innerText = `${res.data.content}—— ${origin.author}《${origin.title}》 `;
	},
	sendXhr: () => {
		sendXhr({
			method: "GET",
			url: "https://v2.jinrishici.com/one.json",
			async: false,
			success: OnePoetry.handleRes,
		});
	},
};

function handlePoetryJsonRes(res) {
	let index = Math.floor(Math.random() * 999);
	setPoetry({
		title: res[index].title,
		author: res[index].author,
		content: res[index].paragraphs,
	});
	sessionStorage.setItem("poetry", JSON.stringify(res));
}
function sendPoetryJsonXhr() {
	function getPoetryJsonUrl() {
		/**
		 *  example
		 *  poet.song.[0-254000].json
		 *	poet.tang.[0-57000].json
		 */
		const API = [
			`https://unpkg.com/chinese-poetry@1.2.0/chinese-poetry/json/poet.song.${
				Math.round(Math.random() * 254) * 1000
			}.json`,
			`https://unpkg.com/chinese-poetry@1.2.0/chinese-poetry/json/poet.tang.${
				Math.round(Math.random() * 57) * 1000
			}.json`,
		];
		return API[Math.round(Math.random() * (API.length - 1))];
	}
	sendXhr({
		method: "GET",
		url: getPoetryJsonUrl(),
		async: true,
		success: handlePoetryJsonRes,
		beforeSuccess: toggleLoading,
		afterSuccess: toggleLoading,
	});
}

function httpRequest() {
	sessionStorage.getItem("poetry")
		? handlePoetryJsonRes(JSON.parse(sessionStorage.getItem("poetry")))
		: sendPoetryJsonXhr();
}
OnePoetry.sendXhr();
httpRequest();
document
	.querySelector(".refresh")
	.addEventListener("click", httpRequest, false);

function toggleLoading() {
	document.querySelector(".loading").classList.toggle("active");
}
