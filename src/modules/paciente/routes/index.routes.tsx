import { RouteObject } from "react-router-dom";
import PacientesPage from "../pages";

const pacienteRoutes: RouteObject[] = [
    { path: "/paciente/:id", element: <PacientesPage /> },
];

export { pacienteRoutes };
