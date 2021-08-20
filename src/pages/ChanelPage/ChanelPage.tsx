import React from "react";
import { useParams } from "react-router-dom";

import "./chanelPage.scss";
import ChanelForm from "@pages/ChanelPage/components/ChanelForm/ChanelForm";
import ChanelContent from "@pages/ChanelPage/components/ChanelCotent/ChanelContent";
import ChanelHeader from "@pages/ChanelPage/components/ChanelHeader/ChanelHeader";

const ChanelPage = () => {
  return (
    <div className="chanel">
      <ChanelHeader />
      <ChanelContent />
      <ChanelForm />
    </div>
  );
};

export default ChanelPage;
