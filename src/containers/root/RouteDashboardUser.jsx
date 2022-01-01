import Drawer from "../userDashboard/Drawer";
import { Route } from "react-router-dom";

import Dashboard from "../userDashboard/Dashboard";

import ProfileInfo from "../userDashboard/ProfileInfo";
import ProfileUpdate from "../userDashboard/ProfileUpdate";

import ShopAdd from "../userDashboard/ShopAdd";
import ShopList from "../userDashboard/ShopList";

const RouteDashboardShop = (props) => {
	return (
		<Drawer>
			<Route path={`${props.match.path}/`} exact component={Dashboard} />

			<Route path="/user/dashboard/profile/info" exact component={ProfileInfo} />
			<Route path="/user/dashboard/profile/update" exact component={ProfileUpdate} />

			<Route path="/user/dashboard/shop/add" exact component={ShopAdd} />
			<Route path="/user/dashboard/shop/list" exact component={ShopList} />
		</Drawer>
	);
};

export default RouteDashboardShop;
