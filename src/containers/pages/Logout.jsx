import { useState } from "react";

import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import axios from "axios";

import reduxActions from "../../redux/actions/index";
import configKeys from "../../config/keys";

const Logout = (props) => {
	const mHistory = useHistory();
	const dispatch = useDispatch();

	const authState = props.authState;

	const [formSubmitSuccess, setFormSubmitSuccess] = useState("");
	const [formSubmitError, setFormSubmitError] = useState("");
	const [formSubmitLoading, setFormSubmitLoading] = useState(false);

	useEffect(() => {
		if(authState.statusIsLoggedIn !== "true"){
			mHistory.push("/");
		} else {
			logout();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logout = async () => {
		try {
			setFormSubmitLoading(true);
			setFormSubmitSuccess("");
			setFormSubmitError("");

			const res = await axios.post(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/user/auth/logout`,
				{},
				{
					withCredentials: true,
				}
			);

			setFormSubmitLoading(false);
			setFormSubmitSuccess(res.data.message);
			setFormSubmitError("");

			reduxActions.userActions.setAuthStatusDefault(dispatch);

			setTimeout(() => {
				mHistory.push("/");
			}, 1000);
		} catch (error) {
			setFormSubmitLoading(false);
			setFormSubmitSuccess("");
			setFormSubmitError(error?.response?.data?.message);
		}
	};

	return (
		<div>
			<div className="max-div-width-500 my-5 py-5 px-3">
				{formSubmitSuccess !== "" && (
					<div className="alert alert-success">{formSubmitSuccess}</div>
				)}

				{formSubmitError !== "" && (
					<div className="alert alert-danger">{formSubmitError}</div>
				)}

				{formSubmitLoading && <div className="alert alert-info">Loading...</div>}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	authState: state.user,
});

export default connect(mapStateToProps, {})(Logout);
