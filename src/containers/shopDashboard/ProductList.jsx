import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Modal } from "react-bootstrap";

import ProductAdd from "./ProductAdd";
import ProductInfo from "./ProductInfo";
import ProductUpdate from "./ProductUpdate";

import configKeys from "../../config/keys";

const ProductList = () => {
	const { paramsShopId } = useParams();

	const [productList, setProductList] = useState([]);
	const [requestGetProductList, setRequestGetProductList] = useState({
		loading: false,
		success: "",
		error: "",
	});

	const [modalStatusProductAdd, setModalStatusProductAdd] = useState({
		statusOpen: false,
		paramsShopId: "",
	});

	const [modalStatusProductInfo, setModalStatusProductInfo] = useState({
		statusOpen: false,
		id: "",
		paramsShopId: "",
	});

	const [modalStatusProductUpdate, setModalStatusProductUpdate] = useState({
		statusOpen: false,
		id: "",
		paramsShopId: "",
	});

	useEffect(() => {
		getProductList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!modalStatusProductAdd.statusOpen) {
			getProductList();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalStatusProductAdd.statusOpen]);
	useEffect(() => {
		if (!modalStatusProductUpdate.statusOpen) {
			getProductList();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalStatusProductUpdate.statusOpen]);

	const getProductList = async () => {
		try {
			setRequestGetProductList({
				loading: true,
				success: "",
				error: "",
			});

			const res = await axios.get(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/product/product/getAll/${paramsShopId}`,
				{
					withCredentials: true,
				}
			);

			if (res.data.data.results) {
				let tempProductList = res.data.data.results;

				if (Array.isArray(tempProductList)) {
					setProductList(tempProductList);
				}
			}

			setRequestGetProductList({
				loading: false,
				success: "",
				error: "",
			});
		} catch (error) {
			setRequestGetProductList({
				loading: false,
				success: "",
				error: "",
			});
		}
	};

	const deleteProduct = async (deleteId) => {
		try {
			await axios.delete(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/product/product/deleteById/${paramsShopId}/${deleteId}`,
				{
					withCredentials: true,
				}
			);

			getProductList();
		} catch (error) {
			if (error.response.data.message) {
				alert(error.response.data.message);
			} else {
				alert("Error in deleting product");
			}
		}
	};

	const renderModalProductInfo = () => {
		return (
			<Modal
				show={modalStatusProductInfo.statusOpen}
				size="lg"
				onHide={() =>
					setModalStatusProductInfo({
						statusOpen: false,
						id: "",
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
					<ProductInfo
						setModalStatus={setModalStatusProductInfo}
						modalStatus={modalStatusProductInfo}
					/>
				</Modal.Body>
			</Modal>
		);
	};

	const renderModalProductUpdate = () => {
		return (
			<Modal
				show={modalStatusProductUpdate.statusOpen}
				size="lg"
				onHide={() =>
					setModalStatusProductUpdate({
						statusOpen: false,
						id: "",
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
					<ProductUpdate
						setModalStatus={setModalStatusProductUpdate}
						modalStatus={modalStatusProductUpdate}
					/>
				</Modal.Body>
			</Modal>
		);
	};

	const renderModalProductAdd = () => {
		return (
			<Modal
				show={modalStatusProductAdd.statusOpen}
				size="lg"
				onHide={() =>
					setModalStatusProductAdd({
						statusOpen: false,
						id: "",
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
					<ProductAdd
						setModalStatus={setModalStatusProductAdd}
						modalStatus={modalStatusProductAdd}
					/>
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
							Product List
							<span className="ps-2 ps-lg-5 d-inline-block">
								<button
									className="btn btn-primary btn-sm"
									onClick={() => {
										setModalStatusProductAdd({
											paramsShopId,
											statusOpen: true,
										});
									}}
								>
									Add Product
								</button>
							</span>
						</h4>
					</div>

					{/* List */}
					<table class="table my-3">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Product Name</th>
								<th scope="col">Url</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{requestGetProductList.loading && (
								<tr>
									<td colspan="4" className="text-center">
										Loading...
									</td>
								</tr>
							)}
							{!requestGetProductList.loading && productList.length === 0 && (
								<tr>
									<td colspan="4" className="text-center py-5">
										<div
											className={"fw-bold primary-color"}
											onClick={() => {
												setModalStatusProductAdd({
													statusOpen: true,
													paramsShopId
												});
											}}
										>
											Click here to Add Product
										</div>
										<div className="fw-bold">
											Add product to increase sales.
										</div>
									</td>
								</tr>
							)}
							{!requestGetProductList.loading &&
								productList.map((itemProduct, index) => {
									return (
										<tr>
											<th scope="row">{index + 1}</th>
											<td>{itemProduct.productName}</td>
											<td>
												<a
													href={`/shop/info/${itemProduct?.shopInfo?.uniqueUrl}#product_${itemProduct?.uniqueUrl}`}
													target="_blank"
													rel="noreferrer"
												>
												Product Preview
												</a>
											</td>
											<td>
												<div
													className="border p-2 d-inline-block mx-2 cursor-pointer"
													onClick={() => {
														setModalStatusProductInfo({
															statusOpen: true,
															productId: itemProduct._id,
															paramsShopId,
														});
													}}
												>
													<img
														src="/assets/image/icons/iconInfo.svg"
														alt="Delete"
														className="mx-2"
													/>{" "}
													Info
												</div>
												<div
													className="border p-2 d-inline-block mx-2 cursor-pointer"
													onClick={() => {
														setModalStatusProductUpdate({
															statusOpen: true,
															productId: itemProduct._id,
															paramsShopId,
														});
													}}
												>
													<img
														src="/assets/image/icons/iconEdit.svg"
														alt="Edit"
														className="mx-2"
													/>{" "}
													Edit
												</div>
												<div
													className="border p-2 d-inline-block mx-2 cursor-pointer"
													onClick={() => {
														deleteProduct(itemProduct._id);
													}}
												>
													<img
														src="/assets/image/icons/iconDelete.svg"
														alt="Delete"
														className="mx-2"
													/>{" "}
													Delete
												</div>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>

			{renderModalProductInfo()}
			{renderModalProductUpdate()}
			{renderModalProductAdd()}
		</div>
	);
};

export default ProductList;
