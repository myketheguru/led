import MeetingArea from '../components/MeetingArea'
import MeetingEnded from '../components/MeetingEnded'
import MeetingWaitingArea from '../components/MeetingWaitingArea'
import useMeetingState from '../store/meet'

const MeetingRoom = () => {
    const meetingStatus = useMeetingState(state => state.meetingStatus)
  return (
    <div className="meeting-room">
        { 
            meetingStatus === 'waiting' ? <MeetingWaitingArea /> :
            meetingStatus === 'started' ? <MeetingArea /> :
            <MeetingEnded />
        }    
    </div>
  )
}

export default MeetingRoom