import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../../components/FormElements";

const CreateAccount = () => {
  const [loginState, setLoginState] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthday: null,
      password: "",
      passwordCheck: "",
    },
  });

  // Reset form after form submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        email: "",
        phone: "",
        birthday: null,
        password: "",
        passwordCheck: "",
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
        message: "登入錯誤",
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
                <i className="bi bi-house-fill" />
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              註冊新帳號
            </li>
          </ol>
        </nav>
      </section>
      <section className="container pt-4 pb-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <h2 className="h3 my-4 text-center text-dark">註冊新帳號</h2>
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
              <div className="col-9 mx-auto px-0 px-sm-5 py-5">
                <div className="mb-4">
                  <Input
                    id="name"
                    type="text"
                    errors={errors}
                    labelText="姓名"
                    placeholder="請輸入姓名"
                    required={true}
                    register={register}
                    rules={{
                      required: "姓名為必填",
                      maxLength: {
                        value: 10,
                        message: "姓名長度不超過 10",
                      },
                    }}
                  />
                </div>
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
                <div className="mb-4">
                  <Input
                    id="tel"
                    labelText="電話"
                    type="tel"
                    placeholder="請輸入電話號碼"
                    required={true}
                    errors={errors}
                    register={register}
                    rules={{
                      required: "電話為必填",
                      minLength: {
                        value: 6,
                        message: "電話不少於 6 碼",
                      },
                      maxLength: {
                        value: 12,
                        message: "電話不超過 12 碼",
                      },
                    }}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    id="birthday"
                    type="date"
                    labelText="生日"
                    required={true}
                    register={register}
                    errors={errors}
                    rules={{
                      required: "生日為必填",
                    }}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    id="password"
                    labelText="密碼"
                    type="password"
                    placeholder="請輸入密碼"
                    required={true}
                    errors={errors}
                    register={register}
                    rules={{
                      required: "密碼為必填",
                      minLength: {
                        value: 6,
                        message: "密碼不少於 6 碼",
                      },
                      maxLength: {
                        value: 12,
                        message: "密碼不超過 12 碼",
                      },
                    }}
                  />
                </div>
                <div className=" mb-4">
                  <Input
                    id="passwordCheck"
                    labelText="密碼確認"
                    type="password"
                    placeholder="請再次輸入密碼"
                    required={true}
                    errors={errors}
                    register={register}
                    rules={{
                      required: "密碼為必填",
                      minLength: {
                        value: 6,
                        message: "密碼不少於 6 碼",
                      },
                      maxLength: {
                        value: 12,
                        message: "密碼不超過 12 碼",
                      },
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return "密碼不一致";
                        }
                      },
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary d-block mt-5 mb-4 py-2 w-100"
                >
                  加入會員
                </button>
              </div>
              <div className="mx-auto border-top">
                <Link
                  className="col-12 btn btn-outline-secondary py-3 border-0 rounded-0"
                  to="/login"
                >
                  已經是會員了
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateAccount;
