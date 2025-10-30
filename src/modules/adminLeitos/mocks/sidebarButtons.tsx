import { SidebarButton } from "@shared/types/sidebarButton";
import { IoQrCodeOutline } from "react-icons/io5";
import { LuFileStack } from "react-icons/lu";

const SideBarButtonsLeitosAdmin: SidebarButton[] = [
	{
		label: "Admin Leitos",
		path: "/admin-leitos",
		disabled: false,
		icon: <LuFileStack />,
	},
	{
		label: "Qr Code",
		path: "/admin-leitos/qr-code",
		disabled: false,
		icon: <IoQrCodeOutline />,
	},
];

export { SideBarButtonsLeitosAdmin };
