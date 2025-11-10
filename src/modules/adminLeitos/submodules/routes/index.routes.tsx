import { RouteObject } from "react-router-dom";
import { QRGenerator } from "../qrCode/pages";

const adminLeitosSubmodulesRoutes: RouteObject[] = [
    { path: "/admin-leitos/qr-code", element: <QRGenerator /> },
];

export { adminLeitosSubmodulesRoutes };
