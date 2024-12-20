import React, { useContext, useEffect, useState } from "react";
import {
  InputNormal,
  InputNumberCustom,
} from "../../../../components/ui/input/InputCustom";
import { useFormik } from "formik";
import { SelectCustom } from "../../../../components/ui/select/SelectCustom";
import { locationService } from "../../../../services/viTri.service";
import { SwitchRoom } from "../../../../components/ui/switch/SwitchCustom";
import { useSelector } from "react-redux";
import { phongService } from "../../../../services/phong.service";
import { Button, Result, Upload } from "antd";
import { NotificationContext } from "../../../../App";
import { UploadRoomPicture } from "../../../../components/ui/upload/UploadCustom";
const FormAddRoom = ({
  handleCloseModal,
  getAllRoom,
  isOnSubmit,
  initialValues,
  previewImage,
  setPreviewImage,
  location,
}) => {
  // Xử lý hình ảnh

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
        phongService
          .postPhong(valuesClone, token)
          .then((res) => {
            phongService
              .postImageRoom(formData, res.data.content.id, token)
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
          phongService
            .editRoom(values.id, token, valuesClone)
            .then((res) => {
              console.log(res);
              phongService
                .postImageRoom(formData, values.id, token)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          phongService
            .editRoom(values.id, token, values)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  });
  // call API lấy vị trí trong select

  return (
    <div>
      {/* Phần xử lí hình ảnh với UpLoad ant Design */}
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

        <div className="grid grid-cols-2 gap-5">
          <InputNormal
            labelContent={"Room's Name"}
            name={"tenPhong"}
            id="tenPhong"
            value={values.tenPhong}
            placeholder={"Điền tên phòng vào đây"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched.tenPhong}
            error={errors.tenPhong}
          />
          <InputNormal
            labelContent={"Description"}
            name={"moTa"}
            id="moTa"
            placeholder={"Nhập mô tả vào đây"}
            value={values.moTa}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched.moTa}
            error={errors.moTa}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <SelectCustom
            labelContent={"Vị trí"}
            handleChange={(value, option) => {
              setFieldValue("maViTri", value);
            }}
            options={location.map((loc) => {
              return {
                label: (
                  <div className="flex items-center gap-3">
                    <img
                      src={loc.hinhAnh}
                      className="w-[30px] h-[30px] rounded-md"
                      alt=""
                    />
                    <p>{loc.tenViTri}</p>
                  </div>
                ),
                value: loc.id,
              };
            })}
            error={errors.maViTri}
            touched={touched.maViTri}
          />
          <InputNumberCustom
            labelContent={"Số khách"}
            placeholder="2"
            id="khach"
            name={"khach"}
            value={values.khach}
            handleChange={(value) => {
              if (value == "") {
                setFieldValue("khach", 0);
              } else {
                setFieldValue("khach", value * 1);
              }
            }}
            handleBlur={handleBlur}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputNumberCustom
            labelContent={"Số phòng ngủ"}
            placeholder="2"
            id="phongNgu"
            name={"phongNgu"}
            value={values.phongNgu}
            handleChange={(value) => {
              if (value == "") {
                setFieldValue("phongNgu", 0);
              } else {
                setFieldValue("phongNgu", value * 1);
              }
            }}
            handleBlur={handleBlur}
          />
          <InputNumberCustom
            labelContent={"Số giường ngủ"}
            placeholder="2"
            id="giuong"
            name={"giuong"}
            value={values.giuong}
            handleChange={(value) => {
              if (value == "") {
                setFieldValue("giuong", 0);
              } else {
                setFieldValue("giuong", value * 1);
              }
            }}
            handleBlur={handleBlur}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <InputNumberCustom
            labelContent={"Số phòng tắm"}
            placeholder="2"
            id="phongTam"
            name={"phongTam"}
            value={values.phongTam}
            handleChange={(value) => {
              if (value == "") {
                setFieldValue("phongTam", 0);
              } else {
                setFieldValue("phongTam", value * 1);
              }
            }}
            handleBlur={handleBlur}
          />
          <InputNumberCustom
            labelContent={"Giá phòng"}
            placeholder="Đơn vị $"
            id="giaTien"
            name={"giaTien"}
            value={values.giaTien}
            handleChange={(value) => {
              if (value == "") {
                setFieldValue("giaTien", 0);
              } else {
                setFieldValue("giaTien", value * 1);
              }
            }}
            handleBlur={handleBlur}
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <SwitchRoom
            labelContent={"Máy giặt"}
            id={"mayGiat"}
            name={"mayGiat"}
            value={values.mayGiat}
            handleChange={(checked) => {
              setFieldValue("mayGiat", checked);
            }}
          />
          <SwitchRoom
            labelContent={"Bàn là"}
            id={"banLa"}
            name={"banLa"}
            value={values.banLa}
            handleChange={(checked) => {
              setFieldValue("banLa", checked);
            }}
          />
          <SwitchRoom
            labelContent={"Tivi"}
            id={"tivi"}
            name={"tivi"}
            value={values.tivi}
            handleChange={(checked) => {
              setFieldValue("tivi", checked);
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <SwitchRoom
            labelContent={"Điều hòa"}
            id={"dieuHoa"}
            name={"dieuHoa"}
            value={values.dieuHoa}
            handleChange={(checked) => {
              setFieldValue("dieuHoa", checked);
            }}
          />
          <SwitchRoom
            labelContent={"Wifi"}
            id={"wifi"}
            name={"wifi"}
            value={values.wifi}
            handleChange={(checked) => {
              setFieldValue("wifi", checked);
            }}
          />
          <SwitchRoom
            labelContent={"Bếp"}
            id={"bep"}
            name={"bep"}
            value={values.bep}
            handleChange={(checked) => {
              setFieldValue("bep", checked);
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <SwitchRoom
            labelContent={"Đỗ xe"}
            id={"doXe"}
            name={"doXe"}
            value={values.doXe}
            handleChange={(checked) => {
              setFieldValue("doXe", checked);
            }}
          />
          <SwitchRoom
            labelContent={"Hồ bơi"}
            id={"hoBoi"}
            name={"hoBoi"}
            value={values.hoBoi}
            handleChange={(checked) => {
              setFieldValue("hoBoi", checked);
            }}
          />
        </div>
        <div className="text-center">
          <Button
            htmlType="submit"
            className="p-5 bg-red-400 hover:!bg-red-600 text-white hover:!text-white !border-transparent"
          >
            {isOnSubmit ? "Add Room" : "Edit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAddRoom;
