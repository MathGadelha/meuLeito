import { useVerifyIfHasProfileToAccessModule } from "@shared/hooks/validationsPerfis/useVerifyIfHasProfileToAccessModule";
import { DashBoardLayout } from "../components/dashboardLayout";
import { ModuleCard } from "../components/moduleCard";
import { ModulesDashboard } from "../mocks/dashboardModules";
import { DashboardItemModule } from "../types/dashboardModules";

const DashBoardPage = () => {
	const { modules } = ModulesDashboard();
	const { execute } = useVerifyIfHasProfileToAccessModule();

	return (
		<DashBoardLayout>
			<div className="p-2">
				<h1 className="font-bold text-xl">Lista de Serviços</h1>
				<h2 className="text-zinc-400 my-4">
					Selecione um módulo abaixo para continuar.
				</h2>
				<div className="w-full grid grid-cols-3 gap-4 mt-10">
					{modules.map((module) => (
						<div key={module.context} className="space-y-4">
							{module.children.map((item: DashboardItemModule) => (
								<ModuleCard
									key={item.title}
									icon={item.icon}
									title={item.title}
									description={item.description}
									path={item.path}
								// disabled={!execute(item.permissions)}
								/>
							))}
						</div>
					))}
				</div>
			</div>
		</DashBoardLayout>
	);
};

export { DashBoardPage };
