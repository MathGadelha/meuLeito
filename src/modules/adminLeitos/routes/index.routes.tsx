import { RouteObject } from "react-router-dom";
import { LeitosAdminPage } from "../pages";
import { adminLeitosSubmodulesRoutes } from "../submodules/routes/index.routes";

const adminLeitosRoutes: RouteObject[] = [
    { path: "/admin-leitos", element: <LeitosAdminPage /> },
    ...adminLeitosSubmodulesRoutes
];

export { adminLeitosRoutes };
