import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import Loading from "../../components/Loading";
import flour from "../../img/flour.png";
import baker from "../../img/baker.png";
import delicious from "../../img/spaghetti.png";
import takeaway from "../../img/take-away.png";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async (page = 1) => {
    setIsLoading(true);
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );

    setProducts(productRes.data.products);
    setIsLoading(false);
  };

  // Swiper
  const swiperEventRef = useRef();
  const swiperPopularRef = useRef();

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
    <>
      <section className="d-block container mb-5">
        <Loading isLoading={isLoading} />
        <div
          className="d-flex align-items-center px-4"
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1536614984430-64652c3ad956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h2 className="display-6 text-white">
            Morchoco
            <br />
            <span>巧克力愛好者的天堂</span>
          </h2>
        </div>
      </section>
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <SlidePrevButton swiperRef={swiperEventRef} />
          <h4 className="text-center text-dark">活動專區</h4>
          <SlideNextButton swiperRef={swiperEventRef} />
        </div>
        <div>
          <Swiper
            onSwiper={(swiper) => {
              swiperEventRef.current = swiper;
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
            {products
              .filter((product) => {
                return product.origin_price !== product.price;
              })
              .map((product) => {
                return (
                  <SwiperSlide key={product.id}>
                    <ProductCard className="mb-4 mb-sm-0" product={product} />
                  </SwiperSlide>
                );
              })}
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
      </section>
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <SlidePrevButton swiperRef={swiperPopularRef} />
          <h4 className="text-center text-dark">人氣甜點</h4>
          <SlideNextButton swiperRef={swiperPopularRef} />
        </div>
        <div>
          <Swiper
            onSwiper={(swiper) => {
              swiperPopularRef.current = swiper;
            }}
            modules={[Navigation, Grid]}
            slidesPerView={1}
            grid={{
              rows: 2,
              fill: "row",
            }}
            spaceBetween={24}
            breakpoints={{
              992: {
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
              768: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              350: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
            }}
          >
            {products.map((product) => {
              return (
                <SwiperSlide key={product.id}>
                  <ProductCard className="mb-4 mb-sm-0" product={product} />
                </SwiperSlide>
              );
            })}
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
      </section>
      <section className="container py-5">
        <h4 className="mb-4 text-center text-dark">更多品項</h4>
        <div className="row g-4">
          <div className="col-4 d-flex flex-column">
            <div className="row g-3 flex-column flex-fill">
              <Link
                className="col p-0 text-decoration-none"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1610611424854-5e07032143d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80)",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                to={`/products/手工小點`}
              >
                <p className="d-flex w-100 h-100 text-light">
                  <span className="d-block mb-auto px-4 py-3 bg-dark">
                    手工小點
                  </span>
                </p>
              </Link>
              <Link
                className="col p-0 text-decoration-none"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1481391032119-d89fee407e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80)",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                to={`/products/飲品`}
              >
                <p className="d-flex w-100 text-light">
                  <span className="d-block mb-auto px-4 py-3 bg-dark">
                    飲品
                  </span>
                </p>
              </Link>
            </div>
          </div>
          <div className="col">
            <Link
              className="d-block p-0 text-decoration-none"
              style={{
                height: 300,
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              to={`/products/六吋蛋糕`}
            >
              <p className="d-flex w-100 text-light">
                <span className="d-block mb-auto px-4 py-3 bg-dark">
                  六吋蛋糕
                </span>
              </p>
            </Link>
          </div>
          <div className="col-4 d-flex flex-column">
            <div className="row g-3 flex-column flex-fill">
              <Link
                className="col p-0 text-decoration-none"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1624001934657-640af7e2c599?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                to={`/products/小蛋糕`}
              >
                <p className="d-flex w-100 text-light">
                  <span className="d-block mb-auto px-4 py-3 bg-dark">
                    小蛋糕
                  </span>
                </p>
              </Link>
              <Link
                className="col p-0 text-decoration-none"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1553452118-621e1f860f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                to={`/products/純巧克力`}
              >
                <p className="d-flex w-100 text-light">
                  <span className="d-block mb-auto px-4 py-3 bg-dark">
                    純巧克力
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5 bg-light">
        <div className="container py-4">
          <h4 className="my-4 text-center text-dark">選擇 Morchoco</h4>
          <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-4 my-4 list-unstyled text-secondary">
            <li className="col">
              <div className="card d-flex my-4 bg-transparent border-0">
                <img
                  src={flour}
                  alt="嚴選食材"
                  className="card-img mx-auto"
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                  }}
                />
                <h6 className="card-title text-center mt-4">嚴選食材</h6>
              </div>
            </li>
            <li className="col">
              <div className="card d-flex my-4 bg-transparent border-0">
                <img
                  src={baker}
                  alt="職人手作"
                  className="card-img mx-auto"
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                  }}
                />
                <h6 className="card-title text-center mt-4">職人手作</h6>
              </div>
            </li>
            <li className="col">
              <div className="card d-flex my-4 bg-transparent border-0">
                <img
                  src={delicious}
                  alt="精緻美味"
                  className="card-img mx-auto"
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                  }}
                />
                <h6 className="card-title text-center mt-4">精緻美味</h6>
              </div>
            </li>
            <li className="col">
              <div className="card d-flex my-4 bg-transparent border-0">
                <img
                  src={takeaway}
                  alt="宅配熱銷"
                  className="card-img mx-auto"
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                  }}
                />
                <h6 className="card-title text-center mt-4">宅配熱銷</h6>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Home;
