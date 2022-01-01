import React from "react";
import { Route } from "react-router-dom";

import RouteDashboardShop from "./RouteDashboardShop";

const RouteSeperatePages = [
	<Route path="/shop/dashboard/:paramsShopId" component={RouteDashboardShop} />,
];

export default RouteSeperatePages;
