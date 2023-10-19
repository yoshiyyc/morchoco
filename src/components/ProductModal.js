import { useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../store/messageStore";
import { Input, Textarea, CheckboxRadio } from "./FormElements";

function ProductModal({ closeProductModal, getProducts, type, tempProduct }) {
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
  const watchImageUrl = watch("image");
  const watchImg1Url = watch("img1");
  const watchImg2Url = watch("img2");
  const watchImg3Url = watch("img3");
  const watchImg4Url = watch("img4");
  const watchImg5Url = watch("img5");

  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    console.log("sada", tempProduct);

    if (type === "create") {
      setValue("title", "");
      setValue("category", "");
      setValue("unit", "");
      setValue("origin_price", 300);
      setValue("price", 100);
      setValue("description", "");
      setValue("content", "");
      setValue("is_enabled", 1);
      setValue("image", "");
      setValue("img1", "");
      setValue("img2", "");
      setValue("img3", "");
      setValue("img4", "");
      setValue("img5", "");
    } else if (type === "edit") {
      if (
        tempProduct &&
        tempProduct.imagesUrl &&
        tempProduct.imagesUrl.length
      ) {
        setValue("title", tempProduct.title);
        setValue("category", tempProduct.category);
        setValue("unit", tempProduct.unit);
        setValue("origin_price", tempProduct.origin_price);
        setValue("price", tempProduct.price);
        setValue("description", tempProduct.description);
        setValue("content", tempProduct.content);
        setValue("is_enabled", tempProduct.is_enabled);
        setValue("image", tempProduct.imageUrl);
        setValue("img1", tempProduct.imagesUrl[0]);
        setValue("img2", tempProduct.imagesUrl[1]);
        setValue("img3", tempProduct.imagesUrl[2]);
        setValue("img4", tempProduct.imagesUrl[3]);
        setValue("img5", tempProduct.imagesUrl[4]);
      }
    }
  }, [type, tempProduct]);

  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1663465374413-83cba00bff6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80";
  };

  const handleCloseModal = () => {
    closeProductModal();
    if (type === "create") {
      reset({
        title: "",
        category: "",
        origin_price: 100,
        price: 300,
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
      });
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
      imageUrl: data.image,
      imagesUrl: [data.img1, data.img2, data.img3, data.img4, data.img5],
    };

    console.log("submitData", submitData);

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

      handleSuccessMessage(dispatch, res);
      handleCloseModal();
      getProducts();
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error);
    }
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="productModal"
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
              <div className="row flex-column">
                <div className="col mb-4">
                  <div className="row gx-5">
                    <div className="col-sm-4 mb-3 mb-sm-0">
                      <h6 className="h5 mb-2">主圖片</h6>
                      <div className="form-group mb-3">
                        <Input
                          id="image"
                          type="text"
                          labelText="輸入圖片網址"
                          placeholder="請輸入圖片連結"
                          register={register}
                          errors={errors}
                        />
                      </div>
                      <div className="form-group">
                        {/* <p className="mb-0">預覽圖片</p> */}
                        <img
                          src={watchImageUrl}
                          alt="預覽圖片"
                          className="img-fluid"
                          onError={handleImageError}
                        />
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <h6 className="h5 mb-2">副圖片</h6>
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
                        <div className="col d-flex ms-auto form-group">
                          <img
                            src={watchImg1Url}
                            alt="預覽圖片"
                            className="img-fluid mx-auto"
                            style={{ maxHeight: "100px" }}
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
                        <div className="col d-flex ms-auto form-group">
                          <img
                            src={watchImg2Url}
                            alt="預覽圖片"
                            className="img-fluid mx-auto"
                            style={{ maxHeight: "100px" }}
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
                        <div className="col d-flex ms-auto form-group">
                          <img
                            src={watchImg3Url}
                            alt="預覽圖片"
                            className="img-fluid mx-auto"
                            style={{ maxHeight: "100px" }}
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
                        <div className="col d-flex ms-auto form-group">
                          <img
                            src={watchImg4Url}
                            alt="預覽圖片"
                            className="img-fluid mx-auto"
                            style={{ maxHeight: "100px" }}
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
                        <div className="col d-flex ms-auto form-group">
                          <img
                            src={watchImg5Url}
                            alt="預覽圖片"
                            className="img-fluid mx-auto"
                            style={{ maxHeight: "100px" }}
                            onError={handleImageError}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col">
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
                      <Input
                        id="category"
                        type="text"
                        errors={errors}
                        labelText="分類"
                        placeholder="請輸入分類"
                        required={true}
                        register={register}
                        rules={{
                          required: "分類為必填",
                        }}
                      />
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
                  <div className="form-group mt-5 mb-2">
                    <CheckboxRadio
                      id="is_enabled"
                      name="is_enabled"
                      type="checkbox"
                      labelText="是否啟用"
                      register={register}
                      errors={errors}
                    />
                  </div>
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

export default ProductModal;
