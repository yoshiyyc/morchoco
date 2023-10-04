import { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import { formatCurrency } from "../../utilities/utils";
import { Input, Textarea, CheckboxRadio } from "../../components/FormElements";
import Loading from "../../components/Loading";

const Checkout = () => {
  const { cartData, getCart } = useOutletContext();
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
      name: "",
      email: "",
      tel: "",
      address: "",
      message: "",
      payment: "creditCard",
      cardHolder: "",
      creditNum: null,
      creditCVV: null,
      creditExpDate: "",
      bankAccount: null,
    },
  });

  const watchPayment = watch("payment");

  const dispatch = useDispatch();

  const [submittedData, setSubmittedData] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [currentCoupon, setCurrentCoupon] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getCart();
    setIsLoading(false);
  }, []);

  // Get the discountedTotal and currentCoupon from updated cartData
  useEffect(() => {
    setDiscountedTotal(cartData ? cartData.final_total : 0);

    if (cartData && cartData.carts && cartData.carts.length) {
      setCurrentCoupon(cartData?.carts[0]?.coupon?.code);
    } else {
      setCurrentCoupon("");
    }
  }, [cartData]);

  // Reset form and update cart num after form submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        email: "",
        tel: "",
        address: "",
        message: "",
        payment: "creditCard",
        cardHolder: "",
        creditNum: null,
        creditCVV: null,
        creditExpDate: "",
        bankAccount: null,
      });
    }
    getCart();
  }, [isSubmitSuccessful, submittedData, reset]);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = async (e) => {
    setIsLoading(true);

    const data = {
      data: {
        code: couponCode,
      },
    };

    await axios
      .post(`/v2/api/${process.env.REACT_APP_API_PATH}/coupon`, data)
      .then((res) => {
        setDiscountedTotal(res.data.data.final_total);

        setCouponCode("");
        setIsLoading(false);
        dispatch(createAsyncMessage(res.data));
        getCart();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        dispatch(createAsyncMessage(error.response.data));
      });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    const { name, email, tel, address, message } = data;

    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
        message: message,
        status: "0",
      },
    };

    await axios
      .post(`/v2/api/${process.env.REACT_APP_API_PATH}/order`, form)
      .then((res) => {
        setCouponCode("");
        setSubmittedData(data);
        completePayment(res.data.orderId);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        dispatch(createAsyncMessage(error.response.data));
      });
  };

  const completePayment = async (orderId) => {
    await axios
      .post(`/v2/api/${process.env.REACT_APP_API_PATH}/pay/${orderId}`)
      .then((res) => {
        setIsLoading(false);
        dispatch(createAsyncMessage(res.data));
        navigate(`/success/${orderId}`);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        dispatch(createAsyncMessage(error.response.data));
      });
  };

  return (
    <div className="bg-white">
      <Loading isLoading={isLoading} />
      <section className="container">
        <nav aria-label="breadcrumb p-0">
          <ol className="breadcrumb m-0 py-2 lh-md border-bottom">
            <li className="breadcrumb-item">
              <NavLink className="text-decoration-none link-dark" to="/">
                <i className="bi bi-house-fill"></i>
              </NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink className="text-decoration-none link-dark" to="/cart">
                購物車
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              結帳
            </li>
          </ol>
        </nav>
      </section>
      <div className="container">
        <div className="row g-0 flex-column-reverse flex-md-row justify-content-center align-content-stretch">
          <form
            className="col col-md-7 px-5 pt-4 pb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-5">
              <h2 className="h4 mb-4 text-dark">配送資訊</h2>
              <div>
                <div className="mb-3">
                  <Input
                    id="name"
                    type="text"
                    errors={errors}
                    labelText="姓名"
                    placeholder="例：林小明"
                    required={true}
                    register={register}
                    rules={{
                      required: "姓名為必填",
                      maxLength: {
                        value: 10,
                        message: "姓名長度不超過 10",
                      },
                    }}
                  ></Input>
                </div>
                <div className="mb-3">
                  <Input
                    id="email"
                    labelText="Email"
                    type="email"
                    placeholder="例：xxx@example.com"
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
                  ></Input>
                </div>
                <div className="mb-3">
                  <Input
                    id="tel"
                    labelText="電話"
                    type="tel"
                    placeholder="例：0987654321"
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
                  ></Input>
                </div>
                <div className="mb-3">
                  <Input
                    id="address"
                    labelText="地址"
                    type="address"
                    placeholder="例：◯◯市◯◯區◯◯路◯◯樓◯◯號"
                    errors={errors}
                    register={register}
                    required={true}
                    rules={{
                      required: "地址為必填",
                    }}
                  ></Input>
                </div>
                <div className="mb-3">
                  <Textarea
                    id="message"
                    labelText="留言"
                    placeholder="請輸入希望配送時段或其他備註"
                    rows="5"
                    errors={errors}
                    register={register}
                  ></Textarea>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <h2 className="h4 mb-4 text-dark">付款方式</h2>
              <div className="row mb-3">
                <div className="col-6 mb-3">
                  <CheckboxRadio
                    id="creditCard"
                    name="payment"
                    type="radio"
                    value="creditCard"
                    labelText="信用卡"
                    register={register}
                    errors={errors}
                    rules={{
                      required: "付款方式為必填",
                    }}
                  />
                </div>
                <div className="col-6 mb-3">
                  <CheckboxRadio
                    id="bankTransfer"
                    name="payment"
                    type="radio"
                    labelText="匯款"
                    value="bankTransfer"
                    register={register}
                    errors={errors}
                    rules={{
                      required: "付款方式為必填",
                    }}
                  />
                </div>
              </div>
              {watchPayment === "creditCard" && (
                <div className="row mb-3">
                  <div className="mb-3">
                    <Input
                      id="cardHolder"
                      labelText="持卡人姓名"
                      type="text"
                      placeholder="例：Apple Wang"
                      required={true}
                      errors={errors}
                      register={register}
                      rules={{
                        required: "持卡人姓名為必填",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <Input
                      id="creditNum"
                      labelText="信用卡號碼"
                      type="number"
                      placeholder="0000 0000 0000 0000"
                      required={true}
                      errors={errors}
                      register={register}
                      rules={{
                        required: "信用卡號碼為必填",
                        minLength: {
                          value: 12,
                          message: "請輸入完整 12 碼號碼",
                        },
                        maxLength: {
                          value: 12,
                          message: "請輸入完整 12 碼號碼",
                        },
                      }}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <Input
                      id="creditCVV"
                      labelText="驗證碼"
                      type="number"
                      placeholder="000"
                      required={true}
                      errors={errors}
                      register={register}
                      rules={{
                        required: "驗證碼為必填",
                        minLength: {
                          value: 3,
                          message: "請輸入完整 3 碼號碼",
                        },
                        maxLength: {
                          value: 3,
                          message: "請輸入完整 3 碼號碼",
                        },
                      }}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <Input
                      id="creditExpDate"
                      labelText="到期日"
                      type="text"
                      placeholder="MM/YY"
                      errors={errors}
                      register={register}
                      required={true}
                      rules={{
                        required: "到期日為必填",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/i,
                          message:
                            "輸入年月需符合 MM/YY 格式，請確認月份及年份是否正確",
                        },
                      }}
                    />
                  </div>
                </div>
              )}
              {watchPayment === "bankTransfer" && (
                <div className="row mb-3">
                  <small className="text-dark mb-4">
                    *請匯款至以下帳戶（在備註處註記姓名），並在下方欄位填寫帳號後
                    5 碼
                  </small>
                  <table className="table table-borderless mx-2 mb-4 bg-light">
                    <tbody>
                      <tr>
                        <th>銀行</th>
                        <td>822 （中國信託）</td>
                      </tr>
                      <tr>
                        <th>帳號</th>
                        <td>493590245732</td>
                      </tr>
                      <tr>
                        <th>戶名</th>
                        <td>莫巧克</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="col-6">
                    <Input
                      id="bankAccount"
                      labelText="帳號後 5 碼"
                      type="number"
                      placeholder="00000"
                      required={true}
                      errors={errors}
                      register={register}
                      rules={{
                        required: "帳號後 5 碼為必填",
                        minLength: {
                          value: 5,
                          message: "請輸入完整 5 碼號碼",
                        },
                        maxLength: {
                          value: 5,
                          message: "請輸入完整 5 碼號碼",
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex flex-column-reverse flex-sm-row flex-md-column-reverse flex-lg-row justify-content-between align-items-center w-100 mt-5">
              <Link
                className="col-12 col-sm-4 col-md-12 col-lg-3 btn btn-outline-secondary my-3 my-sm-0 my-md-3 my-lg-5 py-3 rounded-0"
                to="/cart"
              >
                返回購物車
              </Link>
              <button
                type="submit"
                className="col-12 col-sm-4 col-md-12 col-lg-4 btn btn-dark ms-sm-auto py-3 border-0 rounded-0"
              >
                送出表單
              </button>
            </div>
          </form>
          <div className="col px-5 pt-4 pb-4 pb-md-5 bg-light">
            <h3 className="h5 mb-4 text-dark">購物車內容</h3>
            <div className="mb-5">
              {cartData?.carts?.map((item) => {
                return (
                  <div className="d-flex align-items-center mb-3" key={item.id}>
                    <div className="position-relative me-3 border">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        style={{
                          width: "65px",
                          height: "65px",
                          objectFit: "cover",
                        }}
                      />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {item.qty}
                      </span>
                    </div>
                    <p className="mb-0">
                      <small>{item.product.title}</small>
                    </p>
                    <p className="ms-auto mb-0 text-muted">
                      <small>NT$ {formatCurrency(item.total)}</small>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="row mb-5">
              <div className="col-12">
                <label htmlFor="coupon" className="form-label fw-bold">
                  優惠券
                  <br />
                  <small className="fw-normal text-muted">
                    請確認所有商品都選購完畢後才使用優惠券
                  </small>
                </label>
              </div>
              <div className="col-9 col-md-12 col-lg-9">
                <input
                  id="coupon"
                  className="form-control"
                  type="text"
                  value={couponCode}
                  placeholder="使用優惠碼"
                  onChange={handleCouponChange}
                />
              </div>
              <div className="col-3 col-md-10 col-lg-3 mx-auto mt-md-3 mt-lg-0 p-0">
                <button
                  type="button"
                  className="btn btn-dark d-block w-100"
                  onClick={handleApplyCoupon}
                >
                  輸入
                </button>
              </div>
              {currentCoupon && (
                <div className="col-12 my-2">
                  <span className="fw-normal text-danger">
                    使用中的優惠碼：{currentCoupon}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-5 mb-4 my-md-5">
              <div className="d-flex justify-content-between mb-2">
                <p className="mb-0">小計</p>
                <p className="mb-0">NT$ {formatCurrency(cartData.total)}</p>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <p className="mb-0">優惠折扣</p>
                <p
                  className={`mb-0 ${
                    cartData.total - discountedTotal && "text-danger"
                  }`}
                >
                  {`- NT$ ${
                    discountedTotal
                      ? formatCurrency(cartData.total - discountedTotal)
                      : 0
                  }`}
                </p>
              </div>
              <div className="d-flex justify-content-between h5 fw-bold text-dark">
                <p className="mb-0">應付總額</p>
                <p className="mb-0">
                  NT${" "}
                  {discountedTotal
                    ? formatCurrency(discountedTotal)
                    : formatCurrency(cartData.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
