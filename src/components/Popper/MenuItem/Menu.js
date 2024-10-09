import TippyHeadless from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import MenuWrapper from "../MenuWrapper";

const cx = classNames.bind(styles);

function Menu({ children, slug, items = [] }) {
  return (
    <TippyHeadless
      interactive
      placement="bottom-start"
      appendTo="parent"
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <MenuWrapper classname={cx("menu-wrapper")}>
            {items.map((item) => (
              <MenuItem
                key={item._id}
                name={item.name}
                slug={`${slug}/${item.slug}`}
              />
            ))}
          </MenuWrapper>
        </div>
      )}
    >
      {children}
    </TippyHeadless>
  );
}

export default Menu;
