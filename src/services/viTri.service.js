import { http } from "./config";
export const locationService = {
  getViTri: () => {
    return http.get("/vi-tri");
  },
};
