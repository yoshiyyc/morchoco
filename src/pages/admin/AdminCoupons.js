import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import CouponModal from "../../components/CouponModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //type: Decide modal type
  const [type, setType] = useState("create"); // edit
  const [tempCoupon, setTempCoupon] = useState({});

  const couponModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    couponModal.current = new Modal("#couponModal", {
      backdrop: "static",
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    getCoupons();
  }, []);

  const getCoupons = async (page = 1) => {
    setIsLoading(true);

    const couponRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
    );
    console.log(couponRes);
    setCoupons(couponRes.data.coupons);
    setPagination(couponRes.data.pagination);
    setIsLoading(false);
  };

  const openCouponModal = (type, item) => {
    setType(type);
    setTempCoupon(item);
    couponModal.current.show();
  };

  const closeModal = () => {
    couponModal.current.hide();
  };

  const openDeleteModal = (product) => {
    setTempCoupon(product);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
      );
      if (res.data.success) {
        getCoupons();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <Loading isLoading={isLoading} />
      <CouponModal
        closeModal={closeModal}
        getCoupons={getCoupons}
        tempCoupon={tempCoupon}
        type={type}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempCoupon.title}
        handleDelete={deleteCoupon}
        id={tempCoupon.id}
      />
      <h3>優惠券列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openCouponModal("create", {})}
        >
          建立新優惠券
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">標題</th>
            <th scope="col">折扣</th>
            <th scope="col">到期日</th>
            <th scope="col">優惠碼</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => {
            return (
              <tr key={coupon.id}>
                <td>{coupon.title}</td>
                <td>{coupon.percent}</td>
                <td>{new Date(coupon.due_date).toDateString()}</td>
                <td>{coupon.code}</td>
                <td>{coupon.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openCouponModal("edit", coupon)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => openDeleteModal(coupon)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getCoupons} />
    </div>
  );
}

export default AdminCoupons;
