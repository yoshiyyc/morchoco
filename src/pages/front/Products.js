import { useEffect, useState } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const { category } = useParams();

  const [productList, setProductList] = useState([]);
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

  useEffect(() => {
    getProducts();
  }, [currentCategory]);

  const getProducts = async (page = 1) => {
    setIsLoading(true);

    const productData = await axios
      .get(
        `/v2/api/${
          process.env.REACT_APP_API_PATH
        }/products?page=${page}&category=${
          currentCategory === "所有甜點" ? "" : currentCategory
        }`
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    setProductList(productData.products);
    setPagination(productData.pagination);
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
            <li className="breadcrumb-item active" aria-current="page">
              所有甜點
            </li>
          </ol>
        </nav>
      </section>
      <section className="container pt-3 pt-md-4 pb-5">
        <div className="row flex-column flex-md-row align-items-center align-items-md-start gx-5 my-4">
          <div className="col-9 col-md-3 mb-5 mb-md-0">
            <ul className="list-group">
              {categories.map((category) => {
                return (
                  <NavLink
                    key={category}
                    className={`list-group-item list-group-item-action ${
                      currentCategory === category && "active"
                    }`}
                    aria-current={currentCategory === category ? true : false}
                    to={`/products/${category}`}
                  >
                    {category}
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <div className="col-12 col-md-9">
            <h2 className="h3 mb-4 text-center text-sm-start text-dark">
              {currentCategory}
            </h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center justify-content-sm-start gx-5 gy-3 mb-5">
              {productList.length ? (
                productList.map((product) => {
                  return (
                    <div className="col-7 " key={product.id}>
                      <ProductCard className="mb-4" product={product} />
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
};

export default Products;
