"use client"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

import { useRouter } from 'next/navigation'
import Navbar from "@/components/Navbar";
import { HiMiniVideoCamera } from "react-icons/hi2";
import ImageSlider from "@/components/ImageSlider";
import Link from "next/link";
import { FaKeyboard } from "react-icons/fa6";



export default function Home() {
  const router = useRouter()
  const [roomId, setRoomId] = useState('')

  const createAndJoin = () => {
    const roomId = uuidv4()
    router.push(`/${roomId}`)
  }

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`)
    else {
      alert("Please provide a valid room id")
    }
  }

  const images = [
    { url: '/slide-1.svg', captionHeading: 'Your meeting is safe', caption: 'No one can join a meeting unless invited or admitted by the host' },
    { url: '/slide-2.svg', captionHeading: 'Get a link you can share', caption: 'Click New meeting to get a link you can send to people you want to meet with' },
    { url: '/slide-3.svg', captionHeading: 'Plan ahead', caption: `Click  New meeting to schedule meetings in Google Calendar and send invites to participants}` },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row lg:mt-32 lg:mx-10 lg:justify-start lg:gap-16">
        <div className="px-6 lg:w-1/2">

          <h1 className="text-center lg::text-left mx-auto text-5xl lg:text-[2.7rem] my-3 text-wrap px-2 ">Video calls and meetings for everyone</h1>
          <p className="text-base lg:text-left lg:text-[1.1rem] text-center px-2 lg:pe-40 lg:my-6 my-4 font-light text-gray-500">Connect, Collaborate and Celebrate from anywhere with Google Meet</p>


          <div className="my-3 lg:mt-14 mb-10 px-6 lg:px-2 flex flex-col sm:flex-row gap-4">
            <button onClick={createAndJoin} className="w-40 bg-blue-500 py-2 border-[1px] border-blue-500 rounded-[4px] text-white flex items-center gap-2 px-2"><HiMiniVideoCamera />New meeting</button>
            <div className="flex gap-6">
              <div className="flex text-center items-center gap-2 p-2 border-[1px] w-3/5 lg:w-5/6 border-slate-500 rounded-[4px]">
                <FaKeyboard />
                <input placeholder='Enter room ID' alue={roomId} onChange={(e) => setRoomId(e?.target?.value)} className="text-balance w-3/4" />
              </div>
              <button onClick={joinRoom} className="text-gray-400 w-5">Join</button>
            </div>
          </div>
          <hr className="w-full mx-2 mt-6 h-[1px] bg-gray-500 lg:mt-0 lg:w-5/6" />
          <Link href={'#'} className="text-gray-600 my-6 mx-2 hidden lg:block"><span className="text-blue-500 hover:underline">Learn more</span>  about Google Meet</Link>
        </div>
        <div className="px-16">
          <ImageSlider images={images} />
        </div>
      </div>
      <Link href={'#'} className="text-gray-600 py-2 lg:hidden"><span className="text-blue-500 hover:underline">Learn more</span>  about Google Meet</Link>
    </>
  );
}
