import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
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
      audio: true,
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
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
      <span>message: {message}</span>
    </div>
  );
}

export default App;
