import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import MessageToast from "../../components/MessageToast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function FrontLayout() {
  const [cartData, setCartData] = useState({});

  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      console.log("購物車", res);
      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cartData={cartData} />
      <MessageToast />
      <div className="flex-grow-1">
        <Outlet context={{ getCart, cartData }}></Outlet>
      </div>
      <Footer />
    </div>
  );
}

export default FrontLayout;
