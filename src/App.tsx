import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [constraints, setConstraints] = useState<Array<{ deviceId: string }>>([
    {
      deviceId: "",
    },
  ]);
  const [consIndex, setConsIndex] = useState(0);
  const webcamRef = useRef(null);
  const [camDeivceInfos, setCamDeviceInfos] = useState<
    Array<{
      id: string;
      label: string;
      kind: string;
    }>
  >([]);
  const getDeviceList = async () => {
    setMessage("2");

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log(devices);
      const deviceInfos = devices
        .filter((elem) => elem.kind === "videoinput")
        .map((element) => {
          return {
            id: element.deviceId,
            label: element.label,
            kind: element.kind,
          };
        });
      setCamDeviceInfos(deviceInfos);

      const cons = deviceInfos.map((elem) => ({
        deviceId: elem.id,
        facingMode: "environment",
      }));
      setConstraints(cons);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDeviceList();
  }, []);

  return (
    <div className="app">
      <button
        onClick={() => setConsIndex((consIndex + 1) % constraints.length)}
      >
        {consIndex}
      </button>
      {camDeivceInfos.map((info) => (
        <div className="info-wrapper" key={info.id}>
          <span>id: {info.id}</span>
          <br />
          <span>label: {info.label}</span>
          <br />
          <span>kind: {info.kind}</span>
          <br />
          <br />
        </div>
      ))}
      <span>message: {message}</span>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={constraints[consIndex]}
      />
    </div>
  );
}

export default App;
