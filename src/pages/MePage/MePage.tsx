import React, { useState } from "react";

import "./mePage.scss";
import MeView from "@pages/MePage/components/MeView/MeView";
import MeEdit from "@pages/MePage/components/MeEdit/MeEdit";
import MePassword from "./components/MePassword/MePassword";

const MePage = () => {
  const [tab, setTab] = useState<string>("edit");

  const onChangeTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <div className="me-page-wrap">
      <MeView onChangeTab={onChangeTab} />
      {tab === "edit" && <MeEdit />}
      {tab === "password" && <MePassword />}
    </div>
  );
};

export default MePage;
