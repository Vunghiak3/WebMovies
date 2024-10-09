import * as request from "~/utils/httpRequest";

export const getSearch = async (keyword, type = "less") => {
  try {
    const res = await request.get("tim-kiem", {
      params: {
        keyword,
        type,
      },
    });

    const movies = res.data

    const result = await Promise.all(
      movies.items.map(async(movie)=>{
        const res = await request.get(`phim/${movie.slug}`, {
          params: '',
          type
        })
        return res.data
      })
    )

    movies.items = result

    return movies;
  } catch (error) {
    console.log(error);
  }
};
