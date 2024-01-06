import { useState } from "react";
import { Link, useOutletContext, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createAsyncMessage } from "../../slice/messageSlice";
import { formatCurrency } from "../../utilities/utils";
import Loading from "../../components/Loading";

const Cart = () => {
  /*------------------------------------*\
  | Hooks
  \*------------------------------------*/
  const { cartData, getCart } = useOutletContext();
  const [loadingItems, setLoadingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  /*------------------------------------*\
  | Functions
  \*------------------------------------*/
  const updateCartItem = async (item, quantity) => {
    setIsLoading(true);

    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };

    setLoadingItems([...loadingItems, item.id]);

    try {
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      getCart();
      dispatch(createAsyncMessage(res.data));
    } catch (error) {
      console.log(error);
      dispatch(createAsyncMessage(error.response.data));
    } finally {
      setLoadingItems(
        loadingItems.filter((loadingObject) => loadingObject !== item.id)
      );
      setIsLoading(false);
    }
  };

  const removeCartItem = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  /*------------------------------------*\
  | Components
  \*------------------------------------*/
  const CartContent = ({ cartData }) => {
    return cartData?.carts?.map((item) => {
      return (
        <tr key={item.product.id}>
          <td className="col-5">
            <Link
              className="d-block text-decoration-none text-black"
              to={`/product/${item.product.id}`}
            >
              <img
                className="cart__thumbnail me-2"
                src={item.product.imageUrl}
                alt={item.product.title}
              />
              {item.product.title}
            </Link>
          </td>
          <td className="col-2 text-center">
            NT${formatCurrency(item.product.price)}
          </td>
          <td className="col-2 text-center">
            <div className="input-group align-items-center mx-auto w-75">
              <select
                id="quantity"
                name="quantity"
                className="form-select"
                value={item.qty}
                onChange={(e) => {
                  updateCartItem(item, e.target.value * 1);
                }}
                disabled={loadingItems.includes(item.id)}
              >
                {[...new Array(20)].map((i, num) => {
                  return (
                    <option value={num + 1} key={num}>
                      {num + 1}
                    </option>
                  );
                })}
              </select>
            </div>
          </td>
          <td className="col-2 text-center">NT${formatCurrency(item.total)}</td>
          <td className="col-1 text-center">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger rounded-circle"
              onClick={() => removeCartItem(item.id)}
            >
              <i className="bi bi-x-lg" />
            </button>
          </td>
        </tr>
      );
    });
  };

  const EmptyCartContent = () => {
    return (
      <tr>
        <td colSpan={5} className="py-4 text-center">
          購物車內還沒有商品喔
        </td>
      </tr>
    );
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
            <li className="breadcrumb-item active" aria-current="page">
              購物車
            </li>
          </ol>
        </nav>
      </section>
      <div className="container pt-4 pb-5">
        <div className="col-9 mx-auto">
          <h2 className="h3 mt-4 mb-5 text-center text-dark">購物車內容</h2>
          <div className="table-responsive">
            <table className="col-9 table table-borderless align-middle">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="col-5">
                    商品
                  </th>
                  <th scope="col" className="col-2 text-center">
                    單價
                  </th>
                  <th scope="col" className="col-2 text-center">
                    數量
                  </th>
                  <th scope="col" className="col-2 text-center">
                    小計
                  </th>
                  <th scope="col" className="col-1 text-center"></th>
                </tr>
              </thead>
              <tbody className="border-top border-bottom">
                {cartData?.carts?.length ? (
                  <CartContent cartData={cartData} />
                ) : (
                  <EmptyCartContent />
                )}
              </tbody>
              <tfoot className="bg-light">
                <tr>
                  <td colSpan={3} className="text-end fw-bold">
                    總金額
                  </td>
                  <td colSpan={1} className="text-center fw-bold">
                    NT$
                    {formatCurrency(cartData.total)}
                  </td>
                  <td colSpan={1}></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="d-flex flex-column flex-sm-row my-5">
            <Link
              className="col col-sm-4 col-md-3 col-lg-2 btn btn-outline-secondary my-3 my-sm-0 py-3 rounded-0"
              to="/products"
            >
              返回商品頁面
            </Link>
            <button
              className="col col-sm-4 col-md-4 col-lg-3 btn btn-dark ms-sm-auto p-0 border-0 rounded-0"
              disabled={
                (cartData && cartData.carts && !cartData.carts.length) ||
                isLoading
              }
            >
              <Link
                className="d-block m-0 py-3 text-decoration-none link-light"
                to="/checkout"
              >
                立即結帳
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
