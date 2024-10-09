import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import TippyHeadless from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import styles from "./MovieItem.module.scss";

const cx = classNames.bind(styles);

export function MovieItemOnlyText({ movie, ...props }) {
  return (
    <Link to={movie.slug} {...props}>
      <div className={cx("infor-movie")}>
        <h4 className={cx("name-movie")}>{movie.name}</h4>
        <p className={cx("episode-current")}>{movie.episode_current}</p>
      </div>
    </Link>
  );
}

export function MovieItemSearch({ movie, hoverMovie = false, ...props }) {
  return (
    <Link
      className={cx("movie-result", hoverMovie && "hover-movie")}
      to={`/phim/${movie.item.slug}`}
      {...props}
    >
      <div className={cx("img-movie")}>
        {hoverMovie && (
          <FontAwesomeIcon className={cx("icon-caret")} icon={faCaretRight} />
        )}
        <img src={movie.seoOnPage.seoSchema.image} alt={movie.item.name} />
      </div>
      <div className={cx("title-movie")}>
        <p className={cx("name-movie")}>{movie.item.name}</p>
        <p className={cx("des-movie")}>
          {movie.item.episode_current + " - " + movie.item.lang}
        </p>
      </div>
    </Link>
  );
}

export function MovieItemMain({ movie, ...props }) {
  return (
    <TippyHeadless
      interactive={false}
      placement="right"
      render={(attrs) => (
        <div className={cx("detail-wrapper")} tabIndex="-1" {...attrs}>
          <div className={cx("detail-infor")}>
            <h1 className={cx("title-name")}>{movie.item.name}</h1>
            <div className={cx("infor-more")}>
              <div className={cx("quality")}>{movie.item.quality}</div>
              <div className={cx("time")}>{movie.item.time}</div>
              <div className={cx("create")}>
                {movie.item.created.time.split("-")[0]}
              </div>
            </div>
            <div
              className={cx("content")}
              dangerouslySetInnerHTML={{ __html: movie.item.content }}
            ></div>
            <div className={cx("category")}>
              {movie.item.category.map((item) => item.name).join(", ")}
            </div>
            <div className={cx("country")}>
              {movie.item.country.map((item) => item.name).join(", ")}
            </div>
          </div>
        </div>
      )}
    >
      <Link to={`/phim/${movie.item.slug}`} {...props}>
        <div className={cx("movie-inner")}>
          <div className={cx("img-movie")}>
            <div
              style={{
                backgroundImage: `url(${movie.seoOnPage.seoSchema.image})`,
              }}
            >
              <FontAwesomeIcon
                className={cx("icon-caret")}
                icon={faCaretRight}
              />
              <p className={cx("episode-current")}>
                {movie.item.episode_current.toLowerCase().includes("hoàn tất")
                  ? "Hoàn tất"
                  : movie.item.episode_current}
              </p>
            </div>
          </div>
          <div className={cx("name-movie")}>
            <p>{movie.item.name}</p>
          </div>
        </div>
      </Link>
    </TippyHeadless>
  );
}
