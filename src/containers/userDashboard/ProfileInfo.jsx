import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

import ProfileUpdate from "./ProfileUpdate";
import configKeys from "../../config/keys";

const ProfileInfo = () => {
	const [formData, setFormData] = useState({
		name: "",
		latitude: 0,
		longitude: 0,
		stateName: "",
		districtName: "",
		cityName: "",
		phoneNumber: "",
		whatsappNumber: "",
		description: "",
		addressFull: "",
	});

	const [modalStatusUpdate, setModalStatusUpdate] = useState(false);

	useEffect(() => {
		getProfileInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (modalStatusUpdate === false) {
			getProfileInfo();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalStatusUpdate]);

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

	const renderProfileUpdateModal = () => {
		return (
			<Modal
				show={modalStatusUpdate.statusOpen}
				size="xl"
				onHide={() => {
					setModalStatusUpdate({
						statusOpen: false,
					});
				}}
				style={{
					borderRadius: "0px",
				}}
			>
				<Modal.Body
					style={{
						padding: "0px",
					}}
				>
					<ProfileUpdate setModalStatus={setModalStatusUpdate} />
				</Modal.Body>
			</Modal>
		);
	};

	return (
		<div>
			<div className="container p-5">
				<div className="p-5 bg-white border">
					{/* Heading */}
					<div>
						<h4 className="primary-color">
							Profile
							<span className="ps-2 ps-lg-5 d-inline-block">
								<button
									className="btn btn-primary btn-sm"
									onClick={() => {
										setModalStatusUpdate({
											statusOpen: true,
										});
									}}
								>
									Update
								</button>
							</span>
						</h4>
					</div>

					<div className="row">
						{/* Field Name */}
						<div className="col-12 col-md-6 col-lg-4 py-3">
							<div className="fw-bold">Name:</div>
							<div>{formData.name}</div>
						</div>

						{/* Field Name */}
						<div className="col-12 col-md-6 col-lg-4 py-3">
							<div className="fw-bold">Email:</div>
							<div>{formData.email}</div>
						</div>
					</div>
				</div>
			</div>
			{renderProfileUpdateModal()}
		</div>
	);
};

export default ProfileInfo;
