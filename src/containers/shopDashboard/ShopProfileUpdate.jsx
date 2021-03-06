import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

import configKeys from "../../config/keys";
import inputValidation from "../../constants/inputValidation";

const ShopProfileUpdate = (props) => {
	const setModalStatus = props.setModalStatus;
	const modalStatus = props.modalStatus;

	// -----
	// constants
	const { paramsShopId } = useParams();

	const [formData, setFormData] = useState({
		shopName: "",
		shopDescription: "",

		addressFull: "",

		countryName: "",
		stateName: "",
		cityName: "",
		localityName: "",

		phoneNumber: "",
		whatsappNumber: "",

		uniqueUrl: "",

		latitude: "",
		longitude: "",
	});

	const [formError, setFormError] = useState({
		shopName: "",
		shopDescription: "",

		addressFull: "",

		countryName: "",
		stateName: "",
		cityName: "",
		localityName: "",
		googleMapEmbedLink: "",

		phoneNumber: "",
		whatsappNumber: "",

		uniqueUrl: "",

		latitude: "",
		longitude: "",
	});

	const [requestUpdate, setRequestUpdate] = useState({
		loading: false,
		success: "",
		error: "",
	});

	const getEstimateLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			setFormData({
				...formData,
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	};

	const validateForm = () => {
		let hasError = false; // If false = No Error

		const tempError = {
			shopName: "",
			shopDescription: "",

			addressFull: "",

			countryName: "",
			stateName: "",
			cityName: "",
			localityName: "",

			phoneNumber: "",
			whatsappNumber: "",

			uniqueUrl: "",

			latitude: "",
			longitude: "",
		};		

		tempError.shopName = inputValidation.isInputEmpty(formData.shopName);
		if (tempError.shopName !== "") {
			hasError = true;
		}

		tempError.shopDescription = inputValidation.isInputEmpty(formData.shopDescription);
		if (tempError.shopDescription !== "") {
			hasError = true;
		}

		tempError.addressFull = inputValidation.isInputEmpty(formData.addressFull);
		if (tempError.addressFull !== "") {
			hasError = true;
		}

		tempError.countryName = inputValidation.isInputEmpty(formData.countryName);
		if (tempError.countryName !== "") {
			hasError = true;
		}

		tempError.stateName = inputValidation.isInputEmpty(formData.stateName);
		if (tempError.stateName !== "") {
			hasError = true;
		}

		tempError.cityName = inputValidation.isInputEmpty(formData.cityName);
		if (tempError.cityName !== "") {
			hasError = true;
		}

		tempError.localityName = inputValidation.isInputEmpty(formData.localityName);
		if (tempError.localityName !== "") {
			hasError = true;
		}

		tempError.phoneNumber = inputValidation.isInputPhoneNumberValid(formData.phoneNumber);
		if (tempError.phoneNumber !== "") {
			hasError = true;
		}

		tempError.whatsappNumber = inputValidation.isInputPhoneNumberValid(formData.whatsappNumber);
		if (tempError.whatsappNumber !== "") {
			hasError = true;
		}

		// Validate: GeoLocation
		let validateGeoLocation = false;

		if (
			inputValidation.isInputEmpty(formData.longitude.toString()) !== "" ||
			inputValidation.isInputEmpty(formData.latitude.toString()) !== ""
		) {
			validateGeoLocation = true;
		}
		if (
			inputValidation.isInputEmpty(formData.longitude.toString()) === "Required Field" &&
			inputValidation.isInputEmpty(formData.latitude.toString()) !== ""
		) {
			validateGeoLocation = false;
		}

		tempError.longitude = "";
		tempError.latitude = "";

		if (validateGeoLocation) {
			tempError.longitude = inputValidation.isInputValidLongitude(formData.longitude);
			if (tempError.longitude !== "") {
				hasError = true;
			}

			tempError.latitude = inputValidation.isInputValidLatitude(formData.latitude);
			if (tempError.latitude !== "") {
				hasError = true;
			}
		}

		setFormError({
			...formError,
			...tempError,
		});

		return hasError;
	};

	const updateShop = async () => {
		if (validateForm()) {
			return;
		}

		setRequestUpdate({
			loading: true,
			success: "",
			error: "",
		});

		try {
			const res = await axios.put(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/shop/shop/updateById/${paramsShopId}`,
				{
					...formData,
				},
				{
					withCredentials: true,
				}
			);

			setRequestUpdate({
				loading: false,
				success: res.data.message,
				error: "",
			});

			setModalStatus({
				openStatus: false,
			});
		} catch (error) {
			setRequestUpdate({
				loading: false,
				success: "",
				error: error?.response?.data?.message,
			});
		}
	};

	// -----
	// useState
	const [requestGetShopInfo, setRequestGetShopInfo] = useState({
		loading: false,
		success: "",
		error: "",
	});

	// -----
	// functions
	const getShopInfoById = async () => {
		setRequestGetShopInfo({
			loading: true,
			success: "",
			error: "",
		});

		try {
			const res = await axios.get(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/shop/shop/getById/${paramsShopId}`,
				{
					withCredentials: true,
				}
			);

			const tempFormData = res.data.data.result;

			// setFormData({
			// 	...formData,
			// 	latitude: position.coords.latitude,
			// 	longitude: position.coords.longitude,
			// });

			console.log(tempFormData);

			setFormData({
				...formData,
				...tempFormData,
				latitude: tempFormData.geolocation.coordinates[1],
				longitude: tempFormData.geolocation.coordinates[0],
			});

			setRequestGetShopInfo({
				loading: false,
				success: res.data.message,
				error: "",
			});
		} catch (error) {
			console.error(error);
			setRequestGetShopInfo({
				loading: false,
				success: "",
				error: error?.response?.data?.message,
			});
		}
	};

	// -----
	// useState
	useState(() => {
		getShopInfoById();
	}, [paramsShopId]);

	const renderProfileUpdate = () => {
		return (
			<div className="">
				{/* Heading */}
				<div>
					<h4 className="primary-color">
						Shop Update
						<span className="ps-2 ps-lg-5 d-inline-block">
							<button
								className="btn btn-secondary btn-sm"
								onClick={() => {
									setModalStatus({
										...modalStatus,
										statusOpen: false,
									});
								}}
							>
								X
							</button>
						</span>
					</h4>
				</div>

				{/* Content */}
				<div className="row">
					{/* Field Name */}
					<div className="col-12 col-md-6 col-lg-4 py-2">
						<div>
							<label for="shopName" class="form-label">
								Shop Name *
							</label>
							<input
								type="text"
								class="form-control"
								id="shopName"
								placeholder="Enter your shop name"
								value={formData.shopName}
								onChange={(t) => {
									setFormData({
										...formData,
										shopName: t.target.value,
									});
								}}
								disabled={true}
							/>
							<div className="text-danger">{formError.shopName}</div>
						</div>
					</div>

					{/* Field Name */}
					<div className="col-12 col-md-6 col-lg-4 py-2">
						<div>
							<label for="phoneNumber" class="form-label">
								Phone Number *
							</label>
							<input
								type="number"
								class="form-control"
								id="phoneNumber"
								placeholder="Enter your shop phone number"
								value={formData.phoneNumber}
								onChange={(t) => {
									setFormData({
										...formData,
										phoneNumber: t.target.value,
									});
								}}
							/>
							<div className="text-danger">{formError.phoneNumber}</div>
						</div>
					</div>

					{/* Field Name */}
					<div className="col-12 col-md-6 col-lg-4 py-2">
						<div>
							<label for="phoneNumber" class="form-label">
								Whatsapp Number *
							</label>
							<input
								type="number"
								class="form-control"
								id="whatsappNumber"
								placeholder="Enter your shop whatsapp number"
								value={formData.whatsappNumber}
								onChange={(t) => {
									setFormData({
										...formData,
										whatsappNumber: t.target.value,
									});
								}}
							/>
							<div className="text-danger">{formError.whatsappNumber}</div>
						</div>
					</div>

					{/* Field Name */}
					<div className="col-12 col-md-12 col-lg-12 py-2">
						<div>
							<label for="shopDescription" class="form-label">
								Shop Description *
							</label>
							<textarea
								class="form-control"
								id="shopDescription"
								placeholder="Enter your shop description"
								value={formData.shopDescription}
								onChange={(t) => {
									setFormData({
										...formData,
										shopDescription: t.target.value,
									});
								}}
							></textarea>
							<div className="text-danger">{formError.shopDescription}</div>
						</div>
					</div>

					{/* Field Name */}
					<div className="col-12 col-md-12 col-lg-12 py-2">
						<div>
							<label for="addressFull" class="form-label">
								Shop Address *
							</label>
							<textarea
								class="form-control"
								id="addressFull"
								placeholder="Enter your shop address"
								value={formData.addressFull}
								onChange={(t) => {
									setFormData({
										...formData,
										addressFull: t.target.value,
									});
								}}
							></textarea>
							<div className="text-danger">{formError.addressFull}</div>
						</div>
					</div>

					{/* Field Country Name */}
					<div className="col-12 col-md-6 col-lg-3 py-2">
						<div>
							<label for="countryName" class="form-label">
								Country Name *
							</label>
							<input
								type="text"
								class="form-control"
								id="countryName"
								placeholder="Enter Country name"
								value={formData.countryName}
								onChange={(t) => {
									setFormData({
										...formData,
										countryName: t.target.value,
									});
								}}
								disabled={true}
							/>
							<div className="text-danger">{formError.countryName}</div>
						</div>
					</div>

					{/* Field Name */}
					<div className="col-12 col-md-6 col-lg-3 py-2">
						<div>
							<label for="stateName" class="form-label">
								State Name *
							</label>
							<input
								type="text"
								class="form-control"
								id="stateName"
								placeholder="Enter State name"
								value={formData.stateName}
								onChange={(t) => {
									setFormData({
										...formData,
										stateName: t.target.value,
									});
								}}
								disabled={true}
							/>
							<div className="text-danger">{formError.stateName}</div>
						</div>
					</div>

					{/* Field Name */}
					<div className="col-12 col-md-6 col-lg-3 py-2">
						<div>
							<label for="cityName" class="form-label">
								City Name *
							</label>
							<input
								type="text"
								class="form-control"
								id="cityName"
								placeholder="Enter City name"
								value={formData.cityName}
								onChange={(t) => {
									setFormData({
										...formData,
										cityName: t.target.value,
									});
								}}
								disabled={true}
							/>
							<div className="text-danger">{formError.cityName}</div>
						</div>
					</div>

					{/* Field Name */}
					<div className="col-12 col-md-6 col-lg-3 py-2">
						<div>
							<label for="localityName" class="form-label">
								Area / locality *
							</label>
							<input
								type="text"
								class="form-control"
								id="localityName"
								placeholder="Enter your shop area or locality or road"
								value={formData.localityName}
								onChange={(t) => {
									setFormData({
										...formData,
										localityName: t.target.value,
									});
								}}
								disabled={true}
							/>
							<div className="text-danger">{formError.localityName}</div>
						</div>
					</div>

					{/* Field Name */}
					<div className="col-12 col-md-6 col-lg-3 py-2">
						<div>
							<label for="latitude" class="form-label">
								Latitude
							</label>
							<input
								type="number"
								class="form-control"
								id="latitude"
								placeholder="Enter your shop latitude"
								value={formData.latitude}
								onChange={(t) => {
									setFormData({
										...formData,
										latitude: t.target.value,
									});
								}}
							/>
							<div
								onClick={() => getEstimateLocation()}
								style={{
									color: "blue",
								}}
								className="text-primary"
							>
								Get Estimate Coordinates
							</div>
							<div className="text-danger">{formError.latitude}</div>
						</div>
					</div>

					{/* Field Name */}
					<div className="col-12 col-md-6 col-lg-3 py-2">
						<div>
							<label for="longitude" class="form-label">
								Longitude
							</label>
							<input
								type="number"
								class="form-control"
								id="longitude"
								placeholder="Enter your shop Longitude"
								value={formData.longitude}
								onChange={(t) => {
									setFormData({
										...formData,
										longitude: t.target.value,
									});
								}}
							/>
							<div className="text-danger">{formError.longitude}</div>
						</div>
					</div>

					{/* Field: googleMapEmbedLink */}
					<div className="col-12 col-md-12 col-lg-12 py-2">
						<div>
							<label for="googleMapEmbedLink" class="form-label">
								Google Map Embed Link:
							</label>
							<input
								type="text"
								class="form-control"
								id="googleMapEmbedLink"
								placeholder="Enter your shop google maps link"
								value={formData.googleMapEmbedLink}
								onChange={(t) => {
									setFormData({
										...formData,
										googleMapEmbedLink: t.target.value,
									});
								}}
							/>
							{formData.googleMapEmbedLink !== "" && (
								<iframe
									title="Google Map"
									src={formData.googleMapEmbedLink}
									style={{
										width: "100%",
										height: "250px",
										border: "0px",
									}}
									allowfullscreen=""
									loading="lazy"
								></iframe>
							)}
							<div className="text-danger">{formError.googleMapEmbedLink}</div>
						</div>
					</div>
				</div>

				{requestUpdate.loading && <div className="alert alert-info mt-2">Loading...</div>}

				{requestUpdate.success !== "" && (
					<div className="alert alert-success mt-2">{requestUpdate.success}</div>
				)}

				{requestUpdate.error !== "" && (
					<div className="alert alert-danger mt-2">{requestUpdate.error}</div>
				)}

				<div>
					<button className="btn btn-primary" onClick={() => updateShop()}>
						Update Profile
					</button>
				</div>
			</div>
		);
	};

	return (
		<div>
			<div className="p-3 p-lg-5 bg-white border">
				{requestGetShopInfo.loading && (
					<div className="text-center py-4">
						<div className="spinner-border text-primary" role="status" />
					</div>
				)}

				{!requestGetShopInfo.loading && requestGetShopInfo.error !== "" && (
					<div className="text-center py-4">
						<div className="text-danger">{requestGetShopInfo.error}</div>
					</div>
				)}

				{!requestGetShopInfo.loading && requestGetShopInfo.error === "" && (
					<div>{renderProfileUpdate()}</div>
				)}
			</div>
		</div>
	);
};

export default ShopProfileUpdate;
