import React, { useContext } from "react";
import { locationService } from "../../../services/viTri.service";
import { UploadRoomPicture } from "../../../components/ui/upload/UploadCustom";
import { InputNormal } from "../../../components/ui/input/InputCustom";
import { NotificationContext } from "../../../App";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button } from "antd";
const FormAddLocation = ({
  handleCloseModal,
  getAllRoom,
  isOnSubmit,
  initialValues,
  previewImage,
  setPreviewImage,
  location,
}) => {
  const { handleNotification } = useContext(NotificationContext);
  const { user, token } = useSelector((state) => state.userSlice);
  const {
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isOnSubmit) {
        // phần xử lý hình ảnh trước khi up API
        let formData = new FormData();
        formData.append("formFile", values.hinhAnh, values.hinhAnh.name);
        // tạo Clone up 1 API
        const valuesClone = { ...values };
        valuesClone.hinhAnh = "";
        //Đẩy dữ liệu lên API post Room
        locationService
          .postLocation(valuesClone, token)
          .then((res) => {
            locationService
              .uploadImgLocation(formData, res.data.content.id, token)
              .then((res) => {
                //Đẩy hình lên API upload hình ảnh
                handleNotification("success", "New room created successfully");
                handleCloseModal(true);
                getAllRoom();
                resetForm();
              })
              .catch((err) => {
                handleNotification("error", err.response.data.content);
              });
          })
          .catch((err) => {
            handleNotification("error", err.response.data.content);
          });
      } else {
        if (values.hinhAnh instanceof File) {
          // phần xử lý hình ảnh trước khi up API
          let formData = new FormData();
          formData.append("formFile", values.hinhAnh, values.hinhAnh.name);
          // tạo Clone up 1 API
          const valuesClone = { ...values };
          valuesClone.hinhAnh = "";
          locationService
            .editLocation(values.id, token, valuesClone)
            .then((res) => {
              console.log(res);
              locationService
                .uploadImgLocation(formData, values.id, token)
                .then((res) => {
                  handleNotification("success", "Chỉnh sửa thành công");
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          locationService
            .editLocation(values.id, token, values)
            .then((res) => {
              handleNotification("success", "Chỉnh sửa thành công");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  });
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="space-y-5">
        <UploadRoomPicture
          previewImage={previewImage}
          handleChange={(info) => {
            console.log(info);
            const file = info.file.originFileObj;
            setFieldValue("hinhAnh", file);
            // Tạo URL để xem trước hình ảnh
            const previewImg = URL.createObjectURL(file);
            setPreviewImage(previewImg);
          }}
        />
        <InputNormal
          labelContent={"Location Name"}
          name={"tenViTri"}
          id="tenViTri"
          value={values.tenViTri}
          placeholder={"Nhập tên vị trí"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.tenViTri}
          error={errors.tenViTri}
        />
        <InputNormal
          labelContent={"Province"}
          name={"tinhThanh"}
          id="tinhThanh"
          value={values.tinhThanh}
          placeholder={"Nhập tên Tỉnh Thành"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.tinhThanh}
          error={errors.tinhThanh}
        />
        <InputNormal
          labelContent={"Country"}
          name={"quocGia"}
          id="quocGia"
          value={values.quocGia}
          placeholder={"Nhập tên Tỉnh Thành"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.quocGia}
          error={errors.quocGia}
        />
        <div className="text-center">
          <Button
            htmlType="submit"
            className="p-5 bg-red-400 hover:!bg-red-600 text-white hover:!text-white !border-transparent"
          >
            {isOnSubmit ? "Add Location" : "Edit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAddLocation;
