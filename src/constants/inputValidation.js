export const isValidEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const isValidPhone = (phone) => {
	const exp = /^[0-9]{6,16}$/;
	return exp.test(String(phone));
};

export const isValidPassword = (pwd) => {
	const expression = /^(?=.*\d)(?=.*[!@#$%^&*;_~>])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/;
	return expression.test(String(pwd));
};

export const isValidContact = (phone) => {
	const exp = /^[0-9]{8,10}$/;
	return exp.test(String(phone));
};

export const isValidPincode = (pincode) => {
	const exp = /^[0-9]{1,6}$/;
	return exp.test(String(pincode));
};

export const isInputEmpty = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	if (input.trim() === "") {
		return "Required Field";
	}
	return "";
};

export const isInputPasswordValid = (input) => {
	console.log(input);
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isValidPassword(input) === false) {
		return "Please enter a valid Password.";
	}
	return "";
};

export const isInputEmailValid = (input) => {
	console.log(input);
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isValidEmail(input) === false) {
		return "Please enter a valid Email.";
	}
	return "";
};

export const isInputEmailValidOrNotRequired = (input) => {
	console.log(input);
	if (input === undefined || input === null) {
		return "";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "";
	}
	if (isValidEmail(input) === false) {
		return "Please enter a valid Email.";
	}
	return "";
};

export const isInputPhoneNumberValid = (input) => {
	console.log(input);
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isValidPhone(input) === false) {
		return "Please enter a valid Phone Number.";
	}
	return "";
};

export const isInputPhoneNumberValidOrNotRequired = (input) => {
	console.log(input);
	if (input === undefined || input === null) {
		return "";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "";
	}
	if (isValidPhone(input) === false) {
		return "Please enter a valid Phone Number.";
	}
	return "";
};

export const isInputPastDate = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	if (input.trim() === "") {
		return "Required Field";
	}

	const date = new Date(input);
	if (date.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
		return "Date Cannot be Future Date.";
	}

	return "";
};

export const isInputFutureDate = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	if (input.trim() === "") {
		return "Required Field";
	}

	const date = new Date(input);
	if (date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
		return "Date Cannot be Past Date.";
	}

	return "";
};

export const isInputSelectSelected = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "" || input.trim() === "0") {
		return "Required Field";
	}
	return "";
};

export const isInputValidPincode = (input) => {
	console.log(new Date().getFullYear());
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (input.length !== 6) {
		return "Please enter a valid pincode.";
	}
	if (isNaN(input)) {
		return "Please enter a valid pincode.";
	}
	if (input >= 100001 && input <= 999999) {
		return "";
	} else {
		return `Please enter a valid pincode.`;
	}
};

export const isInputValidYear = (input) => {
	console.log(new Date().getFullYear());
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (input.length !== 4) {
		return "Please enter a valid year.";
	}
	if (isNaN(input)) {
		return "Please enter a valid year.";
	}
	const year = new Date().getFullYear();
	if (input >= year - 100 && input <= year + 10) {
		return "";
	} else {
		return `Please enter a valid year between ${year - 100} and ${year + 5}.`;
	}
};

export const isInputValidGt0 = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isNaN(input)) {
		return "Please enter a valid number.";
	}
	if (input >= 1) {
		return "";
	} else {
		return `Please enter a valid number.`;
	}
};

export const isInputValidLte = (input, max) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isNaN(input)) {
		return "Please enter a valid number.";
	}
	if (input <= max) {
		return "";
	} else {
		return `Please enter a valid number.`;
	}
};

export const isInputValidGte = (input, min) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isNaN(input)) {
		return "Please enter a valid number.";
	}
	if (input >= min) {
		return "";
	} else {
		return `Please enter a valid number.`;
	}
};

export const isInputValidLatitude = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isNaN(input)) {
		return "Please enter a valid Longitude.";
	}
	if (input >= -90 && input <= 90) {
		return "";
	} else {
		return `Please enter a valid Latitude.`;
	}
};

export const isInputValidLongitude = (input) => {
	if (input === undefined || input === null) {
		return "Required Field";
	}
	input = input.toString().trim();
	if (input.trim() === "") {
		return "Required Field";
	}
	if (isNaN(input)) {
		return "Please enter a valid Longitude.";
	}
	if (input >= -180 && input <= 180) {
		return "";
	} else {
		return `Please enter a valid Longitude.`;
	}
};

const exportDefault = {
	isInputEmpty,
	isInputPastDate,
	isInputFutureDate,
	isInputEmailValid,
	isInputPasswordValid,
	isInputPhoneNumberValid,
	isInputValidPincode,
	isInputSelectSelected,
	isInputValidYear,
	isInputValidGt0,
	isInputValidLte,
	isInputValidGte,
    isInputValidLatitude,
    isInputValidLongitude,

	isInputPhoneNumberValidOrNotRequired,
	isInputEmailValidOrNotRequired,
};

export default exportDefault;
