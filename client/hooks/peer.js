"use client"

import { useSocket } from "@/context/socket";

import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react";

const usePeer = () => {
    const socket = useSocket();
    const pathname = usePathname().toString()
    const roomId=pathname.slice(1)
    const [peer, setPeer] = useState(null);
    const [myId, setMyId] = useState('');
    const isPeerSet = useRef(false);

    useEffect(() => {
        if (isPeerSet.current || !roomId || !socket) return;
        isPeerSet.current = true;
        let myPeer;
        (async function initPeer() {
            myPeer = new (await import('peerjs')).default()
            setPeer(myPeer)

            myPeer.on('open', (id) => {
                console.log(`your peer id is ${id}`)
                setMyId(id)
                socket?.emit('join-room', roomId, id)
            })
        })()
    }, [roomId, socket])

    return {
        peer,
        myId
    }

}

export default usePeer;
