import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark">
      <div className="container py-4 text-light">
        <div className="row">
          <div className="col-md-3">
            <h2 className="my-2 logo">Morchoco</h2>
            <ul className="list-unstyled d-flex my-3">
              <li className="me-3">
                <a
                  className="text-decoration-none link-light"
                  href="#"
                  target="_blank"
                >
                  <i className="d-block bi bi-facebook fs-4"></i>
                </a>
              </li>
              <li className="mx-3">
                <a
                  className="text-decoration-none link-light"
                  href="#"
                  target="_blank"
                >
                  <i className="d-block bi bi-twitter fs-4"></i>
                </a>
              </li>
              <li className="mx-3">
                <a
                  className="text-decoration-none link-light"
                  href="#"
                  target="_blank"
                >
                  <i className="d-block bi bi-instagram fs-4"></i>
                </a>
              </li>
            </ul>
          </div>
          <ul className="row flex-column flex-sm-row col-md-9 list-unstyled m-0">
            <li className="col col-sm-5 mb-4 mb-sm-0">
              <h5>關於我們</h5>
              <ul className="list-unstyled">
                <li className="my-2">
                  <i className="me-2 bi bi-house-door-fill"></i>
                  高雄市可可區貝克一街600號1樓
                </li>
                <li className="my-2">
                  <i className="me-2 bi bi-telephone-fill"></i>
                  (07)777-7777
                </li>
                <li className="my-2">
                  <i className="me-2 bi bi-envelope-fill"></i>
                  hello@morchoco.com
                </li>
                <li className="my-2">
                  <i className="me-2 bi bi-clock-fill"></i>
                  10:00 ~ 19:00
                </li>
              </ul>
            </li>
            <li className="col col-sm-3 mb-4 mb-sm-0">
              <h5>美味甜點</h5>
              <ul className="list-unstyled">
                <li className="my-2">
                  <NavLink
                    className="text-decoration-none link-light"
                    to={`/products/六吋蛋糕`}
                  >
                    六吋蛋糕
                  </NavLink>
                </li>
                <li className="my-2">
                  <NavLink
                    className="text-decoration-none link-light"
                    to={`/products/小蛋糕`}
                  >
                    小蛋糕
                  </NavLink>
                </li>
                <li className="my-2">
                  <NavLink
                    className="text-decoration-none link-light"
                    to={`/products/手工小點`}
                  >
                    手工小點
                  </NavLink>
                </li>
                <li className="my-2">
                  <NavLink
                    className="text-decoration-none link-light"
                    to={`/products/飲品`}
                  >
                    飲品
                  </NavLink>
                </li>
                <li className="my-2">
                  <NavLink
                    className="text-decoration-none link-light"
                    to={`/products/純巧克力`}
                  >
                    純巧克力
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="col col-sm-3 mb-4 mb-sm-0">
              <h5>會員權益</h5>
              <ul className="list-unstyled">
                <li className="my-2">
                  <NavLink
                    className="text-decoration-none link-light"
                    to="/login"
                  >
                    會員專區
                  </NavLink>
                </li>
                <li className="my-2">
                  <NavLink
                    className="text-decoration-none link-light"
                    to="/delivery"
                  >
                    宅配須知
                  </NavLink>
                </li>
                <li className="my-2">
                  <NavLink to="/credits" className="nav-link link-warning">
                    Credits
                  </NavLink>
                </li>
              </ul>
              <NavLink
                to={`/admin/login`}
                className="nav-link btn mt-4 py-1 link-light bg-danger"
              >
                管理員頁面（Demo）
              </NavLink>
            </li>
          </ul>
        </div>
        <p className="mt-4">© 2023 Morchoco All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
