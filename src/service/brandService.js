import * as Request from "utils/httpRequest";

export const getBrand = async () => {
    try {
      const res = await Request.get("brands");
     return res.data;
    } catch (error) {
        console.log(error);
    }
  };
export const postBrand = async (post) => {
    try {
      return await Request.post(`brands`,post);
    } catch (error) {
        console.log(error);
    }
  };
export const destroyBrand = async (id) => {
    try {
     return await Request.destroy(`brands/${id}`);
     
    } catch (error) {
        console.log(error);
    }
  };
export const editBrand = async (post, id) => {
    try {
     const res =  await Request.update(`brands/${id}`,post);
     return res;
    } catch (error) {
        console.log(error);
    }
  };

export const detailBrand = async (id) => {
    try {
     const res =  await Request.get(`brands/${id}`);
     return res;
    } catch (error) {
        console.log(error);
    }
  };
