import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavigationPrompt from "react-router-navigation-prompt";
import { IoClose } from "react-icons/io5";

import "./promptModal.scss";
import * as appActions from "@store/actions/appActions";

const PromptModal = () => {
  const dispatch = useDispatch();
  const prompt = useSelector((state: any) => state.app.prompt);
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  return (
    <div>
      {useMemo(
        () => (
          <NavigationPrompt
            when={prompt && isLogin}
            disableNative={true}
            afterCancel={() => {
              dispatch(appActions.showPrompt());
            }}
            afterConfirm={() => {
              dispatch(appActions.hidePrompt());
            }}
          >
            {({ onCancel, onConfirm }) => (
              <div className="wrap-prompt">
                <div className="prompt-content">
                  <div className="prompt-header">
                    <div className="prompt-header-title">Rời khỏi trang</div>
                    <div className="prompt-header-close" onClick={onCancel}>
                      <IoClose />
                    </div>
                  </div>
                  <div className="prompt-content-text">
                    Dữ liệu chưa được lưu lại khi rời khỏi có thể mất, bạn có
                    chắc muốn rời khỏi?
                  </div>
                  <div className="prompt-content-buttons">
                    <div onClick={onCancel} className="prompt-content-cancel">
                      Ở lại
                    </div>
                    <div onClick={onConfirm} className="prompt-content-confirm">
                      Rời khỏi
                    </div>
                  </div>
                </div>
              </div>
            )}
          </NavigationPrompt>
        ),
        // eslint-disable-next-line
        [prompt]
      )}
    </div>
  );
};

export default PromptModal;
