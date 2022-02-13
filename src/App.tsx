import { useRef } from "react";
import Webcam from "react-webcam";

const videoConsList = [
  {
    width: 360,
    height: 720,
    facingMode: "environment",
  },
  {
    width: 1280,
    height: 720,
    facingMode: "environment",
  },
  {
    width: 2560,
    height: 1440,
    facingMode: "environment",
  },
];

function App() {
  const webcamRef = useRef(null);

  return (
    <div className="app">
      {videoConsList.map((cons) => (
        <Webcam
          audio={false}
          height={360}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          videoConstraints={cons}
        />
      ))}
    </div>
  );
}

export default App;
