import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./App.css";

const videoConsList = [
  {
    width: 2560,
    height: 1440,
    facingMode: "environment",
  },
  {
    width: 1440,
    height: 2560,
    facingMode: "environment",
  },
  {
    width: 1280,
    height: 720,
    facingMode: "environment",
  },
];

function App() {
  const [curCons, setCurCons] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [camDeivceInfos, setCamDeviceInfos] = useState<
    Array<{
      width: number | undefined;
      height: number | undefined;
      label: string;
    }>
  >([]);
  const webcamRef = useRef(null);

  const onUserMedia = (res: MediaStream) => {
    // console.log(res);
  };

  const getDeviceList = async () => {
    setMessage("1");
    let constraints = {
      audio: true,
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    };
    setMessage("2");

    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    setMessage("3");

    const deviceInfos = stream.getVideoTracks().map((element) => {
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
      {videoConsList.map((_, idx) => (
        <button onClick={() => setCurCons(idx)}>{idx}</button>
      ))}
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConsList[curCons]}
        onUserMedia={onUserMedia}
      />
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
      <span>message: {message}</span>
    </div>
  );
}

export default App;
