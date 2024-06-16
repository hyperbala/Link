import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";
import {FaMicrophoneSlash, FaMicrophone, FaPhoneAlt } from "react-icons/fa";
import { FaVideo, FaVideoSlash } from "react-icons/fa6";

const Bottom = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  return (
    <div className="flex gap-4 justify-center mx-auto">
      {muted ? (
        <FaMicrophoneSlash size={30} color="#e3e3e3" onClick={toggleAudio} />

      ) : (
        <FaMicrophone color="#e3e3e3" size={30} onClick={toggleAudio} />
      )}
      {playing ? (
        <FaVideo color="#e3e3e3" size={30} onClick={toggleVideo} />
      ) : (
        <FaVideoSlash
          color="#e3e3e3"
          size={30}
          onClick={toggleVideo}
        />
      )}
      <FaPhoneAlt color="red" size={28}  onClick={leaveRoom}/>
    </div>
  );
};

export default Bottom;