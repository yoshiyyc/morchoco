import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark">
      <div className="container py-4 text-light">
        <div className="row">
          <div className="col-md-3">
            <h2 className="my-2">Morchoco</h2>
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
          <ul className="row col-md-9 list-unstyled m-0">
            <li className="col-5">
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
            <li className="col-3">
              <h5>美味甜點</h5>
              <ul className="list-unstyled">
                <li className="my-2">
                  <a className="text-decoration-none link-light" href="#">
                    六吋蛋糕
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-decoration-none link-light" href="#">
                    小蛋糕
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-decoration-none link-light" href="#">
                    手工小點
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-decoration-none link-light" href="#">
                    飲品
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-decoration-none link-light" href="#">
                    純巧克力
                  </a>
                </li>
              </ul>
            </li>
            <li className="col-3">
              <h5>會員專區</h5>
              <ul className="list-unstyled">
                <li className="my-2">
                  <a className="text-decoration-none link-light" href="#">
                    會員登入
                  </a>
                </li>
                <li className="my-2">
                  <a className="text-decoration-none link-light" href="#">
                    宅配協助
                  </a>
                </li>
              </ul>
              <NavLink
                to="/login"
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
