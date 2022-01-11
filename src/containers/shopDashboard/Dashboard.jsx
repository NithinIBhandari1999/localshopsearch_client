import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

import configKeys from "../../config/keys";

const Dashboard = () => {
	const { paramsShopId } = useParams();

	const [stats, setStats] = useState({
		today: 0,
		week: 0,
		month: 0,
	});

	const [requestStats, setRequestStats] = useState({
		loading: false,
		success: "",
		error: "",
	});

	useEffect(() => {
		getStats();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getStats = async () => {
		try {
			setRequestStats({
				loading: true,
				success: "",
				error: "",
			});

			const res = await axios.post(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/shop/shopStatistics/getDashboardStatistics/${paramsShopId}`,
				{},
				{
					withCredentials: true,
				}
			);

			if (res.data.data.result) {
				setStats({
					today: res?.data?.data?.result?.today,
					week: res?.data?.data?.result?.week,
					month: res?.data?.data?.result?.month,
				});
			}

			setRequestStats({
				loading: false,
				success: "",
				error: "",
			});
		} catch (error) {
			setRequestStats({
				loading: false,
				success: "",
				error: "",
			});
		}
	};

	return (
		<div>
			<div className="container p-3 p-lg-5">
				<div className="p-4 p-lg-5 bg-white border">
					<h3>Dashboard</h3>

					<div className="row">
						<div className="col">
							<div className="py-3 h-100">
								<div className="p-3 h-100 border">
									<div>Today</div>
									{requestStats.loading ? (
										<div className="py-1">
											<div
												className="spinner-grow spinner-grow-sm text-primary"
												role="status"
											/>
										</div>
									) : (
										<h3>{stats.today}</h3>
									)}
								</div>
							</div>
						</div>
						<div className="col">
							<div className="py-3 h-100">
								<div className="p-3 h-100 border">
									<div>This Week</div>
									{requestStats.loading ? (
										<div className="py-1">
											<div
												className="spinner-grow spinner-grow-sm text-primary"
												role="status"
											/>
										</div>
									) : (
										<h3>{stats.week}</h3>
									)}
								</div>
							</div>
						</div>
						<div className="col">
							<div className="py-3 h-100">
								<div className="p-3 h-100 border">
									<div>This Month</div>
									{requestStats.loading ? (
										<div className="py-1">
											<div
												className="spinner-grow spinner-grow-sm text-primary"
												role="status"
											/>
										</div>
									) : (
										<h3>{stats.month}</h3>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
