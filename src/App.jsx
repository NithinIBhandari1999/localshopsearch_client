import Root from "./containers/root/index";
import Header from "./components/Header";
import { useEffect } from "react";

import reduxActions from "./redux/actions/index";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		reduxActions.userActions.setAuthStatus(dispatch);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Header />
			<Root />
		</div>
	);
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withRouter(App));
