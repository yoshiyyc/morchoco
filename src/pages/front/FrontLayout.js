import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
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
    <>
      <Navbar cartData={cartData} />
      <Outlet context={{ getCart, cartData }}></Outlet>
      <Footer />
    </>
  );
}

export default FrontLayout;
