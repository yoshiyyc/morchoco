import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { createAsyncMessage } from "../slice/messageSlice";
import { Input, CheckboxRadio } from "./FormElements";

const CouponModal = ({ closeCouponModal, getCoupons, type, tempCoupon }) => {
  /*------------------------------------*\
  | React Hook Form
  \*------------------------------------*/
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

  /*------------------------------------*\
  | Default Values
  \*------------------------------------*/
  const defaultCouponValues = {
    title: "",
    percent: 0,
    code: "",
    due_date: null,
    is_enabled: 0,
  };

  /*------------------------------------*\
  | Hooks
  \*------------------------------------*/
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === "create") {
      // Use defaultCouponValues to give each fields default values
      Object.keys(defaultCouponValues).forEach((i) => {
        setValue(i, defaultCouponValues[i]);
      });
    } else if (type === "edit") {
      // Use the keys of defaultCouponValues as fields
      // Loop the keys to get the saved data from tempProduct
      Object.keys(defaultCouponValues).forEach((i) => {
        if (`${i}` === "due_date") {
          setValue(i, formatDatePickerDate(tempCoupon[i]));
        } else {
          setValue(i, tempCoupon[i]);
        }
      });
    }
  }, [type, tempCoupon]);

  /*------------------------------------*\
  | Utility
  \*------------------------------------*/
  const formatDatePickerDate = (timestamp) => {
    return dayjs(timestamp).format("YYYY-MM-DD");
  };

  /*------------------------------------*\
  | Functions
  \*------------------------------------*/
  const handleCloseModal = () => {
    closeCouponModal();
    if (type === "create") {
      reset(defaultCouponValues);
    } else if (type === "edit") {
      reset({
        ...tempCoupon,
        due_date: formatDatePickerDate(tempCoupon.due_date),
      });
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    const submitData = {
      ...data,
      percent: Number(data.percent),
      due_date: dayjs(data.due_date).valueOf(),
      is_enabled: +data.is_enabled,
    };

    try {
      // Default api path is for "create" modal
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method = "post";

      // If modal type is edit
      if (type === "edit") {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`;
        method = "put";
      }

      const res = await axios[method](api, {
        data: submitData,
      });

      dispatch(createAsyncMessage(res.data));
      handleCloseModal();
      getCoupons();
    } catch (error) {
      console.log(error);
      dispatch(createAsyncMessage(error.response.data));
    } finally {
      setIsLoading(false);
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
                  disabled={isLoading}
                >
                  關閉
                </button>
                <button
                  type="submit"
                  className="btn btn-primary ms-2"
                  onClick={handleSubmit}
                  disabled={isLoading}
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
};

export default CouponModal;
