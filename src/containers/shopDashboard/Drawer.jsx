import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import "../userDashboard/css/drawer.scss";

const Drawer = (props) => {
	const mLocation = useLocation();
	const { paramsShopId } = useParams();
	const drawerType = "shop";

	const screenList = {
		sm: "sm",
		lg: "lg",
	};
	const [currentScreen, setCurrentScreen] = useState(screenList.sm);

	const [drawerStatus, setDrawerStatus] = useState(false);

	const [drawerItemList, setDrawerItemList] = useState([]);

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

	useEffect(() => {
		const tempDrawerItemList = [];

		tempDrawerItemList.push({
			itemName: "Dashboard",
			menuType: "main",
			link: `/${drawerType}/dashboard/${paramsShopId}/`,
			iconLink: `/assets/image/drawer/notactive/iconDrawerDashboard.svg`,
			iconPrimaryLink: `/assets/image/drawer/active/iconDrawerDashboard.svg`,
		});

		tempDrawerItemList.push({
			itemName: "Profile",
			menuType: "main",
			link: `/${drawerType}/dashboard/${paramsShopId}/profile`,
			iconLink: `/assets/image/drawer/notactive/iconDrawerProfile.svg`,
			iconPrimaryLink: `/assets/image/drawer/active/iconDrawerProfile.svg`,
		});

		tempDrawerItemList.push({
			itemName: "Product",
			menuType: "main",
			link: `/${drawerType}/dashboard/${paramsShopId}/product/list`,
			iconLink: `/assets/image/drawer/notactive/iconDrawerProduct.svg`,
			iconPrimaryLink: `/assets/image/drawer/active/iconDrawerProduct.svg`,
		});

		tempDrawerItemList.push({
			itemName: "Statistics",
			menuType: "main",
			link: `/${drawerType}/dashboard/${paramsShopId}/statistics`,
			iconLink: `/assets/image/drawer/notactive/iconDrawerStatistics.svg`,
			iconPrimaryLink: `/assets/image/drawer/active/iconDrawerStatistics.svg`,
		});

		setDrawerItemList(tempDrawerItemList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderLeftHeader = () => {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
				className="drawer_leftHeader_container"
			>
				<div>
					<Link to={"/"} className="primary-color homepageLink">
						LocalShopSearch.com
					</Link>
				</div>
				<div>
					{currentScreen === screenList.sm && (
						<img
							src="/icons/icon_close.svg"
							alt="Close Drawer"
							onClick={() => setDrawerStatus(false)}
							className="iconOpenClose"
						/>
					)}
				</div>
			</div>
		);
	};

	const renderLeftContent = () => {
		return (
			<div className="drawer_leftContent_container">
				{drawerItemList.map((drawerItem) => {
					const linkObj = {};
					if (drawerItem.link !== "") {
						linkObj.to = drawerItem.link;
					}

					return (
						<Link
							{...linkObj}
							className={`
								drawerItemMainContainer
								${mLocation?.pathname === drawerItem.link ? "active" : ""}
							`}
							onClick={() => setDrawerStatus(false)}
						>
							{drawerItem.menuType === "main" && (
								<div>
									<img
										src={
											mLocation?.pathname === drawerItem.link
												? drawerItem.iconPrimaryLink
												: drawerItem.iconLink
										}
										alt=""
									/>
									{drawerItem.itemName}
								</div>
							)}
							{drawerItem.menuType === "sub" && (
								<div
									style={{
										marginLeft: "20px",
									}}
								>
									<img src={drawerItem.iconLink} alt="" />
									{drawerItem.itemName}
								</div>
							)}
						</Link>
					);
				})}
			</div>
		);
	};

	const renderRightHeader = () => {
		return (
			<div
				className="drawer_rightHeader_container"
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				{currentScreen === screenList.sm && (
					<Link to={"/"} className="primary-color homepageLink">
						LocalShopSearch.com
					</Link>
				)}

				{currentScreen === screenList.sm && drawerStatus === false && (
					<img
						src="/icons/icon_menu.svg"
						alt="Open Drawer"
						onClick={() => setDrawerStatus(true)}
						className="iconOpenClose mx-3"
					/>
				)}
			</div>
		);
	};

	return (
		<div
			style={{
				display: "flex",
			}}
		>
			{/* Left Side */}
			<div
				style={{
					width: "300px",
					position: "fixed",
					display:
						currentScreen === screenList.sm && drawerStatus === false
							? "none"
							: "block",
					top: "0px",
					bottom: "0px",
					zIndex: 250,
					backgroundColor: "#FFFFFF",
				}}
			>
				{/* Left Header */}
				<div
					style={{
						height: "56px",
					}}
				>
					{renderLeftHeader()}
				</div>

				{/* Left Content */}
				<div
					style={{
						height: "calc(100vh - 56px)",
						overflowY: "auto",
					}}
				>
					{renderLeftContent()}
				</div>
			</div>

			{/* Right Side */}
			<div
				style={{
					width: currentScreen === screenList.sm ? "100vw" : "calc(100vw - 300px)",
					marginLeft: currentScreen === screenList.sm ? "0px" : "300px",
				}}
			>
				{/* Right Header */}
				<div
					style={{
						height: "56px",
						position: "fixed",
						top: "0px",
						backgroundColor: "#FFFFFF",
						width: "100%",
					}}
				>
					{renderRightHeader()}
				</div>

				{/* Right Content */}
				<div>
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Drawer;
