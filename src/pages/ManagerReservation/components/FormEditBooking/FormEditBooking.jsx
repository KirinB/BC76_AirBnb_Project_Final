import React, { useContext, useEffect } from "react";
import {
  InputNormal,
  InputNumberCustom,
} from "../../../../components/ui/input/InputCustom";
import { useFormik } from "formik";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { DatePickerCustom } from "../../../../components/ui/datePicker/DatePickerCustom";
import { reservationService } from "../../../../services/reservation.service";
import { NotificationContext } from "../../../../App";
import * as Yup from "yup";
import { SiTrueup } from "react-icons/si";
const FormEditBooking = ({
  initialValues,
  getAllReservation,
  setIsModalOpen,
}) => {
  const { handleNotification } = useContext(NotificationContext);
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      ...initialValues,
      ngayDen: dayjs(initialValues.ngayDen),
      ngayDi: dayjs(initialValues.ngayDi),
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      const ngayDenISO = dayjs(values.ngayDen, "DD-MM-YYYY").format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      const ngayDiISO = dayjs(values.ngayDi, "DD-MM-YYYY").format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      reservationService
        .putReservation(values.id, {
          ...values,
          ngayDen: ngayDenISO,
          ngayDi: ngayDiISO,
        })
        .then((res) => {
          console.log("Response:", res);
          getAllReservation();
          setIsModalOpen(false);
          handleNotification("success", "Sửa thông tin đặt phòng thành công");
        })
        .catch((err) => {
          console.error("Error:", err);
          getAllReservation();
          handleNotification(
            "error",
            err?.response?.data?.content || "Có lỗi xảy ra"
          );
        });
    },

    validationSchema: Yup.object({
      soLuongKhach: Yup.number()
        .required("Vui lòng không bỏ trống")
        .min(1, "Vui lòng nhập trên 1 khách"),

      ngayDen: Yup.string().required("Vui lòng chọn ngày đến"),
      ngayDi: Yup.string().required("Vui lòng chọn ngày đi"),
    }),
  });
  return (
    <div>
      <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <InputNormal
          labelContent={"Mã đặt phòng"}
          id="id"
          name={"id"}
          value={values.id}
          disabled={true}
        />
        <InputNormal
          labelContent={"Mã phòng"}
          id="maPhong"
          name={"maPhong"}
          value={values.maPhong}
          disabled={true}
        />
        <div className="grid grid-cols-2 gap-5">
          <DatePickerCustom
            id="ngayDen"
            name="ngayDen"
            labelContent="Ngày Đến"
            value={values.ngayDen}
            format={"DD-MM-YYYY"}
            error={errors.ngayDen}
            touched={touched.ngayDen}
            handleChange={(date) => setFieldValue("ngayDen", date)}
            handleBlur={handleBlur}
          />

          <DatePickerCustom
            id="ngayDi"
            name="ngayDi"
            labelContent="Ngày Đi"
            value={values.ngayDi}
            error={errors.ngayDi}
            format={"DD-MM-YYYY"}
            touched={touched.ngayDi}
            handleChange={(date) => setFieldValue("ngayDi", date)}
            handleBlur={handleBlur}
          />
        </div>
        <InputNumberCustom
          labelContent={"Số lượng khách"}
          id="soLuongKhach"
          name={"soLuongKhach"}
          value={values.soLuongKhach}
          handleChange={(value) => {
            setFieldValue("soLuongKhach", value);
          }}
          handleBlur={handleBlur}
          error={errors.soLuongKhach}
          touched={touched.soLuongKhach}
        />
        <InputNormal
          labelContent={"Mã người dùng"}
          id="maNguoiDung"
          name={"maNguoiDung"}
          value={values.maNguoiDung}
          disabled={true}
        />
        <div className="text-center">
          <Button
            htmlType="submit"
            className="p-5 bg-red-400 hover:!bg-red-600 text-white hover:!text-white !border-transparent"
          >
            {"Put Form"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormEditBooking;
