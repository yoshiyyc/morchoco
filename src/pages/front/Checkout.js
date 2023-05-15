import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Input } from "../../components/FormElements";

function Checkout() {
  const { cartData } = useOutletContext();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, tel, address } = data;

    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
        message: "這是留言",
      },
    };

    const res = await axios.post(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
      form
    );
    console.log(res);
    navigate(`/success/${res.data.orderId}`);
  };

  return (
    <div className="bg-white pt-5 pb-7">
      <div className="container">
        <div className="row justify-content-center flex-md-row flex-column-reverse">
          <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-light p-4">
              <h4 className="fw-bold">外送資料</h4>
              <div className="mb-2">
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
              <div className="mb-2">
                <Input
                  id="name"
                  type="text"
                  errors={errors}
                  labelText="使用者名稱"
                  register={register}
                  rules={{
                    required: "使用者名稱為必填",
                    maxLength: {
                      value: 10,
                      message: "使用者名稱長度不超過 10",
                    },
                  }}
                ></Input>
              </div>
              <div className="mb-2">
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
              <div className="mb-2">
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
            </div>
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <Link className="text-dark mt-md-0 mt-3" to="/cart">
                <i className="bi bi-chevron-left me-2"></i> 繼續點餐
              </Link>
              <button
                type="submit"
                className="btn btn-dark py-3 px-7 rounded-0"
              >
                送出表單
              </button>
            </div>
          </form>
          <div className="col-md-4">
            <div className="border p-4 mb-4 bg-light">
              <h4 className="mb-4">選購餐點</h4>
              {cartData?.carts?.map((item) => {
                return (
                  <div className="d-flex" key={item.id}>
                    <img
                      src={item.product.imageUrl}
                      alt=""
                      className="me-2"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold">
                        <p className="mb-0">{item.product.title}</p>
                        <p className="mb-0">x{item.qty}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">
                          <small>NT$ {item.product.price}</small>
                        </p>
                        <p className="mb-0">NT$ {item.final_total}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">Total</p>
                <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
