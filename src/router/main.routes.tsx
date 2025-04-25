import { dashboardRoutes } from "@modules/dashboard/routes/index.routes";
import { loginRoutes } from "../modules/login/routes/index.routes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([...loginRoutes, ...dashboardRoutes]);

export { router };
