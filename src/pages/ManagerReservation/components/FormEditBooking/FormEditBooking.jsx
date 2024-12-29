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
import { format } from "date-fns";
const FormEditBooking = ({ initialValues }) => {
  const { handleNotification } = useContext(NotificationContext);
  const { values, handleSubmit, handleBlur, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values) => {
        reservationService
          .putReservation(values.id, values)
          .then((res) => {
            console.log(res);
            handleNotification("success", "Sửa thông tin đặt phòng thành công");
          })
          .catch((err) => {
            console.log(err);
            handleNotification("error", err.res.data.content);
          });
      },
      validationSchema: Yup.object({
        soLuongKhach: Yup.number()
          .required("Vui lòng không bỏ trống")
          .min(1, "Vui lòng nhập trên 1 khách"),
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
          readOnly={true}
        />
        <InputNormal
          labelContent={"Mã phòng"}
          id="maPhong"
          name={"maPhong"}
          value={values.maPhong}
          readOnly={true}
        />
        <div className="grid grid-cols-2 gap-5">
          <DatePickerCustom
            labelContent={"Ngày Đến"}
            id={"ngayDen"}
            name={"ngayDen"}
            format={"DD/MM/YYYY"}
            value={values.ngayDen ? dayjs(values.ngayDen, "DD/MM/YYYY") : null}
            error={errors.ngayDen}
            touched={touched.ngayDen}
            handleChange={(date, dateString) => {
              setFieldValue("ngayDen", dateString);
            }}
            handleBlur={handleBlur}
          />
          <DatePickerCustom
            labelContent={"Ngày Đi"}
            id={"ngayDi"}
            name={"ngayDi"}
            format={"DD/MM/YYYY"}
            value={values.ngayDi ? dayjs(values.ngayDi) : null}
            error={errors.ngayDi}
            touched={touched.ngayDi}
            handleChange={(date, dateString) => {
              setFieldValue("ngayDi", dateString);
            }}
            handleBlur={handleBlur}
          />
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={(date, dateString) => {
              console.log(dateString);
            }}
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
          readOnly={true}
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
