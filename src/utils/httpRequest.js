import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};
export const post = async (path, options = {}) => {
  return await httpRequest.post(path, options);
};
export const destroy = async (path, options = {}) => {
  return await httpRequest.delete(path, options);
};
export const update = async (path, options = {}) => {
  return  await httpRequest.post(path, options);
};
export default httpRequest;
