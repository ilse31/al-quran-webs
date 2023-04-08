import axios from "axios";

const api = axios.create({
  baseURL: "https://al-quran-webs-9jwo1km2t-ilse31.vercel.app/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
