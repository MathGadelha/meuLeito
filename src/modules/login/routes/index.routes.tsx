import { RouteObject } from "react-router-dom";
import { Login } from "../pages";

const loginRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Login />,
    },
];

export { loginRoutes };
