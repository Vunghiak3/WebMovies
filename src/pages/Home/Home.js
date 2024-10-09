import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import * as movieServices from "~/services/movieServices";
import { WrapperMovieMain } from "~/components/MovieItem/WrapperMovie/WrapperMovie";

const cx = classNames.bind(styles);

function Home() {
  const [newMovies, setNewMovies] = useState([]);
  const [trailerMovies, setTrailerMovies] = useState([]);
  const numberItemMovie = 10;

  useEffect(() => {
    const fetchApiNewMovies = async () => {
      const result = await movieServices.getLstMovieBySlug(
        "phim-moi-cap-nhat",
        {page: 1}
      );
      setNewMovies(result);
    };

    const fetchApiTrailerMovies = async () => {
      const result = await movieServices.getLstMovieBySlug('phim-sap-chieu', );
      setTrailerMovies(result);
    };

    fetchApiTrailerMovies();
    fetchApiNewMovies();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <WrapperMovieMain movies={newMovies} number={numberItemMovie} />

      <WrapperMovieMain movies={trailerMovies} number={numberItemMovie} />
    </div>
  );
}

export default Home;
