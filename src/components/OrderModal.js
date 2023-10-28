import { useContext, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../store/messageStore";
import { CheckboxRadio, Select } from "./FormElements";
import { formatCurrency } from "../utilities/utils";

function OrderModal({ closeOrderModal, getOrders, tempOrder }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      is_paid: tempOrder.is_paid,
      status: 0,
    },
  });

  const watchIsPaid = watch("is_paid");

  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    setValue("is_paid", tempOrder.is_paid);
    setValue("status", tempOrder.status ? tempOrder.status : 0);
  }, [tempOrder]);

  const handleCloseModal = () => {
    closeOrderModal();

    reset({
      ...tempOrder,
      is_paid: tempOrder.is_paid,
      status: tempOrder.status,
    });
  };

  const onSubmit = async (data) => {
    const submitData = {
      ...tempOrder,
      is_paid: data.is_paid,
      status: data.status,
    };

    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${tempOrder.id}`;
      const res = await axios.put(api, {
        data: submitData,
      });
      console.log(res);
      handleSuccessMessage(dispatch, res);
      console.log("inSub", submitData);
      handleCloseModal();
      getOrders();
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error);
    }
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="orderModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header bg-primary">
              <h1
                className="modal-title fs-5 text-light"
                id="exampleModalLabel"
              >
                {`編輯 ${tempOrder.id}`}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
              />
            </div>
            <div className="modal-body">
              <div className="mb-3 row">
                <span className="col-sm-2 col-form-label">Email</span>
                <div className="col-sm-10">
                  <input
                    type="email"
                    readOnly
                    className="form-control-plaintext"
                    id="staticEmail"
                    defaultValue={tempOrder?.user?.email}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <span className="col-sm-2 col-form-label">訂購者</span>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="staticBuyer"
                    defaultValue={tempOrder?.user?.name}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <span className="col-sm-2 col-form-label">外送地址</span>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    defaultValue={tempOrder?.user?.address}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <span className="col-sm-2 col-form-label">留言</span>
                <div className="col-sm-10">
                  <textarea
                    name="
                  id="
                    cols="30"
                    readOnly
                    className="form-control-plaintext"
                    defaultValue={tempOrder.message}
                  />
                </div>
              </div>
              {tempOrder.products && (
                <table className="table">
                  <thead>
                    <tr>
                      <th>品項名稱</th>
                      <th>數量</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(tempOrder.products).map((cart) => (
                      <tr key={cart.id}>
                        <td>{cart.product.title}</td>
                        <td>{cart.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="border-0 text-end">總金額</td>
                      <td className="border-0">
                        ${formatCurrency(tempOrder.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}

              <div>
                <h5 className="mt-4">修改訂單狀態</h5>
                <div className="form-group mb-4">
                  <CheckboxRadio
                    id="is_paid"
                    name="is_paid"
                    type="checkbox"
                    labelText={`付款狀態（${
                      watchIsPaid ? "已付款" : "未付款"
                    }）`}
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <Select
                    id="status"
                    labelText="外送進度"
                    register={register}
                    errors={errors}
                  >
                    <option value={0}>未確認</option>
                    <option value={1}>已確認</option>
                    <option value={2}>外送中</option>
                    <option value={3}>已送達</option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                關閉
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                儲存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
