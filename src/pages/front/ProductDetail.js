import { useEffect, useState, useRef } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "../../stylesheets/_swiper.scss";
import { createAsyncMessage } from "../../slice/messageSlice";
import Loading from "../../components/Loading";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { getCart } = useOutletContext();
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct(id);
    getProducts();
  }, [id]);

  const getProduct = async (id) => {
    setIsLoading(true);
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );

    setProduct(productRes.data.product);
    setIsLoading(false);
  };

  const getProducts = async () => {
    setIsLoading(true);
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );

    setProducts(productRes.data.products);
    setIsLoading(false);
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
      dispatch(createAsyncMessage(res.data));
      getCart();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  const prioritizeCategoryMenu = (products) => {
    const sameCategoryProducts = products.filter((i) => {
      return i.category === product.category;
    });

    const diffCategoryProducts = products.filter((i) => {
      return i.category !== product.category;
    });

    return [...sameCategoryProducts, ...diffCategoryProducts];
  };

  // Swiper
  const swiperRef = useRef();

  const SlidePrevButton = ({ swiperRef }) => {
    return (
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => swiperRef.current.slidePrev()}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
    );
  };

  const SlideNextButton = ({ swiperRef }) => {
    return (
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => swiperRef.current.slideNext()}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    );
  };

  return (
    <div className="container pb-5">
      <Loading isLoading={isLoading} />
      {/* <div
        className="mb-5"
        style={{
          minHeight: "200px",
          backgroundImage: `url(${product.imageUrl})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div> */}
      <section className="row justify-content-between gx-5 mt-4 mb-7">
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
        <div className="d-flex flex-column col-md-6">
          <h2 className="mb-0">{product.title}</h2>
          {/* <p className="my-1 text-muted">{product.description}</p> */}
          <p className="my-4 text-muted">{product.description}</p>
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

          <div className="input-group mt-auto border">
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
      </section>
      <section className="py-4">
        <h3 className="mb-3 ps-3 text-dark border-start border-5 border-primary">
          商品介紹
        </h3>
        <p className="json-new-line mb-4 lh-md">{product.content}</p>
      </section>
      <section className="py-4">
        <h3 className="mb-3 ps-3 text-dark border-start border-5 border-primary">
          宅配須知
        </h3>
        <ul className="mb-4 lh-md">
          <li>
            為了確保商品的新鮮及配送安全，
            <span className="text-primary fw-semibold">
              蛋糕類商品全程都會使用低溫冷凍配送，其餘則採常溫配送
            </span>
            。內含新鮮水果及無法冷凍的食材的蛋糕，以及飲品類商品恕不提供宅配。
          </li>
          <li>
            請在訂購單的<span className="text-primary fw-semibold">留言處</span>
            備註希望到貨日。由於甜點為新鮮製作，需要一定的製作時間及配送時間，最早出貨日為下單且確認付款完成的
            <span className="text-primary fw-semibold">三個工作天</span>後。
          </li>
          <li>
            收件人資料（姓名、電話、地址）請務必填寫完整且正確，以避免物流延誤無法到貨。
          </li>
          <li>
            到貨日可能因天候、假日、物流繁盛期等非人為因素影響而延誤。到貨時間請以實際配送情況為主，可接受者再請進行訂購。我方保有修改、暫停、取消訂單之權利。
          </li>
          <li>
            配送過程具有一定的風險（如商品受到碰撞變形等），請評估是否能自行承接受宅配風險，或是改選門市取貨服務。
          </li>
          <li>
            因宅配有容積限制，如商品金額超過
            <span className="text-primary fw-semibold"> NT2,000</span>{" "}
            元，請來電詢問運費。
          </li>
          <li>
            甜點新鮮生產製作，新鮮食用最美味，收件後請盡早享用。若選擇門市取貨服務，請務必於指定日至指定門市完成取貨。
          </li>
          <li>
            食品<span className="text-primary fw-semibold">不適用</span>網購 7
            天鑑賞期的服務。
          </li>
        </ul>
      </section>
      <section className="py-4">
        <div className="mb-4">
          <h3 className="mb-3 ps-3 text-dark border-start border-5 border-primary">
            其他商品
          </h3>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <SlidePrevButton swiperRef={swiperRef} />
          <div className="w-100">
            <Swiper
              className="mx-4 mt-2"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                992: {
                  slidesPerView: 5,
                },
                768: {
                  slidesPerView: 4,
                },
                350: {
                  slidesPerView: 2,
                },
              }}
            >
              {prioritizeCategoryMenu(products)
                .filter((i) => {
                  return i.id !== product.id;
                })
                .filter((i, index) => {
                  return index < 10;
                })
                .map((product) => {
                  return (
                    <SwiperSlide key={product.id}>
                      <div className="card mb-4 mb-sm-0 border-0">
                        <img
                          src={product.imageUrl}
                          className="card-img-top rounded-0 object-cover"
                          height={225}
                          alt={product.title}
                        />
                        <div className="card-body p-0">
                          <h6 className="mb-0 mt-2">
                            <Link
                              className="stretched-link text-decoration-none"
                              to={`/product/${product.id}`}
                            >
                              {product.title}
                            </Link>
                          </h6>
                          {product.price === product.origin_price ? (
                            <p className="text-muted mt-1 mb-0">
                              NT$ {product.price}
                            </p>
                          ) : (
                            <div className="d-flex">
                              <p className="text-danger mt-1 mb-0">
                                NT$ {product.price}
                              </p>
                              <p className="text-decoration-line-through text-muted mt-1 ms-2 mb-0">
                                NT$ {product.origin_price}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              {}
              <SwiperSlide>
                <div className="card mb-4 bg-light border-0 rounded-0">
                  <Link
                    className="stretched-link text-decoration-none"
                    to={`/products`}
                  >
                    <div
                      className="d-flex justify-content-center align-items-center text-center text-primary rounded-0 "
                      style={{ height: "225px" }}
                    >
                      <h6 className="mb-0">查看更多商品</h6>
                      <i className="d-block bi bi-arrow-right ms-2" />
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <SlideNextButton swiperRef={swiperRef} />
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
