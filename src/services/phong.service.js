import { http } from "./config";

export const phongService = {
  getListPhong: () => {
    return http.get("/phong-thue");
  },
  postPhong: (data, token) => {
    return http.post("/phong-thue", data, { headers: { token } });
  },
  getListRoomById: (id) => {
    return http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`);
  },
  searchByKeyword: (pageIndex, keyword) => {
    return http.get(
      `/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=10&keyword=${keyword}`
    );
  },
  editRoom: (id, token, data) => {
    return http.put(`phong-thue/${id}`, { headers: { token } }, data);
  },
  postImageRoom: (formData, id, token) => {
    return http.post(`/phong-thue/upload-hinh-phong?maPhong=${id}`, formData, {
      headers: { token },
    });
  },
  deleteRoom: (id, token) => {
    return http.delete(`/phong-thue/${id}`, { headers: { token } });
  },
  getRoomById: (id) => {
    return http.get(`/phong-thue/${id}`);
  },
};
