import { SidebarButton } from "@shared/types/sidebarButton";
import { FaPeopleGroup, FaUserDoctor } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineRestaurantMenu } from "react-icons/md";
// import { IoQrCodeOutline } from "react-icons/io5";
import { FaAllergies, FaMapMarkerAlt } from "react-icons/fa";

const SideBarButtonsAdministrador: SidebarButton[] = [
	{
		label: "Gerenciador de pacientes",
		path: "/administrativo-web",
		disabled: false,
		icon: <LuClipboardEdit />,
	},
	{
		label: "Gerenciador de Profissionais",
		path: "/administrativo-web/profissionais",
		disabled: false,
		icon: <FaUserDoctor />,
	},
	{
		label: "Acompanhamento de profissionais",
		path: "/administrativo-web/acompanhamento",
		disabled: false,
		icon: <FaPeopleGroup />,
	},
	{
		label: "Gerenciador de Setores",
		path: "/administrativo-web/setores",
		disabled: false,
		icon: <FaMapMarkerAlt />,
	},
	{
		label: "Gerenciador de Alergias e Comorbidades",
		path: "/administrativo-web/alergias",
		disabled: false,
		icon: <FaAllergies />,
	},
];

export { SideBarButtonsAdministrador };
