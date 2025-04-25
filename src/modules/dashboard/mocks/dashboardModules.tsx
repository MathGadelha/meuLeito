import { permissionsByModule } from "@shared/mocks/permissionsByModule";
import { IoChatboxOutline } from "react-icons/io5";
import { LuClipboardEdit } from "react-icons/lu";
import { PiNewspaperClipping } from "react-icons/pi";
import { TbUserHeart } from "react-icons/tb";
import { DashboardModule } from "../types/dashboardModules";

const ModulesDashboard = () => {
	const modules: DashboardModule[] = [
		{
			context: "Leitos",
			children: [
				{
					title: "Leitos",
					description: "Gerencie os leitos e realize atendimentos.",
					path: "/leitos",
					disabled: true,
					// permissions: ,
					moduleAction: [],
					assignedUsers: [],
					icon: <TbUserHeart />,
				},
			],
		},
		{
			context: "Administrativo",
			children: [
				{
					title: "Administrativo Web",
					description: "Sessão para atendimento do paciente pelo médico.",
					path: "/administrativo-web",
					// permissions: ,
					disabled: true,
					moduleAction: [],
					assignedUsers: [],
					icon: <LuClipboardEdit />,
				},
			],
		},
	];
	return {
		modules,
	};
};

export { ModulesDashboard };
