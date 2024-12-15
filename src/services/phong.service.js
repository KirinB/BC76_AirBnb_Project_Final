import { http } from "./config";

export const phongService = {
  getListPhong: () => {
    return http.get("/phong-thue");
  },
  getListRoomById: (id) => {
    return http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`);
  },
  searchByKeyword: (pageIndex, keyword) => {
    return http.get(
      `/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=10&keyword=${keyword}`
    );
  },
  deleteRoom: (id, token) => {
    return http.delete(`/phong-thue/${id}`, { headers: { token } });
  },
  getRoomById: (id) => {
    return http.get(`/phong-thue/${id}`);
  },
};
