import * as Request from "utils/httpRequest";

export const getUser = async () => {
    try {
      const res = await Request.get("users");
     return res.data;
    } catch (error) {
        console.log(error);
    }
  };
export const getRolesUser = async () => {
    try {
      const res = await Request.get("users/create");
     return res;
    } catch (error) {
        console.log(error);
    }
  };
export const postUser = async (post) => {
    try {
      return await Request.post(`users`,post);
    } catch (error) {
        console.log(error);
    }
  };
export const destroyUser = async (id) => {
    try {
     return await Request.destroy(`users/${id}`);
     
    } catch (error) {
        console.log(error);
    }
  };
export const editUser = async (post, id) => {
    try {
     const res =  await Request.updateForm(`users/${id}`,post);
     
     return res;
    } catch (error) {
        console.log(error);
    }
  };

export const detailUser = async (id) => {
    try {
     const res =  await Request.get(`users/${id}`);
     return res;
    } catch (error) {
        console.log(error);
    }
  };
