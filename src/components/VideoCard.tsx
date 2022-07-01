import React, { useEffect, useRef } from 'react'
import useMeetingState from '../store/meet'

const VideoCard = (props: any) => {
    const ref = useRef<any>()
    const showVideoStream = useMeetingState(state => state.showVideoStream)

    useEffect(() => {
        props?.peer?.on("stream", (stream: MediaStream) => {
            ref.current.srcObject = stream;
        })
    }, []);

  return (
    <div className="bg-[#242628] only:bg-transparent group w-full md:w-auto only:w-full only:h-full flex-1 h-[400px] rounded-lg overflow-hidden">           
        <video autoPlay muted ref={props.videoRef ?? ref} className={`h-full group-only:mx-auto rounded-lg scale-x-[-1] w-auto object-cover ${showVideoStream ? '' : 'hidden'}`} playsInline></video>
        {
            !showVideoStream ?
            <div className="user-block h-full w-auto group-only:mx-auto rounded-lg flex items-center justify-center">
                <figure className='w-24 h-24 bg-[#3d3f43] rounded-full'></figure>
            </div> :
            null
        }
    </div>
  )
}

export default VideoCard