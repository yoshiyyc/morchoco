import { useEffect, useReducer } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Message from "../../components/Message";
import {
  MessageContext,
  messageReducer,
  initState,
} from "../../store/messageStore";

function Dashboard() {
  console.log("ad");
  const navigate = useNavigate();
  const reducer = useReducer(messageReducer, initState);

  console.log("coo", document.cookie);

  // Get token from cookie
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("morchocoToken="))
    ?.split("=")[1];

  console.log("to", token);

  // Assign token to axios headers
  axios.defaults.headers.common["Authorization"] = token;

  // Check if there is a valid token, then navigate accordingly
  useEffect(() => {
    if (!token) {
      return navigate("/admin/login");
    }

    (async () => {
      try {
        await axios.post("/v2/api/user/check");
      } catch (error) {
        console.log(error);
        if (!error.response.data.success) {
          navigate("/admin/login");
        }
      }
    })();
  }, [navigate, token]);

  // Logout callback - clear cookies and navigate to login page
  const handleLogout = () => {
    document.cookie = `morchocoToken=;`;
    navigate("/admin/login");
  };

  return (
    <MessageContext.Provider value={reducer}>
      <Message />
      <nav className="navbar navbar-expand-lg sticky-top bg-dark">
        <div className="container-fluid">
          <p className="text-white mb-0">Morchoco 後台管理系統</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={handleLogout}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div className="bg-light" style={{ width: "200px" }}>
          <ul className="list-group list-group-flush">
            <NavLink
              className="list-group-item list-group-item-action py-3"
              to="/admin/products"
            >
              <i className="bi bi-cup-hot-fill me-2"></i>
              產品列表
            </NavLink>
            <NavLink
              className="list-group-item list-group-item-action py-3"
              to="/admin/coupons"
            >
              <i className="bi bi-ticket-perforated-fill me-2" />
              優惠卷列表
            </NavLink>
            <NavLink
              className="list-group-item list-group-item-action py-3"
              to="/admin/orders"
            >
              <i className="bi bi-receipt me-2" />
              訂單列表
            </NavLink>
          </ul>
        </div>
        <div className="w-100">{token && <Outlet />}</div>
      </div>
    </MessageContext.Provider>
  );
}

export default Dashboard;
