import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function MenuItem({ name, slug, ...props }) {
  return (
    <Link className={cx('menu-item')} to={slug} {...props}>
      {name}
    </Link>
  );
}

export default MenuItem;
