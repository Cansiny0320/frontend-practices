var data = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			label: "day",
			data: [27, 30, 30, 27, 33, 25, 30, 30],
			fill: false,
			backgroundColor: "#ffb74d",
			borderColor: "#ffb74d",
			borderWidth: 2,
		},
		{
			label: "night",
			data: [15, 15, 15, 15, 18, 17, 15, 19],
			fill: false,
			backgroundColor: "#4fc3f7",
			borderColor: "#4fc3f7",
			borderWidth: 2,
		},
	],
};
const options = {
	legend: { display: false },
	scales: {
		yAxes: [
			{
				ticks: { beginAtZero: true },
				display: false,
			},
		],
		xAxes: [
			{
				display: false,
			},
		],
	},
};
const ctx = document.querySelector("#chart").getContext("2d");
const chart = new Chart(ctx, {
	type: "line",
	data,
	options,
});
