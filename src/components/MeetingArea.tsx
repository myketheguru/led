import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import * as Peer from "simple-peer";
import { FaInfo, FaLightbulb } from 'react-icons/fa'
import { FiVideo, FiVideoOff } from 'react-icons/fi'
import { RiLayoutMasonryFill } from 'react-icons/ri'
import { TbScreenShare } from 'react-icons/tb'
import { MdCallEnd, MdScreenShare } from 'react-icons/md'
import { IoMicOffOutline, IoMicOutline } from 'react-icons/io5'
import useMeetingState from '../store/meet'
import VideoCard from './VideoCard'
import { useParams } from 'react-router-dom';

const MeetingArea = () => {
    const params = useParams()
    const showVideoStream = useMeetingState(state => state.showVideoStream)
    const setShowVideoStream = useMeetingState(state => state.setShowVideoStream)
    const showAudioStream = useMeetingState(state => state.showAudioStream)
    const setShowAudioStream = useMeetingState(state => state.setShowAudioStream)
    const stream = useMeetingState(state => state.localStream)
    const setStream = useMeetingState(state => state.setLocalStream)
    const setMeetingStatus = useMeetingState(state => state.setMeetingStatus)
    const [peers, setPeers] = useState<any[]>([]);
    const socketRef = useRef<any>();
    const userVideo = useRef<any>();
    const peersRef = useRef<any[]>([]);
    const roomID = params.id;

    

    const startStream = (videoShown: boolean, audioAvailable: boolean) => {
        navigator.mediaDevices.getUserMedia({ video: videoShown, audio: audioAvailable }).then(mStream => {
            setStream(mStream);
            if (userVideo.current) {
              userVideo.current.srcObject = mStream;
            }
        })
    }
    
    const stopAudio = () => {
        stream?.getAudioTracks().forEach(track => track.stop())
    }

    const stopVideo = () => {        
        stream?.getVideoTracks().forEach(track => track.stop())
        userVideo.current.srcObject = null
    }

    function createPeer(userToSignal: any, callerID: any, stream?: MediaStream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal: any, callerID: any, stream?: MediaStream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }
    
    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8000"); // Replace with server URL
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users: any) => {
            const peers: any[] = [];
            users.forEach((userID: string) => {
                const peer = createPeer(userID, socketRef.current.id, stream);
                peersRef.current.push({
                    peerID: userID,
                    peer,
                })
                peers.push(peer);
            })
            setPeers(peers);
        })

        socketRef.current.on("user joined", (payload: any) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
                peerID: payload.callerID,
                peer,
            })

            setPeers(users => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload: any) => {
            const item = peersRef.current.find(p => p.peerID === payload.id);
            item.peer.signal(payload.signal);
        });
    }, [])

    useEffect(() => {
        if (showVideoStream && showAudioStream) {
            startStream(showVideoStream, showAudioStream)
        } else if (!showAudioStream && !showVideoStream) {
            stopAudio()
            stopVideo()
            setStream(undefined)
        } else if (!showAudioStream) {
            stopAudio()
            startStream(showVideoStream, showAudioStream)
        } else if (!showVideoStream) {
            stopVideo()
            startStream(showVideoStream, showAudioStream)
        }
    }, [showVideoStream, showAudioStream])
    

  return (
    <div className="meeting min-h-screen bg-slate-100 dark:bg-[#17181A] dark:text-gray-200 text-gray-600 grid grid-rows-[1fr_auto] overflow-hidden">
        <main className='grid grid-cols-[1fr_auto]'>
            <div className="meet-grid-wrapper pt-5 px-[8%] flex flex-col md:flex-row items-center gap-4">
                <VideoCard videoRef={userVideo} />
                {peers.map((peer, index) => {
                return (
                    <VideoCard key={index} peer={peer} />
                );
            })}
                {/* <VideoCard videoRef={userVideo} /> */}
            </div>
            <aside></aside>
        </main>
        <footer className='h-[75px] flex items-center justify-between p-2 px-[8%]'>
            <div className="copy flex gap-2 font-extralight">
                <p className='hidden md:block'>Powered by</p>
                <div id="logo" className='flex items-center'>
                    <FaLightbulb size={18} color='#fcc400' className='relative -rotate-12 -left-1 shm' />
                    <span className='font-normal text-sm'>Led</span>
                </div>
            </div>

            <div className="controls flex gap-3">
                <button id='mic' className='bg-[#2e3033] relative group p-3 rounded-full transition-all active:scale-95 w-12 h-12 flex justify-center items-center' onClick={() => setShowAudioStream(!showAudioStream)}>
                    {showAudioStream && <IoMicOutline size={26} />}
                    {!showAudioStream && <IoMicOffOutline size={26} />}

                    <span className='absolute whitespace-nowrap bg-[#292a2c] p-1 px-3 font-light rounded-full text-xs border border-[#36383a] left-1/2 -translate-x-1/2 transition-all opacity-0 group-hover:translate-y-[-250%] group-hover:opacity-100'>
                        { showAudioStream ? 'Mute Mic' : 'Unmute Mic' }
                    </span>
                </button>
                <button id='video' className='bg-[#2e3033] relative group p-3 rounded-full transition-all active:scale-95 w-12 h-12 flex items-center justify-center' onClick={() => setShowVideoStream(!showVideoStream)}>
                    {showVideoStream &&  <FiVideo size={18} />}
                    {!showVideoStream &&  <FiVideoOff size={18} />}

                    <span className='absolute whitespace-nowrap bg-[#292a2c] p-1 px-3 font-light rounded-full text-xs border border-[#36383a] left-1/2 -translate-x-1/2 transition-all opacity-0 group-hover:translate-y-[-250%] group-hover:opacity-100'>
                        { showVideoStream ? 'Hide video' : 'Show video' }
                    </span>
                </button>
                <button id='share-screen' className='bg-[#2e3033] relative group p-3 rounded-full transition-all active:scale-95 w-12 h-12 flex justify-center items-center'>
                    <TbScreenShare size={20} />

                    <span className='absolute whitespace-nowrap bg-[#292a2c] p-1 px-3 font-light rounded-full text-xs border border-[#36383a] left-1/2 -translate-x-1/2 transition-all opacity-0 group-hover:translate-y-[-250%] group-hover:opacity-100'>
                        Share Screen
                    </span>
                </button>
                {/* <button id='share-screen' className='bg-[#2e3033] relative group p-3 rounded-full transition-all active:scale-95 w-12 h-12 flex justify-center items-center'>
                    <RiLayoutMasonryFill size={18} />
                </button> */}
                <button id='share-screen' className='bg-red-600 relative group p-3 rounded-full transition-all active:scale-95 w-12 h-12 flex justify-center items-center'>
                    <MdCallEnd size={18} />

                    <span className='absolute whitespace-nowrap bg-[#292a2c] p-1 px-3 font-light rounded-full text-xs border border-[#36383a] left-1/2 -translate-x-1/2 transition-all opacity-0 group-hover:translate-y-[-250%] group-hover:opacity-100'>
                        Leave Meeting
                    </span>
                </button>
            </div>

            <div className="misc flex items-center gap-2">
                <div className="rec flex gap-2 border rounded-full items-center p-1 px-3 text-[#6e7178] border-[#6e7178] fixed top-5 md:top-0 right-5 text-sm group md:relative">
                    <div className="indicator w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span>Rec</span>

                    <span className='absolute whitespace-nowrap bg-[#292a2c] p-1 px-3 font-light rounded-full text-xs border border-[#36383a] left-1/2 -translate-x-1/2 transition-all opacity-0 group-hover:translate-y-[-180%] group-hover:opacity-100 text-gray-200'>
                        This meeting is being recorded
                    </span>
                </div>

                <button id='info' className='bg-[#2e3033] relative group p-2 rounded-full transition-all active:scale-95 w-18 h-18 flex justify-center items-center'>
                    <FaInfo size={16} />

                    <span className='absolute whitespace-nowrap bg-[#292a2c] p-1 px-3 font-light rounded-full text-xs border border-[#36383a] left-1/2 -translate-x-1/2 transition-all opacity-0 group-hover:translate-y-[-250%] group-hover:opacity-100'>
                        Meeting Details
                    </span>
                </button>
            </div>
        </footer>
    </div>
  )
}

export default MeetingArea