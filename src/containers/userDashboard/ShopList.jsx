import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import configKeys from "../../config/keys";

import ShopAdd from "./ShopAdd";

const ShopList = () => {
	const [requestGetShopList, setRequestGetShopList] = useState({
		loading: false,
		success: "",
		error: "",
	});
	const [shopList, setShopList] = useState([]);

	const [modalStatusShopAdd, setModalStatusShopAdd] = useState({
		statusOpen: false,
	});

	useEffect(() => {
		getShopList();
	}, []);

	const getShopList = async () => {
		try {
			setRequestGetShopList({
				loading: true,
				success: "",
				error: "",
			});

			const res = await axios.get(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/shop/shop/getAll`,
				{
					withCredentials: true,
				}
			);

			if (res.data.data.results) {
				let tempShopList = res.data.data.results;

				if (Array.isArray(tempShopList)) {
					setShopList(tempShopList);
				}
			}

			setRequestGetShopList({
				loading: false,
				success: "",
				error: "",
			});
		} catch (error) {
			setRequestGetShopList({
				loading: false,
				success: "",
				error: "Unexpected Error occur",
			});
		}
	};

	const deleteShop = async (deleteId) => {
		try {
			await axios.post(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/shop/shop/deleteById/${deleteId}`,
				{},
				{
					withCredentials: true,
				}
			);

			getShopList();
		} catch (error) {
			if (error.response.data.message) {
				alert(error.response.data.message);
			} else {
				alert("Error in deleting product");
			}
		}
	};

	useEffect(() => {
		if (!modalStatusShopAdd.statusOpen) {
			getShopList();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalStatusShopAdd.statusOpen]);

	const renderModalShopAdd = () => {
		return (
			<Modal
				show={modalStatusShopAdd.statusOpen}
				size="xl"
				onHide={() =>
					setModalStatusShopAdd({
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
					<ShopAdd
						setModalStatus={setModalStatusShopAdd}
						modalStatus={modalStatusShopAdd}
					/>
				</Modal.Body>
			</Modal>
		);
	};

	return (
		<div>
			<div className="container p-3 p-lg-5">
				<div className="p-4 p-lg-5 bg-white border">
					{/* Heading */}
					<div>
						<h4 className="primary-color">
							Shop List
							{!requestGetShopList.loading && shopList.length === 0 && (
								<span className="ps-2 ps-lg-5 d-inline-block">
									<button
										className="btn btn-primary btn-sm"
										onClick={() => {
											setModalStatusShopAdd({
												statusOpen: true,
											});
										}}
									>
										Add Shop
									</button>
								</span>
							)}
						</h4>
					</div>

					{/* List */}
					<div class="table-responsive">
						<table class="table my-3">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Shop Name</th>
									<th scope="col">Url</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{requestGetShopList.loading && (
									<tr>
										<td colspan="4" className="text-center">
											Loading...
										</td>
									</tr>
								)}
								{!requestGetShopList.loading && shopList.length === 0 && (
									<tr>
										<td className="text-center" colSpan={4}>
											<div
												className={"primary-color"}
												onClick={() => {
													setModalStatusShopAdd({
														statusOpen: true,
													});
												}}
											>
												Click here to Add Shop
											</div>
										</td>
									</tr>
								)}
								{!requestGetShopList.loading &&
									shopList.map((itemShop, index) => {
										return (
											<tr>
												<th scope="row">{index + 1}</th>
												<td>{itemShop.shopName}</td>
												<td>
													<a
														href={`/shop/info/${itemShop.uniqueUrl}`}
														target="_blank"
														rel="noreferrer"
													>
														Shop Preview
													</a>
												</td>
												<td>
													<Link to={`/shop/dashboard/${itemShop._id}/`}>
														<div className="border p-2 d-inline-block mx-2 cursor-pointer">
															<img
																src="/assets/image/icons/iconDashboard.svg"
																alt="Delete"
																className="mx-2"
															/>{" "}
															Dashboard
														</div>
													</Link>
													<div
														className="border p-2 d-inline-block mx-2 cursor-pointer"
														onClick={() => {
															deleteShop(itemShop._id);
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
			</div>

			{renderModalShopAdd()}
		</div>
	);
};

export default ShopList;
