import { useHistory } from "react-router-dom";

const Home = () => {
    const mHistory = useHistory();

    const renderSection1 = () => {
        return (
            <div
                style={{
                    backgroundImage: "url('/images/homepage/homepage.png')",
                    backgroundPosition: "center",
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="container">
                    <div className="py-5">
                        <div className="py-5">
                            <div className="py-5">
                                <div className="py-5">
                                    <h1 className="font-weight-bold text-white">
                                        Local Shop Search
                                    </h1>

                                    {/*  */}
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-6">
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search Product"
                                                />
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={() => {
                                                      mHistory.push("/search/")
                                                    }}
                                                >
                                                    <img
                                                        src="/icons/icon_magnify.png"
                                                        style={{
                                                            maxHeight: "20px",
                                                        }}
                                                        alt={"Search"}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection2 = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-6 py-3 py-md-5 py-lg-5">
                        <div className="">
                            <h2>What is LocalShopSearch.com ?</h2>
                            <p>
                                Local Shop Search is a website where
                                you can find shop information which sell product
                                near your home.
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-6 py-3 py-md-5 py-lg-5">
                        <div className="">
                            <h2>How to add your shop to sell product ?</h2>
                            <p>
                                Just Create a account and you can upload shop
                                detail and add product detail.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderSection1()}
            {renderSection2()}
        </div>
    );
};

export default Home;
