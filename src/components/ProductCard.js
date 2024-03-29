import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createAsyncMessage } from "../slice/messageSlice";
import { formatCurrency } from "../utilities/utils";

const ProductCard = ({ product }) => {
  /*------------------------------------*\
  | Hooks
  \*------------------------------------*/
  const { getCart } = useOutletContext();
  const [cartQuantity, setCartQuantity] = useState(1);

  const dispatch = useDispatch();

  /*------------------------------------*\
  | Functions
  \*------------------------------------*/
  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: cartQuantity,
      },
    };

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      dispatch(createAsyncMessage(res.data));
      getCart();
    } catch (error) {
      console.log(error);
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  return (
    <div className="product-card card border-0 rounded-0">
      <div className="card-body position-relative p-0">
        <img
          src={product.imageUrl}
          className="product-card__img card-img-top rounded-0"
          alt={product.title}
        />
        <h6 className="mb-0 mt-2 text-center">
          <Link
            className="stretched-link text-decoration-none"
            to={`/product/${product.id}`}
          >
            {product.title}
          </Link>
        </h6>
        {product.price === product.origin_price ? (
          <div className="d-flex justify-content-center">
            <p className="text-muted mt-1 mb-0">
              NT$ {formatCurrency(product.price)}
            </p>
          </div>
        ) : (
          <div className="d-flex justify-content-center flex-wrap">
            <p className="text-danger mt-1 mb-0 mx-1">
              NT$ {formatCurrency(product.price)}
            </p>
            <p className="text-decoration-line-through text-muted mt-1 mb-0 mx-1">
              NT$ {formatCurrency(product.origin_price)}
            </p>
          </div>
        )}
      </div>
      <div className="card-footer mt-3 p-0 bg-transparent border-0">
        <button
          className={`d-block btn btn-primary mx-auto px-3`}
          onClick={() => addToCart()}
          // disabled={isLoading}
        >
          加入購物車
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
