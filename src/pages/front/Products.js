import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

function Products() {
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
    setPagination(productRes.data.pagination);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container mt-md-5 mt-3 mb-7">
        <Loading isLoading={isLoading} />
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5">
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
        <nav className="d-flex justify-content-center">
          <Pagination pagination={pagination} changePage={getProducts} />
        </nav>
      </div>
    </>
  );
}

export default Products;
