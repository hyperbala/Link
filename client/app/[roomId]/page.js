"use client"

import React, { useEffect, useState } from 'react';
import Player from '@/components/Player';
import Bottom from '@/components/Bottom';
import usePeer from '@/hooks/peer';
import { useSocket } from "@/context/socket";
import { useSearchParams, usePathname } from "next/navigation";
import useMediaStream from '@/hooks/mediaStream';
import usePlayer from '@/hooks/player';
import { cloneDeep } from "lodash";

const Page = () => {
  const socket = useSocket();
  const searchParams = useSearchParams();
  const { peer, myId } = usePeer();
  const pathname = usePathname().toString();
  const roomId = pathname.slice(1);
  const { stream } = useMediaStream();
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom
  } = usePlayer(myId, roomId, peer);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log(`user connected in room with userId ${newUser}`);

      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [newUser]: call
        }));
      });
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayers, socket, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId) => {
      console.log(`user ${userId} is leaving the room`);
      users[userId]?.close();
      const playersCopy = cloneDeep(players);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    };
    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);
    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [players, setPlayers, socket, users]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [callerId]: call
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);

  return (
    <div className='bg-gray-900 h-screen'>
      {playerHighlighted && Object.keys(nonHighlightedPlayers).length && (
        <div className='absolute md:bottom-14 bottom-10 right-1/3 md:right-40 z-10 md:p-2 md:w-1/5 md:h-auto w-1/3 h-2/5'>
          <Player
            key={playerHighlighted.url}
            url={playerHighlighted.url}
            muted={playerHighlighted.muted}
            playing={playerHighlighted.playing}
            isActive
          />
        </div>
      )}
      {playerHighlighted && !Object.keys(nonHighlightedPlayers).length && (
        <div className='flex justify-center h-screen'>
          <div className='relative md:w-full md:h-full h-screen p-5 pb-16'>
            <Player
              key={playerHighlighted.url}
              url={playerHighlighted.url}
              muted={playerHighlighted.muted}
              playing={playerHighlighted.playing}
              isActive
            />
          </div>
        </div>
      )}
      <div>
        {Object.keys(nonHighlightedPlayers).map((playerId) => {
          const { url, muted, playing } = nonHighlightedPlayers[playerId];
          return (
            <div className='flex justify-center md:h-screen h-max z-0' key={playerId}>
              <div className='relative md:w-full md:h-full pt-10 h-full p-5 pb-16'>
                <Player
                  url={url}
                  muted={muted}
                  playing={playing}
                  isActive={false}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className='absolute bottom-2 flex w-full'>
        <Bottom
          muted={playerHighlighted?.muted}
          playing={playerHighlighted?.playing}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
          leaveRoom={leaveRoom}
        />
      </div>
    </div>
  );
}

export default Page;
