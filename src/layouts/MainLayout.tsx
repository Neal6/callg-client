//@ts-nocheck

import React from "react";

import "@layouts/mainLayout.scss";
import Header from "@layouts/Header";
import LeftLayout from "@layouts/LeftLayout";

const MainLayout = ({ children }: any) => {
  return (
    <div className="main-layout">
      <LeftLayout />
      <div className="content-layout">
        <Header />
        <div className="content-layout-right">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
