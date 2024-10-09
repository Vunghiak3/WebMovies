import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./LstMovie.module.scss";
import * as movieServices from "~/services/movieServices";
import { WrapperMovieMain } from "~/components/MovieItem/WrapperMovie/WrapperMovie";

const cx = classNames.bind(styles);

function LstMovie() {
  const [lstMovie, setLstMovie] = useState([]);
  console.log("🚀 ~ LstMovie ~ lstMovie:", lstMovie)
  const [page, setPage] = useState(1);
  const params = useParams();
  const loaiPhim = Object.values(params)[0];
  const navigate = useNavigate();

  useEffect(() => {
    setLstMovie([]);
    const fetchApiLstMovie = async () => {
      const result = await movieServices.getLstMovieBySlug(loaiPhim, {
        page: page,
      });

      setLstMovie(result);
    };

    fetchApiLstMovie();
  }, [loaiPhim, page]);

  const handleChangePage = useCallback(
    (newPage) => {
      setPage(newPage);
      navigate(`?page=${newPage}`);
    },
    [navigate]
  );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <WrapperMovieMain
          movies={lstMovie}
          pagination
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
}

export default LstMovie;
