import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import ForgotPassword from './layouts/ForgotPassword.tsx'
import Login from './layouts/Login'
import MeetingRoom from './layouts/MeetingRoom'
import RegisterLayout from './layouts/RegisterLayout'
import ResetPassword from './layouts/ResetPassword'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/register' element={<RegisterLayout />} />
        <Route path='/dashboard' element={<DashboardLayout />} />
        <Route path='/meet/:id' element={<MeetingRoom />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
