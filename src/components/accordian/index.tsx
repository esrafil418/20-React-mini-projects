import { useState } from "react";
import "./style.css";
import data from "./data.js";

export default function Accordion() {
	const [selected, setSelected] = useState<string | null>(null);

	function handleSingleSelection(getCurrentId: string) {
		setSelected(getCurrentId === selected ? null : getCurrentId);
	}
	return (
		<div className="wrapper">
			<div className="accordion">
				{data && data.length > 0 ? (
					data.map((item) => (
						<div key={item.id} className="item">
							<button
								type="button"
								onClick={() => handleSingleSelection(item.id)}
								className="title"
							>
								<h3>{item.question}</h3>
								<span className="plus">{selected === item.id ? "-" : "+"}</span>
							</button>
							{selected === item.id ? (
								<div className="content">{item.answer}</div>
							) : null}
						</div>
					))
				) : (
					<div>No Data</div>
				)}
			</div>
		</div>
	);
}
