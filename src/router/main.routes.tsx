import { dashboardRoutes } from "@modules/dashboard/routes/index.routes";
import { loginRoutes } from "../modules/login/routes/index.routes";
import { createBrowserRouter } from "react-router-dom";
import { leitosRoutes } from "@modules/leitos/routes/index.routes";
import { pacienteRoutes } from "@modules/paciente/routes/index.routes";
import { adminRoutes } from "@modules/adminWeb/routes/index.routes";
import { adminLeitosRoutes } from "@modules/adminLeitos/routes/index.routes";

const router = createBrowserRouter([
	...loginRoutes,
	...dashboardRoutes,
	...adminLeitosRoutes,
	...leitosRoutes,
	...adminRoutes,
	...pacienteRoutes,
]);

export { router };
