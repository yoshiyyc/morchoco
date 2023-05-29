import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
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
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <h2 className="my-3">登入帳號</h2>
          <div
            className={`alert alert-danger ${
              loginState.message ? "d-block" : "d-none"
            }`}
            role="alert"
          >
            {loginState.message}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label w-100">
              Email
              <input
                id="email"
                className="form-control"
                name="username"
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label w-100">
              密碼
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="name@example.com"
                onChange={handleChange}
              />
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            登入
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
