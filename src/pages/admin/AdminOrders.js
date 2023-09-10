import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import OrderModal from "../../components/OrderModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // type: 決定 modal 展開的用途
  const [type, setType] = useState("create"); // edit
  const [tempOrder, setTempOrder] = useState({});

  const orderModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    orderModal.current = new Modal("#orderModal", {
      backdrop: "static",
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    getOrders();
  }, []);

  const getOrders = async (page = 1) => {
    setIsLoading(true);

    const orderRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
    );
    console.log(orderRes);
    setOrders(orderRes.data.orders);
    setPagination(orderRes.data.pagination);
    setIsLoading(false);
  };

  const openOrderModal = (order) => {
    setTempOrder(order);
    orderModal.current.show();
  };

  const closeOrderModal = () => {
    setTempOrder({}); // ?check
    orderModal.current.hide();
  };

  const openDeleteModal = (order) => {
    setTempOrder(order);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`
      );
      if (res.data.success) {
        getOrders();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <Loading isLoading={isLoading} />
      <OrderModal
        closeModal={closeOrderModal}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempOrder.title}
        handleDelete={deleteOrder}
        id={tempOrder.id}
      />
      <h3>訂單列表</h3>
      <hr />
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
                <td>{order.user?.name}</td>
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
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => openDeleteModal(order)}
                  >
                    刪除
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
