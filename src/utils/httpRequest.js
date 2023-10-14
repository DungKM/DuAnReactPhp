import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
httpRequest.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path, data = {}, options = {}) => {
  return await httpRequest.post(path, data, options);
};

export const destroy = async (path, options = {}) => {
  return await httpRequest.delete(path, options);
};

export const update = async (path, data = {}, options = {}) => {
  return await httpRequest.post(path, data, options);
};

export const updateForm = async (path, data = {}, options = {}) => {
  // options.headers = { ...options.headers, ...headers };
  return await httpRequest.put(path, data, options);
};

// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });
// instance.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = Bearer ${token};
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export default httpRequest;
