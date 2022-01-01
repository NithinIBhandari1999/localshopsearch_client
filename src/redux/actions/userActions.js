import axios from "axios";

import reduxTypes from "../types";
import appConstant from "../../constants/appConstant";

import configKeys from "../../config/keys";

export const setAuthStatusDefault = async (dispatch) => {
	dispatch({
		type: reduxTypes.user.SET_USER_AUTH,
		payload: {
			statusIsLoggedIn: appConstant.statusIsLoggedIn.false,
			userType: appConstant.userType.none,
			statusEmailVerified: appConstant.statusEmailVerified.false,

			userId: "",
			userFullName: "",
			userEmail: "",
		},
	});
};

const setAuthStatus = async (dispatch) => {
	try {
		const res = await axios.post(
			`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/user/validateSession/validateSession`,
			{},
			{
				withCredentials: true,
			}
		);

		dispatch({
			type: reduxTypes.user.SET_USER_AUTH,
			payload: {
				...res.data.data.authStatus,
			},
		});
	} catch (error) {
		setAuthStatusDefault(dispatch);
	}
};

const setAuthStatusByObject = async (dispatch, authObject) => {
	try {
		dispatch({
			type: reduxTypes.user.SET_USER_AUTH,
			payload: {
				...authObject,
			},
		});
	} catch (error) {
		setAuthStatusDefault(dispatch);
	}
};

const exportDefault = {
	setAuthStatus,
	setAuthStatusDefault,
	setAuthStatusByObject,
};

export default exportDefault;
