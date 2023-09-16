import { NavLink } from "react-router-dom";

const Credits = () => {
  return (
    <>
      <section className="container">
        <nav aria-label="breadcrumb p-0">
          <ol className="breadcrumb m-0 py-2 lh-md border-bottom">
            <li className="breadcrumb-item">
              <NavLink className="text-decoration-none link-dark" to="/">
                <i className="bi bi-house-fill"></i>
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Credits
            </li>
          </ol>
        </nav>
      </section>
      <section className="container pt-4 py-5">
        <h4 className="my-4 text-center text-dark">Credits</h4>
        <p>The following are the credits for the icons used in the website</p>
        <ul>
          <li className="my-2">
            <a
              href="https://www.flaticon.com/free-icons/flour"
              title="flour icons"
            >
              Flour icons created by Freepik - Flaticon
            </a>
          </li>
          <li className="my-2">
            <a
              href="https://www.flaticon.com/free-icons/baker"
              title="baker icons"
            >
              Baker icons created by amonrat rungreangfangsai - Flaticon
            </a>
          </li>
          <li className="my-2">
            <a
              href="https://www.flaticon.com/free-icons/delicious"
              title="delicious icons"
            >
              Delicious icons created by Freepik - Flaticon
            </a>
          </li>
          <li className="my-2">
            <a
              href="https://www.flaticon.com/free-icons/food-delivery"
              title="food delivery icons"
            >
              Food delivery icons created by iconixar - Flaticon
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Credits;
