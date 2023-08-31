import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({});

  const handleExit = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post("/v2/admin/signin", data);
      const { token, expired } = res.data;
      console.log(res.data);
      // Set token
      document.cookie = `morchocoToken=${token}; expires=${new Date(expired)}`;

      if (res.data.success) {
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
      setLoginState(error.response.data);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
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
                  onClick={handleExit}
                >
                  返回使用者頁面
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <h3 className="my-4 text-center">登入帳號</h3>
            <div
              className={`alert alert-danger ${
                loginState.message ? "d-block" : "d-none"
              }`}
              role="alert"
            >
              {loginState.message}
            </div>
            <div className="bg-light border">
              <div className="col-9 mx-auto p-5">
                <div className="mb-4">
                  <label htmlFor="email" className="form-label w-100">
                    Email
                  </label>
                  <input
                    id="email"
                    className="form-control"
                    name="email"
                    type="email"
                    placeholder="請輸入 Email"
                    onChange={handleChange}
                  />
                </div>
                <div className=" mb-4">
                  <label htmlFor="password" className="form-label w-100">
                    密碼
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="請輸入密碼"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary d-block mt-5 mb-4 py-2 w-100"
                  onClick={handleSubmit}
                >
                  登入
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
