import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(
    category ? category : "所有甜點"
  );
  const [pagination, setPagination] = useState({});
  const [productTotal, setProductTotal] = useState({});
  // const [productOrder, setProductOrder] = useState("default");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "所有甜點",
    "六吋蛋糕",
    "小蛋糕",
    "手工小點",
    "冰品",
    "純巧克力",
  ];

  useEffect(() => {
    getProducts();
    countProductTotal();
  }, []);

  useEffect(() => {
    setCurrentCategory(category ? category : "所有甜點");
  }, [category]);

  useEffect(() => {
    getProducts();
  }, [currentCategory]);

  const countProductTotal = async () => {
    setIsLoading(true);

    const allProducts = await axios
      .get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // Calcutate product total by categories
    let obj = {};

    allProducts.products.forEach((i) => {
      obj[i.category] ? obj[i.category]++ : (obj[i.category] = 1);
    });

    setProductTotal({ ...obj, 所有甜點: allProducts.products.length });

    setIsLoading(false);
  };

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

  const handleChangeCategory = (e) => {
    navigate(`/products/${e.target.value}`);
  };

  // const handleProductOrder = (e) => {
  // setProductOrder(e.target.value);

  // if (e.target.value === "ascPrice") {
  //   const tempProductList = productList.sort((a, b) => {
  //     return a.price - b.price;
  //   });
  //   setProductList(tempProductList);
  // } else if (e.target.value === "dscPrice") {
  //   const tempProductList = productList.sort((a, b) => {
  //     return b.price - a.price;
  //   });
  //   setProductList(tempProductList);
  // }
  // };

  // const sortProductOrder = (order) => {
  //   if (order === "ascPrice") {
  //     const tempProductList = productList.sort((a, b) => {
  //       return a.price - b.price;
  //     });
  //     setProductList(tempProductList);
  //   } else if (order === "dscPrice") {
  //     const tempProductList = productList.sort((a, b) => {
  //       return b.price - a.price;
  //     });
  //     setProductList(tempProductList);
  //   }
  // };

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
        <div className="row flex-column flex-md-row align-items-center align-items-md-start gx-5 my-4">
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
          <div className="col-12 col-md-9">
            <div className="d-flex flex-column flex-md-row align-items-center mb-5">
              <h2 className="h3 mb-2 mb-md-0 text-center text-sm-start text-dark">
                {currentCategory}
              </h2>
              <div className="d-flex align-items-center ms-md-auto">
                {/* <select
                  className="form-select ms-auto"
                  aria-label="product-filter"
                  value={productOrder}
                  onChange={handleProductOrder}
                >
                  <option value="default">預設</option>
                  <option value="ascPrice">價格由低到高</option>
                  <option value="dscPrice">價格由高到低</option>
                </select> */}
                <p className="ms-md-3 mb-0 w-100 text-muted">
                  共{" "}
                  {productTotal[currentCategory]
                    ? productTotal[currentCategory].toLocaleString()
                    : 0}{" "}
                  件商品
                </p>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center justify-content-sm-start gx-5 gy-4 mb-5">
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
