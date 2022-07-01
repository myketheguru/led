import { BsArrowsAngleExpand } from 'react-icons/bs'
import B2 from '../assets/images/234.jpg'

const MenteeCard = () => {
  return (
    <div className="featured border flex-1 border-slate-300 dark:border-[#37393a] min-h-80 md:h-90 overflow-auto no-bar rounded-xl relative">
        <div className="inner w-full h-full flex flex-col">
            <div className="banner z-[5] text-white h-44 rounded-t-xl flex flex-col justify-center items-center text-2xl sticky top-0 group" style={{ backgroundImage: `linear-gradient(to bottom,#ffc500aa, 40%, #000a), url(${B2})`, backgroundSize: 'cover' }}>
                <h1 className='text-xs'>Appointments Kept</h1>
                <h1 className='text-4xl font-light'>32</h1>
                <button className='rounded-full text-xs text-black mt-2 transition-all active:scale-90 bg-yellow-500 p-3 px-5'>Book Appointment</button>
                <button className='rounded-full mt-2 transition-all active:scale-90 bg-[#000b] hover:bg-black p-3 text-xs absolute top-2 right-2 opacity-0 group-hover:opacity-100'>
                  <BsArrowsAngleExpand />
                </button>
            </div>
            <div className="history flex-1 max-h-[250px] relative p-5">
                <p className='text-sm text-gray-500'>Past Appointments</p>
                <div className="transactions flex flex-col gap-3 py-5">
                  {
                    [...Array(5)].map((trans, index) => (
                      <div className="transaction bg-slate-300 dark:bg-[#292a2b] h-14 p-3 px-5 rounded-md" key={index}>
                        {/* <h1>{ index }</h1> */}
                      </div>
                    ))
                  }
                </div>
                <button className='text-xs bg-slate-300 dark:bg-[#303132] border border-slate-400 dark:border-[#4c4e4f] p-2 px-5 rounded-full sticky left-[43%] bottom-5 shadow-lg animate-bounce hover:animate-none'>View More</button>
            </div>
        </div>
    </div>
  )
}

export default MenteeCard