import React, { useRef } from "react";
import { GrFormClose } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";

import "./modalGlobal.scss";
import useOnClickOutside from "@hooks/useOnClickOutside";
import * as appAction from "@store/actions/appActions";

type PropTypes = {};

const ModalGlobal = (props: PropTypes) => {
  const { title = "", content } = useSelector(
    (state: any) => state.app.modalGlobal
  );
  const dispatch = useDispatch();
  const modalRef = useRef<any>();

  useOnClickOutside(modalRef, () => {
    onHideMOdal();
  });

  const onHideMOdal = () => {
    dispatch(appAction.hideModalGlobal());
  };

  return (
    <>
      {content && (
        <div className="modal-global-wrap">
          <div className="modal-global" ref={modalRef}>
            <div className="modal-global-header">
              <div className="modal-global-header-title">{title}</div>
              <div className="modal-global-header-close" onClick={onHideMOdal}>
                <GrFormClose />
              </div>
            </div>
            <div className="modal-global-content">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalGlobal;
