const musicListImgs = document.querySelectorAll(".music-list .item-cover img");
const musicListTitles = document.querySelectorAll(".music-list .item-title");
for (let offset = 0, page = 0; offset <= 50; offset += 50, page++) {
	axios({
		url: `http://localhost:${port}/top/playlist?offset=${offset}`,
	}).then(res => {
		let playlists = res.data.playlists;
		for (let i = 0; i < 50; i++) {
			musicListImgs[page * 50 + i].src = playlists[i].coverImgUrl;
			musicListTitles[page * 50 + i].innerText = playlists[i].name;
		}
	});
}
