import { useState, useEffect } from "react";
import axios from "axios";

import configKeys from "../../config/keys";

const ProductInfo = (props) => {
	// -----
	// props
	const { modalStatus, setModalStatus } = props;

	// -----
	// constants
	// const { paramsShopId } = useParams();

	// -----
	// useState
	const [formData, setFormData] = useState({
		productName: "",
		productDescription: "",
		productQuantity: 1,
		productUnits: "piece",
		priceMrp: 0,
		priceSelling: 0,

		productUniqueUrl: "",
	});

	const [requestGetProductInfo, setRequestGetProductInfo] = useState({
		loading: false,
		success: "",
		error: "",
	});

	// -----
	// functions
	const getProductInfoById = async () => {
		setRequestGetProductInfo({
			loading: true,
			success: "",
			error: "",
		});

		try {
			const res = await axios.get(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/product/product/getById/${modalStatus?.paramsShopId}/${modalStatus?.productId}`,
				{
					withCredentials: true,
				}
			);

			const tempFormData = res.data.data.result;

			setFormData({
				...formData,
				...tempFormData,
			});

			setRequestGetProductInfo({
				loading: false,
				success: res.data.message,
				error: "",
			});
		} catch (error) {
			console.error(error);
			setRequestGetProductInfo({
				loading: false,
				success: "",
				error: error?.response?.data?.message,
			});
		}
	};

	// -----
	// useEffect
	useEffect(() => {
		getProductInfoById();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalStatus]);

	// -----
	// renderFunction
	const renderInfo = () => {
		return (
			<div className="row">
				{/* Field Name */}
				<div className="col-12 col-md-6 col-lg-4 py-2">
					<div>
						<div className="fw-bold">Product Name:</div>
						<div>{formData.productName}</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-6 col-lg-4 py-2">
					<div>
						<div className="fw-bold">Unique Url:</div>
						<div>{formData.uniqueUrl}</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-6 col-lg-4 py-2">
					<div>
						<div className="fw-bold">Price:</div>
						<div>
							Rs {formData.priceSelling} / {formData.productQuantity}{" "}
							{formData.productUnits} (MRP: {formData.priceMrp}){" "}
						</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-12 col-lg-12 py-2">
					<div>
						<div className="fw-bold">Product Description:</div>
						<div>{formData.productDescription}</div>
					</div>
				</div>

				{/* Field Name */}
				<div className="col-12 col-md-12 col-lg-12 py-2">
					<div>
						<div className="fw-bold">Image List:</div>
						<div>
							{formData?.imageList?.length === 0 && <span>No image is added.</span>}
							{formData?.imageList?.map((item, index) => {
								return (
									<span className="pe-4">
										<img
											src={item?.imageLink}
											alt=""
											style={{
												maxWidth: "80vw",
												height: "200px",
												objectFit: "contain",
											}}
										/>
									</span>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
			<div className="container">
				<div className="p-3 p-lg-5 bg-white">
					{requestGetProductInfo.loading && (
						<div className="text-center py-4">
							<div className="spinner-border text-primary" role="status" />
						</div>
					)}

					{!requestGetProductInfo.loading && requestGetProductInfo.error !== "" && (
						<div className="text-center py-4">
							<div className="text-danger">{requestGetProductInfo.error}</div>
						</div>
					)}

					{/* Content */}
					{!requestGetProductInfo.loading && requestGetProductInfo.error === "" && (
						<div>
							<h4 className="primary-color">
								Product Info
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
							{renderInfo()}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductInfo;
