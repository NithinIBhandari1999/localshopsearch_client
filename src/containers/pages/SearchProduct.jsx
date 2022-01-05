/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Popup,
	CircleMarker,
	Marker,
	Polyline,
	GeoJSON,
} from "react-leaflet";
import { DebounceInput } from "react-debounce-input";

import indianLandGeoJson from "./india-land-simplified.json";

import configKeys from "../../config/keys";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Fragment } from "react";

import "./css/searchProduct.css";

const SearchProduct = () => {
	// Current Screen Size
	const screenList = {
		sm: "sm",
		lg: "lg",
	};
	const [currentScreen, setCurrentScreen] = useState(screenList.sm);

	const [displayWidth, setDisplayWidth] = useState({
		list: "35%",
		map: "65%",
	});
	const [toggleListMap, setToggleListMap] = useState(true); // true means list and false means map

	const [listLoading, setListLoading] = useState(false);
	const [listLoadingSuccess, setListLoadingSuccess] = useState("");
	const [listLoadingError, setListLoadingError] = useState("");

	useEffect(() => {
		setTimeout(() => {
			setToggleListMap(false);
		}, 1000);
	}, []);

	useEffect(() => {
		let tempDisplayWidth = {
			list: "35%",
			map: "65%",
		};

		if (currentScreen === screenList.sm) {
			if (toggleListMap) {
				tempDisplayWidth = {
					list: "100%",
					map: "0%",
				};
			} else {
				tempDisplayWidth = {
					list: "0%",
					map: "100%",
				};
			}
		}

		setDisplayWidth(tempDisplayWidth);
		if (currentScreen === screenList.sm && toggleListMap === true) {
			// Dont change Polygon Coords
		} else {
			setTimeout(() => {
				if (myMap) {
					myMap.invalidateSize();
				}
			}, 500);
		}
	}, [currentScreen, toggleListMap]);

	const updateDimensions = () => {
		if (window.innerWidth < 992) {
			setCurrentScreen(screenList.sm);
		}
		if (window.innerWidth >= 992) {
			setCurrentScreen(screenList.lg);
		}
	};

	useEffect(() => {
		updateDimensions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [myMap, setMyMap] = useState(null);
	const [currentCoords, setCurrentCoords] = useState({
		latitude: 22.9874872,
		longitude: 79.07306671,
	});

	const [showCurrentLocationIcon, setShopCurrentLocationIcon] = useState(false);

	const [polygonCoords, setPolygonCoords] = useState({
		NW: {
			latitude: 43.059860730572545,
			longitude: 109.33594286441803,
		},
		NE: {
			latitude: 43.059860730572545,
			longitude: 49.21875536441804,
		},
		SE: {
			latitude: -7.723235627834022,
			longitude: 109.33594286441803,
		},
		SW: {
			latitude: -7.723235627834022,
			longitude: 49.21875536441804,
		},
	});

	const [shopList, setShopList] = useState([]);

	const [second, setSecond] = useState(0);

	const [query, setQuery] = useState("");

	useEffect(() => {
		const timer = setTimeout(
			(second) => {
				const tempSecond = second + 1;
				setSecond(tempSecond);
			},
			1250,
			second
		);
		return () => {
			clearInterval(timer);
		};
	}, [second]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (myMap) {
				const tempNorthEast = myMap.getBounds().getNorthEast();
				const tempNorthWest = myMap.getBounds().getNorthWest();
				const tempSouthEast = myMap.getBounds().getSouthEast();
				const tempSouthWest = myMap.getBounds().getSouthWest();

				const tempPolygonCoords = {
					NW: {
						latitude: tempNorthEast.lat,
						longitude: tempNorthEast.lng,
					},
					NE: {
						latitude: tempNorthWest.lat,
						longitude: tempNorthWest.lng,
					},
					SE: {
						latitude: tempSouthEast.lat,
						longitude: tempSouthEast.lng,
					},
					SW: {
						latitude: tempSouthWest.lat,
						longitude: tempSouthWest.lng,
					},
				};

				if (
					tempPolygonCoords?.NW?.latitude === polygonCoords?.NW?.latitude &&
					tempPolygonCoords?.NW?.longitude === polygonCoords?.NW?.longitude &&
					tempPolygonCoords?.NE?.latitude === polygonCoords?.NE?.latitude &&
					tempPolygonCoords?.NE?.longitude === polygonCoords?.NE?.longitude &&
					tempPolygonCoords?.SE?.latitude === polygonCoords?.SE?.latitude &&
					tempPolygonCoords?.SE?.longitude === polygonCoords?.SE?.longitude &&
					tempPolygonCoords?.SW?.latitude === polygonCoords?.SW?.latitude &&
					tempPolygonCoords?.SW?.longitude === polygonCoords?.SW?.longitude
				) {
					// console.log("Equal ", tempPolygonCoords, polygonCoords);
				} else {
					console.log("Not Equal:");
					// console.log(tempPolygonCoords);
					// console.log(polygonCoords);

					if (currentScreen === screenList.sm && toggleListMap === true) {
						// Dont change Polygon Coords
					} else {
						searchShop();
					}
				}

				if (currentScreen === screenList.sm && toggleListMap === true) {
					// Dont change Polygon Coords
				} else {
					console.log({
						tempPolygonCoords,
					});
					setPolygonCoords(tempPolygonCoords);
				}
			}
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, [second]);

	// useEffect to set location when currentCoords changed
	useEffect(() => {
		if (myMap) {
			myMap.flyTo([currentCoords.latitude, currentCoords.longitude], 12, {
				duration: 2.5,
			});
			setTimeout(() => {
				setShopCurrentLocationIcon(true);
			}, 2400);
		}
	}, [currentCoords]);

	// Get Initial Shop
	useEffect(() => {
		estimateLatLngByIp();
		searchShop();
	}, []);

	// Get Initial Shop
	useEffect(() => {
		searchShop();
	}, [query]);

	// setEstimateLocation: To set current location.
	const setEstimateLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			setCurrentCoords({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	};

	const searchShop = async () => {
		try {
			setListLoading(true);

			const result = await axios.post(
				`${configKeys.REACT_APP_BACKEND_URL}/.netlify/functions/api/global/shop/searchProduct`,
				{
					polygonCoords,
					query,
				},
				{
					withCredentials: true,
					headers: {
						accept: "Accept: application/json",
					},
				}
			);

			console.log(result?.data?.data?.result);
			if (Array.isArray(result?.data?.data?.result)) {
				console.log("yes", result?.data?.data?.result);
				setShopList(result?.data?.data?.result);
			}
			console.log(Array.isArray(result?.data?.data?.result));

			setListLoading(false);
			setListLoadingSuccess("");
			setListLoadingError("");
		} catch (error) {
			setShopList([]);

			setListLoading(false);
			setListLoadingSuccess("");
			setListLoadingError("Error");
		}
	};

	const estimateLatLngByIp = async () => {
		try {
			const res = await axios.get("https://geolocation.localshopsearch.workers.dev/");

			console.log(res.data);

			// (res.data.latitude)
			// (res.data.longitude)

			setCurrentCoords({
				latitude: res.data.latitude,
				longitude: res.data.longitude,
			});

			setTimeout(() => {
				setShopCurrentLocationIcon(false);
			}, 2500);
			setTimeout(() => {
				setShopCurrentLocationIcon(false);
			}, 2800);
			setTimeout(() => {
				setShopCurrentLocationIcon(false);
			}, 3300);
			setTimeout(() => {
				setShopCurrentLocationIcon(false);
			}, 3700);
			setTimeout(() => {
				setShopCurrentLocationIcon(false);
			}, 4000);
		} catch (error) {}
	};

	const renderFilter = () => {
		return (
			<div>
				<div class="d-flex">
					{/* Field: Search */}
					<DebounceInput
						minLength={0}
						debounceTimeout={500}
						type="text"
						placeholder="Search..."
						value={query}
						onChange={(t) => {
							setQuery(t.target.value);
						}}
						className="bg-white border"
						style={{
							width: "100%",
							height: "40px",
							margin: "5px",
							borderRadius: "1px",
							padding: "5px",
						}}
					/>

					{/* Loading */}
					<OverlayTrigger
						placement={"bottom"}
						overlay={<Tooltip id={`tooltip-bottom`}>Loading</Tooltip>}
					>
						<button
							className="btn btn-white bg-white border"
							style={{
								height: "40px",
								width: "40px",
								borderRadius: "0px",
								margin: "5px",
							}}
						>
							{listLoading && (
								<div className="spinner-border spinner-border-sm" role="status">
									<span className="sr-only"></span>
								</div>
							)}
							<Fragment>
								{listLoading === false && (
									<Fragment>
										{listLoadingSuccess === "" && listLoadingError === "" ? (
											<img
												src="/icons/icon_check_green.svg"
												alt=""
												className="p-0 m-0"
												style={{
													width: "20px",
													height: "20px",
													transform: "translate(-2px,-2px)",
												}}
											/>
										) : (
											<img
												src="/icons/icon_close_red.svg"
												alt=""
												className="p-0 m-0"
												style={{
													width: "20px",
													height: "20px",
													transform: "translate(-2px,-2px)",
												}}
											/>
										)}
									</Fragment>
								)}
							</Fragment>
						</button>
					</OverlayTrigger>

					{/* Button: Set current location */}
					<OverlayTrigger
						placement={"bottom"}
						overlay={<Tooltip id={`tooltip-bottom`}>Set Current Location</Tooltip>}
					>
						<button
							className="btn btn-white bg-white border"
							style={{
								height: "40px",
								borderRadius: "0px",
								margin: "5px",
							}}
							onClick={() => {
								setEstimateLocation();
							}}
						>
							<img src="/icons/icon_currentLocation_black.svg" alt="" className="" />
						</button>
					</OverlayTrigger>

					{/* Toggle Menu */}
					{currentScreen === screenList.sm && (
						<OverlayTrigger
							placement={"bottom"}
							overlay={
								<Tooltip id={`tooltip-bottom`}>
									{toggleListMap ? "Toggle List" : "Toggle Map"}
								</Tooltip>
							}
						>
							<button
								className="btn btn-white bg-white border"
								style={{
									height: "40px",
									borderRadius: "0px",
									margin: "5px",
								}}
								onClick={() => {
									setToggleListMap(!toggleListMap);
								}}
							>
								{toggleListMap ? (
									<img src="/icons/icon_map_black.svg" alt="" className="" />
								) : (
									<img src="/icons/icon_list_black.svg" alt="" className="" />
								)}
							</button>
						</OverlayTrigger>
					)}
				</div>
			</div>
		);
	};

	const renderList = () => {
		return (
			<div>
				<h4>Search Result ({shopList.length})</h4>

				{listLoading === false && shopList.length === 0 && (
					<div>
						<div>No Result Found.</div>
						<div>Please search an other term.</div>
					</div>
				)}

				<div>
					{shopList.map((itemProduct) => {
						return <ProductDisplay itemProduct={itemProduct} />;
					})}
				</div>
			</div>
		);
	};

	const renderMap = () => {
		return (
			<div>
				<MapContainer
					center={[currentCoords.latitude, currentCoords.longitude]}
					zoom={5}
					scrollWheelZoom={true}
					worldCopyJump={true}
					whenCreated={(e) => {
						console.log("Map Created", e);
						setMyMap(e);
					}}
					style={{ height: "calc(100vh - 110px)", width: "100%" }}
				>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | 
                        <a href="https://github.com/datameet/maps/blob/master/Country/india-composite.geojson">India outline</a> by <a href="http://datameet.org/">DataMeet India</a>'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{showCurrentLocationIcon && (
						<CircleMarker
							center={[currentCoords.latitude, currentCoords.longitude]}
							radius={1}
						>
							<Popup>Your Location</Popup>
						</CircleMarker>
					)}
					{showCurrentLocationIcon && (
						<CircleMarker
							center={[currentCoords.latitude, currentCoords.longitude]}
							radius={10}
						>
							<Popup>Your Location</Popup>
						</CircleMarker>
					)}

					{
						<Polyline
							key={"abcdwe"}
							positions={[
								[polygonCoords.NW.latitude, polygonCoords.NW.longitude],
								[polygonCoords.NE.latitude, polygonCoords.NE.longitude],
								[polygonCoords.SW.latitude, polygonCoords.SW.longitude],
								[polygonCoords.SE.latitude, polygonCoords.SE.longitude],
								[polygonCoords.NW.latitude, polygonCoords.NW.longitude],
							]}
						></Polyline>
					}

					{shopList.map((itemProduct) => {
						return (
							<Marker
								position={[
									itemProduct.shopInfo.geolocation.coordinates[1],
									itemProduct.shopInfo.geolocation.coordinates[0],
								]}
							>
								<Popup className={"request-popup"}>
									<ProductDisplay itemProduct={itemProduct} />
								</Popup>
							</Marker>
						);
					})}

					<GeoJSON
						data={indianLandGeoJson}
						style={{
							color: "#b89eb4",
							width: "1px",
						}}
					/>
				</MapContainer>
			</div>
		);
	};

	return (
		<div className="container-fluid bg-light p-0">
			{renderFilter()}

			<div class="d-flex" style={{ height: "calc(100vh - 106px)" }}>
				<div
					style={{
						width: displayWidth.list,
						display: displayWidth.list === "0%" ? "none" : "block",
						overflowY: "scroll",
					}}
				>
					{renderList()}
				</div>
				<div
					style={{
						width: displayWidth.map,
					}}
				>
					{renderMap()}
				</div>
			</div>
		</div>
	);
};

const ProductDisplay = (props) => {
	const itemProduct = props.itemProduct;
	return (
		<div className="border p-2" id={`product_${FormData._id}`}>
			<div className="fw-bold">
				{itemProduct.productName}
				{itemProduct.productPrice !== 0 && (
					<span className="px-2">
						(Rs {itemProduct.priceSelling} /{" "}
						{itemProduct.productQuantity}{" "}
						{itemProduct.productUnits})
					</span>
				)}
			</div>

			{itemProduct?.imageList?.length >= 1 && (
				<div
					style={{
						overflowX: "scroll",
						whiteSpace: "pre",
						width: "100%",
						margin: "0 auto",
					}}
				>
					<div>
						{itemProduct?.imageList.map((item) => {
							return (
								<div className="d-inline-block border p-1 m-1" key={item.imageLink}>
									<div>
										<img
											src={`${item?.imageLink}?tr=w-400,h-400,c-at_max`}
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
			<div className="my-2">
				{itemProduct?.shopInfo?.whatsappNumber !== "" && (
					<a
						href={`https://api.whatsapp.com/send/?phone=91${
							itemProduct?.shopInfo?.whatsappNumber
						}&text=${encodeURI(
							`Hi, I want to known more information about ${itemProduct.productName}.`
						)}`}
						target={"_blank"}
						rel="noreferrer"
					>
						<img src={"/icons/icon_whatsapp.svg"} alt="whatsapp" />
					</a>
				)}
				{itemProduct?.shopInfo?.phoneNumber !== "" && (
					<a
						href={`tel:91${itemProduct?.shopInfo?.phoneNumber}`}
						target={"_blank"}
						rel="noreferrer"
					>
						<img src={"/icons/icon_phone.svg"} alt="phone" />
					</a>
				)}

				<a
					href={`/shop/info/${itemProduct?.shopInfo?.uniqueUrl}`}
					target={"_blank"}
					rel="noreferrer"
					className="primary-color-bg text-white p-1 mx-1 rounded text-decoration-none"
				>
					Shop Info
				</a>
				<a
					href={`/shop/info/${itemProduct?.shopInfo?.uniqueUrl}#product_${itemProduct?.uniqueUrl}`}
					target={"_blank"}
					rel="noreferrer"
					className="primary-color-bg text-white p-1 mx-1 rounded text-decoration-none"
				>
					Product Info
				</a>
			</div>
		</div>
	);
};

export default SearchProduct;
