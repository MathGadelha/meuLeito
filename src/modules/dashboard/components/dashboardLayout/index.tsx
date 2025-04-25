import { Layout } from "@components/layout";
import { SidebarButton } from "@customTypes/sidebarButton";
import { ModulesDashboard } from "@modules/dashboard/mocks/dashboardModules";
// import { useVerifyIfHasProfileToAccessModule } from "@shared/hooks/validationsPerfis/useVerifyIfHasProfileToAccessModule";

type Props = {
	children: React.ReactNode;
};

const DashBoardLayout = ({ children }: Props) => {
	const { modules } = ModulesDashboard();
	// const { execute } = useVerifyIfHasProfileToAccessModule();
	const sidebarButtons: SidebarButton[] = modules.flatMap((context) => {
		return (
			context.children
				// .filter((module) => execute(module.permissions))
				.map((module) => {
					return {
						icon: module.icon,
						path: module.path,
						label: module.title,
						// disabled: !execute(module.permissions),
					};
				})
		);
	});

	return <Layout sidebarButton={sidebarButtons}>{children}</Layout>;
};

export { DashBoardLayout };
