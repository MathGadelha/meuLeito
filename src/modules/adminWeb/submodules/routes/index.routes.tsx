import { RouteObject } from "react-router-dom";
import { IndicadorProfissionalPage } from "../indicadorProfissional/pages";
import { RotinasPage } from "../rotinas/pages";

const adminSubmodulesRoutes: RouteObject[] = [
    { path: "/administrativo-web/acompanhamento", element: <IndicadorProfissionalPage /> },
    { path: "/administrativo-web/rotinas", element: <RotinasPage /> },
];

export { adminSubmodulesRoutes };
