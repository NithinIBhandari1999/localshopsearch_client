const Dashboard = () => {
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
									<h3>25</h3>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="py-3 h-100">
								<div className="p-3 h-100 border">
									<div>Yesterday</div>
									<h3>85</h3>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="py-3 h-100">
								<div className="p-3 h-100 border">
									<div>This Month</div>
									<h3>368</h3>
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
