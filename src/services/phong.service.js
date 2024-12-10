import { http } from "./config";

export const phongService = {
  getListPhong: () => {
    return http.get("/phong-thue");
  },
  getListRoomById: (id) => {
    return http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`);
  },
  getRoomById: (id) => {
    return http.get(`/phong-thue/${id}`);
  },
};
