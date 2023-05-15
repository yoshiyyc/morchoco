import { NavLink } from "react-router-dom";

function Navbar({ cartData }) {
  return (
    <header className="bg-white">
      <div className="container">
        <nav className="navbar p-0 navbar-expand-md navbar-light d-flex flex-column justify-content-between">
          <div className="d-flex position-relative w-100">
            <NavLink className="navbar-brand mx-auto link-dark" to="/">
              <h1>Morchoco</h1>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="d-none d-md-flex align-items-center position-absolute ms-auto"
              style={{
                right: "0%",
                top: "50%",
                transform: "translate(0%, -50%)",
              }}
            >
              <NavLink to="/cart" className="nav-link position-relative mx-3">
                <i className="bi bi-cart2 fs-4"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartData.carts?.length}
                </span>
              </NavLink>
              <NavLink to="" className="nav-link mx-3" disabled>
                <i className="bi bi-person-circle fs-4"></i>
              </NavLink>
            </div>
          </div>
          <div
            className="collapse navbar-collapse custom-header-md-open w-100"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex justify-content-center w-100 border-top border-bottom">
              <li className="nav-item">
                <NavLink
                  className="nav-link btn btn-outline-secondary border-0 rounded-0 px-4"
                  to="/products"
                >
                  所有甜點
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link px-4" to="/" disabled>
                  會員專區
                </NavLink>
              </li>
              <li className="nav-item d-flex d-md-none">
                <NavLink to="/cart" className="nav-link px-4">
                  <div className="position-relative">
                    <i className="bi bi-cart2 fs-4 m-0"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartData.carts?.length}
                    </span>
                  </div>
                </NavLink>
              </li>
              <li className="nav-item d-md-none">
                <NavLink to="" className="nav-link px-4" disabled>
                  <i className="bi bi-person-circle fs-4"></i>
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
