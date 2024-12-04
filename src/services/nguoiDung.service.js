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
};
