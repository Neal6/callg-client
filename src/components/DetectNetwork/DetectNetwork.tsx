//@ts-nocheck

import React, { useEffect, useState, memo } from "react";
import { BiWifi, BiWifiOff } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { Detector } from "react-detect-offline";

import "./detectNetwork.scss";

const DetectNetwork = () => {
  const [network, setNetwork] = useState<any>(null);

  useEffect(() => {
    // window.addEventListener("online", updateOnlineStatus);
    // window.addEventListener("offline", updateOnlineStatus);
  }, []);

  const updateOnlineStatus = (isOnline) => {
    if (isOnline) {
      setNetwork("online");
      setTimeout(() => {
        setNetwork(null);
      }, 5000);
    } else {
      setNetwork("offline");
    }
  };

  return (
    <>
      <Detector
        polling={{
          url: "https://ipv4.icanhazip.com",
          interval: 20000,
          timeout: 20000,
        }}
        onChange={(online) => {
          updateOnlineStatus(online);
        }}
        render={() => <></>}
      />
      {network === "online" && (
        <div className="popup-online">
          <BiWifi className="popup-online-icon" />
          <div>
            <div>Đã kết nối lại internet</div>
            <div className="popup-online-sub">
              Mạng internet của bạn đã trở lại
            </div>
          </div>
          <IoIosClose
            className="popup-network-close"
            onClick={() => {
              setNetwork(null);
            }}
          />
        </div>
      )}
      {network === "offline" && (
        <div className="popup-offline">
          <BiWifiOff className="popup-offline-icon" />
          <div>
            <div> Kết nối bị ngắt</div>
            <span className="popup-offline-sub">
              Hãy kiểm tra lại đường truyền của bạn
            </span>
          </div>
          <IoIosClose
            className="popup-network-close"
            onClick={() => {
              setNetwork(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default memo(DetectNetwork);
