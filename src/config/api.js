import axios from "axios";

debugger;

const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2/",
  timeout: 1000,
  headers: {
    Authorization: "Bearer " + import.meta.env.VITE_GO_REST_API_TOKEN,
  },
});

export default api;
