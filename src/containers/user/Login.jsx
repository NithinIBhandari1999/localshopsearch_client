import { useState } from "react";
import axios from "axios";

import configKeys from "../../config/keys";
import inputValidation from "../../constants/inputValidation";

const Login = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [formError, setFormError] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [requestLogin, setRequestLogin] = useState({
		loading: false,
		success: "",
		error: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const validateForm = () => {
		let hasError = false; // If hasError is true -> means it has error

		const tempError = {
			email: "",
			password: "",
		};

		tempError.email = inputValidation.isInputEmailValid(formData.email);
		if (tempError.email !== "") {
			hasError = true;
		}

		tempError.password = inputValidation.isInputEmpty(formData.password);
		if (tempError.password !== "") {
			hasError = true;
		} else {
			if(formData.password.length < 8){
				tempError.password = "Password must be at least 8 characters long";
			}
		}

		setFormError({
			...tempError,
		});

		return hasError;
	};

	const formSubmit = async (e) => {
		try {
			if(e?.preventDefault) {
				e.preventDefault();
			}

			if (validateForm()) {
				return;
			}

			setRequestLogin({
				loading: true,
				success: "",
				error: "",
			});

			const res = await axios.post(
				`${configKeys.REACT_APP_BACKEND_URL_NETLIFY}/user/auth/login`,
				formData,
				{
					withCredentials: true,
				}
			);

			window.location.replace("/user/dashboard/shop/list");

			setRequestLogin({
				loading: false,
				success: res.data.message,
				error: "",
			});
		} catch (error) {
			setRequestLogin({
				loading: false,
				success: "",
				error: error?.response?.data?.message,
			});
		}
	};

	return (
		<div>
			<form action="" onSubmit={ (e) => formSubmit(e)}>
				<div className="max-div-width-500 my-5 py-5 px-3">
					{requestLogin.success !== "" && (
						<div className="alert alert-success">{requestLogin.success}</div>
					)}

					{requestLogin.error !== "" && (
						<div className="alert alert-danger">{requestLogin.error}</div>
					)}

					{requestLogin.loading && <div className="alert alert-info">Loading...</div>}

					<h1 className="py-3">Login</h1>
					{/* Email address */}
					<div class="mb-3">
						<label for="email" class="form-label">
							Email address
						</label>
						<input
							type="email"
							class="form-control"
							name="email"
							id="email"
							placeholder="name@example.com"
							value={formData.email}
							onChange={(t) => {
								setFormData({
									...formData,
									email: t.target.value,
								});
							}}
						/>
						<div className="text-danger">{formError.email}</div>
					</div>

					{/* Password */}
					<div class="mb-3">
						<label for="password" class="form-label">
							Password
						</label>
						<input
							type={showPassword ? "text" : "password"}
							class="form-control"
							name="password"
							id="password"
							placeholder="Please enter your password"
							value={formData.password}
							onChange={(t) => {
								setFormData({
									...formData,
									password: t.target.value,
								});
							}}
						/>
						<div
							className="mt-2"
							onClick={() => setShowPassword(!showPassword)}
						>
							<input
								type="checkbox"
								name="showPassword"
								id="showPassword"
								checked={showPassword}
							/>{" "}
							<span>Show Password</span>
						</div>
						<div className="text-danger">{formError.password}</div>
					</div>

					{/* Button Login */}
					<div className="pt-3">
						{requestLogin.loading ? (
							<button className="btn btn-primary">Loading...</button>
						) : (
							<button
								type="submit"
								className="btn btn-primary"
							>
								Login
							</button>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
