import { useState } from "react";
import MenuList from "./menu-list";
import { FaMinus, FaPlus } from "react-icons/fa";

type MenuItemType = {
	label: string;
	to: string;
	children?: MenuItemType[];
};

export default function MenuItem({ item }: { item: MenuItemType }) {
	const [displayCurrentChildren, setDisplayCurrentChildren] = useState<
		Record<string, boolean>
	>({});

	function handleToggleChildren(getCurrentlabel: string) {
		setDisplayCurrentChildren({
			...displayCurrentChildren,
			[getCurrentlabel]: !displayCurrentChildren[getCurrentlabel],
		});
	}

	console.log(displayCurrentChildren);

	return (
		<li>
			<div className="menu-item">
				<p>{item.label}</p>
				{item && item.children && item.children.length ? (
					<button
						type="button"
						onClick={() => handleToggleChildren(item.label)}
					>
						{displayCurrentChildren[item.label] ? (
							<FaMinus color="#fff" size={25} />
						) : (
							<FaPlus color="#fff" size={25} />
						)}
					</button>
				) : null}
			</div>

			{item &&
			item.children &&
			item.children.length > 0 &&
			displayCurrentChildren[item.label] ? (
				<MenuList list={item.children} />
			) : null}
		</li>
	);
}
