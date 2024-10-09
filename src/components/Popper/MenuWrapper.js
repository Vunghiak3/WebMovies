import classNames from "classnames/bind";

import styles from "./MenuWrapper.module.scss";

const cx = classNames.bind(styles);

function MenuWrapper({ children, classname, ...props }) {
  return (
    <div className={cx("wrapper", classname)} {...props}>
      {children}
    </div>
  );
}

export default MenuWrapper;
