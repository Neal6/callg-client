import React, { useState } from "react";

import "./mePage.scss";
import MeView from "@pages/MePage/components/MeView/MeView";
import MeEdit from "@pages/MePage/components/MeEdit/MeEdit";
import MePassword from "@pages/MePage/components/MePassword/MePassword";

const MePage = () => {
  const [tab, setTab] = useState<string>("edit");

  const onChangeTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <div className="me-page-wrap">
      <MeView tab={tab} onChangeTab={onChangeTab} />
      <div className="me-page-right-content">
        {tab === "edit" && <MeEdit />}
        {tab === "password" && <MePassword />}
      </div>
    </div>
  );
};

export default MePage;
