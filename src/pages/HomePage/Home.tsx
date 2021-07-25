import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Peer from "simple-peer";

import "@pages/HomePage/home.scss";

const Home = () => {
  const socket = useSelector((state: any) => state.socketIo.socket);
  const [stream, setStream] = useState<any>();
  const [receivingCall, setReceivingCall] = useState<any>(false);
  const [caller, setCaller] = useState<any>("");
  const [callerSignal, setCallerSignal] = useState<any>();
  const [callAccepted, setCallAccepted] = useState<any>(false);
  const [idToCall, setIdToCall] = useState<any>("");
  const [callEnded, setCallEnded] = useState<any>(false);
  const [name, setName] = useState<any>("");
  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<any>();

  useEffect(() => {
    socket.on("callUser", (data: any) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id: any) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });
        peer.on("signal", (data: any) => {
          socket.emit("callUser", {
            userToCall: id,
            signalData: data,
            from: socket.id,
            name: name,
          });
        });
        peer.on("stream", (stream: any) => {
          userVideo.current.srcObject = stream;
        });
        socket.on("callAccepted", (signal: any) => {
          console.log(peer);
          setCallAccepted(true);
          peer.signal(signal);
        });

        myVideo.current.srcObject = stream;
      });
  };

  const answerCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });
        peer.signal(callerSignal);
        peer.on("signal", (data: any) => {
          socket.emit("answerCall", { signal: data, to: caller });
        });
        peer.on("stream", (stream: any) => {
          userVideo.current.srcObject = stream;
        });

        myVideo.current.srcObject = stream;
      });
    setCallAccepted(true);
  };

  const leaveCall = () => {
    setCallAccepted(false);
    socket.off("callAccepted");
    myVideo.current.srcObject.getTracks().forEach((track: any) => {
      track.stop();
    });
    userVideo.current.srcObject.getTracks().forEach((track: any) => {
      track.stop();
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Zoomish</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            ) : null}
          </div>
        </div>
        <div className="myId">
          <input
            id="filled-basic"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <input
            id="filled-basic"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <button onClick={leaveCall}>End Call</button>
            ) : (
              <button
                color="primary"
                aria-label="call"
                onClick={() => callUser(idToCall)}
              >
                call
              </button>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <button onClick={answerCall}>Answer</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;
