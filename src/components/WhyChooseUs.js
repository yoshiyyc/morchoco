import flour from "../img/flour.png";
import baker from "../img/baker.png";
import delicious from "../img/spaghetti.png";
import takeaway from "../img/take-away.png";

const WhyChooseUs = () => {
  return (
    <section className="mt-5 bg-light">
      <div className="container py-4">
        <h4 className="my-4 text-center text-dark">選擇 Morchoco</h4>
        <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-4 my-4 list-unstyled text-secondary">
          <li className="col">
            <div className="card d-flex my-4 bg-transparent border-0">
              <img
                src={flour}
                alt="嚴選食材"
                className="why__img card-img mx-auto"
              />
              <h6 className="card-title text-center mt-4">嚴選食材</h6>
            </div>
          </li>
          <li className="col">
            <div className="card d-flex my-4 bg-transparent border-0">
              <img
                src={baker}
                alt="職人手作"
                className="why__img card-img mx-auto"
              />
              <h6 className="card-title text-center mt-4">職人手作</h6>
            </div>
          </li>
          <li className="col">
            <div className="card d-flex my-4 bg-transparent border-0">
              <img
                src={delicious}
                alt="精緻美味"
                className="why__img card-img mx-auto"
              />
              <h6 className="card-title text-center mt-4">精緻美味</h6>
            </div>
          </li>
          <li className="col">
            <div className="card d-flex my-4 bg-transparent border-0">
              <img
                src={takeaway}
                alt="宅配熱銷"
                className="why__img card-img mx-auto"
              />
              <h6 className="card-title text-center mt-4">宅配熱銷</h6>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;
