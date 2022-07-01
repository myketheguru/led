import { useState } from 'react'
import { BsCheck2, BsPlus } from 'react-icons/bs'
import { FaLightbulb, FaRedhat, FaRegEye, FaRegEyeSlash, FaUserTag } from 'react-icons/fa'
import { ImUser } from 'react-icons/im'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'

const RegisterLayout = () => {
    const [currentScreenIndex, setCurrentScreenIndex] = useState(0)
    const [profileType, setProfileType] = useState('')

    const [userDetails, setUserDetails] = useState<{fullname?: string, email?: string, phone?: string, password?: string}>()
    const [confirmPassword, setConfirmPassword] = useState('')

    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const [images, setImages] = useState<any>([])

    const prev = () => {
        if (currentScreenIndex > 0)
        setCurrentScreenIndex(currentScreenIndex - 1)
    }
    
    const next = () => {
        if (currentScreenIndex < 3)
        setCurrentScreenIndex(currentScreenIndex + 1)
    }

    const processFiles = (files: File[], callBack: (data: { data: string, name: string}[]) => void) => {
        const dataUrlArr : { data: string, name: string}[] = [] 
        Array.from(files).forEach((file, index) => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.addEventListener('load', (evt: any) => {
                let result = evt.target.result
                dataUrlArr.push({data: result.toString(), name: file.name})

                if (index === files.length - 1) {
                    callBack(dataUrlArr)
                }
            })
        })
    }

    const handleUpload = async (evt: any) => {
        evt.stopPropagation()
        evt.preventDefault()      
        
        if (evt.type === 'change') {
            processFiles(evt.target.files, (arr) => {
                console.log(arr);
                
                setImages([...arr])
            })
        } else {
            processFiles(evt.dataTransfer.files, (arr) => {
                setImages([...images, ...arr])
            })
        }
        
        return false
    }

    const stepValidation = () => {
        switch (currentScreenIndex) {
            case 0:
                return Boolean(profileType)
            case 1:
                return Boolean(userDetails?.fullname && userDetails.email && userDetails.phone && agreedToTerms)
            case 2:
                return images.length > 0
            case 3:
                return userDetails?.password === confirmPassword
            default:
                return true
        }
    }

  return (
    <div className='_register-layout min-h-screen bg-slate-100 dark:bg-[#17181A] dark:text-gray-200 text-gray-600 p-8 px-[10%] flex flex-col items-center'>
        <a href="/" id="logo" className='flex items-center'>
            <FaLightbulb size={28} color='#fcc400' className='relative -rotate-12 -left-1 shm' />
            <span className='font-light text-2xl'>Led</span>
        </a>

        <div className="progress-block flex gap-12 my-8 font-extralight">
            <div className={`indicator w-7 h-7 rounded-full flex items-center justify-center text-xs ${currentScreenIndex >= 0 ? 'bg-yellow-600 text-[#17181A] font-normal' : 'border border-gray-400 dark:border-[#3c3e42]'}`}>1</div>
            <div className={`indicator w-7 h-7 rounded-full flex items-center justify-center text-xs before:block  before:h-[2px] before:absolute before:left-[-186%] relative ${currentScreenIndex >= 1 ? 'bg-yellow-600 text-[#17181A] font-normal before:bg-yellow-600 before:w-[53px]' : 'before:w-[48px] border border-gray-400 dark:border-[#3c3e42] before:bg-slate-300 dark:before:bg-[#3c3e42]'}`}>2</div>
            <div className={`indicator w-7 h-7 rounded-full flex items-center justify-center text-xs before:block  before:h-[2px] before:absolute before:left-[-186%] relative ${currentScreenIndex >= 2 ? 'bg-yellow-600 text-[#17181A] font-normal before:bg-yellow-600 before:w-[53px]' : 'before:w-[48px] border border-gray-400 dark:border-[#3c3e42] before:bg-slate-300 dark:before:bg-[#3c3e42]'}`}>3</div>
            <div className={`indicator w-7 h-7 rounded-full flex items-center justify-center text-xs before:block  before:h-[2px] before:absolute before:left-[-186%] relative ${currentScreenIndex >= 3 ? 'bg-yellow-600 text-[#17181A] font-normal before:bg-yellow-600 before:w-[53px]' : 'before:w-[48px] border border-gray-400 dark:border-[#3c3e42] before:bg-slate-300 dark:before:bg-[#3c3e42]'}`}>4</div>
        </div>

        <div className="steps w-80 h-80 flex overflow-x-hidden no-bar">
            <div className="step-block shrink-0 transition-all max-w-sm h-full w-full" style={{ transform: `translateX(-${currentScreenIndex * 100}%)` }}>
                <h1 className='text-3xl dark:font-thin text-center'>Choose Profile</h1>
                <p className='text-sm text-center dark:font-extralight py-1'>How would you like to use the platform?</p>

                <div className="radio-select flex flex-col md:flex-row gap-2 h-[200px] mt-5">
                    <div className={`option-radio ${profileType === 'mentor' ? 'bg-[#fafae4] dark:bg-[#282824] border-2 border-yellow-400 dark:border-yellow-600' : 'bg-gray-300 dark:bg-[#242628] hover:border border-gray-400 dark:border-[#3f4145]'} active:transition-all active:scale-95  flex-1 rounded-md cursor-pointer flex md:flex-col items-start md:items-center justify-center gap-3 p-3 md:text-center`} onClick={() => setProfileType('mentor')}>
                        <span className='inline-block bg-gray-400 dark:bg-[#1f2021] p-2 rounded-full'>
                            <FaRedhat size={20} />
                        </span>
                        <div className="details flex flex-col gap-1">
                            <h1 className='font-light'>Mentor</h1>
                            <p className='dark:font-thin text-xs'>I possess the knowledge and I can show you how</p>
                        </div>
                    </div>
                    <div className={`option-radio ${profileType === 'learner' ? 'bg-[#fafae4] dark:bg-[#282824] border-2 border-yellow-400 dark:border-yellow-600' : 'bg-gray-300 dark:bg-[#242628] hover:border border-gray-400 dark:border-[#3f4145]'} bg-[#242628] active:transition-all active:scale-95 flex-1 rounded-md cursor-pointer flex md:flex-col items-start md:items-center justify-center gap-3 p-3 md:text-center`} onClick={() => setProfileType('learner')}>
                        <span className='inline-block bg-gray-400 dark:bg-[#1f2021] p-2 rounded-full'>
                            <ImUser size={20} />
                        </span>
                        <div className="details flex flex-col gap-1">
                            <h1 className='font-light'>Learner</h1>
                            <p className='dark:font-thin text-xs'>I need well-grounded mentors that I can learn from</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="step-block shrink-0 transition-all max-w-sm h-full w-full" style={{ transform: `translateX(-${currentScreenIndex * 100}%)` }}>
                <h1 className='text-3xl dark:font-thin text-center'>User Details</h1>
                <p className='text-sm text-center dark:font-extralight py-1'>Let's get to know you</p>

                {/* Full Name */}
                <div className="input-block p-[1px] mt-5 relative">
                    <input type="text" placeholder='Enter Fullname' className='bg-slate-200 dark:bg-[#242628] w-full h-12 outline-none rounded-md font-light p-2 px-3 text-sm focus:border focus:border-yellow-500 border border-slate-300 dark:border-[#3f4145]' name='fullname' onChange={(evt) => setUserDetails({ ...userDetails, [evt.target.name]: evt.target.value })} />
                    <BsCheck2 className={`absolute top-1/2 right-4 -translate-y-1/2 transition-all ${userDetails?.fullname?.trim()?.split(' ').length === 2 ? 'opacity-100' : 'opacity-0'}`} />
                </div>

                {/* Email */}
                <div className="input-block p-[1px] mt-5 relative">
                    <input type="email" placeholder='Enter Email' className='bg-slate-200 dark:bg-[#242628] w-full h-12 outline-none rounded-md font-light p-2 px-3 text-sm focus:border focus:border-yellow-500 border border-slate-300 dark:border-[#3f4145]' name='email' onChange={(evt) => setUserDetails({ ...userDetails, [evt.target.name]: evt.target.value })} />
                    <BsCheck2 className={`absolute top-1/2 right-4 -translate-y-1/2 transition-all ${userDetails?.email?.includes('@') && userDetails?.email?.includes('.') ? 'opacity-100' : 'opacity-0'}`} />
                </div>

                {/* Phone */}
                <div className="input-block p-[1px] mt-5 relative">
                    <input type="text" placeholder='Enter Phone Number' className='bg-slate-200 dark:bg-[#242628] w-full h-12 outline-none rounded-md font-light p-2 px-3 text-sm focus:border focus:border-yellow-500 border border-slate-300 dark:border-[#3f4145]' name='phone' onChange={(evt) => setUserDetails({ ...userDetails, [evt.target.name]: evt.target.value })} />
                    <BsCheck2 className={`absolute top-1/2 right-4 -translate-y-1/2 transition-all ${isNaN(Number(userDetails?.phone)) === false ? 'opacity-100' : 'opacity-0'}`} />
                </div>

                {/* Agree to terms */}
                <label className='flex items-center gap-3 mt-5'>
                    <input type="checkbox" className='hidden' checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
                    <div className="flex justify-center items-center w-6 h-6 rounded-md bg-slate-200 dark:bg-[#242628] cursor-pointer border border-slate-300 dark:border-[#3f4145]">
                        {agreedToTerms && <BsCheck2 />}
                    </div>
                    <span className='text-xs'>I agree to the <u>Terms of use</u> and <u>Privacy Policy</u></span>
                </label>
            </div>
            <div className="step-block shrink-0 transition-all max-w-sm h-full w-full flex flex-col" style={{ transform: `translateX(-${currentScreenIndex * 100}%)` }}>
                <h1 className='text-3xl dark:font-thin text-center'>Upload Image</h1>
                <p className='text-sm text-center dark:font-extralight py-1'>Please share your image with us</p>

                <div className="upload flex-1 flex items-center justify-center gap-10">
                    {images.length > 0 &&
                        <div className="uploaded flex flex-col items-center relative top-3 gap-2">
                        <figure className='bg-slate-200 dark:bg-[#242628] flex justify-center w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-yellow-600 drop-shadow-[0_0_4px_#ffc500]'>
                            <img className='h-full w-auto object-cover' src={images[0]?.data} alt="" />
                        </figure>
                        <p className='text-xs'>Looks Good!</p>
                    </div>}
                    <label htmlFor='upload' className={`w-16 h-16 border border-gray-300 text-gray-400 border-dashed transition-all active:scale-90 rounded-xl bg-slate-200 dark:bg-[#242628] cursor-pointer flex justify-center items-center relative ${images.length ? 'opacity-30 hover:opacity-100' : ''}`}>
                        <BsPlus />
                        <span className="absolute -bottom-8 whitespace-nowrap text-xs">Click to Upload</span>
                    </label>
                    <input className='hidden' type="file" accept='image/*' name="upload" id="upload" onChange={handleUpload} />
                </div>
            </div>
            <div className="step-block shrink-0 transition-all max-w-sm h-full w-full" style={{ transform: `translateX(-${currentScreenIndex * 100}%)` }}>
                <h1 className='text-3xl dark:font-thin text-center'>Create Password</h1>
                <p className='text-sm text-center dark:font-extralight py-1'>Craft yourself a unique password</p>

                <PasswordInput placeholder='Password' className='bg-slate-200 dark:bg-[#242628] w-full h-12 outline-none rounded-md font-light p-2 px-3 text-sm focus:border focus:border-yellow-500 border border-slate-300 dark:border-[#3f4145]' name='password' onChange={(evt: any) => setUserDetails({ ...userDetails, [evt.target.name]: evt.target.value })} />
                
                <PasswordInput placeholder='Confirm Password' className='bg-slate-200 dark:bg-[#242628] w-full h-12 outline-none rounded-md font-light p-2 px-3 text-sm focus:border focus:border-yellow-500 border border-slate-300 dark:border-[#3f4145]' name='password' onChange={(evt: any) => setConfirmPassword(evt.target.value)}  />

                {confirmPassword.length > 0 &&
                    <p className={`text-xs py-4 ${userDetails?.password === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                        {
                            userDetails?.password === confirmPassword ? 'Passwords match!' : 'Passwords do not match!'
                        }
                    </p>
                }
            </div>
        </div>

        <footer className='max-w-sm w-full flex justify-between mt-5'>
            {currentScreenIndex > 0 &&
                <button className='p-2 px-6 rounded-full bg-gray-200 dark:bg-[#222426] font-extralight transition-all active:scale-95' onClick={prev}>Prev</button>}
            <button className='p-2 px-6 rounded-full bg-gray-200 dark:bg-[#222426] font-extralight transition-all border border-yellow-600 active:scale-95 ml-auto disabled:opacity-30 disabled:border-none disabled:active:scale-100' disabled={!stepValidation()} onClick={currentScreenIndex < 3 ? next : () => {}}>
                { currentScreenIndex < 3 ? 'Next' : 'Create Account' }
            </button>
        </footer>

        <Link to={'/login'} className="text-xs text-[#515457] inline-block mt-20 hover:underline">Already have an account?</Link>
    </div>
  )
}

export default RegisterLayout