import { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./App.css";

const videoConsList = [
  {
    width: 2560,
    height: 1440,
    facingMode: "environment",
  },
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
];

function App() {
  const [curCons, setCurCons] = useState<number>(0);
  const webcamRef = useRef(null);

  return (
    <div className="app">
      {videoConsList.map((_, idx) => (
        <button onClick={() => setCurCons(idx)}>{idx}</button>
      ))}
      <Webcam
        audio={false}
        height={360}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        videoConstraints={videoConsList[curCons]}
        onUserMedia={(res) => console.log(res)}
      />
    </div>
  );
}

export default App;
