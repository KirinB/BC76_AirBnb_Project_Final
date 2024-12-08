import { http } from "./config";
export const userService = {
  getAllUsers: () => {
    return http.get("/users");
  },
  postUser: (data) => {
    return http.post("/users", data);
  },
  getUserById: (id) => {
    return http.get(`/users/${id}`);
  },
  putUsers: (id, data) => {
    return http.put(`/users`, id, data);
  },
  deleteUserById: (id) => {
    return http.delete(`/users?id=${id}`);
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
