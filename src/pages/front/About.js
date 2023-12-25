import { NavLink } from "react-router-dom";
import WhyChooseUs from "../../components/WhyChooseUs";

const About = () => {
  return (
    <>
      <section className="container">
        <nav aria-label="breadcrumb p-0">
          <ol className="breadcrumb m-0 py-2 lh-md border-bottom">
            <li className="breadcrumb-item">
              <NavLink className="text-decoration-none link-dark" to="/">
                <i className="bi bi-house-fill" />
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              關於我們
            </li>
          </ol>
        </nav>
      </section>
      <section className="container py-4">
        <h2 className="h3 my-4 text-center text-dark">Morchoco 的故事</h2>
        <div className="row flex-column">
          <div className="col col-sm-8 col-md-6 col-lg-4 d-flex mx-auto mb-4 p-0">
            <img
              className="brand-img img-fluid d-block mx-auto"
              src="https://images.unsplash.com/photo-1657875861372-f9a89f8655e6?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Morchoco brand"
            />
          </div>
          <div className="col-8 mx-auto d-flex flex-column justify-content-center align-items-center lh-md text-sm">
            <p className="mb-2">
              Morchoco
              從一間小小的工作室起家，到現在已經成為了網路上最具聲量的巧克力甜點品牌。
            </p>
            <p className="mb-2">
              創立者希望帶給大家最純粹美好的巧克力體驗，於是開始走上了甜點製作的不歸路。
            </p>
            <p className="mb-2">
              品牌名 Morchoco 取自 more
              chocolate，希望能把美味的巧克力帶進每個人的生活。
            </p>
            <p className="mb-2">
              從一開始的家常甜點布朗尼，到節慶必購的六吋蛋糕，每一樣都由
              Morchoco 團隊精心研發。
            </p>
            <p className="mb-2">
              如果你還沒有試過 Morchoco
              的甜點，請務必讓我們為你獻上最棒的巧克力甜點體驗！
            </p>
          </div>
        </div>
      </section>
      <WhyChooseUs />
    </>
  );
};

export default About;
