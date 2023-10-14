import * as Request from "utils/httpRequest";


export const postLogin = async (post) => {
    try {
      const res = await Request.post(`login`,post);
      return res.data
    } catch (error) {
        console.log(error);
    }
  };
