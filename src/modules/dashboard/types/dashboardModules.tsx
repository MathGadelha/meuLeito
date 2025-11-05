type DashboardModule = {
	context: string;
	children: DashboardItemModule[];
};

type DashboardItemModule = {
	icon: JSX.Element;
	title: string;
	description: string;
	moduleAction: moduleAction[];
	path: string;
	permissions: string[];
	assignedUsers: { src: string; fallback: string }[];
	disabled?: boolean;
};

type moduleAction = {
	label: string;
	color: string;
};

export type { DashboardModule, DashboardItemModule, moduleAction };
