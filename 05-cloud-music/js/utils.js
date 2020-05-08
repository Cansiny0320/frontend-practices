/**
 * @description 格式化歌曲播放时间
 * @param {String} str
 */
function PadZero(str) {
	//补零
	return new RegExp(/^\d$/g).test(str) ? `0${str}` : str;
}
function formatTime(_seconds) {
	_seconds = parseInt(_seconds);
	let hours, mins, seconds;
	let result = "";
	seconds = parseInt(_seconds % 60);
	mins = parseInt((_seconds % 3600) / 60);
	hours = parseInt(_seconds / 3600);

	if (hours)
		result = `${PadZero(hours)}:${PadZero(mins)}:${PadZero(seconds)}`;
	else result = `${PadZero(mins)}:${PadZero(seconds)}`;
	return result;
}

/**
 * @description 切换全屏
 */
function handleFullScreen() {
	let element = document.documentElement;

	// 判断是否已经是全屏
	// 如果是全屏，退出
	if (this.fullscreen) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		fullScreenBtns[2].style.display = "none";
		fullScreenBtns[0].style.display = "block";
	} else {
		// 否则，进入全屏
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.msRequestFullscreen) {
			// IE11
			element.msRequestFullscreen();
		}
		fullScreenBtns[2].style.display = "block";
		fullScreenBtns[0].style.display = "none";
	}
	// 改变当前全屏状态
	this.fullscreen = !this.fullscreen;
}

/**
 * @Theme 日期格式转换
 * @Param seconds
 * @Memo 1486684800000 -> 2017-02-10
 *
 */
function formatDate(timestamp) {
	var now = new Date(timestamp);
	var y = now.getFullYear(),
		m = +1 + now.getMonth(),
		d = now.getDate();

	return {
		Y: y,
		M: (m = m < 10 ? "0" + m : m),
		D: (d = d < 10 ? "0" + d : d),
	};
}

function setLyricPage(info) {
	const { songName, alPicUrl, arName, alName } = info;
	$(".info_song .songname").html(songName);
	$(".albumname").html(alName);
	$("#bgDisc").css({ backgroundImage: `url(${alPicUrl})` });
	$(".singersname").html(arName);
	$("#bgBlur").css({ backgroundImage: `url(${alPicUrl})` });
}
