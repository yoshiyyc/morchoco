import { useEffect, useRef, useState } from "react";
import axios from "axios";
import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  // type: 決定 modal 展開的用途
  const [type, setType] = useState("create"); // edit
  const [tempOrder, setTempOrder] = useState({});

  const orderModal = useRef(null);
  useEffect(() => {
    orderModal.current = new Modal("#orderModal", {
      backdrop: "static",
    });

    getOrders();
  }, []);

  const getOrders = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
    );
    console.log(res);
    setOrders(res.data.orders);
    setPagination(res.data.pagination);
  };

  const openOrderModal = (order) => {
    setTempOrder(order);
    orderModal.current.show();
  };
  const closeModal = () => {
    setTempOrder({});
    orderModal.current.hide();
  };

  return (
    <div className="p-3">
      <OrderModal
        closeModal={closeModal}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      <h3>訂單列表</h3>
      <hr />
      {/* <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openOrderModal("create", {})}
        >
          建立新商品
        </button>
      </div> */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">訂單 id</th>
            <th scope="col">購買用戶</th>
            <th scope="col">訂單金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">付款日期</th>
            {/* <th scope="col">外送進度</th> */}
            <th scope="col">留言訊息</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.user?.name}
                  {order.user?.email}
                </td>
                <td>${order.total}</td>
                <td>
                  {order.is_paid ? (
                    <span className="text-success fw-bold">付款完成</span>
                  ) : (
                    "未付款"
                  )}
                </td>
                <td>
                  {order.paid_date
                    ? new Date(order.paid_date * 1000).toLocaleString()
                    : "未付款"}
                </td>
                {/* <td>{order.message}</td> 外送進度*/}
                <td>{order.message ? "有" : "無"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      openOrderModal(order);
                    }}
                  >
                    查看
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getOrders} />
    </div>
  );
}

export default AdminOrders;
