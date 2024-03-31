import { useEffect, useState, useRef } from "react";
import { useOutletContext, useParams, Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { createAsyncMessage } from "../../slice/messageSlice";
import Loading from "../../components/Loading";
import DeliveryMustKnows from "../../components/DeliveryMustKnows";
import ProductCard from "../../components/ProductCard";
import { formatCurrency } from "../../utilities/utils";

const ProductDetail = () => {
  /*------------------------------------*\
  | Hooks
  \*------------------------------------*/
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { getCart } = useOutletContext();
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct(id);
    getProducts();
  }, [id]);

  /*------------------------------------*\
  | Functions
  \*------------------------------------*/
  // Get single product detail
  const getProduct = async (id) => {
    setIsLoading(true);

    try {
      const productRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
      );

      setProduct(productRes.data.product);

      // Set number of preview images
      const tempProductImages = productRes.data.product.imagesUrl.filter(
        (i) => i
      );
      setProductImages(tempProductImages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get all products info (for the recommendation Swiper)
  const getProducts = async () => {
    setIsLoading(true);

    try {
      const productRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );

      setProducts(productRes.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async () => {
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  // For the recommendation Swiper below, recommend thw products in the same category as the current product
  const prioritizeCategoryMenu = (products) => {
    const sameCategoryProducts = products.filter((i) => {
      return i.category === product.category;
    });

    const diffCategoryProducts = products.filter((i) => {
      return i.category !== product.category;
    });

    return [...sameCategoryProducts, ...diffCategoryProducts];
  };

  /*------------------------------------*\
  | Swiper
  \*------------------------------------*/
  // Product preview
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Product list
  const swiperRef = useRef();

  // Prev btn
  const SlidePrevButton = ({ swiperRef }) => {
    return (
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => swiperRef.current.slidePrev()}
      >
        <i className="bi bi-chevron-left" />
      </button>
    );
  };

  // Next btn
  const SlideNextButton = ({ swiperRef }) => {
    return (
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => swiperRef.current.slideNext()}
      >
        <i className="bi bi-chevron-right" />
      </button>
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
                <i className="bi bi-house-fill"></i>
              </NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink
                className="text-decoration-none link-dark"
                to="/products"
              >
                所有甜點
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>
      </section>
      <div className="container pt-2 pb-5">
        <section className="row justify-content-between gx-5 mx-0 mt-4 mb-7">
          <div className="product-preview col-md-6 mb-4 mb-md-0">
            {productImages && productImages.length && (
              <>
                <Swiper
                  className={`mySwiper2 ${
                    productImages.length <= 1 && "h-100"
                  }`}
                  spaceBetween={10}
                  navigation={true}
                  loop={true}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                >
                  {productImages.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img src={image} alt={`圖片${index}`} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                {productImages.length > 1 && (
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    loop={true}
                    slidesPerView={productImages.length}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {productImages.map((image, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <img src={image} alt={`圖片${index}`} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              </>
            )}
          </div>
          <div className="d-flex flex-column col-md-6">
            <h2 className="mb-0">{product.title}</h2>
            <p className="json-new-line my-4 lh-md text-muted">
              {product.description}
            </p>
            <div className="d-flex justify-content-between align-items-center mt-4 mb-4 mb-md-0">
              <div className="mb-0 h4">
                {product.price === product.origin_price ? (
                  <p className="mb-0 text-muted mb-0">
                    NT$ {formatCurrency(product.price)}
                  </p>
                ) : (
                  <div className="d-flex">
                    <p className="mb-0 text-danger mb-0">
                      NT$ {formatCurrency(product.price)}
                    </p>
                    <p className="mb-0 text-decoration-line-through text-muted ms-2">
                      NT$ {formatCurrency(product.origin_price)}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-muted mb-0">/ {product.unit}</p>
            </div>
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
              className="btn btn-dark w-100 rounded-0 mt-3 py-3"
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
            <DeliveryMustKnows />
          </ul>
        </section>
        <section className="py-4">
          <div className="mb-4">
            <h3 className="mb-3 ps-3 text-dark border-start border-5 border-primary">
              其他商品
            </h3>
          </div>
          <div className="d-flex jusctify-content-betweeen align-items-center">
            <SlidePrevButton swiperRef={swiperRef} />
            <Swiper
              className="mx-4"
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
                400: {
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
                      <ProductCard className="mb-4 mb-sm-0" product={product} />
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
            <SlideNextButton swiperRef={swiperRef} />
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDetail;
