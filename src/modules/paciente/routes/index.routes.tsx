import { RouteObject } from "react-router-dom";
import PacientesPage from "../pages";

const pacienteRoutes: RouteObject[] = [
    { path: "/paciente", element: <PacientesPage /> },
];

export { pacienteRoutes };
