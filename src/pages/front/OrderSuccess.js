import { useEffect, useState } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../../utilities/utils";
import Loading from "../../components/Loading";

const OrderSuccess = () => {
  /*------------------------------------*\
  | Hooks
  \*------------------------------------*/
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});
  const [originalTotal, setOriginalTotal] = useState(0);
  const [isCouponUsed, setIsCouponUsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get the order detail based on the orderId obtained from param
  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);

  /*------------------------------------*\
  | Functions
  \*------------------------------------*/
  const getOrder = async (orderId) => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      );

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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <section className="container">
        <nav aria-label="breadcrumb p-0">
          <ol className="breadcrumb m-0 py-2 lh-md border-bottom">
            <li className="breadcrumb-item">
              <NavLink className="text-decoration-none link-dark" to="/">
                <i className="bi bi-house-fill" />
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
          <div className="col col-lg-7 px-5 pt-5 pt-md-4 pb-5">
            <h2 className="h4 mb-4 text-dark">訂單完成</h2>
            <p className="text-muted">
              感謝您的購買！我們非常感謝您選擇了 Morchoco
              的甜點，並且相信我們的品質和口味。您的訂單已成功完成，我們將盡快為您準備美味的甜點。
            </p>
            <p className="text-muted">
              如果您有任何問題或特殊需求，請隨時與我們聯繫。我們期待能再次為您提供最美味的甜點體驗！
            </p>
            <div className="row">
              <Link
                className="col col-sm-4 col-md-5 col-lg-4 btn btn-outline-dark mt-4 py-3 rounded-0"
                to="/"
              >
                返回首頁
              </Link>
            </div>
          </div>
          <div className="col-lg-5 px-5 pt-5 pt-md-4 pb-5 bg-light">
            <div className="my-4">
              <h3 className="h5 fw-bold text-dark">訂單明細</h3>
              <small className="text-muted">訂單編號：{orderData.id}</small>
            </div>
            <div className="table-responsive mb-5 py-1 border border-dark">
              <table className="table table-borderless align-middle text-nowrap">
                <tbody>
                  {Object.values(orderData?.products || {}).map((item) => {
                    return (
                      <tr key={item.product.id}>
                        <td className="col-1">
                          <div className="border">
                            <img
                              className="order-success-cart__thumbnail"
                              src={item.product.imageUrl}
                              alt={item.product.title}
                            />
                          </div>
                        </td>
                        <td className="">
                          <div className="d-flex flex-column justify-content-between">
                            <p className="mb-0 fw-bold">
                              <small>{item.product.title}</small>
                            </p>
                            <p className="mb-0 text-muted">
                              <small>
                                NT$ {formatCurrency(item.product.price)}
                              </small>
                            </p>
                          </div>
                        </td>
                        <td className="text-nowrap text-end">
                          <div className="d-flex flex-column justify-content-between">
                            <p className="mb-0 fw-bold">
                              <small>NT$ {formatCurrency(item.total)}</small>
                            </p>
                            <p className="mb-0 text-muted">x {item.qty}</p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="table-responsive mt-5 p-2 border border-dark">
              <table className="w-100 text-nowrap">
                <tbody>
                  <tr className="text-dark">
                    <td className="py-1">金額總計</td>
                    <td className="ps-3 py-1 text-end">
                      NT$ {formatCurrency(originalTotal)}
                    </td>
                  </tr>
                  {isCouponUsed && (
                    <tr className="text-dark">
                      <td className="py-1">優惠券折抵</td>
                      <td className="ps-3 py-1 text-end text-danger">
                        - NT$ {formatCurrency(originalTotal - orderData.total)}
                      </td>
                    </tr>
                  )}
                  <tr className="h5 fw-bold text-dark">
                    <td className="py-1">實付總額</td>
                    <td className="ps-3 py-1 text-end">
                      NT$ {formatCurrency(orderData.total)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
