import { useState } from 'react'
import { BsCheck2 } from 'react-icons/bs'
import { FaLightbulb } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'

const Login = () => {
    const [userDetails, setUserDetails] = useState<{email?: string, password?: string}>()
    const [remember, setRemember] = useState(false)
  return (
    <div className='login-layout min-h-screen bg-slate-100 dark:bg-[#17181A] dark:text-gray-200 text-gray-600 p-8 px-[10%] flex flex-col items-center'>
        <a href="/" id="logo" className='flex items-center'>
            <FaLightbulb size={28} color='#fcc400' className='relative -rotate-12 -left-1 shm' />
            <span className='font-light text-2xl'>Led</span>
        </a>

        <div className="steps w-80 min-h-80 flex overflow-x-auto no-bar mt-10">
            <div className="step-block shrink-0 transition-all max-w-sm h-full w-full">
                <h1 className='text-4xl dark:font-thin text-center'>Login</h1>
                <p className='text-sm text-center dark:font-extralight py-2'>Enter details below</p>

                {/* Email */}
                <div className="input-block p-[1px] mt-5 relative">
                    <input type="email" placeholder='Enter Email' className='bg-slate-200 dark:bg-[#242628] w-full h-12 outline-none rounded-md font-light p-2 px-3 text-sm focus:border focus:border-yellow-500 border border-slate-300 dark:border-[#3f4145]' name='email' onChange={(evt) => setUserDetails({ ...userDetails, [evt.target.name]: evt.target.value })} />
                    <BsCheck2 className={`absolute top-1/2 right-4 -translate-y-1/2 transition-all ${userDetails?.email?.includes('@') && userDetails?.email?.includes('.') ? 'opacity-100' : 'opacity-0'}`} />
                </div>

                {/* Password */}
                <PasswordInput placeholder='Password' className='bg-slate-200 dark:bg-[#242628] w-full h-12 outline-none rounded-md font-light p-2 px-3 text-sm focus:border focus:border-yellow-500 border border-slate-300 dark:border-[#3f4145]' name='password' onChange={(evt: any) => setUserDetails({ ...userDetails, [evt.target.name]: evt.target.value })} />
                <Link className='text-xs text-[#666a6d] inline-block hover:underline' to={'/forgot-password'}>Forgot your password?</Link>

                {/* Agree to terms */}
                <label className='flex items-center gap-3 mt-5'>
                    <input type="checkbox" className='hidden' checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                    <div className="flex justify-center items-center w-6 h-6 rounded-md bg-slate-200 dark:bg-[#242628] cursor-pointer border border-slate-300 dark:border-[#3f4145]">
                        {remember && <BsCheck2 />}
                    </div>
                    <span className='text-xs'>Remember Me</span>
                </label>

                {/* Submit Btn */}
                <button className='p-2 px-6 rounded-md w-full mt-5 bg-gray-200 dark:bg-[#222426] font-light transition-all border border-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-600 hover:text-[#222426] active:scale-95 ml-auto disabled:opacity-30 disabled:border-none disabled:active:scale-100 disabled:hover:bg-inherit' disabled={!userDetails?.email || !userDetails.password} onClick={() => {}}>
                    Login
                </button>
            </div>
        </div>
        
        <Link to={'/register'} className="text-xs text-[#515457] inline-block mt-20 hover:underline">Don't have an account?</Link>
    </div>
  )
}

export default Login