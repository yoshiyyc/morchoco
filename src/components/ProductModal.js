import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { createAsyncMessage } from "../slice/messageSlice";
import { Input, Textarea, CheckboxRadio, Select } from "./FormElements";
import questionMark from "../img/question-mark.jpeg";

const ProductModal = ({
  closeProductModal,
  getProducts,
  type,
  tempProduct,
}) => {
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
    defaultValues: tempProduct,
  });

  const watchTitle = watch("title");
  const watchImageUrl = watch("imageUrl");
  const watchImg1Url = watch("img1");
  const watchImg2Url = watch("img2");
  const watchImg3Url = watch("img3");
  const watchImg4Url = watch("img4");
  const watchImg5Url = watch("img5");

  /*------------------------------------*\
  | Default Values
  \*------------------------------------*/
  const defaultProductValues = {
    title: "",
    category: "",
    origin_price: 300,
    price: 100,
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  };

  /*------------------------------------*\
  | Hooks
  \*------------------------------------*/
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "create") {
      // Use defaultProductValues to give each fiels default values
      Object.keys(defaultProductValues).forEach((i) => {
        setValue(i, defaultProductValues[i]);
      });
    } else if (type === "edit") {
      if (
        tempProduct &&
        tempProduct.imagesUrl &&
        tempProduct.imagesUrl.length
      ) {
        // Use the keys of defaultProductValues as fields
        // Loop the keys to get the saved data from tempProduct
        Object.keys(defaultProductValues).forEach((i) => {
          if (`${i}`.startsWith("img")) {
            setValue(i, tempProduct.imagesUrl[Number(`${i}`.slice(3)) - 1]);
          } else {
            setValue(i, tempProduct[i]);
          }
        });
      }
    }
  }, [type, tempProduct]);

  /*------------------------------------*\
  | Functions
  \*------------------------------------*/

  const handleImageError = (e) => {
    e.target.src = questionMark;
  };

  const handleCloseModal = () => {
    closeProductModal();
    if (type === "create") {
      reset(defaultProductValues);
    } else if (type === "edit") {
      reset(tempProduct);
    }
  };

  const onSubmit = async (data) => {
    const submitData = {
      title: data.title,
      category: data.category,
      origin_price: Number(data.origin_price),
      price: Number(data.price),
      unit: data.unit,
      description: data.description,
      content: data.content,
      is_enabled: data.is_enabled,
      imageUrl: data.imageUrl,
      imagesUrl: [data.img1, data.img2, data.img3, data.img4, data.img5],
    };

    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = "post";

      if (type === "edit") {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
        method = "put";
      }

      const res = await axios[method](api, {
        data: JSON.parse(JSON.stringify(submitData)),
      });
      dispatch(createAsyncMessage(res.data));
      handleCloseModal();
      getProducts();
    } catch (error) {
      console.log(error);
      dispatch(createAsyncMessage(error.response.data));
    }
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="productModal"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header bg-primary">
              <h1
                className="modal-title fs-5 text-light"
                id="productModalLabel"
              >
                {type === "create" ? "建立新商品" : `編輯 ${watchTitle}`}
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
                ID: {tempProduct?.id}
              </small>
              <div className="mb-4">
                <div className="form-group mb-2">
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
                  <div className="form-group mb-2 col-md-6">
                    <Select
                      id="category"
                      labelText="分類"
                      register={register}
                      required={true}
                      rules={{
                        required: "分類為必填",
                      }}
                      errors={errors}
                    >
                      <option value="" disabled>
                        請選擇商品分類
                      </option>
                      <option value="六吋蛋糕">六吋蛋糕</option>
                      <option value="小蛋糕">小蛋糕</option>
                      <option value="手工小點">手工小點</option>
                      <option value="冰品">冰品</option>
                      <option value="純巧克力">純巧克力</option>
                    </Select>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <Input
                      id="unit"
                      type="text"
                      errors={errors}
                      labelText="單位"
                      placeholder="請輸入單位"
                      required={true}
                      register={register}
                      rules={{
                        required: "單位為必填",
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <Input
                      id="origin_price"
                      type="number"
                      errors={errors}
                      labelText="原價"
                      placeholder="請輸入原價"
                      required={true}
                      register={register}
                      rules={{
                        required: "原價為必填",
                        min: {
                          value: 0,
                          message: "請輸入 0 以上的數字",
                        },
                      }}
                    />
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <Input
                      id="price"
                      type="number"
                      errors={errors}
                      labelText="售價"
                      placeholder="請輸入售價"
                      required={true}
                      register={register}
                      rules={{
                        required: "售價為必填",
                        min: {
                          value: 0,
                          message: "請輸入 0 以上的數字",
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="form-group mb-2">
                  <Textarea
                    id="description"
                    labelText="產品描述"
                    placeholder="請輸入產品描述"
                    rows="2"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className="form-group mb-2">
                  <Textarea
                    id="content"
                    labelText="說明內容"
                    placeholder="請輸入說明內容"
                    rows="5"
                    errors={errors}
                    register={register}
                  />
                </div>
              </div>
              <hr />
              <div className="mt-2 mb-4">
                <div className="row gx-5">
                  <div className="col col-sm-4 mb-3 mb-sm-0">
                    <h6 className="h5 mb-2">主圖片</h6>
                    <div className="form-group mb-3">
                      <Input
                        id="imageUrl"
                        type="text"
                        labelText="輸入圖片網址"
                        placeholder="請輸入圖片連結"
                        register={register}
                        required={true}
                        errors={errors}
                        rules={{
                          required: "主圖片網址為必填",
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <img
                        src={watchImageUrl}
                        alt="預覽圖片"
                        className="img-fluid"
                        onError={handleImageError}
                      />
                    </div>
                  </div>
                  <div className="col col-sm-8">
                    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-end mb-2">
                      <h6 className="h5 me-2 mb-0">商品預覽圖</h6>
                      <small className="text-muted">
                        （圖片一建議與主圖片相同）
                      </small>
                    </div>
                    <div className="row justify-content-between mb-2">
                      <div className="col-8 form-group">
                        <Input
                          id="img1"
                          type="text"
                          labelText="圖片一"
                          placeholder="請輸入圖片連結"
                          register={register}
                          errors={errors}
                        />
                      </div>
                      <div className="col d-flex justify-content-center ms-auto form-group">
                        <img
                          className="product-modal__thumbnail mw-100"
                          src={watchImg1Url}
                          alt="預覽圖片"
                          onError={handleImageError}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-between mb-2">
                      <div className="col-8 form-group">
                        <Input
                          id="img2"
                          type="text"
                          labelText="圖片二"
                          placeholder="請輸入圖片連結"
                          register={register}
                          errors={errors}
                        />
                      </div>
                      <div className="col d-flex justify-content-center ms-auto form-group">
                        <img
                          className="product-modal__thumbnail mw-100"
                          src={watchImg2Url}
                          alt="預覽圖片"
                          onError={handleImageError}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-between mb-2">
                      <div className="col-8 form-group">
                        <Input
                          id="img3"
                          type="text"
                          labelText="圖片三"
                          placeholder="請輸入圖片連結"
                          register={register}
                          errors={errors}
                        />
                      </div>
                      <div className="col d-flex justify-content-center ms-auto form-group">
                        <img
                          className="product-modal__thumbnail mw-100"
                          src={watchImg3Url}
                          alt="預覽圖片"
                          onError={handleImageError}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-between mb-2">
                      <div className="col-8 form-group">
                        <Input
                          id="img4"
                          type="text"
                          labelText="圖片四"
                          placeholder="請輸入圖片連結"
                          register={register}
                          errors={errors}
                        />
                      </div>
                      <div className="col d-flex justify-content-center ms-auto form-group">
                        <img
                          className="product-modal__thumbnail mw-100"
                          src={watchImg4Url}
                          alt="預覽圖片"
                          onError={handleImageError}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-between mb-2">
                      <div className="col-8 form-group">
                        <Input
                          id="img5"
                          type="text"
                          labelText="圖片五"
                          placeholder="請輸入圖片連結"
                          register={register}
                          errors={errors}
                        />
                      </div>
                      <div className="col d-flex justify-content-center ms-auto form-group">
                        <img
                          className="product-modal__thumbnail mw-100"
                          src={watchImg5Url}
                          alt="預覽圖片"
                          onError={handleImageError}
                        />
                      </div>
                    </div>
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
};

export default ProductModal;
