import { Layout } from "@components/layout";
import { Breadcrumb } from "@components/types/Breadcrumb";
import { ScrollArea } from "@components/ui/scroll-area";
import { SideBarButtonsLeitos } from "@modules/leitos/mocks/sidebarButtons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {
	children: React.ReactNode;
};

const LeitoLayout = ({ children }: Props) => {
	const location = useLocation();

	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
		{ label: "Boletim Sintomático", path: "/boletim-sintomatico" },
	]);

	const handleBreadcrumbs = () => {
		const currentPath = location.pathname;

		if (currentPath === "/leitos") return;

		for (const { label, path } of SideBarButtonsLeitos) {
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
			sidebarButton={SideBarButtonsLeitos}
			defaultDisabled
		>
			<ScrollArea>{children}</ScrollArea>
		</Layout>
	);
};

export { LeitoLayout };
