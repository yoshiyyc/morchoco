import { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import { formatCurrency } from "../../utilities/utils";
import { Input, Textarea } from "../../components/FormElements";
import Loading from "../../components/Loading";

function Checkout() {
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
    defaultValues: { name: "", email: "", tel: "", address: "", message: "" },
  });
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
      reset({ name: "", email: "", tel: "", address: "", message: "" });
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
        console.log("res", res);

        setDiscountedTotal(res.data.data.final_total);
        setCouponCode("");
        setIsLoading(false);
        dispatch(createAsyncMessage(res.data));
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
      },
    };

    await axios
      .post(`/v2/api/${process.env.REACT_APP_API_PATH}/order`, form)
      .then((res) => {
        console.log(res);
        setCouponCode("");
        setSubmittedData(data);
        setIsLoading(false);
        dispatch(createAsyncMessage(res.data));
        navigate(`/success/${res.data.orderId}`);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        dispatch(createAsyncMessage(error.response.data));
      });
  };

  return (
    <div className="bg-white">
      <div className="container">
        <Loading isLoading={isLoading} />
        <div className="row g-0 flex-column-reverse flex-md-row justify-content-center align-content-stretch">
          <form
            className="col col-md-7 px-5 pt-4 pb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="h4 mb-4">配送資訊</h2>
            <div>
              <div className="mb-3">
                <Input
                  id="name"
                  type="text"
                  errors={errors}
                  labelText="姓名"
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
                  errors={errors}
                  register={register}
                  rules={{
                    required: "地址為必填",
                  }}
                ></Input>
              </div>
              <div className="mb-3">
                <Textarea
                  id="message"
                  labelText="留言"
                  rows="5"
                  errors={errors}
                  register={register}
                ></Textarea>
              </div>
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
            <h3 className="h5 mb-4">購物車內容</h3>
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
                    ? formatCurrency(cartData.final_total)
                    : formatCurrency(cartData.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
