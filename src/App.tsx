import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";

const videoConstraints = {
  width: 2560,
  height: 1440,
  facingMode: "environment",
};

function App() {
  const [message, setMessage] = useState("");
  const webcamRef = useRef(null);
  const [camDeivceInfos, setCamDeviceInfos] = useState<
    Array<{
      width: number | undefined;
      height: number | undefined;
      label: string;
    }>
  >([]);
  const getDeviceList = async () => {
    setMessage("1");
    let constraints = {
      audio: false,
      video: { height: 2560, width: 1440, facingMode: "environment" },
    };
    setMessage("2");

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      alert(error);
      return;
    }

    const deviceInfos = stream?.getVideoTracks().map((element) => {
      const settings = element.getSettings();

      return {
        width: settings.width,
        height: settings.height,
        label: element.label,
      };
    });
    setMessage("4");

    alert(JSON.stringify(deviceInfos));
    setCamDeviceInfos(deviceInfos);
    setMessage("5");
  };

  useEffect(() => {
    getDeviceList();
  }, []);

  return (
    <div className="app">
      {camDeivceInfos.map((info) => (
        <div className="info-wrapper" key={info.label}>
          <span>label: {info.label}</span>
          <br />
          <span>width: {info.width}</span>
          <br />
          <span>height: {info.height}</span>
          <br />
          <br />
        </div>
      ))}
      <Webcam
        audio={false}
        height={2560}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1440}
        videoConstraints={videoConstraints}
      />
      <span>message: {message}</span>
    </div>
  );
}

export default App;
