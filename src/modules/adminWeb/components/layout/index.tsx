import { Layout } from "@components/layout";
import { Breadcrumb } from "@components/types/Breadcrumb";
import { ScrollArea } from "@components/ui/scroll-area";
import { SideBarButtonsAdministrador } from "@modules/adminWeb/mocks/sidebarButtons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {
	children: React.ReactNode;
};

const AdminWebLayout = ({ children }: Props) => {
	const location = useLocation();

	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
		{ label: "Administrador Web", path: "/administrativo-web" },
	]);

	const handleBreadcrumbs = () => {
		const currentPath = location.pathname;

		if (currentPath === "/administrativo-web") return;

		for (const { label, path } of SideBarButtonsAdministrador) {
			if (
				path === currentPath &&
				!breadcrumbs.some((item) => item.label === label)
			) {
				if (breadcrumbs.length > 1) {
					setBreadcrumbs([breadcrumbs[0], { label, path }]);
					return;
				}
				setBreadcrumbs([...breadcrumbs, { label, path }]);
			}
		}
	};

	useEffect(() => {
		handleBreadcrumbs();
	}, [location]);

	return (
		<Layout
			breadcrumbs={breadcrumbs}
			sidebarButton={SideBarButtonsAdministrador}
			defaultDisabled
		>
			<ScrollArea>{children}</ScrollArea>
		</Layout>
	);
};

export { AdminWebLayout };
