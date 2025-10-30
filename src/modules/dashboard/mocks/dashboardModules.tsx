import { LuClipboardEdit } from "react-icons/lu";
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
					description: "Gerencie os usuários.",
					path: "/administrativo-web",
					// permissions: ,
					disabled: true,
					moduleAction: [],
					assignedUsers: [],
					icon: <LuClipboardEdit />,
				},
			],
		},
		{
			context: "Admin Leitos",
			children: [
				{
					title: "Admin Leitos",
					description: "Adminitração de leitos e criação de Qr Code.",
					path: "/admin-leitos",
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
