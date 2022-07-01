import { useEffect, useRef, useState } from 'react'
import { BsCameraVideo, BsCameraVideoOff, BsMoon } from 'react-icons/bs'
import { BiMicrophone } from "react-icons/bi";
import { FaLightbulb } from 'react-icons/fa'
import { IoMicOffOutline, IoMicOutline } from 'react-icons/io5';
import useMeetingState from '../store/meet';

const setTheme = () => {
    if (localStorage.theme !== 'dark') {
        localStorage.theme = 'dark'
        document.documentElement.classList.add('dark')
    } else {
        localStorage.theme = 'light'
        document.documentElement.classList.remove('dark')
    }
}

const MeetingWaitingArea = () => {
    const showVideoStream = useMeetingState(state => state.showVideoStream)
    const setShowVideoStream = useMeetingState(state => state.setShowVideoStream)
    const showAudioStream = useMeetingState(state => state.showAudioStream)
    const setShowAudioStream = useMeetingState(state => state.setShowAudioStream)
    const stream = useMeetingState(state => state.localStream)
    const setStream = useMeetingState(state => state.setLocalStream)
    const setMeetingStatus = useMeetingState(state => state.setMeetingStatus)
    const userVideo = useRef<any>()

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
    <div className="waiting-area min-h-screen bg-slate-100 dark:bg-[#17181A] dark:text-gray-200 text-gray-600 flex flex-col">
        <nav className='px-[5%] md:px-[7%] lg:px-[10%] border-[#292a2b] h-16 flex items-center gap-3 sticky top-0 bg-slate-100 dark:bg-[#17181A] z-10'>
            <a href="/" id="logo" className='flex items-center'>
                <FaLightbulb size={24} color='#fcc400' className='relative -rotate-12 -left-1 shm' />
                <span className='font-semibold text-lg'>Led</span>
            </a>

            <button className='bg-slate-200 dark:bg-[#292a2b] w-9 h-9 rounded-lg flex justify-center items-center transition-all active:scale-90 ml-auto' onClick={setTheme}>
                <BsMoon />
            </button>
            <div className="profile flex items-center gap-4 cursor-pointer ml-3 md:border-l px-3 border-slate-300 dark:border-[#292a2b]">
                <span className='text-sm font-light text-gray-500 hidden md:inline-block'>Micheal Eze</span>
                <figure className='bg-[#232425] w-9 h-9 rounded-full border-2 border-yellow-600 shadow-md shadow-yellow-600'></figure>
            </div>
        </nav>
        <div className="flex flex-col md:flex-row flex-1 mt-20 px-[5%] md:px-[7%] lg:px-[10%] gap-5">
            <div className="display-user-media bg-slate-200 dark:bg-[#2f3034] flex-1 h-[500px] md:h-[400px] rounded-xl flex justify-center overflow-hidden relative">
                <video autoPlay muted ref={userVideo} className={`h-[440px] scale-x-[-1] w-auto object-cover ${stream?.getVideoTracks().length ? '' : 'hidden'}`} playsInline></video>
                <h1 className={`${stream?.getTracks().length === 0 ? 'm-auto font-light text-2xl' : 'hidden'}`}>Camera is starting</h1>
                <h1 className={`${stream?.getVideoTracks().length === 0 ? 'm-auto font-light text-2xl' : 'hidden'}`}>Camera is off</h1>
                <div className="overlay absolute w-full h-full top-0 left-0">
                    <div className="controls flex gap-4 absolute bottom-3 left-1/2 -translate-x-1/2 text-white">
                        <button className={`${!showAudioStream ? 'bg-red-600 border-none' : 'border hover:bg-[#fff8]'} w-14 h-14 rounded-full flex justify-center items-center`} onClick={() => setShowAudioStream(!showAudioStream)}>
                            {showAudioStream && <IoMicOutline size={26} />}
                            {!showAudioStream && <IoMicOffOutline size={26} />}
                        </button>
                        <button className={`${!showVideoStream ? 'bg-red-600 border-none' : 'border  hover:bg-[#fff8]'} w-14 h-14 rounded-full flex justify-center items-center`} onClick={() => setShowVideoStream(!showVideoStream)}>
                            {showVideoStream && <BsCameraVideo size={20} />}
                            {!showVideoStream && <BsCameraVideoOff size={20} />}
                        </button>
                    </div>
                </div>
            </div>
            <div className="join-meet-info flex-1 h-[400px] rounded-xl p-5 flex flex-col justify-center items-center gap-3">
                <h1 className="text-3xl font-extralight">Ready for this?</h1>
                <p className='text-xs font-light text-[#7c7f87]'>Your mentor is already here</p>
                <button className='bg-slate-300 dark:bg-[#2f3034] border border-slate-400 dark:border-[#45474c] p-2 px-5 rounded-full font-light transition-all hover:border-yellow-400 active:scale-95' onClick={() => { setMeetingStatus('started') }}>Join now</button>
            </div>
        </div>
    </div>
  )
}

export default MeetingWaitingArea