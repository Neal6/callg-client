import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import soundMessage from "@assets/audio/squish.mp3";
import * as appAction from "@store/actions/appActions";

const Audio = () => {
  const dispatch = useDispatch();
  const [canPlayAudio, setCanPlayAudio] = useState<boolean>(false);
  const playSoundMessage = useSelector(
    (state: any) => state.app.playSoundMessage
  );

  const firstClick = () => {
    setCanPlayAudio(true);
    document.querySelector("body")?.removeEventListener("click", firstClick);
  };

  useEffect(() => {
    document.querySelector("body")?.addEventListener("click", firstClick);
    return () => {
      document.querySelector("body")?.removeEventListener("click", firstClick);
    };
  }, []);

  useEffect(() => {
    if (playSoundMessage && canPlayAudio) {
      playMessage();
    }
  }, [playSoundMessage, canPlayAudio]);

  const playMessage = () => {
    //@ts-ignore
    document.getElementById("message").play();
    //@ts-ignore
    document.getElementById("message").onended = () => {
      dispatch(appAction.stopSoundMessage());
    };
  };

  return (
    <div>
      <audio id="message" autoPlay={true}>
        <source src={soundMessage} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default Audio;
