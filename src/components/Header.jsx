import { Fragment } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Header = (props) => {
	const mLocation = useLocation();
	const authState = props.authState;

	return (
		<Fragment>
			{mLocation.pathname.includes("dashboard") === false && (
				<nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
					<div className="container-fluid">
						<Link className="navbar-brand" to="/">
							Local Shop Search
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<Link className="nav-link active" aria-current="page" to="/">
										Home
									</Link>
								</li>
								{authState.statusIsLoggedIn === "true" ? (
									<Fragment>
										<li className="nav-item">
											<Link
												className="nav-link active"
												aria-current="page"
												to={"/logout"}
											>
												Logout
											</Link>
										</li>
										<li className="nav-item">
											<Link
												className="nav-link active"
												aria-current="page"
												to={"/user/dashboard"}
											>
												Dashboard
											</Link>
										</li>
									</Fragment>
								) : (
									<Fragment>
										<li className="nav-item">
											<Link
												className="nav-link active"
												aria-current="page"
												to="/user/login"
											>
												Login
											</Link>
										</li>
										<li className="nav-item">
											<Link
												className="nav-link active"
												aria-current="page"
												to="/user/register"
											>
												Sign Up
											</Link>
										</li>
									</Fragment>
								)}
							</ul>
						</div>
					</div>
				</nav>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	authState: state.user,
});

export default connect(mapStateToProps, {})(Header);
