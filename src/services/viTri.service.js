import { http } from "./config";
export const locationService = {
  getViTri: () => {
    return http.get("/vi-tri");
  },
  getAllLocation: (pageIndex, keyword) => {
    return http.get(
      `/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=10&keyword=${keyword}`
    );
  },
  postLocation: () => {
    return http.post("/vi-tri");
  },
  getLocationByID: (id) => {
    return http.get(`/vi-tri/${id}`);
  },
  editLocation: (id, token, data) => {
    return http.put(`/vi-tri/${id}`, { headers: { token } }, data);
  },
  deleteLocation: (id, token) => {
    return http.delete(`/vi-tri/${id}`, { headers: { token } });
  },
  uploadImgLocation: (formData, id, token) => {
    return http.post(`/vi-tri/upload-hinh-vitri?maViTri=${id}`, formData, {
      headers: { token },
    });
  },
};
