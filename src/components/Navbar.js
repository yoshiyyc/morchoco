import { NavLink, Link, useLocation } from "react-router-dom";

function Navbar({ cartData }) {
  const location = useLocation();

  return (
    <header className="bg-white sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light d-flex flex-column justify-content-between my-2 my-md-0 p-0">
          <div className="d-flex position-relative w-100">
            <NavLink
              className="navbar__logo logo navbar-brand mx-auto link-dark"
              to="/"
            >
              <h2 className="h1">Morchoco</h2>
            </NavLink>
            <button
              className="navbar-toggler position-absolute top-50 end-0 translate-middle-y border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="d-none d-md-flex align-items-center position-absolute top-50 end-0 translate-middle-y">
              <NavLink to="/cart" className="nav-link position-relative mx-3">
                <i className="bi bi-cart2 fs-4" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartData.carts?.length}
                </span>
              </NavLink>
              <NavLink to="/login" className="nav-link mx-3">
                <i className="bi bi-person-circle fs-4" />
              </NavLink>
            </div>
          </div>
          <div
            className="collapse navbar-collapse custom-header-md-open w-100"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex justify-content-center w-100 border-top border-bottom">
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle btn btn-outline-secondary border-0 px-4 rounded-0"
                  to="/products"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Morchoco 甜點
                </NavLink>
                <ul className="dropdown-menu p-0 w-100 text-center text-md-start rounded-0">
                  <li>
                    <Link className="dropdown-item" to={`/products`}>
                      所有甜點
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/products/六吋蛋糕`}>
                      六吋蛋糕
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/products/小蛋糕`}>
                      小蛋糕
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/products/手工小點`}>
                      手工小點
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/products/冰品`}>
                      冰品
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/products/純巧克力`}>
                      純巧克力
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link btn btn-outline-secondary px-4 border-0 rounded-0"
                  to="/about"
                >
                  關於我們
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link btn btn-outline-secondary  px-4 border-0 rounded-0"
                  to="/delivery"
                >
                  宅配須知
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link btn btn-outline-secondary px-4 border-0 rounded-0 ${
                    (location.pathname === "/createaccount" ||
                      location.pathname === "/forgotpassword") &&
                    "active"
                  }`}
                  to="/login"
                >
                  會員專區
                </NavLink>
              </li>
              <li className="nav-item d-flex d-md-none">
                <NavLink
                  className="nav-link d-flex justify-content-center align-items-center px-4 w-100"
                  to="/cart"
                >
                  <div className="position-relative">
                    購物車
                    <span className="ms-1 position-absolute top-50 top-md-0 start-100 translate-middle-y translate-md-middle badge rounded-pill bg-danger">
                      {cartData.carts?.length}
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
