import axios from "axios";
import { store } from "../context/LoaderContext"; // ✅ Global Loader Context ka Access

// ✅ Base Axios Instance
const axiosInstance = axios.create({
  baseURL: "https://ubikon.in/api/", // Apni API ka base URL yaha set karo
  headers: { "Content-Type": "application/json" },
});

// ✅ Request Interceptor: Loader ON
axiosInstance.interceptors.request.use(
  (config) => {
    store.setLoading(true); // ✅ API Request Start hote hi Loader ON
    return config;
  },
  (error) => {
    store.setLoading(false); // ✅ Request Error pe Loader OFF
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor: Loader OFF
axiosInstance.interceptors.response.use(
  (response) => {
    store.setLoading(false); // ✅ API Response aate hi Loader OFF
    return response;
  },
  (error) => {
    store.setLoading(false); // ✅ Error aane par bhi Loader OFF
    return Promise.reject(error);
  }
);

export default axiosInstance;
