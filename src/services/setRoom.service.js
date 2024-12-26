import { http } from "./config";

export const setRoomService = {
  setRoomService: (data) => {
    return http.post("/dat-phong", data);
  },
};
