import { dashboardRoutes } from "@modules/dashboard/routes/index.routes";
import { loginRoutes } from "../modules/login/routes/index.routes";
import { createBrowserRouter } from "react-router-dom";
import { leitosRoutes } from "@modules/leitos/routes/index.routes";

const router = createBrowserRouter([
	...loginRoutes,
	...dashboardRoutes,
	...leitosRoutes,
]);

export { router };
