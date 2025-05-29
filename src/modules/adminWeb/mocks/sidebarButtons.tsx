import { SidebarButton } from "@shared/types/sidebarButton";
import { LuClipboardEdit } from "react-icons/lu";

const SideBarButtonsAdministrador: SidebarButton[] = [
	{
		label: "Gerenciador de usuários",
		path: "/administrativo-web",
		disabled: false,
		icon: <LuClipboardEdit />,
	},
];

export { SideBarButtonsAdministrador };
