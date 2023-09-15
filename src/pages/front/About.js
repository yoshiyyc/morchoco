import flour from "../../img/flour.png";
import baker from "../../img/baker.png";
import delicious from "../../img/spaghetti.png";
import takeaway from "../../img/take-away.png";

const About = () => {
  return (
    <div>
      <section className="container py-4">
        <h2 className="h3 my-4 text-center text-dark">Morchoco 的故事</h2>
        <div className="row flex-column">
          <div className="col-4 mx-auto mb-4">
            <div className="d-flex justify-content-center px-2 text-nowrap">
              <div
                className="w-100"
                style={{
                  minHeight: "200px",
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1586195831572-9608b4f48230?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2650&q=80)",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
          </div>
          <div className="col-8 mx-auto d-flex flex-column justify-content-center align-items-center text-sm lh-md">
            <p className="mb-0">
              Morchoco
              從一間小小的工作室起家，到現在已經成為了網路上最具聲量的巧克力甜點品牌。
            </p>
            <p className="mb-0">
              創立者希望帶給大家最純粹美好的巧克力體驗，於是開始走上了甜點製作的不歸路。
            </p>
            <p className="mb-0">
              品牌名 Morchoco 取自 more
              chocolate，希望能把美味的巧克力帶進每個人的生活。
            </p>
            <p className="mb-0">
              從一開始的家常甜點布朗尼，到節慶必購的六吋蛋糕，每一樣都由
              Morchoco 團隊精心研發。
            </p>
            <p className="mb-0">
              如果你還沒有試過 Morchoco
              的甜點，請務必讓我們為你獻上最棒的巧克力甜點體驗！
            </p>
          </div>
        </div>
      </section>
      <section className="mt-5 bg-light">
        <div className="container py-4">
          <h4 className="my-4 text-center text-dark">選擇 Morchoco</h4>
          <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-4 my-4 list-unstyled text-secondary">
            <li className="col">
              <div className="card d-flex my-4 bg-transparent border-0">
                <img
                  src={flour}
                  alt="嚴選食材"
                  className="card-img mx-auto"
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                  }}
                />
                <h6 className="card-title text-center mt-4">嚴選食材</h6>
              </div>
            </li>
            <li className="col">
              <div className="card d-flex my-4 bg-transparent border-0">
                <img
                  src={baker}
                  alt="職人手作"
                  className="card-img mx-auto"
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                  }}
                />
                <h6 className="card-title text-center mt-4">職人手作</h6>
              </div>
            </li>
            <li className="col">
              <div className="card d-flex my-4 bg-transparent border-0">
                <img
                  src={delicious}
                  alt="精緻美味"
                  className="card-img mx-auto"
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                  }}
                />
                <h6 className="card-title text-center mt-4">精緻美味</h6>
              </div>
            </li>
            <li className="col">
              <div className="card d-flex my-4 bg-transparent border-0">
                <img
                  src={takeaway}
                  alt="宅配熱銷"
                  className="card-img mx-auto"
                  style={{
                    maxHeight: 120,
                    objectFit: "contain",
                  }}
                />
                <h6 className="card-title text-center mt-4">宅配熱銷</h6>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
