import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({});

  //// Function
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
            <h3 className="my-4 text-center">註冊新帳號</h3>
            <div className="bg-light border">
              <div className="col-9 mx-auto p-5">
                <div className="mb-4">
                  <label htmlFor="name" className="form-label w-100">
                    姓名
                  </label>
                  <input
                    id="name"
                    className="form-control"
                    name="name"
                    type="text"
                    placeholder="請輸入姓名"
                    onChange={handleChange}
                  />
                </div>
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
                <div className="mb-4">
                  <label htmlFor="phone" className="form-label w-100">
                    聯絡電話
                  </label>
                  <input
                    id="phone"
                    className="form-control"
                    name="phone"
                    type="phone"
                    placeholder="請輸入電話號碼"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="birthday" className="form-label w-100">
                    生日
                  </label>
                  <input
                    id="birthday"
                    className="form-control"
                    name="birthday"
                    type="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
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
                <div className=" mb-4">
                  <label htmlFor="passwordCheck" className="form-label w-100">
                    密碼確認
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="passwordCheck"
                    id="passwordCheck"
                    placeholder="請再次輸入密碼"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary d-block mt-5 mb-4 py-2 w-100"
                  onClick={handleSubmit}
                >
                  加入會員
                </button>
              </div>
              <div className="mx-auto  border-top bg-white">
                <Link
                  className="col-12 btn btn-outline-secondary py-3 border-0 rounded-0"
                  to="/login"
                >
                  已經是會員了
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
