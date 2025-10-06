import { RouteObject } from "react-router-dom";
import { AdministradorPage } from "../pages";
import { adminSubmodulesRoutes } from "../submodules/routes/index.routes";

const adminRoutes: RouteObject[] = [
    { path: "/administrativo-web", element: <AdministradorPage /> },
    ...adminSubmodulesRoutes
];

export { adminRoutes };
