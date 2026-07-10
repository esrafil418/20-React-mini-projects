import { useState } from "react";
import "./style.css";
import data from "./data.js";

export default function Accordion() {
	const [selected, setSelected] = useState(null);
	return (
		<div className="wrapper">
			<div className="accordion">
				{data && data.length > 0 ? (
					data.map((item) => (
						<div key={item.id} className="item">
							<div className="title">
								<h3>{item.question}</h3>
								<span>+</span>
							</div>
						</div>
					))
				) : (
					<div>No Data</div>
				)}
			</div>
		</div>
	);
}
