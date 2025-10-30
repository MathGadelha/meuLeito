import { RouteObject } from "react-router-dom";
import { IndicadorProfissionalPage } from "../indicadorProfissional/pages";
import { SetoresPage } from "../setores/pages";
import { AlergiasComorbidadesPage } from "../alergiasComorbidades/pages";

const adminSubmodulesRoutes: RouteObject[] = [
    { path: "/administrativo-web/acompanhamento", element: <IndicadorProfissionalPage /> },
    { path: "/administrativo-web/setores", element: <SetoresPage /> },
    { path: "/administrativo-web/alergias", element: <AlergiasComorbidadesPage /> },
];

export { adminSubmodulesRoutes };
