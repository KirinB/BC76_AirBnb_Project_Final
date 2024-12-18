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
};
