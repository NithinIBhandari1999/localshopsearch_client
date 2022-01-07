import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./css/drawer.scss";

const Drawer = (props) => {
	const mLocation = useLocation();
	const drawerType = "user";

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
			itemName: "Profile",
			menuType: "main",
			link: `/${drawerType}/dashboard/profile/info`,
			iconLink: `/assets/image/drawer/notactive/iconDrawerProfile.svg`,
			iconPrimaryLink: `/assets/image/drawer/active/iconDrawerProfile.svg`,
		});

		tempDrawerItemList.push({
			itemName: "Shop",
			menuType: "main",
			link: `/${drawerType}/dashboard/shop/list`,
			iconLink: `/assets/image/drawer/notactive/iconDrawerShop.svg`,
			iconPrimaryLink: `/assets/image/drawer/active/iconDrawerShop.svg`,
		});

		if (currentScreen === screenList.sm) {
			tempDrawerItemList.push({
				itemName: "Logout",
				menuType: "main",
				link: `/logout`,
				iconLink: `/assets/image/drawer/notactive/iconDrawerLogout.svg`,
				iconPrimaryLink: `/assets/image/drawer/active/iconDrawerLogout.svg`,
			});
		}

		setDrawerItemList(tempDrawerItemList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentScreen]);

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

	const renderHeader = () => {
		return (
			<div className="drawer_header_container">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<div>
						<div>
							<Link to={"/"} className="primary-color homepageLink">
								LocalShopSearch.com
							</Link>
						</div>
					</div>
					<div>
						<div>
							{currentScreen === screenList.lg && (
								<Link to={"/logout"} className="textLogout">
									Logout
								</Link>
							)}
							{currentScreen === screenList.sm && (
								<img
									src={
										drawerStatus === false
											? "/icons/icon_menu.svg"
											: "/icons/icon_close.svg"
									}
									alt="Open or Close Drawer"
									onClick={() => setDrawerStatus(drawerStatus ? false : true)}
									className="iconOpenClose mx-3"
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div>
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
					{/* Left Content */}
					<div
						style={{
							height: "100vh",
							overflowY: "auto",
							paddingTop: "56px",
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
					{/* Right Content */}
					<div>{props.children}</div>
				</div>
			</div>
			{renderHeader()}
		</div>
	);
};

export default Drawer;
