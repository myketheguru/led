import React from 'react'
import { BsMoon } from 'react-icons/bs'
import { FaLightbulb } from 'react-icons/fa'
import { IoNotificationsOutline } from 'react-icons/io5'

const Navbar = () => {
    const setTheme = () => {
        if (localStorage.theme !== 'dark') {
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
        } else {
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
        }
    }
  return (
    <nav className='px-[5%] md:px-[7%] lg:px-[10%] xl:px-[15%] border-[#292a2b] h-16 flex items-center gap-3 sticky top-0 bg-slate-100 dark:bg-[#17181A] z-10'>
        <a href="/" id="logo" className='flex items-center'>
            <FaLightbulb size={24} color='#fcc400' className='relative -rotate-12 -left-1' />
            <span className='font-semibold text-lg'>Led</span>
        </a>
        <button className='bg-slate-200 dark:bg-[#292a2b] w-9 h-9 rounded-lg flex justify-center items-center transition-all active:scale-90 ml-auto' onClick={setTheme}>
            <BsMoon />
        </button>
        <button className='bg-slate-200 dark:bg-[#292a2b] w-9 h-9 rounded-lg flex justify-center items-center transition-all active:scale-90'>
            <IoNotificationsOutline />
        </button>

        <div className="profile flex items-center gap-4 cursor-pointer ml-3 md:border-l px-3 border-slate-300 dark:border-[#292a2b]">
            <span className='text-sm font-light text-gray-500 hidden md:inline-block'>Micheal Eze</span>
            <figure className='bg-[#232425] w-9 h-9 rounded-full border-2 border-yellow-600 shadow-md shadow-yellow-600'></figure>
        </div>
    </nav>
  )
}

export default Navbar