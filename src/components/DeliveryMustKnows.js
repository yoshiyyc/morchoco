const DeliveryMustKnows = () => {
  return (
    <>
      <li>
        為了確保商品的新鮮及配送安全，
        <span className="text-primary fw-semibold">
          蛋糕及冰品類商品全程都會使用低溫冷凍配送，特定商品採冷藏配送（例：慕斯布丁），其餘則採常溫配送
        </span>
        。內含新鮮水果及無法冷凍的食材的蛋糕，以及飲品類商品恕不提供宅配。
      </li>
      <li>
        請在訂購單的
        <span className="text-primary fw-semibold">留言處</span>
        備註希望到貨日。由於甜點為新鮮製作，需要一定的製作時間及配送時間，最早出貨日為下單且確認付款完成的
        <span className="text-primary fw-semibold">三個工作天</span>後。
      </li>
      <li>
        收件人資料（姓名、電話、地址）請務必填寫完整且正確，以避免物流延誤無法到貨。
      </li>
      <li>
        到貨日可能因天候、假日、物流繁盛期等非人為因素影響而延誤。到貨時間請以實際配送情況為主，可接受者再請進行訂購。我方保有修改、暫停、取消訂單之權利。
      </li>
      <li>
        配送過程具有一定的風險（如商品受到碰撞變形等），請評估是否能自行承接受宅配風險，或是改選門市取貨服務。
      </li>
      <li>
        因宅配有容積限制，如商品金額超過
        <span className="text-primary fw-semibold"> NT2,000</span>{" "}
        元，請來電詢問運費。
      </li>
      <li>
        甜點新鮮生產製作，新鮮食用最美味，收件後請盡早享用。若選擇門市取貨服務，請務必於指定日至指定門市完成取貨。
      </li>
      <li>
        食品<span className="text-primary fw-semibold">不適用</span>網購 7
        天鑑賞期的服務。
      </li>
    </>
  );
};

export default DeliveryMustKnows;
