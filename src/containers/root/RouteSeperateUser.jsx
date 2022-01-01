import React from "react";
import { Route } from "react-router-dom";

import Login from "../user/Login";
import Register from "../user/Register";
import RouteDashboardUser from "./RouteDashboardUser";

const RouteSeperatePages = [
	<Route path="/user/login" exact component={Login} />,
	<Route path="/user/register" exact component={Register} />,
	<Route path="/user/dashboard" component={RouteDashboardUser} />,
];

export default RouteSeperatePages;
