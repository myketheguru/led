import MenteeCard from '../components/MenteeCard'
import Navbar from '../components/Navbar'
import SidebarTimeline from '../components/SidebarTimeline'
import StatsList from '../components/StatsList'
import Wallet from '../components/Wallet'
import useUser from '../store/user'

const DashboardLayout = () => {
    const userType = useUser(state => state.userType)
  return (
    <div className='_dashboard-layout min-h-screen grid grid-rows-[auto_1fr] bg-slate-100 dark:bg-[#17181A] dark:text-gray-200 text-gray-600'>
        <Navbar />
        <main className='px-[5%] md:px-[7%] lg:px-[10%] xl:px-[15%] pb-5 grid grid-rows-[auto_1fr] '>
            <header className='py-5'>
                <h1 className='text-2xl text-gray-400'><span className='font-semibold text-gray-300'>Welcome,</span> Micheal</h1>
            </header>
            <div className="arena grid md:grid-cols-[auto_1fr] gap-4 md:gap-6">
                <SidebarTimeline />
                <div className="activity-area flex flex-col gap-3">
                    {
                        userType === 'mentor' ?
                        <>
                            <StatsList />
                            <Wallet />
                        </> :
                        <>
                            <MenteeCard />
                        </>
                    }
                </div>
            </div>
        </main>
    </div>
  )
}

export default DashboardLayout