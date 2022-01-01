import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Modal } from "react-bootstrap";

import configKeys from "../../config/keys";

import ShopProfileUpdate from "./ShopProfileUpdate";

const ShopAdd = () => {
	// -----
	// constants
	const { paramsShopId } = useParams();

	// -----
	// useState
	const [formData, setFormData] = useState({
		shopName: "",
		shopDescription: "",

		addressFull: "",
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

	const [requestGetShopInfo, setRequestGetShopInfo] = useState({
		loading: false,
		success: "",
		error: "",
	});

	const [modalStatusUpdate, setModalStatusUpdate] = useState({
		statusOpen: false,
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
				latitude: tempFormData.geolocation.coordinates[0],
				longitude: tempFormData.geolocation.coordinates[1],
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
	// useEffect
	useEffect(() => {
		getShopInfoById();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paramsShopId]);

	useEffect(() => {
		if (!modalStatusUpdate.statusOpen) {
			getShopInfoById();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalStatusUpdate.statusOpen]);

	// -----
	// renderFunction
	const renderInfo = () => {
		return (
			<div className="row">
				{/* Field Name */}
				<div className="col-12 col-md-3 col-lg-3 py-2">
					<div>
						<div>Shop Name:</div>
						<div>{formData.shopName}</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-3 col-lg-3 py-2">
					<div>
						<div>Unique Url:</div>
						<div>{formData.uniqueUrl}</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-3 col-lg-3 py-2">
					<div>
						<div>Phone Number:</div>
						<div>{formData.phoneNumber}</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-3 col-lg-3 py-2">
					<div>
						<div>Whatsapp Number:</div>
						<div>{formData.whatsappNumber}</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-6 col-lg-6 py-2">
					<div>
						<div>Shop Description:</div>
						<div>{formData.shopDescription}</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-6 col-lg-6 py-2">
					<div>
						<div>Shop Address:</div>
						<div>{formData.addressFull}</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-6 col-lg-6 py-2">
					<div>
						<div>Locality, City, State:</div>
						<div>
							{formData.localityName}, {formData.cityName}, {formData.stateName}
						</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-6 col-lg-6 py-2">
					<div>
						<div>Geo Location:</div>
						<div>
							Lat: {formData.latitude} , Lng: {formData.longitude}
						</div>
					</div>
				</div>

				{/* Field Name */}
				{formData.googleMapEmbedLink !== "" && (
					<div className="col-12 col-md-12 col-lg-12 py-2">
						<div>
							<div>Google Map Embed Link:</div>
							<div>
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
							</div>
						</div>
					</div>
				)}
			</div>
		);
	};

	const renderModalProfileUpdate = () => {
		return (
			<Modal
				show={modalStatusUpdate.statusOpen}
				size="lg"
				onHide={() =>
					setModalStatusUpdate({
						statusOpen: false,
					})
				}
				style={{
					borderRadius: "0px",
				}}
			>
				<Modal.Body
					style={{
						padding: "0px",
					}}
				>
					<ShopProfileUpdate
						setModalStatus={setModalStatusUpdate}
						modalStatus={modalStatusUpdate}
					/>
				</Modal.Body>
			</Modal>
		);
	};

	return (
		<div>
			<div className="container p-5">
				<div className="p-5 bg-white border">
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

					{/* Content */}
					{!requestGetShopInfo.loading && requestGetShopInfo.error === "" && (
						<div>
							<h4>
								Shop Info
								<span className="ps-2 ps-lg-5 d-inline-block">
									<button
										className="btn btn-sm btn-primary"
										onClick={() =>
											setModalStatusUpdate({
												statusOpen: true,
											})
										}
									>
										Update
									</button>
								</span>
							</h4>
							{renderInfo()}
						</div>
					)}
				</div>
			</div>
			{renderModalProfileUpdate()}
		</div>
	);
};

export default ShopAdd;
