import { SidebarButton } from "@shared/types/sidebarButton";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineRestaurantMenu } from "react-icons/md";

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
	{
		label: "Cadastro de rotinas",
		path: "/administrativo-web/rotinas",
		disabled: false,
		icon: <MdOutlineRestaurantMenu />,
	},
];

export { SideBarButtonsAdministrador };
