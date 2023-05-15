import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import flour from "../../img/flour.png";
import baker from "../../img/baker.png";
import delicious from "../../img/spaghetti.png";
import takeaway from "../../img/take-away.png";

function Home() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async (page = 1) => {
    setIsLoading(true);
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    console.log(productRes);
    setProducts(productRes.data.products);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <section className="d-block container">
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
      <section className="container py-4">
        <h4 className="my-5 text-center text-dark">活動專區</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 mt-5">
          {products
            .filter((product, index) => {
              return product.origin_price !== product.price && index < 5;
            })
            .map((product) => {
              return (
                <div className="col" key={product.id}>
                  <div className="card border-0 mb-4">
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
                        <p className="text-muted mt-1">NT$ {product.price}</p>
                      ) : (
                        <div className="d-flex">
                          <p className="text-danger mt-1">
                            NT$ {product.price}
                          </p>
                          <p className="text-decoration-line-through text-muted mt-1 ms-2">
                            NT$ {product.origin_price}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <section className="container py-4">
        <h4 className="my-5 text-center text-dark">人氣甜點</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5 mt-5">
          {products.map((product) => {
            return (
              <div className="col" key={product.id}>
                <div className="card border-0 mb-4">
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
                      <p className="text-muted mt-1">NT$ {product.price}</p>
                    ) : (
                      <div className="d-flex">
                        <p className="text-danger mt-1">NT$ {product.price}</p>
                        <p className="text-decoration-line-through text-muted mt-1 ms-2">
                          NT$ {product.origin_price}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="container py-4">
        <h4 className="my-5 text-center text-dark">更多品項</h4>
        <div className="row">
          <div className="col-4 d-flex flex-column">
            <div className="row flex-column flex-fill">
              <div
                className="col d-flex p-0"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1610611424854-5e07032143d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80)",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <p
                  className="mx-auto my-auto w-50 py-5 fw-bold h5 text-center text-primary bg-light rounded bg-opacity-50"
                  style={{ boxShadow: "0px 0px 10px white" }}
                >
                  手工小點
                </p>
              </div>
              <div
                className="col d-flex p-0"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1481391032119-d89fee407e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80)",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <p
                  className="mx-auto my-auto w-50 py-5 fw-bold h5 text-center text-primary bg-light rounded bg-opacity-50"
                  style={{ boxShadow: "0px 0px 10px white" }}
                >
                  飲品
                </p>
              </div>
            </div>
          </div>
          <div
            className="col-4 d-flex"
            style={{
              height: 300,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <p
              className="mx-auto my-auto w-50 py-5 fw-bold h5 text-center text-primary bg-light rounded bg-opacity-50"
              style={{ boxShadow: "0px 0px 10px white" }}
            >
              六吋蛋糕
            </p>
          </div>
          <div className="col-4 d-flex flex-column">
            <div className="row flex-column flex-fill">
              <div
                className="col d-flex p-0"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1624001934657-640af7e2c599?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <p
                  className="mx-auto my-auto w-50 py-5 fw-bold h5 text-center text-primary bg-light rounded bg-opacity-50"
                  style={{ boxShadow: "0px 0px 10px white" }}
                >
                  小蛋糕
                </p>
              </div>
              <div
                className="col d-flex p-0"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1553452118-621e1f860f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <p
                  className="mx-auto my-auto w-50 py-5 fw-bold h5 text-center text-primary bg-light rounded bg-opacity-50"
                  style={{ boxShadow: "0px 0px 10px white" }}
                >
                  純巧克力
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5 bg-light">
        <div className="container py-4">
          <h4 className="my-4 text-center text-dark">選擇 Morchoco</h4>
          <ul className="row my-4 list-unstyled text-secondary">
            <li className="col-md-3">
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
            <li className="col-md-3">
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
            <li className="col-md-3">
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
            <li className="col-md-3">
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
}

export default Home;
