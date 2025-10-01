import axios from "axios";

const getAuthToken = () => "sample-token";
const userId = () => "sample-user-id";


const apiEndpoint = "/api/v1";
console.log(userId);
const axiosClient = Object.freeze(
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + apiEndpoint,
    headers: {
      "Content-Type": "application/json",
      "user-id": (userId() as string) || "",
      Accept: "application/json",
      Authorization: `Bearer ${getAuthToken() ?? ""}`,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    },
  })
);

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAuthToken() ?? ""}`;
  config.headers["user-id"] = userId() as string;
  console.log(config.headers, "headers");
  return config;
});

export default axiosClient;
