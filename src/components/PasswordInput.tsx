import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const PasswordInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    const [show, setShow] = useState(false)
  return (
    <div className="input-block">
        <div className="input-block p-[1px] mt-5 relative">
            <input type={show ? "text" : "password"} { ...props } />
            <button onClick={() => setShow(!show)}>
                {!show && <FaRegEye className={`absolute top-1/2 right-4 -translate-y-1/2 transition-all`} />}
                {show && <FaRegEyeSlash className={`absolute top-1/2 right-4 -translate-y-1/2 transition-all`} />}
            </button>
        </div>
    </div>
  )
}

export default PasswordInput