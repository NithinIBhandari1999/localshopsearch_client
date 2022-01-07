import { useEffect, useState } from "react";
import axios from "axios";

import configKeys from "../../config/keys";
import inputValidation from "../../constants/inputValidation";

const ProfileUpdate = (props) => {
	const setModalStatus = props.setModalStatus;

	const [formData, setFormData] = useState({
		name: "",
	});

	const [formDataError, setFormDataError] = useState({
		name: "",
	});

	const [formSubmitSuccess, setFormSubmitSuccess] = useState("");
	const [formSubmitError, setFormSubmitError] = useState("");
	const [formSubmitLoading, setFormSubmitLoading] = useState(false);

	useEffect(() => {
		getProfileInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getProfileInfo = async () => {
		try {
			const res = await axios.get(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/user/user/getProfileInfo`,
				{
					withCredentials: true,
				}
			);

			let tempProfileInfo = {};

			console.log(res);
			if (res.data.data.resultUserInfo) {
				tempProfileInfo = res.data.data.resultUserInfo;

				setFormData({
					...formData,
					...tempProfileInfo,
				});
			}
		} catch (error) {}
	};

	const validateForm = () => {
		let hasError = false; // If false = No Error

		const tempError = {
			name: "",
			latitude: "",
			longitude: "",
			stateName: "",
			districtName: "",
			cityName: "",
			phoneNumber: "",
			whatsappNumber: "",
			description: "",
			addressFull: "",
		};

		tempError.name = inputValidation.isInputEmpty(formData.name);
		if (tempError.name !== "") {
			hasError = true;
		}

		setFormDataError({
			...formDataError,
			...tempError,
		});

		return hasError;
	};

	const updateProfile = async () => {
		if (validateForm()) {
			return;
		}

		setFormSubmitLoading(true);
		setFormSubmitSuccess("");
		setFormSubmitError("");

		try {
			const res = await axios.post(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/user/user/updateProfileInfo`,
				{
					...formData,
				},
				{
					withCredentials: true,
				}
			);

			setFormSubmitLoading(false);
			setFormSubmitSuccess(res.data.message);
			setFormSubmitError("");

			setModalStatus({
				openStatus: false,
			});
		} catch (error) {
			setFormSubmitLoading(false);
			setFormSubmitSuccess("");
			setFormSubmitError(error?.response?.data?.message);
		}
	};

	return (
		<div>
			<div className="container">
				<div className="p-3 p-lg-5 ">
					<div>
						<h4 className="primary-color">
							Profile Update
							<span className="ps-2 ps-lg-5 d-inline-block">
								<button
									className="btn btn-secondary btn-sm"
									onClick={() => {
										setModalStatus({
											statusOpen: false,
										});
									}}
								>
									X
								</button>
							</span>
						</h4>
					</div>

					<div className="row">
						{/* Field name */}
						<div className="col-12 col-md-6 col-lg-6 py-2">
							<div>
								<label className="form-label">Name</label>
								<input
									type="text"
									className="form-control"
									value={formData.name}
									onChange={(e) => {
										setFormData({
											...formData,
											name: e.target.value,
										});
									}}
								/>
								{formDataError.name && (
									<div className="text-danger">{formDataError.name}</div>
								)}
							</div>
						</div>

						{formSubmitSuccess !== "" && (
							<div className="alert alert-success">{formSubmitSuccess}</div>
						)}

						{formSubmitError !== "" && (
							<div className="alert alert-danger">{formSubmitError}</div>
						)}

						{formSubmitLoading && <div className="alert alert-info">Loading...</div>}

						{/* Field Submit Button */}
						<div className="col-12 col-md-12 col-lg-12 py-2">
							<div>
								<button className="btn btn-primary" onClick={() => updateProfile()}>
									Update
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileUpdate;
