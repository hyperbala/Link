import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";
import { FaMicrophoneSlash, FaMicrophone, FaPhoneAlt } from "react-icons/fa";
import { FaVideo, FaVideoSlash } from "react-icons/fa6";

const Bottom = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  return (
    <div className="flex gap-10 justify-between mx-auto">
      <button className="">

        {muted ? (
          <FaMicrophoneSlash size={30} color="#e3e3e3" onClick={toggleAudio} />

        ) : (
          <FaMicrophone color="#e3e3e3" size={30} onClick={toggleAudio} />
        )}
      </button>
      <button>


        {playing ? (
          <FaVideo color="#e3e3e3" size={30} onClick={toggleVideo} />
        ) : (
          <FaVideoSlash
            color="#e3e3e3"
            size={30}
            onClick={toggleVideo}
          />
        )}
      </button>
      <button>

        <FaPhoneAlt color="red" size={28} onClick={leaveRoom} />
      </button>
    </div>
  );
};

export default Bottom;