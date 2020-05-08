const limit = 20; //返回的歌曲数
const searchInput = document.querySelector(".search");
const searchBtn = document.querySelector(".search-icon");
const audio = document.querySelector("audio");
const songListOL = document.querySelector(".song-list ol");
for (let i = 0; i < limit; i++) {
	let li = document.createElement("li");
	songListOL.appendChild(li);
}
const songList = document.querySelectorAll(".song-list ol li");
const spans = document.querySelectorAll(".song-list ol li span");
const nowPlaySongcover = document.querySelector(".now-play-song .cover");
const nowPlaySongname = document.querySelector(".now-play-song .song-name");
const nowPlayArtistsName = document.querySelector(".now-play-song .singer");
const nowPlayUserActio = document.querySelector(".user-action");

let currentSongListIndex = null;
spans.forEach(span => {
	span.addEventListener("cklick", () => {}, true);
});
songList.forEach(el => {
	el.addEventListener("click", selectSong, true);
});

function selectSong(e) {
	let { target } = e;
	target.nodeName.toLowerCase() === "li"
		? null
		: (target = target.parentNode);
	if (target.nodeName.toLowerCase() === "li") {
		audio.src = target.src;
		createScrollLrc(target.songId);
		setLyricPage({
			songName: target.songName,
			alPicUrl: target.albumUrl,
			arName: target.artistsName,
			alName: target.alName,
		});
		audioPlayer.load();
		audioPlayer.play();
		currentSongListIndex != null
			? songList[currentSongListIndex].classList.remove("active")
			: null;
		currentSongListIndex = target.index;
		songList[currentSongListIndex].classList.add("active");
		now_play.classList.contains("active")
			? null
			: now_play.classList.add("active");
		nowPlaySongcover.style.backgroundImage = `url(${songList[currentSongListIndex].albumUrl})`;
		nowPlaySongname.innerText = songList[currentSongListIndex].songName;
		nowPlayArtistsName.innerText =
			songList[currentSongListIndex].artistsName;
		nowPlayUserActio.style.display = "block";
	}
}

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", e => {
	let { key } = e;
	if (key === "Enter") {
		handleSearch();
	}
});

function handleSearch() {
	search();
	main2search();
}

function search() {
	let keywords = searchInput.value;

	axios({
		url: `http://localhost:${port}/search?keywords=${keywords}`,
	}).then(res => {
		let songs = res.data.result.songs;
		for (let i = 0; i < limit; i++) {
			let songId = songs[i].id;
			let songName = songs[i].name;
			let artists = songs[i].artists[0];
			let artistsName = artists.name;
			let albumId = songs[i].album.id;
			songList[i].songName = songName;
			songList[i].artistsName = artistsName;
			axios({
				url: `http://localhost:${port}/song/url?id=${songId}`,
			}).then(res => {
				songList[i].songId = songId;
				songList[i].src = res.data.data[0].url;
				songList[i].index = i;

				songList[
					i
				].innerHTML = `<span class="list-cur"></span><span class="list-index">${
					i + 1
				}</span>
                <span class="list-title">${songName}</span><span class="list-author">${artistsName}</span>`;
			});
			axios({
				url: `http://localhost:${port}/album?id=${albumId}`,
			}).then(res => {
				songList[i].albumUrl = res.data.songs[0].al.picUrl;
				songList[i].alName = res.data.songs[0].al.name;
			});
		}
	});
}
