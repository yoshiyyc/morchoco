import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../../utilities/utils";
import Loading from "../../components/Loading";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { getCart } = useOutletContext();
  const [orderData, setOrderData] = useState({});
  const [originalTotal, setOriginalTotal] = useState(0);
  const [isCouponUsed, setIsCouponUsed] = useState(false);
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
    setIsLoading(true);

    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
    );
    console.log(res);
    setOrderData(res.data.order);

    const productList = Object.values(res.data.order.products);

    // Calculate the original total
    const tempOriginalTotal = productList.reduce((a, c) => {
      return a + c.total;
    }, 0);
    setOriginalTotal(tempOriginalTotal);

    // Check if the order has used coupon
    const tempIsCouponUsed = productList.some((i) => {
      return i.hasOwnProperty("coupon");
    });
    setIsCouponUsed(tempIsCouponUsed);

    setIsLoading(false);
  };

  return (
    <>
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
              訂單完成
            </li>
          </ol>
        </nav>
      </section>
      <div className="container">
        <div className="row g-0">
          <div className="col-md-7 px-5 pt-5 pt-md-4 pb-5">
            <h2 className="h4 mb-4 text-dark">訂單完成</h2>
            <p className="text-muted">
              感謝您的購買！我們非常感謝您選擇了 Morchoco
              的甜點，並且相信我們的品質和口味。您的訂單已成功完成，我們將盡快為您準備美味的甜點。
            </p>
            <p className="text-muted">
              如果您有任何問題或特殊需求，請隨時與我們聯繫。我們期待能再次為您提供最美味的甜點體驗！
            </p>
            <Link
              className="col col-sm-4 col-md-3 btn btn-outline-dark mt-4 py-3 rounded-0"
              to="/"
            >
              返回首頁
            </Link>
          </div>
          <div className="col-md-5 px-5 pt-5 pt-md-4 pb-5 bg-light">
            <h3 className="h5 my-4 fw-bold text-dark">訂單明細</h3>
            <div className="mb-5">
              {Object.values(orderData?.products || {}).map((item) => {
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
            <div className="mt-5">
              <div className="d-flex justify-content-between mb-1 text-dark">
                <p className="mb-0">金額總計</p>
                <p className="mb-0">NT$ {formatCurrency(originalTotal)}</p>
              </div>
              {isCouponUsed && (
                <div className="d-flex justify-content-between mb-1 text-dark">
                  <p className="mb-0">優惠券折抵</p>
                  <p className="mb-0 text-danger">
                    - NT$ {formatCurrency(originalTotal - orderData.total)}
                  </p>
                </div>
              )}
              <div className="d-flex justify-content-between mt-2 h5 fw-bold text-dark">
                <p className="mb-0">實付總額</p>
                <p className="mb-0">NT$ {formatCurrency(orderData.total)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
