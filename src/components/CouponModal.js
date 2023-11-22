import { useEffect, useContext } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../store/messageStore";
import { Input, CheckboxRadio } from "./FormElements";

function CouponModal({ closeCouponModal, getCoupons, type, tempCoupon }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: tempCoupon,
  });

  const watchTitle = watch("title");

  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    if (type === "create") {
      setValue("title", "");
      setValue("percent", 0);
      setValue("code", "");
      setValue("due_date", null);
      setValue("is_enabled", 1);
    } else if (type === "edit") {
      setValue("title", tempCoupon.title);
      setValue("percent", tempCoupon.percent);
      setValue("code", tempCoupon.code);
      setValue("due_date", formatDatePickerDate(tempCoupon.due_date));
      setValue("is_enabled", tempCoupon.is_enabled);
    }
  }, [type, tempCoupon]);

  const formatDatePickerDate = (timestamp) => {
    return dayjs(timestamp).format("YYYY-MM-DD");
  };

  const handleCloseModal = () => {
    closeCouponModal();
    if (type === "create") {
      reset({
        title: "",
        percent: 0,
        due_date: null,
        code: "",
        is_enabled: 0,
      });
    } else if (type === "edit") {
      reset({
        ...tempCoupon,
        due_date: formatDatePickerDate(tempCoupon.due_date),
      });
    }
  };

  const onSubmit = async (data) => {
    const submitData = {
      ...data,
      percent: Number(data.percent),
      due_date: dayjs(data.due_date).valueOf(),
      is_enabled: +data.is_enabled,
    };

    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method = "post";

      if (type === "edit") {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`;
        method = "put";
      }

      const res = await axios[method](api, {
        data: submitData,
      });

      handleSuccessMessage(dispatch, res);
      handleCloseModal();
      getCoupons();
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error);
    }
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="couponModal"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header bg-primary">
              <h1 className="modal-title fs-5 text-light" id="couponModalLabel">
                {type === "create" ? "建立新優惠券" : `編輯 ${watchTitle}`}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
              />
            </div>
            <div className="modal-body">
              <small className="d-block mb-3 text-muted">
                ID: {tempCoupon?.id}
              </small>
              <div className="mb-4">
                <div className="mb-2">
                  <Input
                    id="title"
                    type="text"
                    labelText="標題"
                    placeholder="請輸入標題"
                    required={true}
                    register={register}
                    errors={errors}
                    rules={{
                      required: "標題為必填",
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <Input
                      id="percent"
                      type="number"
                      labelText="折扣 (%)"
                      placeholder="請輸入折扣 (%)"
                      required={true}
                      register={register}
                      errors={errors}
                      rules={{
                        required: "折扣為必填",
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <Input
                      id="due_date"
                      type="date"
                      labelText="到期日"
                      required={true}
                      register={register}
                      errors={errors}
                      rules={{
                        required: "到期日為必填",
                      }}
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <Input
                      id="code"
                      type="text"
                      labelText="優惠碼"
                      placeholder="請輸入優惠碼"
                      required={true}
                      register={register}
                      errors={errors}
                      rules={{
                        required: "優惠碼為必填",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-between">
              <div className="form-group">
                <CheckboxRadio
                  id="is_enabled"
                  name="is_enabled"
                  type="checkbox"
                  labelText="是否啟用"
                  register={register}
                  errors={errors}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  關閉
                </button>
                <button
                  type="submit"
                  className="btn btn-primary ms-2"
                  onClick={handleSubmit}
                >
                  儲存
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CouponModal;
