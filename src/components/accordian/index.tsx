import { useState } from "react";
import "./style.css";
import data from "./data.js";

export default function Accordion() {
	const [selected, setSelected] = useState<string | null>(null);
	const [enable, setEnable] = useState(false);
	const [multi, setMulti] = useState<string[]>([]);

	function handleSingleSelection(getCurrentId: string) {
		setSelected(getCurrentId === selected ? null : getCurrentId);
	}

	function handleMultiSelection(getCurrentId: string) {
		let copyMulti = [...multi];
		const findIndexOfCurrentId = copyMulti.indexOf(getCurrentId);

		if (findIndexOfCurrentId === -1) copyMulti.push(getCurrentId);
		else copyMulti.splice(findIndexOfCurrentId, 1);

		setMulti(copyMulti);
	}

	return (
		<div className="wrapper">
			<button
				onClick={() => setEnable(!enable)}
				type="button"
				className="enable"
			>
				Enable Multi Selection
			</button>
			<div className="accordion">
				{data && data.length > 0 ? (
					data.map((item) => (
						<div key={item.id} className="item">
							<button
								type="button"
								onClick={
									enable
										? () => handleMultiSelection(item.id)
										: () => handleSingleSelection(item.id)
								}
								className="title"
							>
								<h3>{item.question}</h3>
								<span className="plus">{selected === item.id ? "-" : "+"}</span>
							</button>
							{enable
								? multi.indexOf(item.id) !== -1 && (
										<div className="content">{item.answer}</div>
									)
								: selected === item.id && (
										<div className="content">{item.answer}</div>
									)}
							{/* {selected === item.id || multi.indexOf(item.id) !== -1 ? (
								<div className="content">{item.answer}</div>
							) : null} */}
						</div>
					))
				) : (
					<div>No Data</div>
				)}
			</div>
		</div>
	);
}
