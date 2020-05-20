let _location = "kaizhou,chongqing";
const key = "b476278915744aa68ff209fe294af7f0";
const time = new Date().getHours();
handleHttpRequest();

function handleHttpRequest() {
	//当前天气
	sendXhr({
		url: `https://free-api.heweather.net/s6/weather/now?location=${_location}&key=${key}`,
		async: false,
		success: handleNowResText,
	});
	//3天天气预测
	sendXhr({
		url: `https://free-api.heweather.net/s6/weather/forecast?location=${_location}&key=${key}`,
		async: false,
		success: handleForecastResText,
	});
	sendXhr({
		url: `https://free-api.heweather.net/s6/air/now?location=chongqing&key=${key}`,
		async: false,
		success: handleAirResText,
	});
}

function sendXhr({ method = "GET", url, async = true, success, error } = {}) {
	xhr = new XMLHttpRequest();
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

function handleNowResText(res) {
	const basic = res.HeWeather6[0].basic;
	const now = res.HeWeather6[0].now;
	const city =
		basic.parent_city === basic.location
			? basic.location
			: `${basic.parent_city} ${basic.location}`;
	setLocation(city);
	setNowWeather({
		tem: now.tmp,
		hum: now.hum,
		windSc: now.wind_sc,
		windDir: now.wind_dir,
		weatherType: now.cond_txt,
	});
	function setLocation(city) {
		document.querySelector(".location__city").innerText = city;
	}

	function setNowWeather({ tem, hum, windSc, windDir, weatherType } = {}) {
		document.querySelector(".weather__temperature").innerText = `${tem}°`;
		document.querySelector(".weather__type").innerText = weatherType;
		document.querySelector(
			".weather__extra__humidity"
		).innerText = `湿度 ${hum}%`;
		document.querySelector(
			".weather__extra__wind"
		).innerText = `${windDir} ${windSc}级`;
	}
}

function handleForecastResText(res) {
	const dailyForecast = res.HeWeather6[0].daily_forecast; //数组 三天的天气预报
	document
		.querySelectorAll(".recent-weather__wrapper")
		.forEach((item, index) => {
			item.querySelector(
				".temperature"
			).innerText = `${dailyForecast[index].tmp_max}/${dailyForecast[index].tmp_min}°`;
			item.querySelector(".weather-type").innerText = isNight(
				time,
				dailyForecast[index].sr,
				dailyForecast[index].ss
			)
				? dailyForecast[index].cond_txt_n
				: dailyForecast[index].cond_txt_d;
		});
}

function isNight(hour, sr, ss) {
	return hour <= sr && hour >= ss;
}

function handleAirResText(res) {
	const now = res.HeWeather6[0].air_now_city;
	setAirQuality(now.aqi, now.qlty);
	setAirBgColor(now.qlty);
	function setAirQuality(aqi, quality) {
		document.querySelector(".air-quality__number").innerText = aqi;
		document.querySelector(".air-quality__type").innerText = quality;
	}

	function setAirBgColor(quality) {
		const color = {
			优: "#a3d765",
			良: "#f0cc35",
			轻度污染: "#f1ab62",
		};
		document.querySelector(".air-quality").style.backgroundColor =
			color[quality];
	}
}
