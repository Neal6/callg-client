import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavigationPrompt from "react-router-navigation-prompt";

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
                  <span className="prompt-content-text">
                    Dữ liệu chưa được lưu lại khi rời khỏi có thể mất, bạn có
                    chắc muốn rời khỏi?
                  </span>
                  <div onClick={onCancel} className="prompt-content-cancel">
                    Ở lại
                  </div>
                  <div onClick={onConfirm} className="prompt-content-confirm">
                    Đồng ý
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
