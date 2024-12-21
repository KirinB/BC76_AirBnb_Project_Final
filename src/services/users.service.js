import { http } from "./config";

export const userService = {
  uploadAvt: (data, token) => {
    return http.post("/users/upload-avatar", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token
        "Content-Type": "multipart/form-data", // Đảm bảo định dạng đúng
      },
    });
  },
};
