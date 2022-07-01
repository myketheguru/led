import create from "zustand";

interface IUseMeeting {
    meetingStatus: ('waiting' | 'started' | 'ended')
    videoStates: (0 | 1 | 2)
    localStream?: MediaStream
    showVideoStream: boolean,
    showAudioStream: boolean,
    setMeetingStatus: (type: ('waiting' | 'started' | 'ended')) => void
    setLocalStream: (stream?: MediaStream) => void
    setShowVideoStream: (show?:boolean) => void
    setShowAudioStream: (show?:boolean) => void
}

const useMeetingState = create<IUseMeeting>(set => ({
    meetingStatus: 'waiting',
    videoStates: 1,
    localStream: undefined,
    showVideoStream: true,
    showAudioStream: true,
    setMeetingStatus: (status: IUseMeeting['meetingStatus']) => set(state => ({
        meetingStatus: status
    })),
    setLocalStream: (stream = undefined) => set(state => ({
        localStream: stream
    })),
    setShowVideoStream: (show?:boolean) => set(state => ({
        showVideoStream: show ?? !state.showVideoStream
    })),
    setShowAudioStream: (show?:boolean) => set(state => ({
        showAudioStream: show ?? !state.showAudioStream
    })),
}))

export default useMeetingState