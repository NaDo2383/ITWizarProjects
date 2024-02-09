import React, { useEffect } from "react";

const ShootingStar = () => {
	let n = 0;
	let m = 0;
	const defaultOptions = {
		velocity: 8,
		starSize: 10,
		life: 300,
		beamSize: 400,
		dir: -1
	};
	let options = {};
	const capa = "body"; // Replace with the desired container ID or component
	const wW = window.innerWidth;
	const hW = window.innerHeight;

	const addBeamPart = (x, y) => {
		n++;
		const name = getRandom(100, 1);
		const starElement = document.getElementById(`star${name}`);
		if (starElement) starElement.remove();

		const capaElement = document.querySelector(capa);
		if (capaElement) {
			const starDiv = document.createElement("div");
			starDiv.id = `star${name}`;
			const hazDiv = document.createElement("div");
			hazDiv.id = `haz${n}`;
			hazDiv.className = "haz";
			hazDiv.style.position = "absolute";
			hazDiv.style.color = "#FF0";
			hazDiv.style.width = "10px";
			hazDiv.style.height = "10px";
			hazDiv.style.fontWeight = "bold";
			hazDiv.style.fontSize = `${options.starSize}px`;
			hazDiv.textContent = "·";

			starDiv.appendChild(hazDiv);
			capaElement.appendChild(starDiv);
			if (n > 1) {
				const previousHaz = document.getElementById(`haz${n - 1}`);
				if (previousHaz) previousHaz.style.color = "rgba(255,255,255,0.5)";
			}
			hazDiv.style.top = `${y + n}px`;
			hazDiv.style.left = `${x + n * options.dir}px`;
		}
	};

	const delTrozoHaz = () => {
		m++;
		const hazElement = document.getElementById(`haz${m}`);
		if (hazElement) {
			hazElement.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 75 });
		}
		if (m >= options.beamSize) {
			const shootingStarParams = document.getElementById("ShootingStarParams");
			if (shootingStarParams) shootingStarParams.style.display = "none";
		}
	};

	const getRandom = (max, min) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const toType = (obj) => {
		if (typeof obj === "undefined") {
			return "undefined"; /* consider: typeof null === object */
		}
		if (obj === null) {
			return "null";
		}
		const type =
			Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1] || "";
		switch (type) {
			case "Number":
				if (isNaN(obj)) {
					return "nan";
				} else {
					return "number";
				}
			case "String":
			case "Boolean":
			case "Array":
			case "Date":
			case "RegExp":
			case "Function":
				return type.toLowerCase();
			default:
				if (typeof obj === "object") {
					return "object";
				}
				return undefined;
		}
	};

	const launchStar = (options) => {
		if (toType(options) !== "object") {
			options = {};
		}
		options = { ...defaultOptions, ...options };
		n = 0;
		m = 0;
		const i = 0;
		const l = options.beamSize;
		const x = getRandom(wW - options.beamSize - 100, 100);
		const y = getRandom(hW - options.beamSize - 100, 100);

		for (; i < l; i++) {
			setTimeout(() => {
				addBeamPart(x, y);
			}, options.life + i * options.velocity);
		}

		for (let i = 0; i < l; i++) {
			setTimeout(() => {
				delTrozoHaz();
			}, options.beamSize + i * options.velocity);
		}

		const shootingStarParams = document.getElementById("ShootingStarParams");
		if (shootingStarParams) {
			shootingStarParams.innerHTML = `Launching shooting star. PARAMS: wW: ${wW} - hW: ${hW} - life: ${options.life} - beamSize: ${options.beamSize} - velocity: ${options.velocity}`;
			shootingStarParams.style.display = "block";
		}
	};

	const launch = (everyTime) => {
		if (toType(everyTime) !== "number") {
			everyTime = 10;
		}
		everyTime = everyTime * 1000;
		launchStar();

		setInterval(() => {
			const options = {
				dir: getRandom(1, 0) ? 1 : -1,
				life: getRandom(400, 100),
				beamSize: getRandom(700, 400),
				velocity: getRandom(10, 4)
			};
			launchStar(options);
		}, everyTime);
	};

	useEffect(() => {
		const shootingStarObj = new ShootingStar("body");
		shootingStarObj.launch();
	}, []);

	return (
		<div>
			{/* Replace with desired JSX structure */}
			<div id="ShootingStarParams"></div>
		</div>
	);
};

export default ShootingStar;
