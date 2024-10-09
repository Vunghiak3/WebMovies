import * as request from "~/utils/httpRequest";

export const getGenre = async (q, type = "less") => {
  try {
    const res = await request.get("the-loai", {
      params: {
        q,
        type,
      },
    });

    return res.data.items;
  } catch (error) {
    console.log(error);
  }
};