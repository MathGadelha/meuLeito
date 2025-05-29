import { SidebarButton } from "@shared/types/sidebarButton";
import { LuFileStack } from "react-icons/lu";

const SideBarButtonsLeitos: SidebarButton[] = [
	{
		label: "Leitos",
		path: "/leitos",
		disabled: false,
		icon: <LuFileStack />,
	},
];

export { SideBarButtonsLeitos };
