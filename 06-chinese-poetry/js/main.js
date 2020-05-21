// poet.song.[0-254000].json
const songAPI = `https://unpkg.com/chinese-poetry@1.2.0/chinese-poetry/json/poet.song.0.json`;
// poet.tang.[0-57000].json
const tangAPI = `https://unpkg.com/chinese-poetry@1.2.0/chinese-poetry/json/poet.tang.10000.json`;

function sendXhr({ method = "GET", url, async = true, success, error } = {}) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status >= 200 && xhr.status < 300) {
				let res = JSON.parse(xhr.responseText);
				success(res);
			} else {
				console.log("error");
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
		setPoetry({
			title: origin.title,
			author: origin.author,
			dynasty: origin.dynasty,
			content: origin.content,
		});
	},
	sendXhr: () => {
		sendXhr({
			method: "GET",
			url: "https://v2.jinrishici.com/one.json",
			async: true,
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
function sendJsonXhr() {
	sendXhr({
		method: "GET",
		url: tangAPI,
		async: true,
		success: handlePoetryJsonRes,
	});
}

function httpRequest() {
	sessionStorage.getItem("poetry")
		? handlePoetryJsonRes(JSON.parse(sessionStorage.getItem("poetry")))
		: sendJsonXhr();
}
httpRequest();
document
	.querySelector(".refresh")
	.addEventListener("click", httpRequest, false);
