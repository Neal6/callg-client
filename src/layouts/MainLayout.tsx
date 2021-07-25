//@ts-nocheck

import React, { useState } from "react";

import "@layouts/mainLayout.scss";
import Header from "@layouts/Header";
import LeftLayout from "@layouts/LeftLayout";

const MainLayout = ({ children }: any) => {
  return (
    <div className="main-layout">
      <Header />
      <LeftLayout />
      <div className="content-layout">
        <div className="left-layout-replace"></div>
        <div className="content-layout-right">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
