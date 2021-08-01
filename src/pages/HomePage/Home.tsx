// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import Peer from "simple-peer";

import "@pages/HomePage/home.scss";

const Home = () => {
  // const socket = useSelector((state: any) => state.socketIo.socket);
  // const [stream, setStream] = useState<any>();
  // const [receivingCall, setReceivingCall] = useState<any>(false);
  // const [caller, setCaller] = useState<any>("");
  // const [callerSignal, setCallerSignal] = useState<any>();
  // const [callAccepted, setCallAccepted] = useState<any>(false);
  // const [idToCall, setIdToCall] = useState<any>("");
  // const [callEnded, setCallEnded] = useState<any>(false);
  // const [name, setName] = useState<any>("");
  // const myVideo = useRef<any>();
  // const userVideo = useRef<any>();
  // const connectionRef = useRef<any>();

  // useEffect(() => {
  //   socket.on("callUser", (data: any) => {
  //     setReceivingCall(true);
  //     setCaller(data.from);
  //     setName(data.name);
  //     setCallerSignal(data.signal);
  //   });
  // }, []);

  // const callUser = (id: any) => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       setStream(stream);
  //       const peer = new Peer({
  //         initiator: true,
  //         trickle: false,
  //         stream: stream,
  //       });
  //       peer.on("signal", (data: any) => {
  //         socket.emit("callUser", {
  //           userToCall: id,
  //           signalData: data,
  //           from: socket.id,
  //           name: name,
  //         });
  //       });
  //       peer.on("stream", (stream: any) => {
  //         userVideo.current.srcObject = stream;
  //       });
  //       socket.on("callAccepted", (signal: any) => {
  //         console.log(peer);
  //         setCallAccepted(true);
  //         peer.signal(signal);
  //       });

  //       myVideo.current.srcObject = stream;
  //     });
  // };

  // const answerCall = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       setStream(stream);
  //       const peer = new Peer({
  //         initiator: false,
  //         trickle: false,
  //         stream: stream,
  //       });
  //       peer.signal(callerSignal);
  //       peer.on("signal", (data: any) => {
  //         socket.emit("answerCall", { signal: data, to: caller });
  //       });
  //       peer.on("stream", (stream: any) => {
  //         userVideo.current.srcObject = stream;
  //       });

  //       myVideo.current.srcObject = stream;
  //     });
  //   setCallAccepted(true);
  // };

  // const leaveCall = () => {
  //   setCallAccepted(false);
  //   socket.off("callAccepted");
  //   myVideo.current.srcObject.getTracks().forEach((track: any) => {
  //     track.stop();
  //   });
  //   userVideo.current.srcObject.getTracks().forEach((track: any) => {
  //     track.stop();
  //   });
  // };

  return (
    <>
      {/* <h1 style={{ textAlign: "center", color: "#fff" }}>Zoomish</h1>
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
      </div> */}
      What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s, when an unknown printer took a galley of type
      and scrambled it to make a type specimen book. It has survived not only
      five centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with
      desktop publishing software like Aldus PageMaker including versions of
      Lorem Ipsum. Why do we use it? It is a long established fact that a reader
      will be distracted by the readable content of a page when looking at its
      layout. The point of using Lorem Ipsum is that it has a more-or-less
      normal distribution of letters, as opposed to using 'Content here, content
      here', making it look like readable English. Many desktop publishing
      packages and web page editors now use Lorem Ipsum as their default model
      text, and a search for 'lorem ipsum' will uncover many web sites still in
      their infancy. Various versions have evolved over the years, sometimes by
      accident, sometimes on purpose (injected humour and the like). Where does
      it come from? Contrary to popular belief, Lorem Ipsum is not simply random
      text. It has roots in a piece of classical Latin literature from 45 BC,
      making it over 2000 years old. Richard McClintock, a Latin professor at
      Hampden-Sydney College in Virginia, looked up one of the more obscure
      Latin words, consectetur, from a Lorem Ipsum passage, and going through
      the cites of the word in classical literature, discovered the undoubtable
      source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
      Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in
      45 BC. This book is a treatise on the theory of ethics, very popular
      during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
      sit amet..", comes from a line in section 1.10.32. The standard chunk of
      Lorem Ipsum used since the 1500s is reproduced below for those interested.
      Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
      Cicero are also reproduced in their exact original form, accompanied by
      English versions from the 1914 translation by H. Rackham. Where can I get
      some? There are many variations of passages of Lorem Ipsum available, but
      the majority have suffered alteration in some form, by injected humour, or
      randomised words which don't look even slightly believable. If you are
      going to use a passage of Lorem Ipsum, you need to be sure there isn't
      anything embarrassing hidden in the middle of text. All the Lorem Ipsum
      generators on the Internet tend to repeat predefined chunks as necessary,
      making this the first true generator on the Internet. It uses a dictionary
      of over 200 Latin words, combined with a handful of model sentence
      structures, to generate Lorem Ipsum which looks reasonable. The generated
      Lorem Ipsum is therefore always free from repetition, injected humour, or
      non-characteristic words etc. What is Lorem Ipsum? Lorem Ipsum is simply
      dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry's standard dummy text ever since the 1500s, when an unknown
      printer took a galley of type and scrambled it to make a type specimen
      book. It has survived not only five centuries, but also the leap into
      electronic typesetting, remaining essentially unchanged. It was
      popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software
      like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
      It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout. The point of using
      Lorem Ipsum is that it has a more-or-less normal distribution of letters,
      as opposed to using 'Content here, content here', making it look like
      readable English. Many desktop publishing packages and web page editors
      now use Lorem Ipsum as their default model text, and a search for 'lorem
      ipsum' will uncover many web sites still in their infancy. Various
      versions have evolved over the years, sometimes by accident, sometimes on
      purpose (injected humour and the like). Where does it come from? Contrary
      to popular belief, Lorem Ipsum is not simply random text. It has roots in
      a piece of classical Latin literature from 45 BC, making it over 2000
      years old. Richard McClintock, a Latin professor at Hampden-Sydney College
      in Virginia, looked up one of the more obscure Latin words, consectetur,
      from a Lorem Ipsum passage, and going through the cites of the word in
      classical literature, discovered the undoubtable source. Lorem Ipsum comes
      from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
      Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a
      treatise on the theory of ethics, very popular during the Renaissance. The
      first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a
      line in section 1.10.32. The standard chunk of Lorem Ipsum used since the
      1500s is reproduced below for those interested. Sections 1.10.32 and
      1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
      in their exact original form, accompanied by English versions from the
      1914 translation by H. Rackham. Where can I get some? There are many
      variations of passages of Lorem Ipsum available, but the majority have
      suffered alteration in some form, by injected humour, or randomised words
      which don't look even slightly believable. If you are going to use a
      passage of Lorem Ipsum, you need to be sure there isn't anything
      embarrassing hidden in the middle of text. All the Lorem Ipsum generators
      on the Internet tend to repeat predefined chunks as necessary, making this
      the first true generator on the Internet. It uses a dictionary of over 200
      Latin words, combined with a handful of model sentence structures, to
      generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
      therefore always free from repetition, injected humour, or
      non-characteristic words etc.
    </>
  );
};

export default Home;
