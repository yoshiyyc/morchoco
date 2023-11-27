import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminOrders from "./pages/admin/AdminOrders";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import UserLogin from "./pages/front/UserLogin";
import CreateAccount from "./pages/front/CreateAccount";
import ForgotPassword from "./pages/front/ForgotPassword";
import Products from "./pages/front/Products";
import ProductDetail from "./pages/front/ProductDetail";
import Delivery from "./pages/front/Delivery";
import About from "./pages/front/About";
import Cart from "./pages/front/Cart";
import Checkout from "./pages/front/Checkout";
import OrderSuccess from "./pages/front/OrderSuccess";
import Credits from "./pages/front/Credits";

const App = () => {
  return (
    <div>
      <Routes className="App">
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:category" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success/:orderId" element={<OrderSuccess />} />
          <Route path="credits" element={<Credits />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
