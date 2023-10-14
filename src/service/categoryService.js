import * as Request from "utils/httpRequest";




export const getCategory = async () => {
  try {
    const res = await Request.get("categories");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const postCategory = async (post) => {
  try {
    return await Request.post(`categories`, post);
  } catch (error) {
    console.log(error);
  }
};
export const destroyCategory = async (id) => {
  try {
    return await Request.destroy(`categories/${id}`);
  } catch (error) {
    console.log(error);
  }
};
export const editCategory = async (post, id) => {
  try {
    return await Request.update(`categories/${id}`, post);
  } catch (error) {
    console.log(error);
  }
};

export const detailCategory = async (id) => {
  try {
    const res = await Request.get(`categories/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
