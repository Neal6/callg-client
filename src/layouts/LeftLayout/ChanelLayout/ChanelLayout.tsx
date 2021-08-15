import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IoFileTrayOutline, IoPeopleCircle } from "react-icons/io5";
import { IoMdWifi } from "react-icons/io";
import { RiSettings5Fill } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";

import "./chanelLayout.scss";
import * as chanelType from "@store/actionTypes/chanelType";
import ChanelLayoutItem from "@components/ChanelLayoutItem/ChanelLayoutItem";

const ChanelLayout = () => {
  const location = useLocation();
  const chanelList = useSelector((state: any) => state.chanel.chanelList);
  const loadingGetChanelRecent = useSelector(
    (state: any) => state.loading[chanelType.getChanelRecent]
  );

  const [focusSearch, setFocusSearch] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>("");
  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const handleFocusSearch = () => {
    setFocusSearch(true);
  };

  const handleBlurSearch = () => {
    setFocusSearch(false);
  };

  return (
    <div className="chanel-layout">
      <div
        className={`chanel-layout-search ${
          focusSearch ? "chanel-layout-search--active" : ""
        }`}
      >
        <input
          type="text"
          name="search-friend"
          className={`search-input ${
            focusSearch ? "search-input--active" : ""
          }`}
          placeholder="Tìm kiếm tên"
          onFocus={handleFocusSearch}
          onBlur={handleBlurSearch}
          autoComplete="new-password"
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
      <div className="chanel-layout-menu">
        <Link to={`${process.env.REACT_APP_ROUTE_FRIEND}`}>
          <div
            className={`chanel-layout-menu-item ${
              activeMenu.includes(`${process.env.REACT_APP_ROUTE_FRIEND}`)
                ? "chanel-layout-menu-item--active"
                : ""
            }`}
          >
            <IoPeopleCircle className="chanel-layout-menu-item-icon" />
            Bạn bè
          </div>
        </Link>
        <div className="chanel-layout-menu-item ">
          <IoMdWifi className="chanel-layout-menu-item-icon" />
          Hoạt động quanh đây
        </div>
      </div>

      <div className="chanel-layout-friend">
        <div className="chanel-layout-friend-header">
          <div className="chanel-layout-friend-title">Tin nhắn cá nhân</div>
          <RiSettings5Fill className="chanel-layout-friend-setting" />
        </div>
        {loadingGetChanelRecent === true ? (
          <div className="chanel-layout-skeleton">
            <div className="chanel-layout-skeleton-item">
              <Skeleton circle={true} height={40} width={40} />
              <div style={{ flex: 1, marginLeft: 8 }}>
                <Skeleton height={40} />
              </div>
            </div>
            <div className="chanel-layout-skeleton-item">
              <Skeleton circle={true} height={40} width={40} />
              <div style={{ flex: 1, marginLeft: 8 }}>
                <Skeleton height={40} />
              </div>
            </div>
            <div className="chanel-layout-skeleton-item">
              <Skeleton circle={true} height={40} width={40} />
              <div style={{ flex: 1, marginLeft: 8 }}>
                <Skeleton height={40} />
              </div>
            </div>
            <div className="chanel-layout-skeleton-item">
              <Skeleton circle={true} height={40} width={40} />
              <div style={{ flex: 1, marginLeft: 8 }}>
                <Skeleton height={40} />
              </div>
            </div>
            <div className="chanel-layout-skeleton-item">
              <Skeleton circle={true} height={40} width={40} />
              <div style={{ flex: 1, marginLeft: 8 }}>
                <Skeleton height={40} />
              </div>
            </div>
            <div className="chanel-layout-skeleton-item">
              <Skeleton circle={true} height={40} width={40} />
              <div style={{ flex: 1, marginLeft: 8 }}>
                <Skeleton height={40} />
              </div>
            </div>
            <div className="chanel-layout-skeleton-item">
              <Skeleton circle={true} height={40} width={40} />
              <div style={{ flex: 1, marginLeft: 8 }}>
                <Skeleton height={40} />
              </div>
            </div>
          </div>
        ) : (
          <div className="chanel-layout-friend-list">
            {chanelList.map((chanel: any) => (
              <ChanelLayoutItem key={chanel.id} chanel={chanel} />
            ))}
          </div>
        )}
      </div>

      <div className="chanel-layout-group">
        <div className="chanel-layout-group-header">
          <div className="chanel-layout-group-title">Tin nhắn nhóm</div>
          <RiSettings5Fill className="chanel-layout-group-setting" />
        </div>
      </div>
    </div>
  );
};

export default ChanelLayout;
