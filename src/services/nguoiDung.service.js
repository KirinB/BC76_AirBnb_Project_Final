import { http } from "./config";

export const nguoiDungSerivce = {
  getUsers: () => {
    return http.get("/users");
  },
  postUsers: (data) => {
    return http.post("/users", data);
  },
  deleteUsers: (id) => {
    return http.delete(`/users?id=${id}`);
  },
  getUserByID: (id) => {
    return http.get(`/users/${id}`);
  },

  // phần chưa sử dụng
  getAllUsers: () => {
    return http.get("/users");
  },
  getUserFind: (pageIndex, keyword) => {
    return http.get(
      `/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=10&keyword=${keyword}`
    );
  },
  searchUserByName: (name) => {
    return http.get(`users/search/${name}`);
  },
  postAvatarUser: (file, token) => {
    return http.post("/users/upload-avatar", file, {
      headers: { token },
    });
  },
};
