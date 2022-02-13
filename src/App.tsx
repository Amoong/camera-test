import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const webcamRef = useRef(null);
  const [camDeivceInfos, setCamDeviceInfos] = useState<
    Array<{
      label: string;
      kind: string;
    }>
  >([]);
  const getDeviceList = async () => {
    setMessage("1");
    let constraints = {
      audio: false,
      video: { height: 1080, width: 1080, facingMode: "environment" },
    };
    setMessage("2");

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const deviceInfos = devices.map((element) => {
        return {
          label: element.label,
          kind: element.kind,
        };
      });
      setCamDeviceInfos(deviceInfos);
    } catch (error) {
      console.error(error);
    }

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = document.querySelector("video");
      console.log(video);
      if (video) {
        video.srcObject = stream;
      }
    } catch (error) {
      alert(error);
      return;
    }
  };

  useEffect(() => {
    getDeviceList();
  }, []);

  return (
    <div className="app">
      {camDeivceInfos.map((info) => (
        <div className="info-wrapper" key={info.label + info.kind}>
          <span>label: {info.label}</span>
          <br />
          <span>kind: {info.kind}</span>
          <br />
          <br />
        </div>
      ))}
      <video autoPlay width="1440" height="2560" ref={webcamRef} src=""></video>
      <span>message: {message}</span>
    </div>
  );
}

export default App;
