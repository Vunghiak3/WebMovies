import config from "~/config";
import * as request from "~/utils/httpRequest";

export const getLstMovieBySlug = async (slug, q, type = "less") => {
  try {
    const res = await request.get(`${config.routes.danhsach}/${slug}`, {
      params: q,
      type,
    });

    const movies = res.data;

    const result = await Promise.all(
      movies.items.map(async (movie) => {
        const res = await request.get(`phim/${movie.slug}`, {
          params: q,
          type,
        });
        return res.data;
      })
    );

    movies.items = result;

    return movies;
  } catch (error) {
    console.log(error);
  }
};
