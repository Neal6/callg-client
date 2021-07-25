import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { IoFileTrayOutline } from "react-icons/io5";

import "@components/HeaderSearch/headerSearch.scss";

const HeaderSearch = () => {
  const [focusSearch, setFocusSearch] = useState<boolean>(false);

  const handleFocusSearch = () => {
    setFocusSearch(true);
  };

  const handleBlurSearch = () => {
    setFocusSearch(false);
  };

  return (
    <div
      className={`header-search ${focusSearch ? "header-search--active" : ""}`}
    >
      <input
        type="text"
        className={`search-input ${focusSearch ? "search-input--active" : ""}`}
        placeholder="Tìm kiếm #ID, Group"
        onFocus={handleFocusSearch}
        onBlur={handleBlurSearch}
      />
      <RiSearch2Line
        className={`search-icon  ${focusSearch ? "search-icon--active" : ""}`}
      />
      {focusSearch && (
        <div className="header-search-result">
          <div className="header-search-result__header">
            <p className="header-search-result__title">Tìm kiếm gần đây</p>
            <p className="header-search-result__history">Lịch sử</p>
          </div>
          <div className="header-search-list"></div>
          <div className="header-search-empty">
            <IoFileTrayOutline className="header-search-empty__icon" />
            <p className="header-search-empty__text">Không có dữ liệu</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
