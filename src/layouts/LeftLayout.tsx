import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { BiNetworkChart } from "react-icons/bi";

import "@layouts/leftLayout.scss";
import { ReactComponent as Roadmap } from "@assets/images/svg/roadmap.svg";
import { ReactComponent as Board } from "@assets/images/svg/board.svg";
import { ReactComponent as Issue } from "@assets/images/svg/issue.svg";

interface PropsType {}

const LeftLayout = (props: PropsType) => {
  return (
    <div className="left-layout">
      <div className="left-layout__menu">
        <div className="left-layout__item">
          <Roadmap className="left-layout__icon" />
        </div>
        <div className="left-layout__item">
          <Board className="left-layout__icon" />
        </div>
        <div className="left-layout__item">
          <Issue className="left-layout__icon" />
        </div>
        <div className="left-layout__item">
          <BiNetworkChart className="left-layout__icon" />
        </div>
      </div>
    </div>
  );
};

export default LeftLayout;
