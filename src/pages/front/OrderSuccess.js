import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function OrderSuccess() {
  const { orderId } = useParams();
  const { getCart } = useOutletContext();
  const [orderData, setOrderData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Update cart number when entering the page
  useEffect(() => {
    setIsLoading(true);
    getCart();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);

  const getOrder = async (orderId) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
    );
    console.log(res);
    setOrderData(res.data.order);
    console.log("OD", orderData);
  };

  // Utility
  const formatCurrency = (value) => {
    // If the number exists
    // If there is decimal, take the higher integer
    // Format it so price has a comma for every 3 digits
    return value && Math.ceil(value).toLocaleString();
  };

  return (
    <div className="container">
      <Loading isLoading={isLoading} />
      <div
        style={{
          minHeight: "300px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1536614984430-64652c3ad956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          backgroundPosition: "center center",
        }}
      ></div>
      <div className="mt-5 mb-7">
        <div className="row">
          <div className="col-md-7 px-5 pt-4 pb-5">
            <h2 className="h4 mb-4 text-dark">訂單完成</h2>
            <p className="text-muted">
              感謝您的購買！我們非常感謝您選擇了 Morchoco
              的甜點，並且相信我們的品質和口味。您的訂單已成功完成，我們將盡快為您準備美味的甜點。
            </p>
            <p className="text-muted">
              如果您有任何問題或特殊需求，請隨時與我們聯繫。我們期待能再次為您提供最美味的甜點體驗！
            </p>
            <Link
              className="col col-sm-4 col-md-3 btn btn-outline-dark my-4 py-3 rounded-0"
              to="/"
            >
              返回首頁
            </Link>
          </div>
          <div className="col-md-5 px-5 pt-4 pb-4 pb-md-5 bg-light">
            {/* <div className="card rounded-0 py-4">
              <div className="card-header border-bottom-0 bg-white px-4 py-0">
                <h2 className="h4">訂單明細</h2>
              </div>
              <div className="card-body px-4 py-0">
                <ul className="list-group list-group-flush">
                  {Object.values(orderData?.products || {}).map((item) => {
                    return (
                      <li className="list-group-item px-0" key={item.id}>
                        <div className="d-flex mt-2">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="me-2"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="w-100 d-flex flex-column">
                            <div className="d-flex justify-content-between fw-bold">
                              <h5>{item.product.title}</h5>
                              <p className="mb-0">x{item.qty}</p>
                            </div>
                            <div className="d-flex justify-content-between mt-auto">
                              <p className="text-muted mb-0">
                                <small>NT${item.product.price}</small>
                              </p>
                              <p className="mb-0">NT${item.total}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  <li className="list-group-item px-0 pb-0">
                    <div className="d-flex justify-content-between mt-2">
                      <p className="mb-0 h4 fw-bold">支付金額</p>
                      <p className="mb-0 h4 fw-bold">
                        NT$ {formatCurrency(orderData.total)}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}
            <div>
              <h3 className="h5 mb-4 fw-bold text-dark">訂單明細</h3>
              <div className="mb-5">
                {Object.values(orderData?.products || {}).map((item) => {
                  return (
                    <div
                      className="d-flex align-items-center mb-3"
                      key={item.id}
                    >
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
                      </div>
                      <div className="d-flex flex-column justify-content-center flex-grow-1">
                        <div className="d-flex justify-content-between fw-bold">
                          <p className="mb-0">
                            <small>{item.product.title}</small>
                          </p>

                          <p className="mb-0">
                            <small>NT$ {formatCurrency(item.total)}</small>
                          </p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-0 text-muted">
                            <small>
                              NT$ {formatCurrency(item.product.price)}
                            </small>
                          </p>
                          <p className="mb-0">x {item.qty}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 mb-4">
                <div className="d-flex justify-content-between h5 fw-bold text-dark">
                  <p className="mb-0">實付總額</p>
                  <p className="mb-0">NT$ {orderData.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
