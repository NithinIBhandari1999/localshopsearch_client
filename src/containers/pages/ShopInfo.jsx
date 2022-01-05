import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import configKeys from "../../config/keys";

const ShopInfo = () => {
	const mLocation = useLocation();
	const { id } = useParams();

	const [formSubmitError, setFormSubmitError] = useState("");
	const [formSubmitLoading, setFormSubmitLoading] = useState(true);

	const [formData, setFormData] = useState({});

	useEffect(() => {
		getById();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getById = async () => {
		try {
			setFormSubmitLoading(true);
			const res = await axios.get(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/global/shop/getShopInfoById/${id}`,
				{
					withCredentials: true,
				}
			);

			if (res?.data?.data?.resultShopInfo) {
				setFormData({
					...res?.data?.data?.resultShopInfo,
				});
				setTimeout(() => {
					if (mLocation.hash !== "") {
						window.location.href = mLocation.hash;
					}
				}, 250);
			}
			setFormSubmitLoading(false);
			setFormSubmitError("");
		} catch (error) {
			setFormSubmitError("Shop either is deleted or does not exist.");
			setFormSubmitLoading(false);
		}
	};

	const renderShopInfo = () => {
		return (
			<div className="py-5">
				<div className="row">
					<div className="col-12 col-md-6 col-lg-4">
						<h1>{formData.shopName}</h1>
						<p>
							{formData.localityName}, {formData.cityName}, {formData.stateName}, {" "}
							{formData.countryName}
						</p>

						{formData.whatsappNumber !== "" && (
							<a
								className="btn btn-success p-1 my-2 mr-2 ml-0 rounded-pill px-3"
								href={`https://api.whatsapp.com/send/?phone=91${
									formData.whatsappNumber
								}&text=${encodeURI(
									`Hi, I want to known more information about ${formData.productName}.`
								)}`}
								target={"_blank"}
								rel="noreferrer"
							>
								<img src={"/icons/icon_whatsapp_white.svg"} alt="whatsapp" />{" "}
								Whatsapp
							</a>
						)}
						{formData.phoneNumber !== "" && (
							<a
								className="btn btn-primary m-2 p-1 rounded-pill px-3"
								href={`tel:91${formData.phoneNumber}`}
								target={"_blank"}
								rel="noreferrer"
							>
								<img src={"/icons/icon_phone_white.svg"} alt="phone" /> Call Now
							</a>
						)}
					</div>
					<div className="col-12 col-md-6 col-lg-8">
						<p>About Shop:</p>
						<p className="fw-bold white-space-break-space">{formData.shopDescription}</p>
						<p>Full Address: </p>
						<p className="fw-bold">{formData.addressFull}</p>
					</div>
				</div>
			</div>
		);
	};

	const renderProductList = () => {
		return (
			<div>
				<h2 className="my-3">Product List</h2>
				<div>
					{formData?.productList?.length === 0 && (
						<div>
							No product added by shop. Please come again later.
						</div>
					)}
				</div>
				<div className="row">
					{formData?.productList?.map((itemProduct) => {
						return <ProductDisplay itemProduct={itemProduct} formData={formData} />;
					})}
				</div>
			</div>
		);
	};

	const renderPage = () => {
		return (
			<div className="container-sm py-5">
				{renderShopInfo()}
				{renderProductList()}
			</div>
		);
	};

	return (
		<div className="container-sm">
			{formSubmitLoading && <div className="text-center text-info my-5">Loading...</div>}
			{!formSubmitLoading && formSubmitError !== "" && (
				<div className="text-center text-danger my-5">{formSubmitError}</div>
			)}
			{!formSubmitLoading && formSubmitError === "" && <div>{renderPage()}</div>}
		</div>
	);
};

const ProductDisplay = (props) => {
	const itemProduct = props.itemProduct;
	const formData = props.formData;

	return (
		<div className="col-12 col-md-6 col-lg-4" id={`product_${itemProduct?.uniqueUrl}`}>
			<div className="border p-2">
				<div className="fw-bold">
					{itemProduct.productName}
					{itemProduct.priceSelling !== 0 && (
						<span className="px-2">
							(Rs {itemProduct.priceSelling} /{" "}
							{itemProduct.productQuantity}{" "}
							{itemProduct.productUnits})
						</span>
					)}
				</div>
				<div
					className="white-space-break-space"
				>{itemProduct.productDescription}</div>

				{itemProduct?.imageList?.length >= 1 && (
					<div
						style={{
							overflowX: "scroll",
							whiteSpace: "pre",
						}}
					>
						<div>
							{itemProduct?.imageList.map((item) => {
								return (
									<div
										className="d-inline-block border p-1 m-1"
										key={item.imageLink}
									>
										<div>
											<img
												src={`${item.imageLink}?tr=w-1000,h-1000,c-at_max`}
												alt={""}
												style={{
													height: "100px",
												}}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
				<div className="p-2 my-2">
					{formData?.whatsappNumber !== "" && (
						<a
							href={`https://api.whatsapp.com/send/?phone=91${
								formData?.whatsappNumber
							}&text=${encodeURI(
								`Hi, I want to known more information about ${itemProduct.productName}.`
							)}`}
							target={"_blank"}
							rel="noreferrer"
						>
							<img
								src={"/icons/icon_whatsapp.svg"}
								alt="whatsapp"
								style={{
									width: "40px",
								}}
							/>
						</a>
					)}
					{formData?.phoneNumber !== "" && (
						<a
							href={`tel:91${formData?.phoneNumber}`}
							target={"_blank"}
							rel="noreferrer"
						>
							<img
								src={"/icons/icon_phone.svg"}
								alt="phone"
								style={{
									width: "40px",
								}}
							/>
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default ShopInfo;
