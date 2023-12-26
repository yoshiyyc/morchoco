import { NavLink } from "react-router-dom";
import DeliveryMustKnows from "../../components/DeliveryMustKnows";

const Delivery = () => {
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
              宅配須知
            </li>
          </ol>
        </nav>
      </section>
      <div className="container pt-4 pb-5">
        <h2 className="h3 my-4 text-center text-dark">宅配須知</h2>
        <section>
          <ul className="mb-0 pe-3 py-4 lh-md bg-light">
            <DeliveryMustKnows />
          </ul>
        </section>
        <section className="py-5">
          <h3 className="ms-3 mb-3 h4 text-dark">Q & A</h3>
          <div
            className="accordion accordion-flush lh-md"
            id="accordionDeliveryQA"
          >
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse1"
                  aria-expanded="false"
                  aria-controls="flush-collapse1"
                >
                  宅配可以選擇時段嗎？
                </button>
              </h2>
              <div
                id="flush-collapse1"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionDeliveryQA"
              >
                <div className="accordion-body">
                  到貨日期會依照您指定選取的日期安排配送。宅配時段配合宅配業者的到貨方案，可選13:00前及14:00-18:00兩個時段，但無法指定確切的時間到貨，送達的時間仍以物流司機實際安排為主。如有需要指定時段或其他特殊到貨需求，請直接在訂單備註欄做備註，我們會在收到訂單時再和您確認。
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse2"
                  aria-expanded="false"
                  aria-controls="flush-collapse2"
                >
                  請問有貨到付款嗎？
                </button>
              </h2>
              <div
                id="flush-collapse2"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionDeliveryQA"
              >
                <div className="accordion-body">
                  目前皆是先完成訂購及付款後才會安排製作及出貨。
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse3"
                  aria-expanded="false"
                  aria-controls="flush-collapse3"
                >
                  為何沒不開放超商取貨？
                </button>
              </h2>
              <div
                id="flush-collapse3"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionDeliveryQA"
              >
                <div className="accordion-body">
                  由於我們無法確保超商環境是否為保存甜點最佳環境，為避免影響風味，目前僅以宅配服務為主。
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse4"
                  aria-expanded="false"
                  aria-controls="flush-collapse4"
                >
                  蛋糕有可能會延遲到貨嗎？
                </button>
              </h2>
              <div
                id="flush-collapse4"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionDeliveryQA"
              >
                <div className="accordion-body">
                  宅配皆不保證指定配送日期送抵，需視物流實際狀況而定。如遇到颱風放假，宅配業者將停止一切收送服務以保障人員與保障貨品的安全，有延遲到貨之風險，且不提供因天災而退件。如需慶祝蛋糕，請務必提早訂購，以避免耽誤您的計畫行程。
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse5"
                  aria-expanded="false"
                  aria-controls="flush-collapse5"
                >
                  為什麼收到商品沒有收到發票呢？
                </button>
              </h2>
              <div
                id="flush-collapse5"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionDeliveryQA"
              >
                <div className="accordion-body">
                  電子發票會於出貨時，同步寄送到您的email或載具。
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse6"
                  aria-expanded="false"
                  aria-controls="flush-collapse6"
                >
                  如果宅配過程中蛋糕撞傷了，能補一個新的嗎？
                </button>
              </h2>
              <div
                id="flush-collapse6"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionDeliveryQA"
              >
                <div className="accordion-body">
                  蛋糕宅配有一定風險，車體運送途中可能造成蛋糕位移、側邊損傷或裝飾掉落、輕微受損、嚴重受損（蛋糕糊爛、不成型、難以辨別蛋糕原本的樣子），均不在毀壞補償範圍內，風險須自行承擔。
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse7"
                  aria-expanded="false"
                  aria-controls="flush-collapse7"
                >
                  如果發生缺件、口味錯誤、商品毀損等該如何處理？
                </button>
              </h2>
              <div
                id="flush-collapse7"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionDeliveryQA"
              >
                <div className="accordion-body">
                  我們建議您保持商品、數量及包裝的完好並拍照保留紀錄。請於收件當天來電
                  (07)777-7777，或是 email 至
                  hello@morchoco.com，由我們的客服為您服務。
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Delivery;
