import Drawer from "../shopDashboard/Drawer";
import { Route } from "react-router-dom";

import AuthShopBelongUser from "../shopDashboard/AuthShopBelongUser";

import Dashboard from "../shopDashboard/Dashboard";

import ShopProfile from "../shopDashboard/ShopProfile";

import ProductList from "../shopDashboard/ProductList";
import ProductAdd from "../shopDashboard/ProductAdd";
import ProductUpdate from "../shopDashboard/ProductUpdate";
import ProductInfo from "../shopDashboard/ProductInfo";

const RouteDashboardShop = (props) => {
	return (
		<AuthShopBelongUser>
			<Drawer>
				<Route path={`${props.match.path}/`} exact component={Dashboard} />

				<Route path={`${props.match.path}/profile/`} exact component={ShopProfile} />

				<Route path={`${props.match.path}/product/list`} exact component={ProductList} />
				<Route path={`${props.match.path}/product/add`} exact component={ProductAdd} />
				<Route
					path={`${props.match.path}/product/info/:id`}
					exact
					component={ProductInfo}
				/>
				<Route
					path={`${props.match.path}/product/update/:id`}
					exact
					component={ProductUpdate}
				/>
			</Drawer>
		</AuthShopBelongUser>
	);
};

export default RouteDashboardShop;
