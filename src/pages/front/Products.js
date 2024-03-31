import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  /*------------------------------------*\
  | Default Values
  \*------------------------------------*/
  const categories = [
    "所有甜點",
    "六吋蛋糕",
    "小蛋糕",
    "手工小點",
    "冰品",
    "純巧克力",
  ];

  /*------------------------------------*\
  | Hooks
  \*------------------------------------*/
  const { category } = useParams();
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(
    category || "所有甜點"
  );
  const [pagination, setPagination] = useState({});
  const [productTotal, setProductTotal] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
    countProductTotal();
  }, []);

  useEffect(() => {
    // Set the category got from param to currentCategory
    // In the case that there is nothing for param, the default current category will be "所有甜點"
    setCurrentCategory(category ? category : "所有甜點");
  }, [category]);

  useEffect(() => {
    getProducts();
  }, [currentCategory]);

  /*------------------------------------*\
  | Functions
  \*------------------------------------*/
  // Count the number of products
  const countProductTotal = async () => {
    setIsLoading(true);

    try {
      const productsRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );

      const allProducts = productsRes.data;

      // Calcutate product total by categories
      let obj = {};

      allProducts.products.forEach((i) => {
        obj[i.category] ? obj[i.category]++ : (obj[i.category] = 1);
      });

      setProductTotal({ ...obj, 所有甜點: allProducts.products.length });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProducts = async (page = 1) => {
    setIsLoading(true);

    try {
      const productRes = await axios.get(
        `/v2/api/${
          process.env.REACT_APP_API_PATH
        }/products?page=${page}&category=${
          currentCategory === "所有甜點" ? "" : currentCategory
        }`
      );
      const productData = productRes.data;

      setProductList(productData.products);
      setPagination(productData.pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeCategory = (e) => {
    navigate(`/products/${e.target.value}`);
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
              所有甜點
            </li>
          </ol>
        </nav>
      </section>
      <section className="container pt-3 pt-md-4 pb-5">
        <div className="row flex-column flex-md-row align-items-center align-items-md-start gx-5 mx-0 my-4">
          <div className="col-9 col-md-3 mb-5 mb-md-0">
            <ul className="d-none d-md-block list-group list-group-flush">
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
            <select
              className="d-block d-md-none form-select"
              aria-label="Product menu"
              value={currentCategory}
              onChange={handleChangeCategory}
            >
              {categories.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="container col-12 col-md-9">
            <div className="d-flex flex-column flex-md-row align-items-center mb-5">
              <h2 className="h3 mb-2 mb-md-0 text-center text-sm-start text-dark">
                {currentCategory}
              </h2>
              <div className="d-flex align-items-center ms-md-auto">
                <p className="ms-md-3 mb-0 w-100 text-muted">
                  共{" "}
                  {productTotal[currentCategory]
                    ? productTotal[currentCategory].toLocaleString()
                    : 0}{" "}
                  件商品
                </p>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center justify-content-sm-start mx-0 gx-5 gy-4 mb-5">
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
