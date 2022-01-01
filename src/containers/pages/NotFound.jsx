import { Helmet } from "react-helmet";

const NotFound = () => {
	return (
		<div
			style={{
				backgroundColor: "#f8f8ff",
			}}
			className="p-5 h-100"
		>
			<Helmet>
				<title>404 | Not Found</title>
				<meta name="robots" content="nofollow, noarchive, noindex" />
			</Helmet>

			<div className="bg-white container p-5 border text-center">
				<h1>404 | Not Found</h1>
			</div>
		</div>
	);
};

export default NotFound;
