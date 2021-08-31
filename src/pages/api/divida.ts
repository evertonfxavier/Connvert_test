import axios from "axios";

export const divida = axios.create({
  baseURL: "https://provadev.xlab.digital/api/v1/",
});
