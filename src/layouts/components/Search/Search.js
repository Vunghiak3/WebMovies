import { useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import TippyHeadless from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import { useDebounce } from "~/hooks";
import * as searchServices from "~/services/searchServices";
import styles from "./Search.module.scss";
import { MovieItemSearch } from "~/components/MovieItem";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const deboucedValue = useDebounce(searchValue, 500);
  const inputRef = useRef();

  useEffect(() => {
    if (!deboucedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fechApi = async () => {
      setLoading(true);
      const result = await searchServices.getSearch(deboucedValue);
      setSearchResult(result);
      setLoading(false);
    };

    fechApi();
  }, [deboucedValue]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handelChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("search")}>
        <TippyHeadless
          interactive
          visible={showResult && Array.isArray(searchResult.items)}
          placement="bottom-start"
          onClickOutside={handleHideResult}
          appendTo="parent"
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
              {searchResult?.items?.map((result) => {
                return (
                  <div key={result.item._id} className={cx("item-wrapper")}>
                    <MovieItemSearch movie={result} />
                  </div>
                );
              })}
            </div>
          )}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm..."
            value={searchValue}
            onChange={handelChange}
            onFocus={() => setShowResult(true)}
          />
        </TippyHeadless>
        {!!searchValue && !loading && (
          <Tippy content="Xóa">
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </Tippy>
        )}
        {loading && (
          <FontAwesomeIcon icon={faSpinner} className={cx("loading")} />
        )}
        <Tippy content="Tìm kiếm">
          <button className={cx("btn-search")}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Tippy>
      </div>
    </div>
  );
}

export default Search;
