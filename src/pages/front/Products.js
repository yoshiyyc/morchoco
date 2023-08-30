import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

function Products() {
  const { category } = useParams();

  const [allProducts, setAllProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(
    category ? category : "所有甜點"
  );
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "所有甜點",
    "六吋蛋糕",
    "小蛋糕",
    "手工小點",
    "純巧克力",
    "飲品",
  ];

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setCurrentCategory(category ? category : "所有甜點");
  }, [category]);

  const getProducts = async (page = 1) => {
    setIsLoading(true);
    const productData = await axios
      .get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    setAllProducts(productData.products);

    setPagination(productData.pagination);
    setIsLoading(false);
  };

  const filterProducts = (allProducts) => {
    return allProducts.filter(
      (product) =>
        currentCategory === "所有甜點" || product.category === currentCategory
    );
  };

  const handleChangeCategory = (e) => {
    setCurrentCategory(e.target.innerHTML);
  };

  return (
    <>
      <section className="container mt-md-5 mt-3 mb-7">
        <Loading isLoading={isLoading} />
        <div className="row flex-column flex-md-row align-items-center align-items-md-start gx-5">
          <div className="col-9 col-md-3 mb-5 mb-md-0">
            <ul className="list-group">
              {categories.map((category) => {
                return (
                  <button
                    key={category}
                    className={`list-group-item list-group-item-action ${
                      currentCategory === category && "active"
                    }`}
                    aria-current={currentCategory === category ? true : false}
                    onClick={(e) => handleChangeCategory(e)}
                  >
                    {category}
                  </button>
                );
              })}
            </ul>
          </div>
          <div className="col-12 col-md-9">
            <h3 className="mb-4 text-center text-sm-start">
              {currentCategory}
            </h3>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center justify-content-sm-start gx-5 gy-3 mb-5">
              {filterProducts(allProducts).length ? (
                filterProducts(allProducts).map((product) => {
                  return (
                    <div className="col-7 " key={product.id}>
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
                            <p className="text-muted mt-1">
                              NT$ {product.price}
                            </p>
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
                })
              ) : (
                <div className="w-100 text-center">目前暫無販售商品</div>
              )}
            </div>
            <nav className="d-flex justify-content-center">
              <Pagination pagination={pagination} changePage={getProducts} />
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
