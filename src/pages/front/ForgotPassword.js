import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../../components/FormElements";

const ForgotPassword = () => {
  const [loginState, setLoginState] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  // Reset form after form submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    try {
      setLoginState({
        success: true,
        message: "【輸入成功】會員頁面功能不在此專案計畫內",
      });
    } catch (error) {
      console.log(error);
      setLoginState({
        success: false,
        message: "輸入錯誤",
      });
    }
  };

  return (
    <>
      <section className="container">
        <nav aria-label="breadcrumb p-0">
          <ol className="breadcrumb m-0 py-2 lh-md border-bottom">
            <li className="breadcrumb-item">
              <NavLink className="text-decoration-none link-dark" to="/">
                <i className="bi bi-house-fill"></i>
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              忘記密碼
            </li>
          </ol>
        </nav>
      </section>
      <section className="container pt-4 pb-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <h2 className="h3 my-4 text-center text-dark">忘記密碼</h2>
            {loginState.message && (
              <div
                className={`alert rounded-0 ${
                  loginState.success ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {loginState.message}
              </div>
            )}
            <form className="bg-light border" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-9 mx-auto p-5">
                <p className="mb-5">
                  請輸入您的註冊
                  email，我們將會寄送「重新設定密碼」連結給您進行密碼設定。
                </p>
                <div className="mb-4">
                  <Input
                    id="email"
                    labelText="Email"
                    type="email"
                    placeholder="請輸入 email"
                    required={true}
                    errors={errors}
                    register={register}
                    rules={{
                      required: "Email 為必填",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email 格式不正確",
                      },
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary d-block mt-5 mb-4 py-2 w-100"
                >
                  寄出連結
                </button>
              </div>
              <div className="mx-auto border-top">
                <Link
                  className="col-12 btn btn-outline-secondary py-3 border-0 rounded-0"
                  to="/login"
                >
                  返回登入頁面
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
