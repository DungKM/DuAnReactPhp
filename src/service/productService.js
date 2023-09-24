import * as Request from "utils/httpRequest";

export const getProduct = async () => {
    try {
      const res = await Request.get("products");
     return res.data;
    } catch (error) {
        console.log(error);
    }
  };
export const getCategoriesBrands = async () => {
    try {
      const res = await Request.get("products/create");
     return res;
    } catch (error) {
        console.log(error);
    }
  };
export const postProduct = async (post) => {
    try {
      return await Request.post(`products`,post);
    } catch (error) {
        console.log(error);
    }
  };
export const destroyProduct = async (id) => {
    try {
     return await Request.destroy(`products/${id}`);
     
    } catch (error) {
        console.log(error);
    }
  };
export const editProduct = async (post, id) => {
    try {
     const res =  await Request.update(`products/${id}`,post);
     return res;
    } catch (error) {
        console.log(error);
    }
  };

export const detailProduct = async (id) => {
    try {
     const res =  await Request.get(`products/${id}`);
     return res;
    } catch (error) {
        console.log(error);
    }
  };
