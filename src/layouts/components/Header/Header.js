import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import * as genreServices from "~/services/genreServices";
import config from "~/config";
import Search from "../Search";
import styles from "./Header.module.scss";
import Button from "~/components/Button";
import images from "~/assets/imgs";
import { getCountry } from "~/services/countryServices";
import Menu from "~/components/Popper/MenuItem/Menu";

const cx = classNames.bind(styles);

function Header() {
  const [lstGenre, setLstGenre] = useState([]);
  const [lstCountry, setLstCountry] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchApiGenre = async () => {
      const result = await genreServices.getGenre();

      setLstGenre(result);
    };

    const fetchApiCountry = async () => {
      const result = await getCountry();

      setLstCountry(result);
    };

    fetchApiGenre();
    fetchApiCountry();
  }, []);

  const handleShowMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("header")}>
          <div className={cx("logo")}>
            <Link to={config.routes.home}>
              <img src={images.imgLogo.path} alt={images.imgLogo.des} />
            </Link>
          </div>
          <Search />
          <div className={cx("actions")}>
            <Button to={config.routes.login} className={cx("btn-login")}>
              Đăng nhập
            </Button>

            <div className={cx("btn-menu")} onClick={handleShowMenu}>
              <span className={cx("bar")}></span>
              <span className={cx("bar")}></span>
              <span className={cx("bar")}></span>
            </div>
          </div>
        </div>
        <div className={cx("nav-menu")}>
          <Link to={config.routes.home} className={cx("menu-item")}>
            Trang chủ
          </Link>
          <Link
            to={`${config.routes.danhsach}/phim-bo`}
            className={cx("menu-item")}
          >
            Phim bộ
          </Link>
          <Link
            to={`${config.routes.danhsach}/phim-le`}
            className={cx("menu-item")}
          >
            Phim lẻ
          </Link>
          <Link
            to={`${config.routes.danhsach}/tv-shows`}
            className={cx("menu-item")}
          >
            Shows
          </Link>
          <Link
            to={`${config.routes.danhsach}/hoat-hinh`}
            className={cx("menu-item")}
          >
            Hoạt hình
          </Link>
          <Menu items={lstGenre} slug={config.routes.theloai}>
            <div className={cx("menu-item")}>
              Thể loại
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </Menu>
          <Menu items={lstCountry} slug={config.routes.quocgia}>
            <div className={cx("menu-item")}>
              Quốc gia
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </Menu>
          <Link to={`${config.routes.danhsach}/phim-sap-chieu`} className={cx("menu-item")}>
            Sắp chiếu
          </Link>
        </div>
        <div className={cx("menu-reponsive", { "menu-active": isMenuOpen })}>
          <Link to={config.routes.home} className={cx("menu-item")}>
            Trang chủ
          </Link>
          <Link to={config.routes.phimbo} className={cx("menu-item")}>
            Phim bộ
          </Link>
          <Link to={config.routes.phimle} className={cx("menu-item")}>
            Phim lẻ
          </Link>
          <Link to={config.routes.shows} className={cx("menu-item")}>
            Shows
          </Link>
          <Link to={config.routes.hoathinh} className={cx("menu-item")}>
            Hoạt hình
          </Link>
          {/* <Menu items={lstGenre}>
            <div className={cx("menu-item")}>
              Thể loại
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </Menu>
          <Menu items={lstCountry}>
            <div className={cx("menu-item")}>
              Quốc gia
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </Menu> */}
          <Link to={config.routes.phimsapchieu} className={cx("menu-item")}>
            Sắp chiếu
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
