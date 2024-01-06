import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import MessageToast from "../../components/MessageToast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const FrontLayout = () => {
  /*------------------------------------*\
  | Hooks
  \*------------------------------------*/
  const [cartData, setCartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Update cart number when entering the page
  useEffect(() => {
    setIsLoading(true);
    getCart();
  }, []);

  /*------------------------------------*\
  | Functions
  \*------------------------------------*/
  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );

      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cartData={cartData} />
      <MessageToast />
      <div className="flex-grow-1">
        <Outlet context={{ getCart, cartData, isLoading }}></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default FrontLayout;
