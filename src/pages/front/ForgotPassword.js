import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(data);
  };

  return (
    <div className="bg-light">
      <div className="container pt-4 py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <h3 className="my-4 text-center">忘記密碼</h3>
            <div className="bg-light border">
              <div className="col-9 mx-auto p-5">
                <p className="mb-5">
                  請輸入您的註冊
                  email，我們將會寄送「重新設定密碼」連結給您進行密碼設定。
                </p>
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
                <button
                  type="button"
                  className="btn btn-primary d-block mt-5 mb-4 py-2 w-100"
                  onClick={handleSubmit}
                >
                  寄出連結
                </button>
              </div>
              <div className="mx-auto  border-top bg-white">
                <Link
                  className="col-12 btn btn-outline-secondary py-3 border-0 rounded-0"
                  to="/login"
                >
                  返回登入頁面
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
