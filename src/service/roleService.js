import * as Request from "utils/httpRequest";

export const getRole = async () => {
    try {
      const res = await Request.get("roles");
     return res.data;
    } catch (error) {
        console.log(error);
    }
  };
export const getPermission = async () => {
    try {
      const res = await Request.get("roles/create");
     return res;
    } catch (error) {
        console.log(error);
    }
  };
export const postRole = async (post) => {
    try {
      return await Request.post(`roles`,post);
    } catch (error) {
        console.log(error);
    }
  };
export const destroyRole = async (id) => {
    try {
     return await Request.destroy(`roles/${id}`);
     
    } catch (error) {
        console.log(error);
    }
  };
export const editRole = async (post, id) => {
    try {
     const res =  await Request.updateForm(`roles/${id}`,post);
     
     return res;
    } catch (error) {
        console.log(error);
    }
  };

export const detailRole = async (id) => {
    try {
     const res =  await Request.get(`roles/${id}`);
     return res;
    } catch (error) {
        console.log(error);
    }
  };
