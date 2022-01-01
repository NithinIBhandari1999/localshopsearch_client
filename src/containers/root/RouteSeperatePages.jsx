import React from "react";
import { Route } from "react-router-dom";

import Home from "../pages/Home";
import SearchProduct from "../pages/SearchProduct";
import Logout from "../pages/Logout";
import AboutUs from "../pages/AboutUs";

import ShopInfo from "../pages/ShopInfo";

const RouteSeperatePages = [
	<Route path="/" exact component={Home} />,
	<Route path="/search/" exact component={SearchProduct} />,
	<Route path="/logout" exact component={Logout} />,
	<Route path="/aboutus" exact component={AboutUs} />,
	<Route path="/shop/info/:id" exact component={ShopInfo} />,
];

export default RouteSeperatePages;
