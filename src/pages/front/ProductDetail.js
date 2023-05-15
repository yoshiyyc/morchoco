import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { getCart } = useOutletContext();

  const getProduct = async (id) => {
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );
    console.log(productRes);
    setProduct(productRes.data.product);
  };

  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: cartQuantity,
      },
    };

    setIsLoading(true);

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      console.log(res);
      getCart();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <div className="container">
      <div
        className="mb-5"
        style={{
          minHeight: "400px",
          backgroundImage: `url(${product.imageUrl})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="row justify-content-between mt-4 mb-7">
        <div className="col-md-6">
          <div className="d-flex bg-light">
            <img
              className="img-fluid mx-auto"
              style={{ maxHeight: "400px" }}
              src={product.imageUrl}
              alt={product.title}
            />
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="mb-0">{product.title}</h2>
          <p className="my-1 text-muted">{product.description}</p>
          <p className="my-4">{product.content}</p>
          {product.price === product.origin_price ? (
            <p className="text-muted mt-4 fw-bold">NT$ {product.price}</p>
          ) : (
            <div className="d-flex">
              <p className="text-danger mt-4 h4">NT$ {product.price}</p>
              <p className="text-decoration-line-through text-muted mt-4 ms-2 h4">
                NT$ {product.origin_price}
              </p>
            </div>
          )}

          <div className="input-group mt-3 border">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon1"
                onClick={() =>
                  setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                }
              >
                <i className="bi bi-dash"></i>
              </button>
            </div>
            <input
              type="number"
              className="form-control border-0 text-center my-auto shadow-none"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              readOnly
              value={cartQuantity}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon2"
                onClick={() => setCartQuantity((pre) => pre + 1)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark w-100 rounded-0 my-3 py-3"
            onClick={() => addToCart()}
            disabled={isLoading}
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
