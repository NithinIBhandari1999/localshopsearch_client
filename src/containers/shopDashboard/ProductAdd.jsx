import { useState, useEffect } from "react";
import axios from "axios";

import FileUpload from "../../components/FileUpload";

import configKeys from "../../config/keys";
import inputValidation from "../../constants/inputValidation";

const ProductAdd = (props) => {
	// -----
	// props
	const modalStatus = props.modalStatus;
	const setModalStatus = props.setModalStatus;

	const [formData, setFormData] = useState({
		productName: "",
		productDescription: "",
		productQuantity: 1,
		productUnits: "piece",
		priceMrp: 0,
		priceSelling: 0,
	});

	const [formError, setFormError] = useState({
		productName: "",
		productDescription: "",
		priceMrp: "",
		priceSelling: "",
	});

	const [requestAddProduct, setRequestAddProduct] = useState({
		loading: false,
		success: "",
		error: "",
	});

	const [imageList, setImageList] = useState([]);

	const [fileUploadLink, setFileUploadLink] = useState("");
	useEffect(() => {
		if (inputValidation.isInputEmpty(fileUploadLink) === "") {
			insertProductImageList(fileUploadLink);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileUploadLink]);

	const validateForm = () => {
		let hasError = false; // If false = No Error

		const tempError = {
			productName: "",
			productDescription: "",
			priceMrp: "",
			priceSelling: "",
		};

		tempError.productName = inputValidation.isInputEmpty(formData.productName);
		if (tempError.productName !== "") {
			hasError = true;
		}

		tempError.productDescription = inputValidation.isInputEmpty(formData.productDescription);
		if (tempError.productDescription !== "") {
			hasError = true;
		}

		tempError.priceMrp = inputValidation.isInputValidGt0(formData.priceMrp);
		if (tempError.priceMrp !== "") {
			hasError = true;
		}
		tempError.priceSelling = inputValidation.isInputValidGt0(formData.priceSelling);
		if (tempError.priceSelling !== "") {
			hasError = true;
		}

		tempError.productQuantity = inputValidation.isInputValidGt0(formData.productQuantity);
		if (tempError.productQuantity !== "") {
			hasError = true;
		}

		tempError.productUnits = inputValidation.isInputEmpty(formData.productUnits);
		if (tempError.productUnits !== "") {
			hasError = true;
		}

		setFormError({
			...formError,
			...tempError,
		});

		return hasError;
	};

	const addProduct = async () => {
		if (validateForm()) {
			return;
		}

		const tempFormData = {
			...formData,
			imageList,
		};

		setRequestAddProduct({
			loading: true,
			success: "",
			error: "",
		});

		try {
			const res = await axios.post(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/product/product/insertOne/${modalStatus.paramsShopId}`,
				{
					...tempFormData,
				},
				{
					withCredentials: true,
				}
			);

			setRequestAddProduct({
				loading: false,
				success: res.data.message,
				error: "",
			});

			setModalStatus({
				openStatus: false,
			});
		} catch (error) {
			setRequestAddProduct({
				loading: false,
				success: error?.response?.data?.message,
				error: "",
			});
		}
	};

	const insertProductImageList = (imageLink) => {
		if (imageList.length < 5) {
			// Not Return
		} else {
			return;
		}

		setImageList([
			...imageList,
			{
				imageLink,
			},
		]);
		setFileUploadLink("");
	};

	const deleteProductImageList = (imageLink) => {
		const newImageArray = [];

		imageList.forEach((item) => {
			if (imageLink === item.imageLink) {
				//
			} else {
				newImageArray.push(item);
			}
		});

		setImageList(newImageArray);
	};

	return (
		<div>
			<div className="container">
				<div className="p-3 p-lg-5">
					{/* Heading */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<h4 className="primary-color">
							Product Add
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

					{/* Content */}
					<div className="row">
						{/* Field Name */}
						<div className="col-12 col-md-6 col-lg-4 py-2">
							<div>
								<label for="productName" class="form-label">
									Product Name *
								</label>
								<input
									type="text"
									class="form-control"
									id="productName"
									placeholder="Enter your product name"
									value={formData.productName}
									onChange={(t) => {
										setFormData({
											...formData,
											productName: t.target.value,
										});
									}}
								/>
								<div className="text-danger">{formError.productName}</div>
							</div>
						</div>

						<div className="col-12 col-md-6 col-lg-4 py-2">
							<div>
								<label for="priceMrp" class="form-label">
									MRP *
								</label>
								<input
									type="number"
									class="form-control"
									id="priceMrp"
									placeholder="Enter product mrp"
									value={formData.priceMrp}
									onChange={(t) => {
										setFormData({
											...formData,
											priceMrp: t.target.value,
										});
									}}
								/>
								<div className="text-danger">{formError.priceMrp}</div>
							</div>
						</div>

						<div className="col-12 col-md-6 col-lg-4 py-2">
							<div>
								<label for="priceSelling" class="form-label">
									Selling Price *
								</label>
								<input
									type="number"
									class="form-control"
									id="priceSelling"
									placeholder="Enter selling price"
									value={formData.priceSelling}
									onChange={(t) => {
										setFormData({
											...formData,
											priceSelling: t.target.value,
										});
									}}
								/>
								<div className="text-danger">{formError.priceSelling}</div>
							</div>
						</div>

						<div className="col-12 col-md-6 col-lg-4 py-2">
							<div>
								<label for="productQuantity" class="form-label">
									Quantity *
								</label>
								<input
									type="number"
									class="form-control"
									id="productQuantity"
									placeholder="Enter product quantity"
									value={formData.productQuantity}
									onChange={(t) => {
										setFormData({
											...formData,
											productQuantity: t.target.value,
										});
									}}
								/>
								<div className="text-danger">{formError.productQuantity}</div>
							</div>
						</div>

						<div className="col-12 col-md-6 col-lg-4 py-2">
							<div>
								<label for="productUnits" class="form-label">
									Units *
								</label>
								<input
									type="text"
									class="form-control"
									id="productUnits"
									placeholder="Enter product units"
									value={formData.productUnits}
									onChange={(t) => {
										setFormData({
											...formData,
											productUnits: t.target.value,
										});
									}}
								/>
								<div className="text-danger">{formError.productUnits}</div>
							</div>
						</div>

						{/* Field Name */}
						<div className="col-12 col-md-12 col-lg-12 py-2">
							<div>
								<label for="productDescription" class="form-label">
									Product Description *
								</label>
								<textarea
									class="form-control"
									id="productDescription"
									placeholder="Enter your product description"
									value={formData.productDescription}
									onChange={(t) => {
										setFormData({
											...formData,
											productDescription: t.target.value,
										});
									}}
								></textarea>
								<div className="text-danger">{formError.productDescription}</div>
							</div>
						</div>

						{/* Upload Image */}
						{imageList.length < 5 && (
							<div className="col-12 col-md-12 col-lg-6 py-2">
								<div>
									<label className="form-label">Product Image Upload *</label>
									<FileUpload setFileUploadLink={setFileUploadLink} />
									{formError.plantName && (
										<div className="text-danger">{formError.plantName}</div>
									)}
								</div>
							</div>
						)}

						{/* Field Upload Image List */}
						{imageList.length >= 1 && (
							<div className="col-12 col-md-12 col-lg-12 py-2">
								<div
									style={{
										overflow: "scroll",
										whiteSpace: "pre",
									}}
								>
									<div>Image List ({imageList.length}/5)</div>
									<div>
										{imageList.map((item) => {
											return (
												<div
													className="d-inline-block border p-2 m-2"
													key={item.imageLink}
												>
													<div
														style={{
															overflowX: "scroll",
														}}
													>
														<img
															src={`${item.imageLink}?tr=w-400,h-400,c-at_max`}
															alt={""}
															style={{
																height: "150px",
															}}
														/>
													</div>
													<div>
														<img
															src="/icons/icon_delete_black.svg"
															alt="delete"
															onClick={() => {
																deleteProductImageList(
																	item.imageLink
																);
															}}
														/>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						)}

						
					</div>

					{requestAddProduct.loading && (
						<div className="alert alert-info mt-2">Loading...</div>
					)}

					{requestAddProduct.success !== "" && (
						<div className="alert alert-success mt-2">{requestAddProduct.success}</div>
					)}

					{requestAddProduct.error !== "" && (
						<div className="alert alert-danger mt-2">{requestAddProduct.error}</div>
					)}

					<div>
						<button className="btn btn-primary" onClick={() => addProduct()}>
							Add Product
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductAdd;
