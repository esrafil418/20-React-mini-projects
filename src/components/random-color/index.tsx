import { useEffect, useState } from "react";

export default function RandomColor() {
	const [typeOfColor, setTypeOfColor] = useState("hex");
	const [color, setColor] = useState("#000");

	function randomUtility(length: number) {
		return Math.floor(Math.random() * length);
	}

	function handleHex() {
		const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "F"];
		let hexColor = "#";

		for (let i = 0; i < 6; i++) {
			hexColor += hex[randomUtility(hex.length)];
		}
		setColor(hexColor);
	}

	function handleRgb() {
		const r = randomUtility(256);
		const g = randomUtility(256);
		const b = randomUtility(256);

		setColor(`rgb(${r},${g},${b})`);
	}

	useEffect(() => {
		if (typeOfColor === "rgb") handleRgb();
		else handleHex();
	}, [typeOfColor]);

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				background: color,
			}}
		>
			<button type="button" onClick={() => setTypeOfColor("hex")}>
				Create Hex Color
			</button>
			<button type="button" onClick={() => setTypeOfColor("rgb")}>
				Create RGB Color
			</button>
			<button
				type="button"
				onClick={typeOfColor === "hex" ? handleHex : handleRgb}
			>
				Create Random Color
			</button>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "canter",
					color: "#fff",
					fontSize: "60px",
					marginTop: "50px",
					flexDirection: "column",
					gap: "20px",
					margin: "10px 100px",
				}}
			>
				<h3>{typeOfColor === "rgb" ? "RGB Color" : "Hex Color"}</h3>
				<h1>{color}</h1>
			</div>
		</div>
	);
}
