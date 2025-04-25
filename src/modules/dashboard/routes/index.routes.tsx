import { RouteObject } from "react-router-dom";
import { DashBoardPage } from "../pages";
import { authLoader } from "@router/loader.routes";

const dashboardRoutes: RouteObject[] = [
	{ path: "/dashboard", element: <DashBoardPage />, loader: authLoader },
];

export { dashboardRoutes };
