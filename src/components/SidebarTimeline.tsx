import { FaBolt } from 'react-icons/fa'
import badge from '../assets/images/badge.png'

const SidebarTimeline = () => {
  return (
    <aside className='bg-slate-200 dark:bg-[#292a2b] w-full min-h-[350px] md:h-auto md:w-[300px] rounded-xl flex flex-col p-5 py-6'>
        <img src={badge} className="w-[100px] self-center" alt="" />
        <h1 className='text-xl text-gray-400 self-center'>Erudite User</h1>
        <p className='text-gray-500 text-xs self-center'>Since 2022</p>

        <div className="ongoing bg-slate-300 dark:bg-[#303132] p-2 rounded-md cursor-pointer relative mt-14 transition-all active:scale-95">
            <div className="indicator bg-slate-400 dark:bg-[#3c3d3e] rounded-md absolute top-0 left-0 h-full transition-all" style={{ width: `70%` }}></div>
            <div className="content flex gap-2 relative">
                <span className='flex w-9 h-9 justify-center items-center bg-[#212222] rounded-md'>
                    <FaBolt color='#ffc400' />
                </span>
                <div className="details">
                    <h3 className='text-sm text-slate-600 dark:text-gray-400'>Ongoing Appointment</h3>
                    <p className="text-xs text-gray-500">Click to open</p>
                </div>
                <span className='ml-auto text-xs self-center'>70%</span>
            </div>
        </div>

        <p className="text-xs mt-5 py-3">Upcoming Appointments</p>
        <div className="appointments relative">
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-3 min-h-[200px] md:min-h-0 md:h-[250px] overflow-auto no-bar">
                <div className="item rounded-md h-[54px] bg-slate-300 dark:bg-[#303132]"></div>
                <div className="item rounded-md h-[54px] bg-slate-300 dark:bg-[#303132]"></div>
                <div className="item rounded-md h-[54px] bg-slate-300 dark:bg-[#303132]"></div>
                <div className="item rounded-md h-[54px] bg-slate-300 dark:bg-[#303132]"></div>
                <div className="item rounded-md h-[54px] bg-slate-300 dark:bg-[#303132]"></div>
            </div>
            <button className='text-xs bg-slate-300 dark:bg-[#303132] border border-slate-400 dark:border-[#4c4e4f] p-2 px-5 rounded-full absolute left-1/2 -bottom-[6px] -translate-x-1/2 shadow-md'>View All</button>
        </div>
    </aside>
  )
}

export default SidebarTimeline