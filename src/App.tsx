import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "moment/locale/vi";

import RootRouter from "@routes/RootRouter";
import SplashPage from "@pages/SplashPage/SplashPage";
import PromptModal from "@components/PromptModal/PromptModal";
import DetectNetwork from "@components/DetectNetwork/DetectNetwork";

moment.locale("vi");

const App = () => {
  const splashLoading = useSelector((state: any) => state.app.splashLoading);

  return (
    <div>
      {/* <LoadingGlobal /> */}
      <PromptModal />
      <SplashPage />
      {!splashLoading && <RootRouter />}
      <DetectNetwork />
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
