import { Layout } from "@components/layout";
import { Breadcrumb } from "@components/types/Breadcrumb";
import { ScrollArea } from "@components/ui/scroll-area";
import { SideBarButtonsLeitosAdmin } from "@modules/adminLeitos/mocks/sidebarButtons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {
	children: React.ReactNode;
};

const LeitoAdminLayout = ({ children }: Props) => {
	const location = useLocation();

	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
		{ label: "Admin Leitos", path: "/admin-leitos" },
	]);

	const handleBreadcrumbs = () => {
		const currentPath = location.pathname;

		if (currentPath === "/admin-leitos") return;

		for (const { label, path } of SideBarButtonsLeitosAdmin) {
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
			sidebarButton={SideBarButtonsLeitosAdmin}
			defaultDisabled
		>
			<ScrollArea>{children}</ScrollArea>
		</Layout>
	);
};

export { LeitoAdminLayout };
