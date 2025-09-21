import { SidebarButton } from "@shared/types/sidebarButton";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";

const SideBarButtonsAdministrador: SidebarButton[] = [
	{
		label: "Gerenciador de usuários",
		path: "/administrativo-web",
		disabled: false,
		icon: <LuClipboardEdit />,
	},
	{
		label: "Acompanhamento de profissionais",
		path: "/administrativo-web/acompanhamento",
		disabled: false,
		icon: <FaPeopleGroup />,
	},
];

export { SideBarButtonsAdministrador };
