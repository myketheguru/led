import React, { useRef } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { IoWallet } from 'react-icons/io5'
import { SiGooglemeet } from 'react-icons/si'
import { GiHypersonicBolt } from 'react-icons/gi'

const StatsList = () => {
    const el = useRef<any>(null)
    const left = useRef(0)

    const backward = () => {
        if (left.current < 0) {
            left.current = 0
        } else {
            left.current -= 100
        }
        el?.current?.scrollTo({
            left: left.current,
            behavior: 'smooth',
        });
    }

    const forward = () => {
        if (left.current > el.current?.scrollLeft) {
            left.current = el.current.scrollLeft
        } else {
            left.current += 100
        }
        el?.current?.scrollTo({
            left: left.current,
            behavior: 'smooth',
        });
    }
  return (
    <div className="stats-wrap relative">
        <div className="stats flex gap-3 overflow-auto no-bar" ref={el}>
            <button className='bg-slate-200 dark:bg-[#292a2b] w-9 h-9 rounded-full flex justify-center items-center transition-all active:scale-90 absolute border border-slate-300 dark:border-[#37393a] -left-4 top-1/2 -translate-y-1/2 z-[5]' onClick={backward}>
                <BsChevronLeft />
            </button>
            <div className="card bg-slate-200 dark:bg-[#292a2b] border border-slate-300 dark:border-[#37393a] rounded-xl h-[180px] flex-[1_1_100%] max-w-[240px] shrink-0 p-6 flex flex-col gap-2 items-start relative">
                <span className='inline-block bg-slate-300 dark:bg-[#1f2021] p-2 rounded-full'>
                    <SiGooglemeet size={20} />
                </span>
                <p className='text-xs absolute top-16 text-gray-500 mt-5'>Appointments kept so far</p>
                <h1 className='text-4xl absolute top-28'>457</h1>
            </div>
            <div className="card bg-slate-200 dark:bg-[#292a2b] border border-slate-300 dark:border-[#37393a] rounded-xl h-[180px] flex-[1_1_100%] max-w-[240px] shrink-0 p-6 flex flex-col gap-2 items-start relative">
                <span className='inline-block bg-slate-300 dark:bg-[#1f2021] p-2 rounded-full'>
                    <GiHypersonicBolt size={20} />
                </span>
                <p className='text-xs absolute top-16 text-gray-500 mt-5'>Appointments to go</p>
                <h1 className='text-4xl absolute top-28'>23</h1>
            </div>
            <div className="card bg-slate-200 dark:bg-[#292a2b] border border-slate-300 dark:border-[#37393a] rounded-xl h-[180px] flex-[1_1_100%] max-w-[240px] shrink-0 p-6 flex flex-col gap-2 items-start relative">
                <span className='inline-block bg-slate-300 dark:bg-[#1f2021] p-2 rounded-full'>
                    <IoWallet size={20} />
                </span>
                <p className='text-xs absolute top-16 text-gray-500 mt-5'>Money made this week</p>
                <h1 className='text-4xl absolute top-28'>$45,000</h1>
            </div>

            <button className='bg-slate-200 dark:bg-[#292a2b] w-9 h-9 rounded-full flex justify-center items-center transition-all active:scale-90 absolute border border-slate-300 dark:border-[#37393a] -right-4 top-1/2 -translate-y-1/2' onClick={forward}>
                <BsChevronRight />
            </button>
        </div>
    </div>
  )
}

export default StatsList