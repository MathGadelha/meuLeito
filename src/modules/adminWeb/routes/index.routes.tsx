import { RouteObject } from "react-router-dom";
import { AdministradorPage } from "../pages";

const adminRoutes: RouteObject[] = [
    { path: "/administrativo-web", element: <AdministradorPage /> },
];

export { adminRoutes };
