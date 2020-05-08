const phone = "13251330320";
const password = "wjx001220";

const login = true; //是否登录
const port = 3000;
const nickname = document.querySelector(".nickname");
const userAvatar = document.querySelector(".user-avatar");
const recommendImgs = document.querySelectorAll(
	".style-recommend .item-cover img"
);
const recommendTitles = document.querySelectorAll(
	".style-recommend .item-title"
);

const playLists = document.querySelector("#infoList_playlist");
const now_play = document.querySelector(".now-play-song");
const playlist_listPic = document.querySelector("#playlist_listPic");
const playlist_listName = document.querySelector("#playlist_listName");
const playlist_userName = document.querySelector("#playlist_userName");
const playlist_trackCount = document.querySelector("#playlist_trackCount");
const playlist_playCount = document.querySelector("#playlist_playCount");
const playlist_createTime = document.querySelector("#playlist_createTime");
const playlist_userFace = document.querySelector("#playlist_userFace");
const prevSongBtn = document.querySelector(".prev-song");
const nextSongBtn = document.querySelector(".next-song");
let currentPlayListIndex = null;

prevSongBtn.addEventListener("click", () => {
	toggleListMusic(false);
});
nextSongBtn.addEventListener("click", () => {
	toggleListMusic(true);
});
audio.addEventListener("ended", () => {
	toggleListMusic(true);
});

function toggleListMusic(forward) {
	let playListTr = document.querySelectorAll("#infoList_playlist tr");
	playListTr[currentPlayListIndex].querySelector(".index").innerHTML =
		currentPlayListIndex + 1 < 10
			? "0" + (currentPlayListIndex + 1)
			: currentPlayListIndex + 1;
	forward ? currentPlayListIndex++ : currentPlayListIndex--;
	target = playListTr[currentPlayListIndex];
	target.querySelector(
		".index"
	).innerHTML = `<i class = "fas fa-volume-up red"></i>`;
	audio.src = target.src;
	createScrollLrc(target.songId);
	setLyricPage({
		songName: target.songName,
		alPicUrl: target.alPicUrl,
		arName: target.arName,
		alName: target.alName,
	});
	audioPlayer.load();
	audioPlayer.play();
	now_play.classList.contains("active")
		? null
		: now_play.classList.add("active");
	nowPlaySongcover.style.backgroundImage = `url(${target.alPicUrl})`;
	nowPlaySongname.innerText = target.songName;
	nowPlayArtistsName.innerText = target.arName;
	nowPlayUserActio.style.display = "block";
}

function playListMusic(e) {
	let playListTr = document.querySelectorAll("#infoList_playlist tr");
	let { target } = e;
	target.nodeName.toLowerCase() === "tr"
		? null
		: (target = target.parentNode);
	if (target.nodeName.toLowerCase() === "tr") {
		audio.src = target.src;
		if (currentPlayListIndex !== null) {
			playListTr[currentPlayListIndex].querySelector(".index").innerHTML =
				currentPlayListIndex + 1 < 10
					? "0" + (currentPlayListIndex + 1)
					: currentPlayListIndex + 1;
		}
		currentPlayListIndex = target.index;
		target.querySelector(
			".index"
		).innerHTML = `<i class = "fas fa-volume-up red"></i>`;
		createScrollLrc(target.songId);
		setLyricPage({
			songName: target.songName,
			alPicUrl: target.alPicUrl,
			arName: target.arName,
			alName: target.alName,
		});
		audioPlayer.load();
		audioPlayer.play();
		now_play.classList.contains("active")
			? null
			: now_play.classList.add("active");
		nowPlaySongcover.style.backgroundImage = `url(${target.alPicUrl})`;
		nowPlaySongname.innerText = target.songName;
		nowPlayArtistsName.innerText = target.arName;
		nowPlayUserActio.style.display = "block";
	}
}

async function getSong(tracks, listInfo) {
	for (let j = 0; j < tracks.length; j++) {
		let songId = tracks[j].id;
		let songName = tracks[j].name;
		let arName = tracks[j].ar[0].name;
		let alName = tracks[j].al.name;
		let alPicUrl = tracks[j].al.picUrl;
		let {
			listCreatTime,
			listCoverUrl,
			listTrackCount,
			listPlayCount,
			listName,
			creatorAvatarUrl,
			creatorNickName,
		} = listInfo;
		playlist_listPic.src = listCoverUrl;
		playlist_listName.innerText = listName;
		playlist_trackCount.innerText = listTrackCount;
		playlist_playCount.innerText = listPlayCount;
		playlist_userName.innerText = creatorNickName;
		playlist_userFace.src = creatorAvatarUrl;
		let { Y, M, D } = formatDate(listCreatTime);
		playlist_createTime.innerText = `${Y}-${M}-${D}`;
		let tr = document.createElement("tr");
		tr.innerHTML += `
			<td class="index">${j + 1 < 10 ? "0" + (j + 1) : j + 1}</td>
			<td>
				<i class="fas fa-heart" aria-hidden="true"></i>&nbsp;
				<i class="fas fa-download" aria-hidden="true"></i>
			</td>
			<td>${songName}</td>
			<td>${arName}</td>
			<td>${alName}</td>
			<td>00:00</td>
			`;
		tr.index = j;
		tr.alName = alName;
		tr.songId = songId;
		tr.alPicUrl = alPicUrl;
		tr.songName = songName;
		tr.arName = arName;
		playLists.appendChild(tr);
		await axios({
			url: `http://localhost:${port}/song/url?id=${songId}`,
			withCredentials: true,
		}).then(res => {
			let song = res.data.data[0];
			let songUrl = song.url;

			tr.src = songUrl;
			tr.addEventListener("dblclick", playListMusic);
		});
	}
	return;
}

if (login) {
	if (!phone || !password) {
		const msg = "请设置你的手机号码和密码";
		throw new Error(msg);
	}
	axios({
		url: `http://localhost:${port}/login/cellphone?phone=${phone}&password=${password}`,
	}).then(function (res) {
		let data = res.data;
		let profile = data.profile;
		let userId = data.account.id;
		nickname.innerText = profile.nickname;
		userAvatar.style.backgroundImage = `url(${profile.avatarUrl})`;
		axios({
			url: `http://localhost:${port}/recommend/resource`,
			withCredentials: true,
		}).then(function (res) {
			let data = res.data;

			let recommends = data.recommend;

			for (let i = 0; i < recommendImgs.length; i++) {
				recommendImgs[i].src = recommends[i].picUrl;
				recommendTitles[i].innerText = recommends[i].name;
			}
		});

		axios({
			url: `http://localhost:${port}/user/playlist?uid=${userId}`,
		}).then(res => {
			for (let i = 0; i < 1; i++) {
				let playList = res.data.playlist; //数组 包含用户所有歌单
				let listCreatTime = playList[i].createTime;
				let listCoverUrl = playList[i].coverImgUrl;
				let listTrackCount = playList[i].trackCount;
				let listPlayCount = playList[i].playCount;
				let listName = playList[i].name;
				let listId = playList[i].id;
				let creatorAvatarUrl = playList[i].creator.avatarUrl;
				let creatorNickName = playList[i].creator.nickname;
				let listInfo = {
					listCreatTime,
					listCoverUrl,
					listTrackCount,
					listPlayCount,
					listName,
					creatorAvatarUrl,
					creatorNickName,
				};
				axios({
					url: `http://localhost:${port}/playlist/detail?id=${listId}`,
				}).then(res => {
					let tracks = res.data.playlist.tracks; //数组 包含歌单所有歌曲
					getSong(tracks, listInfo);
				});
			}
		});
	});
}
