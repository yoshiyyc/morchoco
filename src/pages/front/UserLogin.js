import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function UserLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({});

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
    <div className="bg-light">
      <div className="container pt-4 py-5">
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
              <div className="mx-auto  border-top bg-white">
                <Link
                  className="col-6 btn btn-outline-secondary py-3 border-0 rounded-0"
                  to="/forgotpassword"
                >
                  忘記密碼？
                </Link>
                <Link
                  className="col-6 btn btn-outline-secondary py-3 border-0 rounded-0"
                  to="/createaccount"
                >
                  註冊新會員
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
