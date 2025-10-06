import { RouteObject } from "react-router-dom";
import { IndicadorProfissionalPage } from "../indicadorProfissional/pages";

const adminSubmodulesRoutes: RouteObject[] = [
    { path: "/administrativo-web/acompanhamento", element: <IndicadorProfissionalPage /> },
];

export { adminSubmodulesRoutes };
