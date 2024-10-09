import * as request from "~/utils/httpRequest";

export const getCountry = async (q, type = "less") => {
  try {
    const res = await request.get("quoc-gia", {
      params: q,
      type,
    });

    return res.data.items;
  } catch (error) {
    console.log(error);
  }
};
